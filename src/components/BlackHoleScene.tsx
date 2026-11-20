import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BlackHoleSceneProps {
  entered: boolean;
  scrollProgress: number;
}

const ACCRETION_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vLocalPos;

  void main() {
    vUv = uv;
    vLocalPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ACCRETION_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vLocalPos;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p = rot * p * 2.05;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    float r = length(vLocalPos.xy);
    float innerR = 1.24;
    float outerR = 4.45;
    float normR = clamp((r - innerR) / (outerR - innerR), 0.0, 1.0);

    float angle = atan(vLocalPos.y, vLocalPos.x);
    float angularSpeed = (1.65 / (normR + 0.28));
    float spiral = angle + uTime * 0.42 * angularSpeed - normR * 5.8;

    vec2 polarA = vec2(cos(spiral) * (2.6 + normR * 4.2), sin(spiral) * (2.6 + normR * 4.2));
    vec2 polarB = vec2(normR * 11.0 - uTime * 0.18, sin(spiral * 2.0) * 1.4);

    float filaments = fbm(polarA * 0.72 + vec2(uTime * 0.12, -uTime * 0.08));
    float rings = fbm(polarB + filaments * 1.6);
    float streaks = smoothstep(0.22, 0.88, filaments * 0.65 + rings * 0.55);

    // Hot inner photon boundary and soft outer dissipation
    float innerFade = smoothstep(0.0, 0.075, normR);
    float outerFade = 1.0 - smoothstep(0.32, 1.0, normR);
    float coreHot = exp(-normR * 6.2);

    // Relativistic Doppler beaming (brighter on left approaching side)
    float doppler = 0.82 + 0.34 * clamp(-vLocalPos.x / max(r, 0.001), -1.0, 1.0);

    vec3 deepEmber = vec3(0.45, 0.12, 0.02);
    vec3 burntOrange = vec3(0.92, 0.38, 0.06);
    vec3 moltenGold = vec3(1.0, 0.72, 0.24);
    vec3 whiteCore = vec3(1.0, 0.96, 0.86);

    vec3 col = mix(deepEmber, burntOrange, smoothstep(0.08, 0.55, streaks));
    col = mix(col, moltenGold, smoothstep(0.45, 0.92, streaks * (1.0 - normR * 0.45)));
    col = mix(col, whiteCore, clamp(coreHot * 1.15 + pow(streaks, 3.0) * (1.0 - normR) * 0.45, 0.0, 1.0));
    col *= doppler;

    float alpha = innerFade * outerFade * (0.28 + 0.85 * streaks + coreHot * 0.65);
    alpha *= uIntensity;

    gl_FragColor = vec4(col * (1.15 * uIntensity), clamp(alpha, 0.0, 0.96));
  }
`;

const LENSING_HALO_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LENSING_HALO_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    float angle = atan(p.y, p.x);

    // Razor-sharp photon ring around shadow radius ~0.34 in plane space
    float photonDist = abs(r - 0.345);
    float photonRing = exp(-photonDist * 42.0) * 1.25;

    // Warped gravitational lensing arch stronger at top & bottom poles
    float polarBias = pow(abs(sin(angle)), 1.35);
    float upperArch = exp(-abs(r - (0.37 + 0.085 * polarBias)) * 15.0) * (0.35 + 0.75 * polarBias);
    float outerAura = exp(-max(r - 0.34, 0.0) * 5.2) * 0.42;

    float shimmer = 0.84 + 0.16 * noise(vec2(angle * 4.0 + uTime * 0.35, r * 8.0));
    float shadowCut = smoothstep(0.305, 0.338, r);

    vec3 ember = vec3(0.82, 0.30, 0.04);
    vec3 amber = vec3(1.0, 0.68, 0.22);
    vec3 incandescent = vec3(1.0, 0.95, 0.84);

    vec3 color = ember * outerAura + amber * upperArch * shimmer + incandescent * photonRing;
    float alpha = (photonRing + upperArch * 0.85 + outerAura) * shadowCut * (1.0 - smoothstep(0.78, 1.0, r));
    alpha *= uIntensity;

    gl_FragColor = vec4(color * uIntensity, clamp(alpha, 0.0, 1.0));
  }
`;

const PARTICLE_VERTEX_SHADER = `
  attribute float aScale;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vWarmth;

  void main() {
    vec3 pos = position;
    float r = length(pos.xz);
    float angle = atan(pos.z, pos.x) + uTime * (0.28 / max(r * 0.45, 0.35));
    pos.x = cos(angle) * r;
    pos.z = sin(angle) * r;
    pos.y += sin(uTime * 0.6 + aPhase) * 0.035;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = clamp(aScale * uPixelRatio * (18.0 / max(-mvPosition.z, 1.0)), 1.0, 11.0);

    vAlpha = 0.45 + 0.45 * sin(uTime * 1.1 + aPhase);
    vWarmth = clamp(1.0 - (r - 1.4) / 4.2, 0.0, 1.0);
  }
`;

const PARTICLE_FRAGMENT_SHADER = `
  uniform float uIntensity;
  varying float vAlpha;
  varying float vWarmth;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 2.2);
    vec3 coolSilver = vec3(0.88, 0.88, 0.92);
    vec3 goldAmber = vec3(1.0, 0.66, 0.22);
    vec3 col = mix(coolSilver, goldAmber, vWarmth);
    gl_FragColor = vec4(col, glow * vAlpha * uIntensity);
  }
`;

const STAR_VERTEX_SHADER = `
  attribute float aSize;
  attribute float aTwinkle;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vTint;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = clamp(aSize * uPixelRatio * (14.0 / max(-mvPosition.z, 1.0)), 1.0, 4.5);
    vAlpha = 0.35 + 0.55 * (0.5 + 0.5 * sin(uTime * 0.7 + aTwinkle));
    vTint = fract(aTwinkle * 13.7);
  }
`;

const STAR_FRAGMENT_SHADER = `
  varying float vAlpha;
  varying float vTint;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float core = pow(1.0 - d * 2.0, 2.4);
    vec3 starWhite = vec3(0.95, 0.96, 1.0);
    vec3 warmStar = vec3(1.0, 0.84, 0.62);
    vec3 col = mix(starWhite, warmStar, step(0.72, vTint));
    gl_FragColor = vec4(col, core * vAlpha * 0.85);
  }
`;

export function BlackHoleScene({ entered, scrollProgress }: BlackHoleSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const enteredRef = useRef(entered);
  const scrollRef = useRef(scrollProgress);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  enteredRef.current = entered;
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Probe WebGL2 availability and software renderer status
    const probeCanvas = document.createElement('canvas');
    const probeGl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!probeGl) {
      setWebglUnavailable(true);
      return;
    }

    const debugExt = probeGl.getExtension('WEBGL_debug_renderer_info');
    const rendererParam = debugExt ? debugExt.UNMASKED_RENDERER_WEBGL : probeGl.RENDERER;
    const gpuName = String(probeGl.getParameter(rendererParam) || '');
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpuName);
    probeGl.getExtension('WEBGL_lose_context')?.loseContext();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030305);
    scene.fog = new THREE.FogExp2(0x030305, 0.018);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
    camera.position.set(0, 0.25, width < 768 ? 8.6 : 6.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    const pixelRatio = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    container.appendChild(renderer.domElement);

    // Composite Black Hole Group
    const blackHoleGroup = new THREE.Group();
    scene.add(blackHoleGroup);

    // 1. Event Horizon Shadow Core
    const horizonGeo = new THREE.SphereGeometry(1.18, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      depthWrite: true,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.renderOrder = 2;
    blackHoleGroup.add(horizonMesh);

    // 2. Gravitational Lensing Halo & Photon Ring (billboard plane behind/around core)
    const lensingGeo = new THREE.PlaneGeometry(7.2, 7.2);
    const lensingMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 1.0 },
      },
      vertexShader: LENSING_HALO_VERTEX_SHADER,
      fragmentShader: LENSING_HALO_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lensingMesh = new THREE.Mesh(lensingGeo, lensingMat);
    lensingMesh.renderOrder = 1;
    blackHoleGroup.add(lensingMesh);

    // 3. Primary Tilted Relativistic Accretion Disk
    const diskGeo = new THREE.RingGeometry(1.22, 4.48, 128, 32);
    const diskMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 1.0 },
      },
      vertexShader: ACCRETION_VERTEX_SHADER,
      fragmentShader: ACCRETION_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const diskMesh = new THREE.Mesh(diskGeo, diskMat);
    diskMesh.rotation.x = Math.PI * 0.43;
    diskMesh.rotation.z = -0.14;
    diskMesh.renderOrder = 3;
    blackHoleGroup.add(diskMesh);

    // 4. Secondary Subtle Warped Equatorial Rim
    const secondaryDiskGeo = new THREE.RingGeometry(1.24, 3.0, 96, 16);
    const secondaryDiskMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 12.0 },
        uIntensity: { value: 0.46 },
      },
      vertexShader: ACCRETION_VERTEX_SHADER,
      fragmentShader: ACCRETION_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const secondaryDiskMesh = new THREE.Mesh(secondaryDiskGeo, secondaryDiskMat);
    secondaryDiskMesh.rotation.x = Math.PI * 0.49;
    secondaryDiskMesh.rotation.z = -0.14;
    secondaryDiskMesh.renderOrder = 3;
    blackHoleGroup.add(secondaryDiskMesh);

    // 5. Orbiting Relativistic Accretion Particles
    const particleCount = width < 768 ? 850 : 1500;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particlePhases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 1.45 + Math.pow(Math.random(), 1.6) * 4.3;
      const theta = Math.random() * Math.PI * 2;
      const spreadY = (Math.random() - 0.5) * (0.14 + (r - 1.4) * 0.12);
      particlePositions[i * 3] = Math.cos(theta) * r;
      particlePositions[i * 3 + 1] = spreadY;
      particlePositions[i * 3 + 2] = Math.sin(theta) * r;
      particleScales[i] = 0.6 + Math.random() * 1.9;
      particlePhases[i] = Math.random() * Math.PI * 2;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('aScale', new THREE.BufferAttribute(particleScales, 1));
    particleGeo.setAttribute('aPhase', new THREE.BufferAttribute(particlePhases, 1));

    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uIntensity: { value: 0.9 },
      },
      vertexShader: PARTICLE_VERTEX_SHADER,
      fragmentShader: PARTICLE_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const accretionParticles = new THREE.Points(particleGeo, particleMat);
    accretionParticles.rotation.x = 0.24;
    accretionParticles.rotation.z = -0.14;
    accretionParticles.renderOrder = 4;
    blackHoleGroup.add(accretionParticles);

    // 6. Deep Cosmic Starfield
    const starCount = width < 768 ? 650 : 1200;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starTwinkles = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const radius = 16 + Math.random() * 44;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi) - 8;
      starSizes[i] = 0.8 + Math.random() * 2.2;
      starTwinkles[i] = Math.random() * 6.2831;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1));
    starGeo.setAttribute('aTwinkle', new THREE.BufferAttribute(starTwinkles, 1));

    const starMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
      },
      vertexShader: STAR_VERTEX_SHADER,
      fragmentShader: STAR_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Pre-warm shaders on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer parallax state (zero allocations inside tick)
    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };
    const lookTarget = new THREE.Vector3(0, 0, 0);

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const pr = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h);
      particleMat.uniforms.uPixelRatio.value = pr;
      starMat.uniforms.uPixelRatio.value = pr;
    };
    window.addEventListener('resize', handleResize);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setWebglUnavailable(true);
    };
    const handleContextRestored = () => {
      setWebglUnavailable(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();
    let elapsed = 0;
    let currentIntensity = 1.0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 90);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;

      const now = performance.now();
      const rawDelta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const motionScale = prefersReducedMotion ? 0.18 : 1.0;
      elapsed += rawDelta * motionScale;

      const isEntered = enteredRef.current;
      const scroll = scrollRef.current;
      const isNarrow = window.innerWidth < 768;

      // Damped pointer parallax
      smoothPointer.x = THREE.MathUtils.damp(smoothPointer.x, pointer.x, 3.2, rawDelta);
      smoothPointer.y = THREE.MathUtils.damp(smoothPointer.y, pointer.y, 3.2, rawDelta);

      // Smooth cinematic transition from centered entry portal to controlled atmospheric background
      const baseZ = isNarrow ? 8.8 : 6.4;
      const targetCamZ = isEntered ? baseZ + 2.2 + scroll * 1.15 : baseZ;
      const targetCamX = isEntered
        ? (isNarrow ? 0.0 : 1.45 - scroll * 2.1) + smoothPointer.x * 0.22
        : smoothPointer.x * 0.38;
      const targetCamY = isEntered
        ? 0.45 - scroll * 0.65 - smoothPointer.y * 0.18
        : 0.22 - smoothPointer.y * 0.28;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 2.6, rawDelta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 2.6, rawDelta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 2.4, rawDelta);

      const targetGroupX = isEntered ? (isNarrow ? 0.0 : 1.15 - scroll * 1.45) : 0.0;
      const targetGroupY = isEntered ? 0.35 - scroll * 0.45 : 0.08;
      blackHoleGroup.position.x = THREE.MathUtils.damp(
        blackHoleGroup.position.x,
        targetGroupX,
        2.4,
        rawDelta
      );
      blackHoleGroup.position.y = THREE.MathUtils.damp(
        blackHoleGroup.position.y,
        targetGroupY,
        2.4,
        rawDelta
      );

      // Keep lensing halo facing the camera smoothly
      lensingMesh.quaternion.copy(camera.quaternion);

      // Subtle atmospheric dimming once inside the readable portfolio universe
      const targetIntensity = isEntered ? 0.46 + Math.max(0, scroll - 0.78) * 1.35 : 1.0;
      currentIntensity = THREE.MathUtils.damp(currentIntensity, targetIntensity, 2.8, rawDelta);

      diskMat.uniforms.uTime.value = elapsed;
      diskMat.uniforms.uIntensity.value = currentIntensity;
      secondaryDiskMat.uniforms.uTime.value = elapsed * 0.72 + 12.0;
      secondaryDiskMat.uniforms.uIntensity.value = currentIntensity * 0.44;
      lensingMat.uniforms.uTime.value = elapsed;
      lensingMat.uniforms.uIntensity.value = currentIntensity;
      particleMat.uniforms.uTime.value = elapsed;
      particleMat.uniforms.uIntensity.value = currentIntensity * 0.85;
      starMat.uniforms.uTime.value = elapsed;

      starField.rotation.y = elapsed * 0.012;
      starField.rotation.x = scroll * 0.12;

      lookTarget.set(blackHoleGroup.position.x * 0.28, blackHoleGroup.position.y * 0.25, 0);
      camera.lookAt(lookTarget);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

      horizonGeo.dispose();
      horizonMat.dispose();
      lensingGeo.dispose();
      lensingMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      secondaryDiskGeo.dispose();
      secondaryDiskMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      id="black-hole-canvas-layer"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030305]"
    >
      {/* Graceful CSS golden-eclipse fallback if WebGL is unavailable or initializing */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          webglUnavailable ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 48%, #000000 0%, #000000 13%, rgba(251, 191, 36, 0.55) 14.5%, rgba(234, 88, 12, 0.26) 22%, rgba(3, 3, 5, 0.95) 48%, #030305 100%)',
        }}
      />

      {/* Dedicated isolated WebGL canvas container */}
      <div ref={mountRef} className="h-full w-full" />

      {/* Controlled readability vignette when scrolled inside the portfolio */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          entered ? 'opacity-100' : 'opacity-35'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(3,3,5,0.12) 0%, rgba(3,3,5,0.68) 70%, rgba(3,3,5,0.92) 100%)',
        }}
      />
    </div>
  );
}

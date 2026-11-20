import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BlackHoleScene } from './components/BlackHoleScene';
import { OpeningPortal } from './components/OpeningPortal';
import { Navbar } from './components/Navbar';
import { BeginningSection } from './components/BeginningSection';
import { WorkSection } from './components/WorkSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ToolkitSection } from './components/ToolkitSection';
import { FoundationAndActivitiesSection } from './components/FoundationAndActivitiesSection';
import { BeyondScreenSection } from './components/BeyondScreenSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import type { ProjectCaseStudy } from './data/portfolioData';

export default function App() {
  const [enteredUniverse, setEnteredUniverse] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<string | null>(null);

  useEffect(() => {
    const liveUrl = window.location.origin + window.location.pathname;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = liveUrl;

    let ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.content = liveUrl;
  }, []);

  useEffect(() => {
    if (!enteredUniverse) {
      setScrollProgress(0);
      return;
    }

    let rafId = 0;
    const updateScroll = () => {
      rafId = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const ratio = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
      setScrollProgress(ratio);
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [enteredUniverse]);

  const handleEnterUniverse = useCallback(() => {
    setEnteredUniverse(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleReturnToHorizon = useCallback(() => {
    setEnteredUniverse(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleDiscussProject = useCallback((projectTitle: string) => {
    setSelectedProject(null);
    setContactPrefill(projectTitle);
    window.setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030305] text-[#F4F4F5]">
      {/* Persistent Three.js 3D Black-Hole Atmosphere */}
      <BlackHoleScene entered={enteredUniverse} scrollProgress={scrollProgress} />

      <div id="universe-root" className="relative z-10">
        <AnimatePresence mode="wait">
          {!enteredUniverse ? (
            <motion.div
              key="opening-portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <OpeningPortal onEnter={handleEnterUniverse} />
            </motion.div>
          ) : (
            <motion.div
              key="main-portfolio"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen"
            >
              <Navbar onOpenResume={() => setResumeOpen(true)} />

              <main>
                <BeginningSection onOpenResume={() => setResumeOpen(true)} />
                <WorkSection onSelectProject={setSelectedProject} />
                <ExperienceSection />
                <ToolkitSection />
                <FoundationAndActivitiesSection />
                <BeyondScreenSection />
                <ContactSection
                  prefillTopic={contactPrefill}
                  onOpenResume={() => setResumeOpen(true)}
                  onReturnToHorizon={handleReturnToHorizon}
                />
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscussProject={handleDiscussProject}
      />

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

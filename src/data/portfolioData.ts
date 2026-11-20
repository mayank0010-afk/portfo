export type ProjectFilterCategory =
  | 'All Projects'
  | 'Backend & AI'
  | 'IoT & Embedded'
  | 'ML & Emerging';

export interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  categoryLabel: string;
  filterGroup: Exclude<ProjectFilterCategory, 'All Projects'>;
  featured: boolean;
  statusNote: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  problem: string;
  contributions: string[];
  architecture: string[];
  outcomeOrStatus: string;
  technologies: string[];
  githubUrl: string;
  githubLabel: string;
  relatedExperience?: string;
}

export interface InternshipExperience {
  id: string;
  index: string;
  company: string;
  role: string;
  type: string;
  period: string;
  area: string;
  summary: string;
  featuredContributionTitle: string;
  featuredContributionText: string;
  contributions: string[];
  technologies: string[];
  caseStudySummary: string;
  scopeTransparencyNote: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  level: 'Hands-On Core' | 'Applied & Exploring';
  description: string;
  skills: {
    name: string;
    depth: 'hands-on' | 'exploring';
  }[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  parentInstitution?: string;
  credential: string;
  specialization?: string;
  period: string;
  highlight: string;
}

export interface ActivityEntry {
  id: string;
  title: string;
  organization: string;
  category: 'Hackathons' | 'Training' | 'Volunteering';
  year: string;
  description: string;
}

export interface PersonalFacet {
  index: string;
  title: string;
  detail: string;
}

export const PORTFOLIO_PROFILE = {
  brandMark: 'MAYANK.',
  fullName: 'Mayank Sahani',
  yearLabel: 'PORTFOLIO · 2026',
  openingTagline: 'Beyond the ordinary.',
  openingSubline: 'An exploration of engineering, intelligence and creative technology.',
  positioning: 'Software Engineering · Artificial Intelligence · Creative Technology',
  centralHeadline: 'Building what comes next.',
  introParagraphOne:
    "I'm Mayank Sahani — a computer science engineering student and software developer exploring the space between software, intelligent systems and real-world problems.",
  introParagraphTwo:
    'From developing backend infrastructure and asynchronous AI workflows to building IoT-based monitoring systems, I enjoy taking ideas from architecture to implementation and turning complex concepts into practical products.',
  introFocusLine:
    'Focused on backend engineering, artificial intelligence, full-stack development and emerging technologies.',
  coordinates: '19.0446° N, 73.0255° E',
  locationLabel: 'Navi Mumbai, India',
  email: 'sahanimayank0010@gmail.com',
  linkedinHandle: 'mayank-sahani-a44aaa193',
  linkedinUrl: 'https://www.linkedin.com/in/mayank-sahani-a44aaa193',
  githubHandle: 'mayank0010-afk',
  githubUrl: 'https://github.com/mayank0010-afk',
  facelessCharacterImage: '/src/assets/images/faceless_character_1795138831547.jpg',
  facelessCharacterAlt:
    'Faceless 3D minimalist techwear silhouette illuminated by warm golden-amber rim light against a pitch-black background',
};

export const SELECTED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'iot-flood-monitoring',
    index: '01',
    title: 'IoT Predictive Flood Monitoring & Real-Time Early Warning System',
    shortTitle: 'Predictive Flood Monitoring',
    categoryLabel: 'IoT · Embedded Systems · Real-Time Monitoring',
    filterGroup: 'IoT & Embedded',
    featured: true,
    statusNote: 'Featured Build · Complete Hardware & Firmware Codebase',
    summary:
      'An IoT-based flood monitoring system built on NodeMCU ESP8266 with ultrasonic water-level sensing and DHT11 environmental telemetry for real-time early warnings.',
    image: '/src/assets/images/project_flood_iot_1795138847167.jpg',
    imageAlt:
      'Matte-black dual ultrasonic IoT flood sensor hardware emitting golden sonar rings across dark water',
    problem:
      'Localized urban and coastal flooding frequently escalates faster than manual gauges can report, leaving communities without timely alerts when water levels rise rapidly during heavy rainfall.',
    contributions: [
      'Designed the complete hardware architecture connecting NodeMCU ESP8266 with ultrasonic distance sensors and the DHT11 temperature and humidity module.',
      'Authored the complete embedded codebase responsible for continuous sensor polling, noise filtering, and real-time reading ingestion.',
      'Developed the early-warning pipeline combining rising water-level readings with predictive threshold triggers to dispatch timely alerts.',
    ],
    architecture: [
      'Ultrasonic transducer measures real-time surface distance changes to derive live water-level rise rates.',
      'DHT11 sensor supplies ambient temperature and humidity context alongside water-level telemetry.',
      'NodeMCU ESP8266 handles Wi-Fi telemetry transmission and threshold-based predictive warning triggers.',
    ],
    outcomeOrStatus:
      'Demonstrates end-to-end hardware-software integration, real-time sensor data processing, embedded programming, and practical civic problem-solving.',
    technologies: [
      'NodeMCU ESP8266',
      'Ultrasonic Sensors',
      'DHT11 Sensor',
      'Embedded C/C++',
      'Real-Time Sensor Processing',
      'Early-Warning Pipeline',
    ],
    githubUrl: 'https://github.com/mayank0010-afk',
    githubLabel: 'View on GitHub',
  },
  {
    id: 'ai-workflow-platform',
    index: '02',
    title: 'AI Workflow Execution Platform',
    shortTitle: 'AI Workflow Platform',
    categoryLabel: 'Backend Engineering · Generative AI · Workflow Automation',
    filterGroup: 'Backend & AI',
    featured: true,
    statusNote: 'Backend Architecture · Associated with Resonate AI Internship',
    summary:
      'A backend-oriented AI workflow platform engineered to orchestrate multi-stage planner, coder, and reviewer tasks with asynchronous execution and LLM provider integrations.',
    image: '/src/assets/images/project_ai_workflow_1795138851894.jpg',
    imageAlt:
      'Three obsidian glass and brushed titanium compute blocks linked by golden-amber optical data threads',
    problem:
      'Multi-step generative AI workflows break down under synchronous request-response loops when tasks require coordinated planning, code generation, review stages, and external model providers.',
    contributions: [
      'Contributed to backend workflow execution architecture and asynchronous processing pipelines using Python, Asyncio, and WebSockets.',
      'Worked on the /execute workflow endpoint, request handling, authentication, and conversation/context persistence in Django and FastAPI.',
      'Implemented backend integration components for multi-stage planner, coder, and reviewer orchestration with LangGraph and model providers.',
    ],
    architecture: [
      'Asynchronous task execution pipeline separating request intake from long-running LLM orchestration stages.',
      'Multi-stage orchestration graph routing context cleanly across planner, coder, and reviewer steps.',
      'PostgreSQL-backed conversation/context tracking paired with Groq and NVIDIA model provider integrations.',
    ],
    outcomeOrStatus:
      'Scope distinction: represents Mayank Sahani’s backend engineering and Pod 3 team-lead contributions to execution endpoints and orchestration pipelines during the Resonate AI internship, distinct from overall company platform ownership.',
    technologies: [
      'Python',
      'Django & DRF',
      'FastAPI',
      'Asyncio',
      'WebSockets',
      'LangGraph',
      'PostgreSQL',
      'REST APIs',
      'LLM Integrations',
    ],
    githubUrl: 'https://github.com/mayank0010-afk',
    githubLabel: 'Explore GitHub Profile',
    relatedExperience: 'Resonate AI — SDE Intern',
  },
  {
    id: 'cardiac-arrhythmia-detection',
    index: '03',
    title: 'Cardiac Arrhythmia Detection',
    shortTitle: 'Cardiac Arrhythmia Detection',
    categoryLabel: 'Machine Learning · Healthcare · Signal Processing',
    filterGroup: 'ML & Emerging',
    featured: true,
    statusNote: 'Applied ML Mini-Project · Deep-Learning Experimentation',
    summary:
      'A computational healthcare project applying ECG signal processing and deep-learning experimentation in Python and PyTorch to identify abnormal cardiac rhythms.',
    image: '/src/assets/images/project_cardiac_ecg_1795138830992.jpg',
    imageAlt:
      'Luminous golden-amber and white ECG heartbeat waveform suspended across a dark smoked-glass optical grid',
    problem:
      'Manual inspection of raw electrocardiogram waveforms is time-intensive and sensitive to signal noise, motivating automated computational pipelines to assist in flagging irregular rhythm patterns.',
    contributions: [
      'Built data preparation and ECG signal preprocessing routines to normalize waveforms for model ingestion.',
      'Structured exploratory signal analysis pipelines to examine rhythm characteristics across labeled cardiac classes.',
      'Conducted PyTorch deep-learning classification experiments evaluating architecture choices for arrhythmia detection.',
    ],
    architecture: [
      'Signal cleaning and segmentation stage preparing time-series ECG sequences for neural network input.',
      'PyTorch experimentation loop testing classification performance on extracted cardiac rhythm segments.',
      'Evaluation workflow inspecting classification behavior across normal and abnormal rhythm classes.',
    ],
    outcomeOrStatus:
      'An applied machine learning and biomedical signal processing exploration demonstrating disciplined data preparation, PyTorch modeling, and domain curiosity.',
    technologies: [
      'Python',
      'PyTorch',
      'ECG Signal Processing',
      'Machine Learning',
      'Deep-Learning Experimentation',
      'Data Preparation',
    ],
    githubUrl: 'https://github.com/mayank0010-afk',
    githubLabel: 'View on GitHub',
  },
  {
    id: 'personashave',
    index: '04',
    title: 'PersonaShave',
    shortTitle: 'PersonaShave',
    categoryLabel: 'Software Development · Personalization',
    filterGroup: 'Backend & AI',
    featured: false,
    statusNote: 'Portfolio Inventory · Detailed Technical Write-Up In Progress',
    summary:
      'A personalization-focused software product concept exploring tailored user recommendations and streamlined consumer decision workflows.',
    problem:
      'Generic product browsing forces users to sift through mismatched grooming options rather than receiving guided, preference-driven recommendations.',
    contributions: [
      'Included in Mayank Sahani’s active project portfolio exploring personalized user flows and software product design.',
      'Full architecture notes, verified stack details, and repository artifacts are being consolidated directly from source files before publication.',
    ],
    architecture: [
      'User preference intake and guided personalization workflow design.',
      'Verified technical stack and component breakdown will be published directly from repository documentation.',
    ],
    outcomeOrStatus:
      'Listed transparently in the project inventory without invented stack claims; technical walkthrough available upon request during interviews.',
    technologies: ['Software Development', 'Personalization Workflows'],
    githubUrl: 'https://github.com/mayank0010-afk',
    githubLabel: 'GitHub Profile',
  },
  {
    id: 'ar-vr-learning-platform',
    index: '05',
    title: 'AR/VR Learning Platform',
    shortTitle: 'AR/VR Learning Platform',
    categoryLabel: 'AR/VR · EdTech · Interactive Technology',
    filterGroup: 'ML & Emerging',
    featured: false,
    statusNote: 'Portfolio Inventory · Technical Stack Verification In Progress',
    summary:
      'An educational technology initiative focused on immersive AR/VR learning experiences designed to make complex concepts interactive for learners.',
    problem:
      'Static textbooks and two-dimensional slides make spatial and abstract technical topics harder for students to visualize and retain.',
    contributions: [
      'Explored interactive spatial learning concepts tailored for student engagement and hands-on conceptual exploration.',
      'Exact tooling, scene architecture, and individual implementation artifacts are being verified against original project files prior to full case-study publication.',
    ],
    architecture: [
      'Interactive educational module design centered on visual immersion and learner comprehension.',
      'Unverified engine or SDK details are intentionally omitted to keep technical reporting accurate.',
    ],
    outcomeOrStatus:
      'Part of Mayank Sahani’s emerging-technology exploration portfolio; live discussion and project walkthrough available for recruiters.',
    technologies: ['AR/VR Concepts', 'EdTech', 'Interactive Technology'],
    githubUrl: 'https://github.com/mayank0010-afk',
    githubLabel: 'GitHub Profile',
  },
  {
    id: 'ml-reproducible-project',
    index: '06',
    title: 'ML Reproducible Project',
    shortTitle: 'ML Reproducible Project',
    categoryLabel: 'Machine Learning · Data Science',
    filterGroup: 'ML & Emerging',
    featured: false,
    statusNote: 'Portfolio Inventory · Repository Specs Being Finalized',
    summary:
      'A structured machine learning engineering workflow emphasizing repeatable experimentation, consistent evaluation, and clean project organization.',
    problem:
      'Ad-hoc notebook experiments often fail to reproduce across environments when preprocessing steps, random seeds, and evaluation criteria are not cleanly structured.',
    contributions: [
      'Focused on structuring machine-learning experiments so training runs and evaluations can be repeated consistently.',
      'Specific dataset references, baseline models, and evaluation metrics will be linked directly from finalized project source files.',
    ],
    architecture: [
      'Modular separation of data preparation, experiment execution, and repeatable evaluation steps.',
      'Dataset and model specifics are kept strictly aligned with verified repository files rather than guessed.',
    ],
    outcomeOrStatus:
      'Reflects a disciplined software-engineering approach to machine learning workflows and reproducibility.',
    technologies: ['Python', 'Machine Learning', 'Data Science', 'Reproducible Pipelines'],
    githubUrl: 'https://github.com/mayank0010-afk',
    githubLabel: 'GitHub Profile',
  },
];

export const INTERNSHIP_EXPERIENCES: InternshipExperience[] = [
  {
    id: 'resonate-ai',
    index: '01',
    company: 'Resonate AI',
    role: 'Software Development Engineer Intern',
    type: 'Internship',
    period: 'July 2026 – October 2026',
    area: 'Backend Infrastructure · AI Engineering',
    summary:
      'Worked on backend infrastructure, REST APIs, and asynchronous AI workflow execution pipelines while coordinating Pod 3 development activities.',
    featuredContributionTitle: 'Asynchronous AI Workflow Execution Pipeline',
    featuredContributionText:
      'Contributed to the backend /execute workflow endpoint and asynchronous execution architecture designed to coordinate multi-stage planner, coder, and reviewer tasks and integrate external model providers.',
    contributions: [
      'Worked on backend infrastructure and API development for an AI workflow platform using Python, Django, Django REST Framework, and FastAPI.',
      'Contributed to asynchronous workflow execution and processing pipelines utilizing Asyncio and WebSockets.',
      'Worked on multi-stage AI workflow orchestration involving planner, coder, and reviewer stages with LangGraph.',
      'Developed backend components for AI model-provider integration (Groq and NVIDIA) and execution handling.',
      'Implemented Django REST API components covering authentication and conversation/context persistence backed by PostgreSQL.',
      'Contributed to the /execute workflow endpoint and collaborated closely with backend teammates on integration and debugging.',
      'Coordinated sprint implementation activities as the Pod 3 team lead.',
    ],
    technologies: [
      'Python',
      'Django',
      'Django REST Framework',
      'FastAPI',
      'REST APIs',
      'Asyncio',
      'WebSockets',
      'LangGraph',
      'PostgreSQL',
      'Groq & NVIDIA Integrations',
    ],
    caseStudySummary:
      'Focused on designing clean backend orchestration paths so multi-stage LLM workflows could execute asynchronously with structured context tracking across planner, coder, and reviewer steps.',
    scopeTransparencyNote:
      'Describes backend implementation, orchestration work, and Pod 3 coordination performed during the internship period without claiming every planned roadmap feature as externally deployed.',
  },
  {
    id: 'dy-patil-innovation',
    index: '02',
    company: 'D.Y. Patil Innovation Foundation',
    role: 'Software Development Engineer Intern',
    type: 'Internship',
    period: 'August 2025 – January 2026',
    area: 'Software Development · Application Workflows',
    summary:
      'Contributed to a property-monitoring application covering buyer/seller workflows, construction milestone tracking, and Oracle-backed data management.',
    featuredContributionTitle: 'Property-Monitoring & Construction Milestone Workflows',
    featuredContributionText:
      'Built application interface flows and Oracle-backed data workflows helping organize buyer/seller interactions and construction progress visibility.',
    contributions: [
      'Worked on a property-monitoring platform designed to structure real-estate progress updates and stakeholder visibility.',
      'Contributed to frontend and mobile application interfaces using React and React Native.',
      'Worked around buyer and seller workflows to make property status and milestone data easier to navigate.',
      'Contributed to construction progress and milestone tracking functionality across active workflows.',
      'Worked with relational data and application workflows backed by Oracle.',
    ],
    technologies: [
      'React',
      'React Native',
      'Oracle',
      'Application Development',
      'Workflow & Data Management',
    ],
    caseStudySummary:
      'Platform overview: a property-monitoring workflow system structured around bridging buyer/seller communication with ongoing construction progress and milestone records in Oracle.',
    scopeTransparencyNote:
      'Represents direct application development and workflow contributions recorded during the internship without unverified numeric claims or third-party project misattribution.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Programming Languages',
    level: 'Hands-On Core',
    description: 'Core languages used across backend services, algorithms, embedded firmware, and relational querying.',
    skills: [
      { name: 'Python', depth: 'hands-on' },
      { name: 'C++', depth: 'hands-on' },
      { name: 'C', depth: 'hands-on' },
      { name: 'Java', depth: 'hands-on' },
      { name: 'SQL', depth: 'hands-on' },
    ],
  },
  {
    id: 'backend-dev',
    category: 'Backend Development',
    level: 'Hands-On Core',
    description: 'Web frameworks and API servers used to build structured services, auth layers, and execution endpoints.',
    skills: [
      { name: 'Django', depth: 'hands-on' },
      { name: 'Django REST Framework', depth: 'hands-on' },
      { name: 'FastAPI', depth: 'hands-on' },
      { name: 'Node.js', depth: 'hands-on' },
      { name: 'Express.js', depth: 'hands-on' },
    ],
  },
  {
    id: 'backend-systems',
    category: 'Backend Systems',
    level: 'Hands-On Core',
    description: 'Architectural patterns for asynchronous processing, real-time sockets, and orchestrated service flows.',
    skills: [
      { name: 'REST APIs', depth: 'hands-on' },
      { name: 'WebSockets', depth: 'hands-on' },
      { name: 'Asynchronous Processing', depth: 'hands-on' },
      { name: 'Workflow Orchestration', depth: 'hands-on' },
    ],
  },
  {
    id: 'ai-ml',
    category: 'AI & Machine Learning',
    level: 'Applied & Exploring',
    description: 'Orchestrating LLM agent workflows alongside hands-on deep-learning and signal classification experiments.',
    skills: [
      { name: 'Generative AI', depth: 'hands-on' },
      { name: 'LLMs', depth: 'hands-on' },
      { name: 'LangGraph', depth: 'hands-on' },
      { name: 'PyTorch', depth: 'exploring' },
      { name: 'ML Fundamentals', depth: 'exploring' },
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend Development',
    level: 'Hands-On Core',
    description: 'Component-driven web and cross-platform mobile interfaces for application workflows.',
    skills: [
      { name: 'React', depth: 'hands-on' },
      { name: 'React Native', depth: 'hands-on' },
    ],
  },
  {
    id: 'databases',
    category: 'Databases',
    level: 'Hands-On Core',
    description: 'Relational and document storage backing application state, context history, and structured workflows.',
    skills: [
      { name: 'PostgreSQL', depth: 'hands-on' },
      { name: 'Oracle', depth: 'hands-on' },
      { name: 'MongoDB', depth: 'exploring' },
    ],
  },
  {
    id: 'iot-embedded',
    category: 'IoT & Embedded',
    level: 'Hands-On Core',
    description: 'Hardware-software integration, sensor calibration, and real-time physical telemetry pipelines.',
    skills: [
      { name: 'NodeMCU ESP8266', depth: 'hands-on' },
      { name: 'Ultrasonic Sensors', depth: 'hands-on' },
      { name: 'DHT11', depth: 'hands-on' },
    ],
  },
  {
    id: 'data-analytics',
    category: 'Data & Analytics',
    level: 'Applied & Exploring',
    description: 'Cleaning, preparing, and analyzing structured datasets and time-series sensor or biomedical signals.',
    skills: [
      { name: 'Data Processing', depth: 'hands-on' },
      { name: 'Data Analytics', depth: 'exploring' },
    ],
  },
  {
    id: 'dev-tools',
    category: 'Development Tools',
    level: 'Hands-On Core',
    description: 'Version control, collaborative branching workflows, and code integration discipline.',
    skills: [
      { name: 'Git', depth: 'hands-on' },
      { name: 'GitHub', depth: 'hands-on' },
    ],
  },
];

export const EDUCATION_TIMELINE: EducationEntry[] = [
  {
    id: 'rait-btech',
    institution: 'Ramrao Adik Institute of Technology (RAIT)',
    parentInstitution: 'D. Y. Patil University',
    credential: 'B.Tech — Computer Science and Engineering',
    specialization: 'Specialization: Artificial Intelligence and Data Science',
    period: 'Expected Graduation · 2027',
    highlight: 'Core coursework spanning data structures, operating systems, databases, AI systems, and applied engineering.',
  },
  {
    id: 'pace-jr',
    institution: 'Pace Junior College',
    credential: 'Higher Secondary Education — Class XII',
    period: 'Higher Secondary',
    highlight: 'Science and Mathematics foundation preparing for undergraduate computer science engineering.',
  },
  {
    id: 'north-point',
    institution: 'North Point School',
    credential: 'ICSE — Class I to X',
    period: 'Secondary School',
    highlight: 'Foundational academic curriculum and early exposure to structured programming and problem solving.',
  },
];

export const ACTIVITIES_AND_HACKATHONS: ActivityEntry[] = [
  {
    id: 'hacktofuture',
    title: 'HackToFuture 3.0',
    organization: 'National Hackathon',
    category: 'Hackathons',
    year: 'Hackathon',
    description: 'Rapid prototyping and collaborative engineering sprint building functional software solutions under time constraints.',
  },
  {
    id: 'national-space-hackathon',
    title: 'National Space Hackathon 2025',
    organization: 'Space Technology Challenge',
    category: 'Hackathons',
    year: '2025',
    description: 'Participated in problem solving around applied computing, data interpretation, and space-domain engineering challenges.',
  },
  {
    id: 'build-with-india',
    title: 'Build with India',
    organization: 'National Builder Program',
    category: 'Hackathons',
    year: 'Challenge',
    description: 'Product-focused builder challenge centered on shipping practical software for real-world Indian use cases.',
  },
  {
    id: 'newme-campus',
    title: 'Newme Campus Challenge',
    organization: 'Campus Innovation Challenge',
    category: 'Hackathons',
    year: 'Challenge',
    description: 'Cross-functional product strategy and technical problem-solving challenge focused on consumer experiences.',
  },
  {
    id: 'quasar-3',
    title: 'Quasar 3.0',
    organization: 'Inter-Collegiate Hackathon',
    category: 'Hackathons',
    year: 'Hackathon',
    description: 'Team-based engineering hackathon building end-to-end prototypes from concept to live demonstration.',
  },
  {
    id: 'kainos-2024',
    title: 'KAINOS 2024',
    organization: 'Technical Event & Hackathon',
    category: 'Hackathons',
    year: '2024',
    description: 'Technical challenge emphasizing system design, rapid iteration, and collaborative implementation.',
  },
  {
    id: 'inspire-training',
    title: 'INSPIRE Employability Training',
    organization: 'Aspire For Her · Infosys Foundation',
    category: 'Training',
    year: 'Training Program',
    description: 'Structured career-readiness and professional employability training focused on communication and workplace execution.',
  },
  {
    id: 'teach-for-india',
    title: 'Teach For India — Jaafari School, Govandi',
    organization: 'Community Volunteering',
    category: 'Volunteering',
    year: 'Volunteering',
    description: 'Classroom volunteering and teaching support with students at Jaafari School, Govandi — grounded in mentorship and community impact.',
  },
];

export const PERSONAL_FACETS: PersonalFacet[] = [
  {
    index: '01',
    title: 'Engineering & Emerging Systems',
    detail: 'Driven by curiosity around how complex systems work beneath the surface — from asynchronous backend pipelines to hardware sensors.',
  },
  {
    index: '02',
    title: 'AI & Creative Experimentation',
    detail: 'Exploring the intersection of intelligent models, clean software architecture, and tactile digital experiences that feel memorable.',
  },
  {
    index: '03',
    title: 'Former National-Level Esports',
    detail: 'Competing at a national level built composure under pressure, sharp tactical communication, and relentless iterative review.',
  },
  {
    index: '04',
    title: 'Gym & Physical Discipline',
    detail: 'Consistent strength training mirrors good engineering: measurable progression, recovery, and showing up even when progress is incremental.',
  },
  {
    index: '05',
    title: 'Anime, Manga & Visual Worlds',
    detail: 'Drawn to bold visual direction, kinetic storytelling, and atmospheric world-building — directly inspiring the aesthetic language of this site.',
  },
];

export function generatePlainTextResume(): string {
  const lines: string[] = [
    'MAYANK SAHANI',
    `${PORTFOLIO_PROFILE.positioning}`,
    `Email: ${PORTFOLIO_PROFILE.email} | LinkedIn: ${PORTFOLIO_PROFILE.linkedinUrl} | GitHub: ${PORTFOLIO_PROFILE.githubUrl}`,
    `Location: ${PORTFOLIO_PROFILE.locationLabel}`,
    '',
    'PROFILE',
    '------------------------------------------------------------------------',
    `${PORTFOLIO_PROFILE.introParagraphOne} ${PORTFOLIO_PROFILE.introParagraphTwo}`,
    '',
    'INTERNSHIP EXPERIENCE',
    '------------------------------------------------------------------------',
  ];

  for (const exp of INTERNSHIP_EXPERIENCES) {
    lines.push(`${exp.role} — ${exp.company} (${exp.period})`);
    lines.push(`Area: ${exp.area}`);
    lines.push(`Stack: ${exp.technologies.join(', ')}`);
    for (const item of exp.contributions) {
      lines.push(`  - ${item}`);
    }
    lines.push('');
  }

  lines.push('SELECTED PROJECTS');
  lines.push('------------------------------------------------------------------------');
  for (const project of SELECTED_PROJECTS) {
    lines.push(`${project.index}. ${project.title} [${project.categoryLabel}]`);
    lines.push(`   ${project.summary}`);
    lines.push(`   Technologies: ${project.technologies.join(', ')}`);
    lines.push('');
  }

  lines.push('TECHNICAL SKILLS');
  lines.push('------------------------------------------------------------------------');
  for (const group of SKILL_GROUPS) {
    lines.push(`${group.category}: ${group.skills.map((s) => s.name).join(', ')}`);
  }

  lines.push('');
  lines.push('EDUCATION');
  lines.push('------------------------------------------------------------------------');
  for (const edu of EDUCATION_TIMELINE) {
    const inst = edu.parentInstitution
      ? `${edu.institution}, ${edu.parentInstitution}`
      : edu.institution;
    lines.push(`${edu.credential} — ${inst} (${edu.period})`);
    if (edu.specialization) {
      lines.push(`  ${edu.specialization}`);
    }
  }

  lines.push('');
  lines.push('HACKATHONS, TRAINING & VOLUNTEERING');
  lines.push('------------------------------------------------------------------------');
  for (const act of ACTIVITIES_AND_HACKATHONS) {
    lines.push(`- ${act.title} (${act.organization} · ${act.category})`);
  }

  return lines.join('\n');
}

// ============================================================
// RAKESH S. — Cybersecurity Portfolio
// Complete Data & Type Definitions
// ============================================================

// ────────────────────────────────────────────────────────────
// § Type Definitions
// ────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface Education {
  degree: string;
  specialization?: string;
  institution: string;
  period: string;
  status: 'completed' | 'pursuing';
}

export interface Certification {
  title: string;
  provider: string;
  year: string;
  status: 'completed' | 'in-progress';
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  featured?: boolean;
}

export interface ExpertiseArea {
  title: string;
  description: string;
  skills: string[];
  icon: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
}

// ────────────────────────────────────────────────────────────
// § Navigation Items
// ────────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Labs', href: '#labs' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

// ────────────────────────────────────────────────────────────
// § Personal Information
// ────────────────────────────────────────────────────────────

export const personalInfo = {
  name: 'RAKESH S.',
  tagline: 'ASPIRING CYBERSECURITY PROFESSIONAL',
  heroTitle: ['BUILDING', 'WITH SECURITY', 'IN MIND'] as const,
  heroDescription:
    'MCA (Cybersecurity) student with a passion for cybersecurity, IoT and technology. I build projects, explore new tools and keep learning every day.',
  interests: ['Cybersecurity', 'IoT', 'Technology', 'Problem Solving'],
  email: 'itzrakesh003@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rakeshh003/',
  github: 'https://github.com/rakeshhraki',
} as const;

// ────────────────────────────────────────────────────────────
// § Education
// ────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    specialization: 'Cybersecurity',
    institution: 'Distance / Online',
    period: 'Currently Pursuing',
    status: 'pursuing',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'St. Francis College, Koramangala, Bengaluru',
    period: 'Completed June 2026',
    status: 'completed',
  },
];

// ────────────────────────────────────────────────────────────
// § Certifications
// ────────────────────────────────────────────────────────────

export const certifications: Certification[] = [
  {
    title: 'Python for Beginners',
    provider: 'Mevi',
    year: '2023',
    status: 'completed',
  },
  {
    title: 'Data Analytics',
    provider: 'Mevi',
    year: '2023',
    status: 'completed',
  },
  {
    title: 'Introduction to Cloud Computing',
    provider: 'Cloud Provider',
    year: '2024',
    status: 'completed',
  },
  {
    title: 'Data Analytics',
    provider: 'Imarticus',
    year: '2026',
    status: 'completed',
  },
  {
    title: 'Google Cybersecurity Professional Certificate',
    provider: 'Google / Coursera',
    year: '2026',
    status: 'in-progress',
  },
];

// ────────────────────────────────────────────────────────────
// § Projects
// ────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'cyberlens',
    number: '01',
    title: 'CyberLens',
    subtitle: 'Threat Intelligence Dashboard',
    description:
      'A comprehensive cybersecurity threat intelligence dashboard that aggregates, analyzes, and visualizes real-time threat data from multiple sources. CyberLens provides security professionals with actionable insights through an intuitive interface, enabling faster incident response and proactive threat hunting.',
    technologies: [
      'Python',
      'React',
      'TypeScript',
      'REST API',
      'Data Visualization',
      'Threat Intelligence',
    ],
    category: 'Cybersecurity',
    featured: true,
  },
  {
    id: 'smart-helmet',
    number: '02',
    title: 'Smart Helmet',
    subtitle: 'IoT Safety System',
    description:
      'An IoT-enabled smart helmet designed to enhance worker safety in hazardous environments. The system integrates multiple sensors — including gas detection, temperature monitoring, and impact sensors — to provide real-time alerts and safety data to both the wearer and a centralized monitoring station.',
    technologies: [
      'Arduino',
      'IoT Sensors',
      'C/C++',
      'Bluetooth',
      'Mobile App',
      'Embedded Systems',
    ],
    category: 'IoT & Hardware',
    featured: false,
  },
  {
    id: 'hydrosense',
    number: '03',
    title: 'HydroSense',
    subtitle: 'Water Quality Monitoring',
    description:
      'An intelligent water quality monitoring system that uses IoT sensors to continuously measure key water quality parameters such as pH, turbidity, dissolved oxygen, and temperature. The data is transmitted wirelessly to a cloud dashboard for real-time monitoring and historical analysis.',
    technologies: [
      'IoT',
      'Arduino',
      'Cloud Platform',
      'Sensors',
      'Data Analytics',
      'Python',
    ],
    category: 'IoT & Hardware',
    featured: false,
  },
  {
    id: 'sentinelmail',
    number: '04',
    title: 'SentinelMail',
    subtitle: 'Security Mailbox Triage & Incident Response Platform',
    description:
      'A full-stack security operations platform engineered for suspicious email triage and incident response. SentinelMail replaces ad-hoc inbox tracking with structured email intake, analyst triage queues, one-click incident escalation (INC-YYYY-NNNN), IOC extraction with confidence scoring, collaborative investigation notes, and multi-tier role-based access control.',
    technologies: [
      'React 19',
      'Node.js',
      'Express 5',
      'MongoDB',
      'JWT / RBAC',
      'Tailwind CSS',
      'Playwright',
    ],
    category: 'Cybersecurity',
    featured: true,
  },
];

// ────────────────────────────────────────────────────────────
// § Expertise Areas
// ────────────────────────────────────────────────────────────

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Cybersecurity',
    description:
      'Foundational knowledge in network security, threat analysis, vulnerability assessment, and security frameworks. Currently pursuing Google Cybersecurity Professional Certificate to deepen expertise.',
    skills: [
      'Network Security',
      'Threat Analysis',
      'Vulnerability Assessment',
      'Security Frameworks',
      'Incident Response',
      'Risk Management',
    ],
    icon: 'shield',
  },
  {
    title: 'Development',
    description:
      'Full-stack development skills spanning frontend and backend technologies. Experience building web applications, dashboards, and data-driven tools with modern frameworks and languages.',
    skills: [
      'Python',
      'JavaScript',
      'TypeScript',
      'React',
      'HTML/CSS',
      'REST APIs',
    ],
    icon: 'code',
  },
  {
    title: 'IoT & Hardware',
    description:
      'Hands-on experience designing and building IoT solutions using microcontrollers, sensors, and wireless communication protocols. Passionate about bridging the physical and digital worlds.',
    skills: [
      'Arduino',
      'Sensor Integration',
      'Embedded Systems',
      'Bluetooth / Wi-Fi',
      'Circuit Design',
      'Prototyping',
    ],
    icon: 'cpu',
  },
  {
    title: 'Tools & Platforms',
    description:
      'Proficiency with industry-standard tools for development, security analysis, cloud computing, and data analytics. Comfortable in both Linux and Windows environments.',
    skills: [
      'Linux',
      'Git & GitHub',
      'Cloud Platforms',
      'Wireshark',
      'VS Code',
      'Data Analytics Tools',
    ],
    icon: 'terminal',
  },
];

// ────────────────────────────────────────────────────────────
// § Skills (by Category)
// ────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'Programming Languages' },
  { name: 'JavaScript', category: 'Programming Languages' },
  { name: 'TypeScript', category: 'Programming Languages' },
  { name: 'C/C++', category: 'Programming Languages' },
  { name: 'HTML/CSS', category: 'Programming Languages' },
  { name: 'SQL', category: 'Programming Languages' },

  // Cybersecurity
  { name: 'Network Security', category: 'Cybersecurity' },
  { name: 'Threat Analysis', category: 'Cybersecurity' },
  { name: 'Vulnerability Assessment', category: 'Cybersecurity' },
  { name: 'Incident Response', category: 'Cybersecurity' },
  { name: 'Security Frameworks', category: 'Cybersecurity' },
  { name: 'Risk Management', category: 'Cybersecurity' },

  // Frameworks & Libraries
  { name: 'React', category: 'Frameworks & Libraries' },
  { name: 'Node.js', category: 'Frameworks & Libraries' },
  { name: 'REST APIs', category: 'Frameworks & Libraries' },
  { name: 'Arduino SDK', category: 'Frameworks & Libraries' },

  // IoT & Hardware
  { name: 'Arduino', category: 'IoT & Hardware' },
  { name: 'Sensor Integration', category: 'IoT & Hardware' },
  { name: 'Embedded Systems', category: 'IoT & Hardware' },
  { name: 'Bluetooth / Wi-Fi', category: 'IoT & Hardware' },
  { name: 'Circuit Design', category: 'IoT & Hardware' },
  { name: 'Prototyping', category: 'IoT & Hardware' },

  // Tools & Platforms
  { name: 'Linux', category: 'Tools & Platforms' },
  { name: 'Git & GitHub', category: 'Tools & Platforms' },
  { name: 'Cloud Platforms', category: 'Tools & Platforms' },
  { name: 'Wireshark', category: 'Tools & Platforms' },
  { name: 'VS Code', category: 'Tools & Platforms' },
  { name: 'Data Analytics Tools', category: 'Tools & Platforms' },

  // Soft Skills
  { name: 'Problem Solving', category: 'Soft Skills' },
  { name: 'Team Collaboration', category: 'Soft Skills' },
  { name: 'Communication', category: 'Soft Skills' },
  { name: 'Continuous Learning', category: 'Soft Skills' },
  { name: 'Adaptability', category: 'Soft Skills' },
];

// ────────────────────────────────────────────────────────────
// § Experience
// ────────────────────────────────────────────────────────────

// No verified experience provided yet.
// Add entries as internships, freelance work, or positions are confirmed.
export const experience: Experience[] = [];

// ────────────────────────────────────────────────────────────
// § Skill Categories (derived helper)
// ────────────────────────────────────────────────────────────

export const skillCategories: string[] = [
  ...new Set(skills.map((s) => s.category)),
];

// ────────────────────────────────────────────────────────────
// § Contact Information
// ────────────────────────────────────────────────────────────

export const contactInfo = {
  email: 'itzrakesh003@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rakeshh003/',
  github: 'https://github.com/rakeshhraki',
  location: 'Bengaluru, India',
  availability: 'Open to internships and entry-level opportunities',
} as const;

// ────────────────────────────────────────────────────────────
// § Site Metadata
// ────────────────────────────────────────────────────────────

export const siteMetadata = {
  title: 'Rakesh S. — Cybersecurity Portfolio',
  description:
    'Portfolio of Rakesh S., an aspiring cybersecurity professional specializing in network security, IoT, and full-stack development.',
  author: 'Rakesh S.',
  siteUrl: '#', // PLACEHOLDER — replace with deployed URL
} as const;

// ────────────────────────────────────────────────────────────
// § Footer Data
// ────────────────────────────────────────────────────────────

export const footerData = {
  copyright: `© ${new Date().getFullYear()} Rakesh S. All rights reserved.`,
  tagline: 'Built with security in mind.',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/rakeshhraki', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rakeshh003/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:itzrakesh003@gmail.com', icon: 'mail' },
  ],
} as const;

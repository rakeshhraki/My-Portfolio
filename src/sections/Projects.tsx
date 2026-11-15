import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CyberLensCase from './CyberLensCase';
import SentinelMailCase from './SentinelMailCase';
import './Projects.css';

/* ── arrow icon ── */
const ArrowIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── data ── */
interface ProjectData {
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  image: string;
  featured?: boolean;
  label?: string;
}

const projectsData: ProjectData[] = [
  {
    number: '01',
    title: 'CYBERLENS',
    tagline: 'Defensive File-Analysis Workbench',
    description:
      'CyberLens is a defensive static file-analysis workbench designed to safely inspect suspicious files without executing them. It performs static analysis, file triage, risk assessment, and indicator extraction.',
    technologies: ['Technologies to be confirmed'],
    image: '/project-cyberlens.jpg',
    featured: true,
    label: 'LATEST PROJECT',
  },
  {
    number: '02',
    title: 'SMART HELMET',
    tagline: 'Accident Detection & Emergency Alert System',
    description:
      'An IoT-based smart helmet project designed to detect accidents and send emergency alerts using sensor data and GPS location.',
    technologies: [
      'ESP32',
      'MPU6050',
      'NEO-6M GPS',
      'Buzzer',
      'Lithium battery',
      'TP4056',
      'Telegram Bot',
    ],
    image: '/project-smart-helmet.jpg',
  },
  {
    number: '03',
    title: 'HYDROSENSE',
    tagline: 'Smart Water Monitoring & Redistribution System',
    description:
      'A smart water monitoring concept focused on tracking water flow, levels, and pressure for efficient monitoring and redistribution.',
    technologies: [
      'ESP32',
      'YF-S201 Flow Sensor',
      'Water-level sensors',
      'Pressure sensors',
      'Wokwi',
    ],
    image: '/project-hydrosense.jpg',
  },
  {
    number: '04',
    title: 'SENTINELMAIL',
    tagline: 'Security Mailbox Triage & Incident Response Platform',
    description:
      'A full-stack security operations platform engineered for suspicious email triage and incident response. Replaces ad-hoc inbox tracking with structured email intake, analyst triage queues, one-click incident escalation (INC-YYYY-NNNN), IOC extraction with confidence scoring, collaborative investigation notes, and multi-tier role-based access control.',
    technologies: [
      'React 19',
      'Node.js',
      'Express 5',
      'MongoDB',
      'JWT / RBAC',
      'Tailwind CSS',
      'Playwright',
    ],
    image: '/project-sentinelmail.jpg',
    featured: true,
    label: 'CYBERSECURITY',
  },
];

/* ── animation variants ── */
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const bgNumberVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const featuredVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.35,
    },
  },
};

/* ── component ── */
const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const featured = projectsData[0];
  const rest = projectsData.slice(1, 3);
  const sentinelProject = projectsData[3];
  const [sentinelMailCaseOpen, setSentinelMailCaseOpen] = useState(false);

  return (
    <>
      <section className="projects" id="projects" ref={sectionRef}>
        {/* background number */}
        <motion.span
          className="projects__bg-number"
          variants={bgNumberVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          04
        </motion.span>

        {/* header */}
        <motion.div
          className="projects__header"
          variants={sectionHeaderVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className="projects__label">04</span>
          <h2 className="projects__title">PROJECTS</h2>
          <p className="projects__subtitle">
            A collection of real projects I've worked on across cybersecurity, IoT and technology.
          </p>
          <div className="projects__divider" />
        </motion.div>

        {/* featured card — CyberLens */}
        <motion.div
          className="projects__featured"
          variants={featuredVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="project-featured">
            {/* accent line */}
            <div className="project-featured__accent" />

            {/* content row */}
            <div className="project-featured__inner">
              {/* text side */}
              <div className="project-featured__text">
                <span className="project-featured__badge">{featured.label}</span>

                <div className="project-featured__number-row">
                  <span className="project-featured__number">{featured.number}</span>
                  <span className="project-featured__dash">—</span>
                </div>

                <h3 className="project-featured__title">{featured.title}</h3>
                <p className="project-featured__tagline">{featured.tagline}</p>
                <p className="project-featured__desc">{featured.description}</p>

                <div className="project-featured__tech">
                  {featured.technologies.map((t) => (
                    <span className="project-featured__tech-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  className="project-featured__cta"
                  onClick={() => setCaseStudyOpen(true)}
                  aria-label="View CyberLens case study"
                >
                  <span>View Case Study</span>
                  <ArrowIcon />
                </button>
              </div>

              {/* image container */}
              <div className="project-featured__image">
                <div className="project-featured__image-container">
                  <img
                    src={featured.image}
                    alt={`${featured.title} — ${featured.tagline}`}
                    className="project-featured__img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* secondary cards */}
        <motion.div
          className="projects__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {rest.map((project) => (
            <motion.div
              className="project-card"
              key={project.number}
              variants={cardVariants}
            >
              {/* accent */}
              <div className="project-card__accent" />

              {/* image container */}
              <div className="project-card__image">
                <div className="project-card__image-container">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.tagline}`}
                    className="project-card__img"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* text content */}
              <div className="project-card__body">
                <div className="project-card__number-row">
                  <span className="project-card__number">{project.number}</span>
                  <span className="project-card__dash">—</span>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__tagline">{project.tagline}</p>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tech">
                  {project.technologies.map((t) => (
                    <span className="project-card__tech-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project 04 — SentinelMail (matching CyberLens design) */}
        <motion.div
          className="projects__featured projects__featured--sentinelmail"
          variants={featuredVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="project-featured">
            {/* accent line */}
            <div className="project-featured__accent" />

            {/* content row */}
            <div className="project-featured__inner">
              {/* text side */}
              <div className="project-featured__text">
                <span className="project-featured__badge">{sentinelProject.label}</span>

                <div className="project-featured__number-row">
                  <span className="project-featured__number">{sentinelProject.number}</span>
                  <span className="project-featured__dash">—</span>
                </div>

                <h3 className="project-featured__title">{sentinelProject.title}</h3>
                <p className="project-featured__tagline">{sentinelProject.tagline}</p>
                <p className="project-featured__desc">{sentinelProject.description}</p>

                <div className="project-featured__tech">
                  {sentinelProject.technologies.map((t) => (
                    <span className="project-featured__tech-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="project-featured__cta"
                  onClick={() => setSentinelMailCaseOpen(true)}
                  aria-label="View SentinelMail case study"
                >
                  <span>View Case Study</span>
                  <ArrowIcon />
                </button>
              </div>

              {/* image container */}
              <div className="project-featured__image">
                <div className="project-featured__image-container">
                  <img
                    src={sentinelProject.image}
                    alt={`${sentinelProject.title} — ${sentinelProject.tagline}`}
                    className="project-featured__img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CyberLens case study modal */}
      <CyberLensCase isOpen={caseStudyOpen} onClose={() => setCaseStudyOpen(false)} />

      {/* SentinelMail case study modal */}
      <SentinelMailCase
        isOpen={sentinelMailCaseOpen}
        onClose={() => setSentinelMailCaseOpen(false)}
      />
    </>
  );
};

export default Projects;

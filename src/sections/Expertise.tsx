import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Expertise.css';

/* ── inline SVG icons ── */
const ShieldIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L3 7v5c0 5.25 3.75 10.13 9 11.25C17.25 22.13 21 17.25 21 12V7l-9-5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const CodeIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const ChipIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="6" width="12" height="12" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="0.5" />
    <line x1="9" y1="1" x2="9" y2="6" />
    <line x1="15" y1="1" x2="15" y2="6" />
    <line x1="9" y1="18" x2="9" y2="23" />
    <line x1="15" y1="18" x2="15" y2="23" />
    <line x1="1" y1="9" x2="6" y2="9" />
    <line x1="1" y1="15" x2="6" y2="15" />
    <line x1="18" y1="9" x2="23" y2="9" />
    <line x1="18" y1="15" x2="23" y2="15" />
  </svg>
);

const TerminalIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="6 10 10 14 6 18" />
    <line x1="14" y1="18" x2="18" y2="18" />
  </svg>
);

/* ── data ── */
interface ExpertiseCard {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  levelNote: string;
}

const expertiseData: ExpertiseCard[] = [
  {
    title: 'CYBERSECURITY',
    icon: <ShieldIcon />,
    skills: ['Threat awareness', 'Security fundamentals', 'Network security', 'Web security'],
    levelNote: 'Currently learning',
  },
  {
    title: 'DEVELOPMENT',
    icon: <CodeIcon />,
    skills: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'SQL'],
    levelNote: 'Working knowledge',
  },
  {
    title: 'IoT & HARDWARE',
    icon: <ChipIcon />,
    skills: ['ESP32', 'Sensors', 'Embedded systems'],
    levelNote: 'Hands-on project experience',
  },
  {
    title: 'TOOLS & PLATFORMS',
    icon: <TerminalIcon />,
    skills: ['Git', 'GitHub', 'VS Code', 'Linux', 'Postman', 'Canva', 'CapCut'],
    levelNote: 'Hands-on',
  },
];

/* ── animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const numberVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── component ── */
const Expertise: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="expertise" id="expertise" ref={sectionRef}>
      {/* background section number */}
      <motion.span
        className="expertise__bg-number"
        variants={numberVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        03
      </motion.span>

      {/* header */}
      <motion.div
        className="expertise__header"
        variants={headingVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <span className="expertise__label">03</span>
        <h2 className="expertise__title">EXPERTISE</h2>
        <p className="expertise__subtitle">
          Areas I am developing through coursework, projects and hands-on learning.
        </p>
        <div className="expertise__divider" />
      </motion.div>

      {/* grid */}
      <motion.div
        className="expertise__grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {expertiseData.map((card, index) => (
          <motion.div
            className="expertise-card"
            key={card.title}
            variants={cardVariants}
          >
            {/* crimson top accent */}
            <div className="expertise-card__accent" />

            {/* icon */}
            <div className="expertise-card__icon-wrapper">
              <div className="expertise-card__icon-glow" />
              <div className="expertise-card__icon">{card.icon}</div>
            </div>

            {/* title */}
            <h3 className="expertise-card__title">{card.title}</h3>

            {/* skills */}
            <div className="expertise-card__skills">
              {card.skills.map((skill) => (
                <span className="expertise-card__pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>

            {/* level note */}
            <span className="expertise-card__level">{card.levelNote}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Expertise;

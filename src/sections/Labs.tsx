import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Labs.css';

interface LabCategory {
  name: string;
  icon: React.ReactNode;
}

const labCategories: LabCategory[] = [
  {
    name: 'NETWORK',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="8" cy="32" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="32" cy="32" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="20" y1="11" x2="10" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="20" y1="11" x2="30" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="11" y1="32" x2="29" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'WEB',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="20" cy="20" rx="7" ry="14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        <line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="9" y1="12" x2="31" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
        <line x1="9" y1="28" x2="31" y2="28" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      </svg>
    ),
  },
  {
    name: 'LINUX',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="6" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <text x="10" y="23" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">$_</text>
        <line x1="16" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="28" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'FORENSICS',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17" cy="17" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="23.5" y1="23.5" x2="33" y2="33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="17" r="4" stroke="currentColor" strokeWidth="0.75" fill="none" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'CLOUD',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 28C8.68629 28 6 25.3137 6 22C6 19.1997 7.91896 16.8648 10.5 16.1707C10.5 16.1138 10.5 16.0571 10.5 16C10.5 11.5817 14.0817 8 18.5 8C22.1463 8 25.2213 10.4511 26.1653 13.7812C26.7717 13.5969 27.3958 13.5 28 13.5C31.3137 13.5 34 16.1863 34 19.5C34 22.8137 31.3137 25.5 28 25.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <line x1="12" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="15" y1="31" x2="25" y2="31" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: 'CTF',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L20 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 6L30 12L20 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <rect x="16" y="18" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="20" y1="21" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 28C13 28 15 25 20 25C25 25 27 28 27 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="12" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Labs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section ref={sectionRef} className="labs-section" id="labs">
      <div className="labs-container">
        <motion.div
          className="labs-header"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <span className="labs-section-number">05</span>
          <h2 className="labs-title">CYBER LABS</h2>
          <p className="labs-subtitle">
            Hands-on learning through practical labs and exercises.
          </p>
          <div className="labs-title-divider" />
        </motion.div>

        <motion.div
          className="labs-grid"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {labCategories.map((category) => (
            <motion.div
              key={category.name}
              className="labs-card"
              variants={cardVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 },
              }}
            >
              <div className="labs-card-inner">
                <div className="labs-card-icon">{category.icon}</div>
                <h3 className="labs-card-name">{category.name}</h3>
                <div className="labs-card-divider" />
                <div className="labs-card-status">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="labs-lock-icon"
                  >
                    <rect
                      x="2"
                      y="5.5"
                      width="8"
                      height="5.5"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                    <path
                      d="M4 5.5V4C4 2.89543 4.89543 2 6 2C7.10457 2 8 2.89543 8 4V5.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                  <span className="labs-coming-soon">Coming Soon</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="labs-footer-note"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Currently building my lab portfolio. Check back soon for completed
          exercises and walkthroughs.
        </motion.p>
      </div>
    </section>
  );
};

export default Labs;

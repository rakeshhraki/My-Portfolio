import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Certifications.css';

interface Certification {
  title: string;
  provider: string;
  year: string;
  status: 'COMPLETED' | 'IN PROGRESS';
  featured?: boolean;
}

const certifications: Certification[] = [
  {
    title: 'Python for Beginners',
    provider: 'Mevi Technologies',
    year: '2023',
    status: 'COMPLETED',
  },
  {
    title: 'Data Analytics',
    provider: 'Mevi Technologies',
    year: '2023',
    status: 'COMPLETED',
  },
  {
    title: 'Introduction to Cloud Computing',
    provider: '',
    year: '2024',
    status: 'COMPLETED',
  },
  {
    title: 'Data Analytics',
    provider: 'Imarticus Learning',
    year: '2026',
    status: 'COMPLETED',
  },
  {
    title: 'Google Cybersecurity Professional Certificate',
    provider: 'Google',
    year: '2024–Present',
    status: 'IN PROGRESS',
    featured: true,
  },
];

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
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

  return (
    <section
      ref={sectionRef}
      className="certifications-section"
      id="certifications"
    >
      <div className="certifications-container">
        <motion.div
          className="certifications-header"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <span className="certifications-section-number">07</span>
          <h2 className="certifications-title">CERTIFICATIONS</h2>
          <div className="certifications-title-divider" />
        </motion.div>

        <motion.div
          className="certifications-grid"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={`${cert.title}-${index}`}
              className={`cert-card${cert.featured ? ' cert-card--featured' : ''}`}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.3 },
              }}
            >
              <div className="cert-card-inner">
                {cert.featured && <div className="cert-card-glow" />}
                <div className="cert-card-accent" />

                <div className="cert-card-top">
                  <div className="cert-card-status-wrapper">
                    {cert.status === 'COMPLETED' ? (
                      <span className="cert-status cert-status--completed">
                        <span className="cert-status-dot cert-status-dot--completed" />
                        COMPLETED
                      </span>
                    ) : (
                      <span className="cert-status cert-status--progress">
                        <span className="cert-status-dot cert-status-dot--progress" />
                        IN PROGRESS
                      </span>
                    )}
                  </div>
                  <span className="cert-card-year">{cert.year}</span>
                </div>

                <h3 className="cert-card-title">{cert.title}</h3>

                {cert.provider && (
                  <p className="cert-card-provider">{cert.provider}</p>
                )}

                {cert.featured && (
                  <div className="cert-featured-badge">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 1L8.76 4.58L12.73 5.16L9.865 7.94L10.52 11.89L7 10.03L3.48 11.89L4.135 7.94L1.27 5.16L5.24 4.58L7 1Z"
                        stroke="#A31C1B"
                        strokeWidth="1"
                        fill="none"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Currently Pursuing</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;

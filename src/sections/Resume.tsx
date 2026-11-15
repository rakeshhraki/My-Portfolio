import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import './Resume.css';

const Resume: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    setMagnetPos({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMagnetPos({ x: 0, y: 0 });
  }, []);

  return (
    <section className="resume-section" id="resume" ref={sectionRef}>
      <div className="resume-container">
        <motion.span
          className="resume-section-number"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          10
        </motion.span>

        <motion.div
          className="resume-accent-line"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <motion.h2
          className="resume-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Want to know more?
        </motion.h2>

        <motion.p
          className="resume-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Download my resume to learn more about my background, skills, and experience.
        </motion.p>

        <motion.div
          className="resume-cta-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.a
            ref={buttonRef}
            className="resume-cta-button"
            data-cursor="pointer"
            href="/resume.pdf"
            download="Rakesh_S_Resume.pdf"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: magnetPos.x, y: magnetPos.y }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            <svg
              className="resume-download-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>DOWNLOAD RESUME</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;

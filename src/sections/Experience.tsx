import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './Experience.css';

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.6'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const entryVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const noteVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, delay: 0.9 },
    },
  };

  return (
    <section ref={sectionRef} className="experience-section" id="experience">
      <div className="experience-container">
        <motion.div
          className="experience-header"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <span className="experience-section-number">06</span>
          <h2 className="experience-title">EXPERIENCE</h2>
          <div className="experience-title-divider" />
        </motion.div>

        <div className="experience-timeline" ref={timelineRef}>
          <div className="experience-timeline-track">
            <motion.div
              className="experience-timeline-line-fill"
              style={{ height: lineHeight }}
            />
          </div>

          <motion.div
            className="experience-entry"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={entryVariants}
          >
            <div className="experience-dot-wrapper">
              <motion.div
                className="experience-dot"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
              <motion.div
                className="experience-dot-ring"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { scale: 1.8, opacity: 0 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  delay: 0.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </div>
            <div className="experience-card">
              <div className="experience-card-accent" />
              <div className="experience-card-content">
                <h3 className="experience-card-title">
                  [Experience details to be added]
                </h3>
                <p className="experience-card-description">
                  Professional experience entries will appear here.
                </p>
                <div className="experience-card-meta">
                  <span className="experience-dash">—</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="experience-footer-note"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={noteVariants}
        >
          Currently building professional experience through projects,
          coursework, and hands-on learning.
        </motion.p>
      </div>
    </section>
  );
};

export default Experience;

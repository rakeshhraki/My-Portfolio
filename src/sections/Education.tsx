import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './Education.css';

interface EducationEntry {
  degree: string;
  specialization?: string;
  institution: string;
  period: string;
  mode?: string;
  status: 'COMPLETED' | 'IN PROGRESS';
}

const educationEntries: EducationEntry[] = [
  {
    degree: 'MCA',
    specialization: 'Cybersecurity',
    institution: 'Distance / Online',
    period: 'Currently Pursuing',
    mode: 'Distance Learning',
    status: 'IN PROGRESS',
  },
  {
    degree: 'BCA',
    specialization: undefined,
    institution: 'St. Francis College, Koramangala, Bengaluru',
    period: 'Completed June 2026',
    status: 'COMPLETED',
  },
];

const Education: React.FC = () => {
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

  return (
    <section ref={sectionRef} className="education-section" id="education">
      <div className="education-container">
        <motion.div
          className="education-header"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <span className="education-section-number">08</span>
          <h2 className="education-title">EDUCATION</h2>
          <div className="education-title-divider" />
        </motion.div>

        <div className="education-timeline" ref={timelineRef}>
          {/* Timeline Track */}
          <div className="education-timeline-track">
            <motion.div
              className="education-timeline-fill"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Entries */}
          {educationEntries.map((entry, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';

            return (
              <EducationCard
                key={index}
                entry={entry}
                index={index}
                side={side}
                isInView={isInView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface EducationCardProps {
  entry: EducationEntry;
  index: number;
  side: 'left' | 'right';
  isInView: boolean;
}

const EducationCard: React.FC<EducationCardProps> = ({
  entry,
  index,
  side,
  isInView,
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: side === 'left' ? -60 : 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.4 + index * 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.5 + index * 0.25,
        type: 'spring',
        stiffness: 300,
      },
    },
  };

  return (
    <div className={`education-entry education-entry--${side}`}>
      {/* Dot */}
      <div className="education-dot-container">
        <motion.div
          className="education-dot"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={dotVariants}
        />
        {entry.status === 'IN PROGRESS' && (
          <motion.div
            className="education-dot-pulse"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView
                ? { scale: [1, 2], opacity: [0.5, 0] }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 1.8,
              delay: 0.7 + index * 0.25,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="education-card"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={cardVariants}
        whileHover={{
          y: -4,
          transition: { duration: 0.3 },
        }}
      >
        <div className="education-card-accent" />
        <div className="education-card-content">
          <div className="education-card-top-row">
            <h3 className="education-card-degree">{entry.degree}</h3>
            {entry.status === 'IN PROGRESS' ? (
              <span className="education-status education-status--progress">
                <span className="education-status-dot education-status-dot--progress" />
                IN PROGRESS
              </span>
            ) : (
              <span className="education-status education-status--completed">
                <span className="education-status-dot education-status-dot--completed" />
                COMPLETED
              </span>
            )}
          </div>

          {entry.specialization && (
            <p className="education-card-specialization">
              {entry.specialization}
            </p>
          )}

          <p className="education-card-institution">{entry.institution}</p>

          <div className="education-card-footer">
            <span className="education-card-period">{entry.period}</span>
            {entry.mode && (
              <span className="education-card-mode">{entry.mode}</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Education;

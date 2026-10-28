import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Skills.css';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'PROGRAMMING',
    skills: ['Python', 'Java', 'JavaScript', 'C', 'C++', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'TOOLS / DEVELOPMENT',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Node.js', 'React', 'MongoDB'],
  },
  {
    title: 'CYBERSECURITY',
    skills: [
      'Cybersecurity Fundamentals',
      'Network Security',
      'Web Security',
      'Threat Analysis',
      'Security Fundamentals',
      'Vulnerability Management',
    ],
  },
  {
    title: 'SYSTEMS',
    skills: ['Windows', 'Linux'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.06,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="skills-section-number">09</span>
          <h2 className="skills-title">SKILLS</h2>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category) => (
            <motion.div
              className="skills-category"
              key={category.title}
              variants={categoryVariants}
            >
              <div className="skills-category-header">
                <h3 className="skills-category-title">{category.title}</h3>
                <div className="skills-category-line" />
              </div>
              <div className="skills-pills">
                {category.skills.map((skill) => (
                  <motion.span
                    className="skills-pill"
                    key={skill}
                    variants={pillVariants}
                    whileHover={{
                      borderColor: 'rgba(163, 28, 27, 0.8)',
                      boxShadow: '0 0 16px rgba(163, 28, 27, 0.25)',
                      transition: { duration: 0.25 },
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './About.css';

const INTERESTS = ['Cybersecurity', 'IoT', 'Technology', 'Problem Solving'];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [1, -1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const portraitRevealVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tagStaggerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6,
      },
    },
  };

  const tagItemVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardStaggerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, x: 20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="about" className="about" ref={sectionRef}>
      {/* Background layers */}
      <div className="aboutBgGradient" />
      <div className="aboutGridLines" />

      <motion.div
        className="aboutContent"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section header */}
        <motion.div className="aboutHeader" variants={fadeUpVariants}>
          <span className="aboutSectionNumber">02</span>
          <div className="aboutTitleWrapper">
            <h2 className="aboutTitle">ABOUT ME</h2>
            <motion.div
              className="aboutTitleLine"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="aboutGrid">
          {/* Bio column */}
          <motion.div className="aboutBio" variants={slideInLeftVariants}>
            <motion.p className="aboutBioText" variants={fadeUpVariants}>
              I&apos;m <strong>Rakesh S.</strong>, an MCA (Cybersecurity) student with a strong
              foundation in computer applications and a growing passion for cybersecurity. I completed
              my BCA at St. Francis College, Koramangala, Bengaluru, and I&apos;m currently pursuing
              my MCA with a specialization in Cybersecurity through distance education.
            </motion.p>

            <motion.p className="aboutBioText" variants={fadeUpVariants}>
              I enjoy building projects that solve real problems, exploring new technologies, and
              developing practical skills in security, IoT, and software development. I believe in
              learning by doing, and I&apos;m constantly working on projects and labs to strengthen
              my understanding.
            </motion.p>

            {/* Interest tags */}
            <motion.div
              className="aboutInterests"
              variants={tagStaggerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {INTERESTS.map((interest) => (
                <motion.span
                  key={interest}
                  className="aboutInterestTag"
                  variants={tagItemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  {interest}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait composition */}
          <motion.div
            className="aboutPortraitComposition"
            variants={portraitRevealVariants}
          >
            <motion.div
              className="aboutPortraitFrame"
              ref={portraitRef}
              style={{ y: portraitY, rotate: portraitRotate }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Geometric frame elements */}
              <div className="aboutFrameOuter" />
              <div className="aboutFrameInner" />
              <div className="aboutFrameCornerTL" />
              <div className="aboutFrameCornerTR" />
              <div className="aboutFrameCornerBL" />
              <div className="aboutFrameCornerBR" />

              {/* Forest green background tint */}
              <div className="aboutPortraitBgTint" />

              {/* Crimson accent line */}
              <div className="aboutPortraitAccentLine" />

              {/* Image */}
              <div className="aboutPortraitImageWrap">
                <img
                  src="/portrait.jpg"
                  alt="Rakesh S. — About"
                  className="aboutPortraitImage"
                  loading="lazy"
                />
                <div className="aboutPortraitOverlay" />
              </div>
            </motion.div>

            {/* Signature text */}
            <motion.div
              className="aboutPortraitSignature"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            >
              Rakesh S.
              <span className="aboutPortraitSignatureLine" />
            </motion.div>
          </motion.div>

          {/* Education column */}
          <motion.div
            className="aboutEducation"
            variants={cardStaggerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span className="aboutEducationLabel" variants={slideInRightVariants}>
              EDUCATION
            </motion.span>

            {/* MCA Card */}
            <motion.div
              className="aboutEducationCard"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <h3 className="aboutEducationDegree">MCA — Cybersecurity</h3>
              <p className="aboutEducationSchool">Distance / Online</p>
              <span className="aboutEducationBadge">Currently Pursuing</span>
            </motion.div>

            {/* BCA Card */}
            <motion.div
              className="aboutEducationCard"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <h3 className="aboutEducationDegree">BCA</h3>
              <p className="aboutEducationSchool">
                St. Francis College, Koramangala, Bengaluru
              </p>
              <span className="aboutEducationBadge completed">Completed June 2026</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

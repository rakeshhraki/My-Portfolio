import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import AtmosphericCanvas from '../components/AtmosphericCanvas';
import './Hero.css';

const SECTION_NUMBERS = ['01', '02', '03', '04', '05'];
const VERTICAL_WORDS = ['LEARN', 'BUILD', 'EXPLORE', 'SECURE', 'GROW'];

interface ProjectTeaser {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
}

const PROJECT_TEASERS: ProjectTeaser[] = [
  {
    id: 'projects',
    tag: 'LATEST PROJECT',
    title: 'CyberLens',
    subtitle: 'Defensive File-Analysis Workbench',
  },
  {
    id: 'projects',
    tag: '02',
    title: 'Smart Helmet',
    subtitle: 'Accident Detection & Emergency Alert',
  },
  {
    id: 'projects',
    tag: '03',
    title: 'HydroSense',
    subtitle: 'Smart Water Monitoring System',
  },
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  const isInView = useInView(sectionRef, { once: true });

  const lineRevealVariants = {
    hidden: { y: '115%', opacity: 0 },
    visible: (custom: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.25 + custom * 0.12,
      },
    }),
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    }),
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* ── Atmospheric Canvas Particles ── */}
      <AtmosphericCanvas />

      {/* ── Background Landscape & Environmental Depth ── */}
      <motion.div
        className="heroEnvBackdrop"
        style={{ scale: bgScale }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="heroEnvOverlay" />
        <div className="heroMonolith" />
        <div className="heroMistFloor" />
      </motion.div>

      {/* ── Subtle Film Grain Noise ── */}
      <div className="heroNoise" />

      {/* ── Editorial Technical Grid Lines ── */}
      <div className="heroGridLines">
        <motion.div
          className="heroRedAccentLineLeft"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>

      {/* ── Far Left Section Numbers (01..05) ── */}
      <motion.div
        className="heroSectionNumbers"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="heroTimelineBar">
          <div className="heroTimelineDot" />
        </div>
        <div className="heroNumbersList">
          {SECTION_NUMBERS.map((num, index) => (
            <span
              key={num}
              className={`heroSectionNumber ${index === 0 ? 'active' : ''}`}
            >
              {num}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Far Right Vertical Stacked Editorial Text ── */}
      <motion.div
        className="heroVerticalText"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        {VERTICAL_WORDS.map((word) => (
          <span key={word} className="heroVerticalWord">
            {word}
          </span>
        ))}
      </motion.div>

      {/* ── Main Content Area ── */}
      <motion.div
        className="heroMainContainer"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="heroContent">
          {/* Left Editorial Text Column */}
          <div className="heroLeft">
            {/* Top Categories */}
            <motion.div
              className="heroLabels"
              custom={0.3}
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <span>CYBERSECURITY</span>
              <span className="heroLabelDivider">|</span>
              <span>TECHNOLOGY</span>
              <span className="heroLabelDivider">|</span>
              <span>PROBLEM SOLVING</span>
            </motion.div>

            {/* Main Editorial Typography */}
            <h1 className="heroHeading">
              <span className="heroHeadingMask">
                <motion.span
                  className="heroHeadingLine heroName"
                  custom={0}
                  variants={lineRevealVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  RAKESH S.
                </motion.span>
              </span>

              <span className="heroHeadingMask">
                <motion.span
                  className="heroHeadingLine heroAspiring"
                  custom={1}
                  variants={lineRevealVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  ASPIRING
                </motion.span>
              </span>

              <span className="heroHeadingMask">
                <motion.span
                  className="heroHeadingLine heroCyber"
                  custom={2}
                  variants={lineRevealVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  CYBERSECURITY
                </motion.span>
              </span>

              <span className="heroHeadingMask">
                <motion.span
                  className="heroHeadingLine heroProfessional"
                  custom={3}
                  variants={lineRevealVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  PROFESSIONAL
                </motion.span>
              </span>
            </h1>

            {/* Exact Truthful Supporting Text */}
            <motion.p
              className="heroParagraph"
              custom={0.8}
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              MCA (Cybersecurity) student with a strong interest in security, technology and real-world problem solving. I build projects, explore new tools and keep learning every day.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="heroButtons"
              custom={0.95}
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <a
                href="#projects"
                className="heroBtn heroBtnPrimary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
              >
                <span className="heroBtnText">VIEW MY WORK</span>
                <span className="heroBtnArrow">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>

              <a
                href="#resume"
                className="heroBtn heroBtnSecondary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('resume');
                }}
              >
                <span className="heroBtnText">DOWNLOAD RESUME</span>
                <span className="heroBtnDownload">
                  <svg
                    width="14"
                    height="14"
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
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Dramatic Art Direction & Portrait Composition */}
          <div className="heroRight">
            <motion.div
              className="heroArtComposition"
              ref={portraitRef}
              style={{ y: portraitY }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              {/* Crimson ambient backlight */}
              <div className="heroAuraCrimson" />

              {/* Forest green atmospheric backlight */}
              <div className="heroAuraForest" />

              {/* Portrait container with art direction treatment */}
              <div className="heroPortraitCard">
                <img
                  src="/portrait.jpg"
                  alt="Rakesh S. — Aspiring Cybersecurity Professional"
                  className="heroPortraitImage"
                  loading="eager"
                />

                {/* Atmospheric gradient overlay on the portrait */}
                <div className="heroPortraitAtmosphericOverlay" />

                {/* Crimson rim-lighting accent along right border */}
                <div className="heroPortraitRimLight" />

                {/* Editorial technical frame borders */}
                <div className="heroPortraitBorder" />
                <div className="heroPortraitCornerTL" />
                <div className="heroPortraitCornerBR" />
              </div>

              {/* Technical label chip */}
              <div className="heroTechChip">
                <span className="heroTechChipDot" />
                <span className="heroTechChipText">SEC_ANALYSIS // MCA_2026</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Project Teaser Strip (Matching Approved Direction) ── */}
        <motion.div
          className="heroTeaserStrip"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {PROJECT_TEASERS.map((teaser) => (
            <div
              key={teaser.title}
              className="heroTeaserCard"
              onClick={() => scrollToSection(teaser.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') scrollToSection(teaser.id);
              }}
            >
              <div className="heroTeaserContent">
                <span className="heroTeaserTag">{teaser.tag}</span>
                <h3 className="heroTeaserTitle">{teaser.title}</h3>
                <p className="heroTeaserSubtitle">{teaser.subtitle}</p>
              </div>

              <div className="heroTeaserAction">
                <div className="heroTeaserCircleBtn" aria-label={`View ${teaser.title}`}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator Bottom Right ── */}
      <motion.div
        className="heroScrollIndicator"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        onClick={() => scrollToSection('about')}
        role="button"
        tabIndex={0}
        aria-label="Scroll to About section"
      >
        <span className="heroScrollNumber">0</span>
        <span className="heroScrollLabel">SCROLL</span>
        <div className="heroScrollTrack">
          <div className="heroScrollThumb" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

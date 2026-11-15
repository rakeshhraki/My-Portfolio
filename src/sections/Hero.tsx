import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AtmosphericCanvas from '../components/AtmosphericCanvas';
import './Hero.css';

const SECTION_ITEMS = [
  { num: '01', id: 'home', label: 'Home' },
  { num: '02', id: 'about', label: 'About' },
  { num: '03', id: 'expertise', label: 'Expertise' },
  { num: '04', id: 'projects', label: 'Projects' },
  { num: '05', id: 'labs', label: 'Labs' },
  { num: '06', id: 'experience', label: 'Experience' },
  { num: '07', id: 'certifications', label: 'Certifications' },
  { num: '08', id: 'education', label: 'Education' },
  { num: '09', id: 'skills', label: 'Skills' },
  { num: '10', id: 'resume', label: 'Resume' },
  { num: '11', id: 'contact', label: 'Contact' },
];
const VERTICAL_WORDS = ['LEARN', 'BUILD', 'EXPLORE', 'SECURE', 'GROW'];

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // 1. Overall scroll progress (0 to 100)
      const totalScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const pct = Math.min(Math.max((totalScroll / windowHeight) * 100, 0), 100);
        setScrollPercent(pct);
      }

      // 2. Active section detection based on current visible section
      if (window.innerHeight + totalScroll >= document.documentElement.scrollHeight - 60) {
        setActiveIdx(SECTION_ITEMS.length - 1); // 11 - Contact at bottom
        return;
      }

      const sectionIds = SECTION_ITEMS.map((item) => item.id);
      let currentIdx = 0;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (totalScroll >= top - 220) {
            currentIdx = i;
            break;
          }
        }
      }
      setActiveIdx(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // ── Smooth scroll parallax transforms ──
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section id="home" className="hero-viewport" ref={heroRef}>
      {/* ── Visual Foundation: IMAGE 2 Artwork (Landscape + Portrait) ── */}
      <motion.div
        className="hero-bg-landscape-layer"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src="/hero-foundation-hd.jpg"
          alt="Rakesh S. — Aspiring Cybersecurity Professional"
          className="hero-bg-landscape-img"
          loading="eager"
        />
        <div className="hero-env-vignette" />
      </motion.div>

      {/* ── Ambient Particle Embers ── */}
      <AtmosphericCanvas />

      {/* ── 4. Left-Side Section Indicators (01–11) ── */}
      <div className="hero-left-indicator-rail" role="navigation" aria-label="Section indicators">
        <div className="hero-indicator-line-top">
          <div
            className="hero-indicator-line-fill"
            style={{ height: `${Math.max(scrollPercent, 8)}%` }}
          />
        </div>
        <div className="hero-indicator-dot" />
        <div className="hero-indicator-numbers">
          {SECTION_ITEMS.map((sec, idx) => (
            <button
              key={sec.num}
              type="button"
              className={`hero-indicator-num ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => scrollTo(sec.id)}
              aria-label={`Scroll to ${sec.label}`}
              title={`${sec.num} — ${sec.label}`}
            >
              {sec.num}
            </button>
          ))}
        </div>
      </div>

      {/* ── 5. Right-Side Technical Rail (LEARN, BUILD, EXPLORE, SECURE, GROW) ── */}
      <div className="hero-right-vertical-rail">
        <div className="hero-vertical-red-accent-line" />
        <div className="hero-vertical-words-list">
          {VERTICAL_WORDS.map((word) => (
            <span key={word} className="hero-vertical-word">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Editorial Content (Left side) ── */}
      <motion.div
        className="hero-main-container"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="hero-editorial-column">
          {/* Category Tag */}
          <div className="hero-category-label">
            <span>CYBERSECURITY</span>
            <span className="hero-label-bullet">|</span>
            <span>TECHNOLOGY</span>
            <span className="hero-label-bullet">|</span>
            <span>PROBLEM SOLVING</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-editorial-title">
            <span className="hero-text-line hero-text-name">RAKESH S.</span>
            <span className="hero-text-line hero-text-aspiring">ASPIRING</span>
            <span className="hero-text-line hero-text-cybersecurity">
              CYBERSECURITY
            </span>
            <span className="hero-text-line hero-text-professional">
              PROFESSIONAL
            </span>
          </h1>

          {/* Description */}
          <p className="hero-editorial-description">
            MCA (Cybersecurity) student with a strong interest
            <br />
            in security, technology and real-world problem solving.
            <br />
            I build projects, explore new tools and keep learning every day.
          </p>

          {/* Action Buttons */}
          <div className="hero-editorial-buttons">
            {/* 2. VIEW MY WORK button — scrolls to Projects section */}
            <a
              href="#projects"
              className="hero-pill-btn hero-pill-btn--primary"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('projects');
              }}
              id="hero-btn-view-work"
            >
              <span className="hero-pill-btn-text">VIEW MY WORK</span>
              <span className="hero-pill-btn-icon hero-pill-btn-icon--arrow">
                →
              </span>
            </a>

            {/* 3. DOWNLOAD RESUME button — downloads actual resume */}
            <a
              href="/resume.pdf"
              className="hero-pill-btn hero-pill-btn--secondary"
              download="Rakesh_S_Resume.pdf"
              id="hero-btn-download-resume"
            >
              <span className="hero-pill-btn-text">DOWNLOAD RESUME</span>
              <span className="hero-pill-btn-icon hero-pill-btn-icon--download">
                ↓
              </span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── 6. Bottom-Right SCROLL Indicator ── */}
      <div
        className="hero-scroll-control"
        onClick={() => scrollTo('about')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollTo('about');
          }
        }}
        aria-label="Scroll to About Section"
      >
        <span className="hero-scroll-num-zero">0</span>
        <span className="hero-scroll-word-label">SCROLL</span>
        <div className="hero-scroll-horizontal-track">
          <div className="hero-scroll-horizontal-thumb" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

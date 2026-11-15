import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const NAV_ITEMS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERTISE', href: '#expertise' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'LABS', href: '#labs' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CERTIFICATIONS', href: '#certifications' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'RESUME', href: '#resume' },
  { label: 'CONTACT', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── IntersectionObserver for active section ──
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aRect = a.boundingClientRect;
            const bRect = b.boundingClientRect;
            return Math.abs(aRect.top) - Math.abs(bRect.top);
          });

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // ── Smooth scroll handler ──
  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsMobileOpen(false);
    },
    []
  );

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // ── Mobile overlay animation variants ──
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
  };

  const mobileListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -15,
      filter: 'blur(4px)',
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <motion.nav
        className={`nav${isScrolled ? ' scrolled' : ''}`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 1.8 }}
      >
        {/* Logo */}
        <a
          className="navLogo"
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          RAKESH S.
        </a>

        {/* Desktop Navigation Links */}
        <ul className="navLinks">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <li key={item.label} className="navLinkItem">
                <a
                  className={`navLink${isActive ? ' active' : ''}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.div
                    className="navLinkUnderline"
                    layoutId="nav-underline"
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Decorative red dot */}
        <div className="navDot" />

        {/* Hamburger button */}
        <button
          className={`hamburger${isMobileOpen ? ' open' : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
        </button>
      </motion.nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobileOverlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobileOverlayBg" />
            <div className="mobileOverlayLines" />

            <motion.ul
              className="mobileNavList"
              variants={mobileListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_ITEMS.map((item, index) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                const number = String(index + 1).padStart(2, '0');

                return (
                  <motion.li key={item.label} variants={mobileLinkVariants}>
                    <button
                      className={`mobileNavLink${isActive ? ' active' : ''}`}
                      onClick={(e) => handleNavClick(e as any, item.href)}
                    >
                      <span className="mobileNavNumber">{number}</span>
                      {item.label}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              className="mobileOverlayFooter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              CYBERSECURITY PORTFOLIO — 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

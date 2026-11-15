import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CyberLensCase.css';

/* ── props ── */
interface CyberLensCaseProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── case study section data ── */
interface CaseSection {
  number: string;
  heading: string;
  body: string;
  details?: string[];
  hasScreenshot?: boolean;
}

const caseSections: CaseSection[] = [
  {
    number: '01',
    heading: 'OBJECTIVE',
    body: 'Build a defensive static file-analysis workbench designed to safely inspect, unpack metadata from, and evaluate potentially suspicious files without runtime execution risk. The goal is to provide fast, safe, preliminary triage before any dynamic analysis.',
    details: [
      'Eliminate zero-day execution danger by maintaining strict passive inspection.',
      'Extract critical cryptographic signatures and indicators for threat intelligence correlation.',
      'Surface hidden strings, suspicious URLs, and anomalous file headers.'
    ]
  },
  {
    number: '02',
    heading: 'APPROACH',
    body: 'Designed around layered defensive heuristics and isolated parsing. Rather than executing payloads or relying on opaque signature databases, CyberLens performs multi-stage static inspection.',
    details: [
      'Cryptographic Hashing: Generates MD5, SHA-1, and SHA-256 digests.',
      'Magic Byte Verification: Confirms real file format against extension spoofing.',
      'String Extraction: Decodes ASCII and Unicode strings to reveal embedded endpoints.',
      'Structural Inspection: Parses PE/ELF headers, section counts, and imports.'
    ],
    hasScreenshot: true,
  },
  {
    number: '03',
    heading: 'ANALYSIS WORKFLOW',
    body: 'The analysis pipeline follows a disciplined 5-stage defensive sequence:',
    details: [
      '1. File Ingestion & Sandbox Sanitization: File is read as an immutable binary buffer.',
      '2. Fingerprint Extraction: Computes cryptographic hashes and checks magic byte consistency.',
      '3. Pattern & Indicator Scanning: Scans raw bytes for IP addresses, domain names, and suspicious Windows API calls.',
      '4. Entropy Calculation: Analyzes section randomness to detect high entropy (packed or encrypted payloads).',
      '5. Report Synthesis: Compiles all observations into a structured, readable triage report.'
    ],
    hasScreenshot: true,
  },
  {
    number: '04',
    heading: 'FINDINGS & OUTPUT',
    body: 'Produces an objective, evidence-based triage report summarizing key indicators of compromise (IoCs):',
    details: [
      'Identified file format, true MIME type, and discrepancies with file extension.',
      'Entropy score indicating whether sections are likely obfuscated or compressed.',
      'List of unique extracted network endpoints and suspicious imported functions.',
      'Preliminary risk assessment profile highlighting anomalous attributes for human review.'
    ],
    hasScreenshot: true,
  },
  {
    number: '05',
    heading: 'INTERPRETATION & SAFETY',
    body: 'CyberLens serves as a triage and risk-assessment workbench rather than a definitive malware detector. It empowers security analysts to form hypotheses rapidly while maintaining strict isolation.',
    details: [
      'High entropy flags areas warranting deeper reverse engineering.',
      'Extracted hashes allow immediate querying against threat feeds and VirusTotal.',
      'Provides actionable context for Security Operations Center (SOC) escalation.'
    ]
  },
  {
    number: '06',
    heading: 'LESSONS LEARNED',
    body: 'Developing CyberLens reinforced core principles of defensive security engineering:',
    details: [
      'Static analysis is indispensable for zero-execution safety during initial triage.',
      'File format spoofing is prevalent, making magic-byte validation fundamental.',
      'Clear, structured reporting of indicators significantly accelerates incident response decisions.'
    ]
  },
];

/* ── animation variants ── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: 'easeIn', delay: 0.15 },
  },
};

const panelVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.5, ease: [0.55, 0.06, 0.68, 0.19] },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const sectionContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.55,
    },
  },
};

const sectionItemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const closeVariants = {
  hidden: { opacity: 0, rotate: -90, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── component ── */
const CyberLensCase: React.FC<CyberLensCaseProps> = ({ isOpen, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* dark overlay */}
          <motion.div
            className="cyberlens-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            className="cyberlens-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="CyberLens Case Study"
          >
            {/* close button */}
            <motion.button
              className="cyberlens-panel__close"
              onClick={onClose}
              variants={closeVariants}
              initial="hidden"
              animate="visible"
              aria-label="Close case study"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            {/* scrollable content */}
            <div className="cyberlens-panel__scroll" ref={scrollRef}>
              {/* hero */}
              <motion.div
                className="cyberlens-hero"
                variants={heroVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="cyberlens-hero__label">TECHNICAL CASE STUDY</span>
                <h1 className="cyberlens-hero__title">CYBERLENS</h1>
                <p className="cyberlens-hero__subtitle">
                  Defensive File-Analysis Workbench
                </p>
                <div className="cyberlens-hero__line" />
              </motion.div>

              {/* overview block */}
              <motion.div
                className="cyberlens-overview"
                variants={sectionItemVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="cyberlens-overview__text">
                  CyberLens is a defensive static file-analysis workbench designed to safely
                  inspect suspicious files without executing them. It performs static analysis,
                  file triage, risk assessment, and indicator extraction — providing an
                  in-depth structural view of a file&apos;s attributes without exposing the host system to runtime risk.
                </p>
              </motion.div>

              {/* sections */}
              <motion.div
                className="cyberlens-sections"
                variants={sectionContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {caseSections.map((section) => (
                  <motion.div
                    className="cyberlens-section"
                    key={section.number}
                    variants={sectionItemVariants}
                  >
                    <div className="cyberlens-section__header">
                      <span className="cyberlens-section__number">{section.number}</span>
                      <h2 className="cyberlens-section__heading">{section.heading}</h2>
                    </div>

                    <div className="cyberlens-section__divider" />

                    <p className="cyberlens-section__body">{section.body}</p>

                    {section.details && (
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '1.25rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem'
                      }}>
                        {section.details.map((detail, idx) => (
                          <li
                            key={idx}
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '0.88rem',
                              color: '#9A9A95',
                              lineHeight: '1.6',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem'
                            }}
                          >
                            <span style={{ color: '#A31C1B', fontWeight: 600 }}>›</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.hasScreenshot && (
                      <div className="cyberlens-section__screenshot">
                        <div className="cyberlens-section__screenshot-inner">
                          <img
                            src="/project-cyberlens.jpg"
                            alt="CyberLens Security Research Workbench Interface"
                            className="cyberlens-section__screenshot-img"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* footer */}
              <div className="cyberlens-footer">
                <div className="cyberlens-footer__line" />
                <button
                  className="cyberlens-footer__back"
                  onClick={onClose}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>Back to Projects</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CyberLensCase;

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SentinelMailCase.css';

/* ── props ── */
interface SentinelMailCaseProps {
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
    heading: 'PROJECT OVERVIEW & PROBLEM STATEMENT',
    body: 'Security operations centers (SOCs) and IT teams receive an unceasing influx of user-reported suspicious emails. In most organizations, these submissions land in generic shared inboxes and are tracked using ad-hoc spreadsheets and disjointed message threads.',
    details: [
      'Operational Latency: Manual inbox handling causes critical triage delays, allowing credential harvesting or ransomware payloads to spread across the network.',
      'Fragmented Threat Intelligence: Extracted domains, malicious IPs, and file hashes remain buried in inbox replies rather than indexed in a centralized, queryable repository.',
      'Absence of Auditability: Spreadsheets lack tamper-resistant audit trails, sequential tracking, and precise timeline tracking required for compliance and post-incident reviews.'
    ]
  },
  {
    number: '02',
    heading: 'PROJECT OBJECTIVES',
    body: 'Engineer a specialized, full-stack security operations console to automate email intake, streamline analyst triage, enforce strict data custody, and accelerate Mean Time to Triage (MTTA) and Mean Time to Containment (MTTC).',
    details: [
      'Standardized Intake: Replace raw email forwarding with a structured submission pipeline capturing essential metadata, client IPs, headers, and attachment attributes.',
      'Analyst-First Triage Queue: Provide a centralized Security Mailbox allowing analysts to filter, prioritize by risk severity, and review queued submissions.',
      'Atomic Sequential Escalation: Convert verified threats into formal incident tickets with predictable, atomic identifiers (INC-YYYY-NNNN).',
      'Structured IOC Tracking: Extract and index indicators of compromise (IPs, domains, hashes, senders) linked directly to the parent incident with confidence scoring.',
      'Defensive RBAC & Isolation: Enforce role-based boundaries between self-service reporting users, SOC analysts, and administrators.'
    ]
  },
  {
    number: '03',
    heading: 'HOW SENTINELMAIL WORKS & INCIDENT LIFECYCLE',
    body: 'SentinelMail standardizes the security response workflow into five disciplined phases:',
    details: [
      '1. Submission Intake (SEC-YYYY-NNNNN): Users submit suspicious emails via a guided web form. The platform generates an immutable sequential tracking ID and records sender, subject, body, headers, and attachment metadata.',
      '2. Security Mailbox Triage: Tier-1 SOC analysts inspect pending reports in the live queue, reviewing raw headers, sender domain authenticity, and threat indicators.',
      '3. One-Click Escalation: Upon identifying malicious intent, the analyst promotes the report to an incident with a single click, assigning an initial severity rating and generating an atomic INC identifier.',
      '4. Collaborative Investigation & IOC Logging: Analysts log time-stamped investigation notes, attach atomic IOCs with confidence scores, and coordinate containment steps.',
      '5. Closure & Post-Mortem Audit: Once containment and remediation are verified, the incident is closed with a comprehensive resolution summary permanently stored in the audit timeline.'
    ]
  },
  {
    number: '04',
    heading: 'KEY PLATFORM FEATURES',
    body: 'Designed specifically around real-world SOC operational workflows with purpose-built security capabilities:',
    details: [
      'Multi-Perspective RBAC Console: Role-tailored dashboards — Reporters view their own submissions; Analysts access triage queues and incident consoles; Admins manage users.',
      'Atomic Sequential ID Engine: Predictable, human-readable identifiers generated through an atomic counter (SEC-YYYY-NNNNN for reports, INC-YYYY-NNNN for incidents).',
      'Centralized IOC Repository: Categorizes threat indicators into IP addresses, domains, file hashes, and sender addresses with confidence ratings (Low, Medium, High).',
      'Immutable Chronological Timeline: Every status update, analyst note, and IOC attachment automatically writes to an append-only timeline log with timestamps and user attribution.',
      'Real-Time SOC KPI Dashboard: Executive and operational metric tiles tracking total reports, active incidents, resolution velocity, and 30-day threat distributions.',
      'Idempotent Enterprise Seed Engine: Built-in automated seed service populating 9 realistic threat scenarios (phishing, BEC, credential theft, vendor impersonation) and 5 pre-configured incidents for demo and test evaluation.'
    ]
  },
  {
    number: '05',
    heading: 'TECHNICAL ARCHITECTURE',
    body: 'SentinelMail employs a decoupled, production-grade client-server architecture engineered for defensive boundary enforcement:',
    details: [
      'Frontend (SPA): React 19 single-page application built on Vite, styled with Tailwind CSS, utilizing React Router and custom Context API state providers (AuthContext, IncidentContext).',
      'API Gateway: Express 5 REST API enforcing Helmet HTTP headers, strict Content Security Policy, rate-limiting windows, and JWT token authentication.',
      'Persistence Layer: MongoDB with Mongoose schemas, leveraging atomic counter collections ($inc) to prevent race conditions during concurrent incident escalation.',
      'Automated E2E Testing: In-process Playwright test suite covering 10 full-lifecycle integration tests, verifying auth guards, triage workflows, and RBAC isolation.'
    ]
  },
  {
    number: '06',
    heading: 'TECHNOLOGIES USED & DEFENSIVE CONTROLS',
    body: 'SentinelMail combines a modern full-stack web architecture with proactive defensive security controls:',
    details: [
      'Frontend Stack: React 19, Vite, Tailwind CSS, Lucide React, Recharts, React Router.',
      'Backend Stack: Node.js (v22), Express 5, Mongoose 9, MongoDB 7.',
      'Authentication & Cryptography: JSON Web Tokens (HMAC-SHA256) with secure expiry, bcrypt password hashing, and role verification middleware.',
      'Defensive Controls: Helmet security headers (X-Frame-Options, X-Content-Type-Options), strict CSP (script-src \'self\'), and express-rate-limit protecting API and auth endpoints.',
      'Safe Artifact Handling: File attachment metadata stored strictly as inert strings (no execution risk); demo targets utilize RFC-invalid TLDs (.example.invalid) and RFC 5737 documentation IP ranges.'
    ]
  },
  {
    number: '07',
    heading: 'IMPLEMENTATION DETAILS',
    body: 'Engineered with strict adherence to modular software design, data validation, and fail-safe error handling:',
    details: [
      'Atomic Counter Service: Uses MongoDB findOneAndUpdate with $inc and upsert to guarantee sequential, gapless ticket numbering across calendar years without distributed locking overhead.',
      'Multi-Tier Middleware Pipeline: Requests pass through helmet -> cors -> rateLimiter -> sanitize -> auth -> rbacGuard -> schemaValidator before reaching controller business logic.',
      'Robust Zod Validation: Incoming requests are validated against strict Zod schemas, returning detailed 400 Bad Request diagnostics before touching the database.',
      'Zero-Leak Error Handling: Custom AppError class distinguishes operational errors from internal programming bugs, preventing stack traces or database schema details from leaking to clients.'
    ]
  },
  {
    number: '08',
    heading: 'SCREENSHOTS & SOC DASHBOARD',
    body: 'Visual inspection of the SentinelMail SOC console, security mailbox triage queue, and incident investigation timeline.',
    details: [
      'Security Mailbox View: Prioritized intake table with severity flags, category filters, and quick triage actions.',
      'Incident Investigation Console: Detailed incident timeline, IOC tracker with confidence pills, and investigation note feed.',
      'SOC Executive KPI Dashboard: Metric overview tracking total reports, active incidents, resolution velocity, and threat distributions.'
    ],
    hasScreenshot: true,
  },
  {
    number: '09',
    heading: 'CHALLENGES & SOLUTIONS',
    body: 'Key technical and operational challenges resolved during the implementation of SentinelMail:',
    details: [
      'Challenge — Race Conditions in Sequential IDs: High-concurrency escalations could generate duplicate incident numbers if relying on standard countDocuments().\nSolution: Engineered an atomic Counter collection using findOneAndUpdate with $inc, ensuring serialized incrementation.',
      'Challenge — Ingestion of Hostile Payload Text: User-submitted emails could contain malicious script tags, iframe injections, or crafted markup.\nSolution: Enforced deep input sanitization, inert string serialization, and a strict Content Security Policy preventing inline script execution.',
      'Challenge — Defensible, Tamper-Evident Audit Trails: Tracking analyst activities without introducing query latency or complex relational join tables.\nSolution: Designed an embedded, append-only timeline schema within the Incident model that captures author ID, action type, timestamp, and metadata on every state mutation.'
    ]
  },
  {
    number: '10',
    heading: 'WHAT I LEARNED',
    body: 'Developing SentinelMail bridged full-stack software engineering with practical cybersecurity operations:',
    details: [
      'SOC Workflow Engineering: Gained deep hands-on appreciation for incident response lifecycles, triage prioritization, and actionable IOC curation.',
      'Defensive Software Architecture: Implemented real-world authorization models, multi-stage middleware guards, and resilient sanitization strategies.',
      'End-to-End Reliability Testing: Mastered automated integration testing with Playwright to verify that authentication and permission boundaries hold under adversarial conditions.'
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
const SentinelMailCase: React.FC<SentinelMailCaseProps> = ({ isOpen, onClose }) => {
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
            className="sentinelmail-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            className="sentinelmail-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="SentinelMail Case Study"
          >
            {/* close button */}
            <motion.button
              className="sentinelmail-panel__close"
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
            <div className="sentinelmail-panel__scroll" ref={scrollRef}>
              {/* hero */}
              <motion.div
                className="sentinelmail-hero"
                variants={heroVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="sentinelmail-hero__label">TECHNICAL CASE STUDY</span>
                <h1 className="sentinelmail-hero__title">SENTINELMAIL</h1>
                <p className="sentinelmail-hero__subtitle">
                  Security Mailbox Triage &amp; Incident Response Platform
                </p>
                <div className="sentinelmail-hero__line" />
              </motion.div>

              {/* overview block */}
              <motion.div
                className="sentinelmail-overview"
                variants={sectionItemVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="sentinelmail-overview__text">
                  SentinelMail is a full-stack security operations platform engineered for suspicious email triage and incident response. It replaces ad-hoc mailbox spreadsheets with structured email intake, analyst triage queues, one-click incident escalation (INC-YYYY-NNNN), IOC extraction with confidence scoring, investigation notes, and multi-tier role-based access control.
                </p>
              </motion.div>

              {/* sections */}
              <motion.div
                className="sentinelmail-sections"
                variants={sectionContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {caseSections.map((section) => (
                  <motion.div
                    className="sentinelmail-section"
                    key={section.number}
                    variants={sectionItemVariants}
                  >
                    <div className="sentinelmail-section__header">
                      <span className="sentinelmail-section__number">{section.number}</span>
                      <h2 className="sentinelmail-section__heading">{section.heading}</h2>
                    </div>

                    <div className="sentinelmail-section__divider" />

                    <p className="sentinelmail-section__body">{section.body}</p>

                    {section.details && (
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: '1.25rem 0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.65rem',
                        }}
                      >
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
                              gap: '0.75rem',
                            }}
                          >
                            <span style={{ color: '#A31C1B', fontWeight: 600 }}>›</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.hasScreenshot && (
                      <div className="sentinelmail-section__screenshot">
                        <div className="sentinelmail-section__screenshot-inner">
                          <img
                            src="/project-sentinelmail.jpg"
                            alt="SentinelMail Security Operations Dashboard Interface"
                            className="sentinelmail-section__screenshot-img"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* footer */}
              <div className="sentinelmail-footer">
                <div className="sentinelmail-footer__line" />
                <button
                  type="button"
                  className="sentinelmail-footer__back"
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

export default SentinelMailCase;

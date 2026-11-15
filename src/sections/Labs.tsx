import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  cyberLabsData,
  LAB_CATEGORIES,
  LabItem,
  LabCategoryType,
  LabStatus,
} from '../data/cyberLabs';
import './Labs.css';

// ── Category SVG Icons ──
const categoryIcons: Record<LabCategoryType, React.ReactNode> = {
  NETWORK: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="32" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="32" cy="32" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="20" y1="11" x2="10" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="11" x2="30" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="11" y1="32" x2="29" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  ),
  WEB: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="20" cy="20" rx="7" ry="14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="9" y1="12" x2="31" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      <line x1="9" y1="28" x2="31" y2="28" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
    </svg>
  ),
  LINUX: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="6" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <text x="10" y="23" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">$_</text>
      <line x1="16" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="28" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  FORENSICS: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="23.5" y1="23.5" x2="33" y2="33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="17" r="4" stroke="currentColor" strokeWidth="0.75" fill="none" opacity="0.4" />
    </svg>
  ),
  CLOUD: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 28C8.68629 28 6 25.3137 6 22C6 19.1997 7.91896 16.8648 10.5 16.1707C10.5 16.1138 10.5 16.0571 10.5 16C10.5 11.5817 14.0817 8 18.5 8C22.1463 8 25.2213 10.4511 26.1653 13.7812C26.7717 13.5969 27.3958 13.5 28 13.5C31.3137 13.5 34 16.1863 34 19.5C34 22.8137 31.3137 25.5 28 25.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <line x1="12" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="15" y1="31" x2="25" y2="31" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    </svg>
  ),
  CTF: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L20 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 6L30 12L20 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <rect x="16" y="18" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="20" y1="21" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 28C13 28 15 25 20 25C25 25 27 28 27 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="12" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const Labs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Navigation states
  const [selectedCategory, setSelectedCategory] = useState<LabCategoryType | null>(null);
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | LabStatus>('ALL');

  // Scroll helper to smoothly keep the section in view
  const scrollToSection = () => {
    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId: LabCategoryType) => {
    setSelectedCategory(catId);
    setSelectedLabId(null);
    setStatusFilter('ALL');
    scrollToSection();
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedLabId(null);
    scrollToSection();
  };

  const handleSelectLab = (labId: string) => {
    setSelectedLabId(labId);
    scrollToSection();
  };

  const handleBackToList = () => {
    setSelectedLabId(null);
    scrollToSection();
  };

  // Active category metadata
  const activeCategoryMeta = LAB_CATEGORIES.find((c) => c.id === selectedCategory);

  // Labs belonging to active category
  const categoryLabs = selectedCategory
    ? cyberLabsData.filter((lab) => lab.category === selectedCategory)
    : [];

  // Filtered labs by status
  const filteredLabs = categoryLabs.filter((lab) => {
    if (statusFilter === 'ALL') return true;
    return lab.status === statusFilter;
  });

  // Active selected lab for detail view
  const selectedLab = selectedLabId
    ? cyberLabsData.find((lab) => lab.id === selectedLabId)
    : null;

  // Counts for active category
  const completedCount = categoryLabs.filter((l) => l.status === 'COMPLETED').length;
  const inProgressCount = categoryLabs.filter((l) => l.status === 'IN PROGRESS').length;
  const plannedCount = categoryLabs.filter((l) => l.status === 'PLANNED').length;

  return (
    <section ref={sectionRef} className="labs-section" id="labs">
      <div className="labs-container">
        {/* ── Section Header ── */}
        <motion.div
          className="labs-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="labs-section-number">05</span>
          <h2 className="labs-title">CYBER LABS</h2>
          <p className="labs-subtitle">
            Hands-on learning through practical labs, exercises and threat experiments.
          </p>
          <div className="labs-title-divider" />
        </motion.div>

        {/* ── Dynamic Content Switcher ── */}
        <AnimatePresence mode="wait">
          {/* VIEW 1: CATEGORIES OVERVIEW */}
          {!selectedCategory && (
            <motion.div
              key="categories-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="labs-grid">
                {LAB_CATEGORIES.map((cat) => {
                  const labsInCat = cyberLabsData.filter((l) => l.category === cat.id);
                  const inProg = labsInCat.filter((l) => l.status === 'IN PROGRESS').length;
                  const compl = labsInCat.filter((l) => l.status === 'COMPLETED').length;
                  const plan = labsInCat.filter((l) => l.status === 'PLANNED').length;

                  return (
                    <div
                      key={cat.id}
                      className="labs-card"
                      onClick={() => handleSelectCategory(cat.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectCategory(cat.id);
                        }
                      }}
                      aria-label={`Open ${cat.name} labs`}
                    >
                      <div className="labs-card-inner">
                        <div className="labs-card-icon">{categoryIcons[cat.id]}</div>
                        <h3 className="labs-card-name">{cat.name}</h3>
                        <p className="labs-card-short-desc">{cat.subtitle}</p>
                        <div className="labs-card-divider" />

                        <div className="labs-card-status">
                          <span className="labs-badge-pill">
                            {labsInCat.length} {labsInCat.length === 1 ? 'Lab' : 'Labs'}
                          </span>
                          <span className="labs-status-summary">
                            {compl > 0 && `${compl} Completed · `}
                            {inProg > 0 && `${inProg} In Progress · `}
                            {plan > 0 && `${plan} Planned`}
                          </span>
                        </div>

                        <div className="labs-card-hover-action">
                          <span>View Labs</span>
                          <span className="labs-card-arrow">→</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <motion.p
                className="labs-footer-note"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Click any category to browse exercises, active investigations, and planned topics.
              </motion.p>
            </motion.div>
          )}

          {/* VIEW 2: CATEGORY LAB LISTING */}
          {selectedCategory && !selectedLabId && activeCategoryMeta && (
            <motion.div
              key={`category-list-${selectedCategory}`}
              className="labs-subview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Breadcrumb & Back Button */}
              <div className="labs-subview-nav">
                <button
                  type="button"
                  className="labs-back-btn"
                  onClick={handleBackToCategories}
                >
                  <span className="labs-back-arrow">←</span>
                  <span>All Categories</span>
                </button>
                <div className="labs-breadcrumb-tag">
                  CATEGORY: <strong>{activeCategoryMeta.name}</strong>
                </div>
              </div>

              {/* Category Header Banner */}
              <div className="labs-category-banner">
                <div className="labs-category-banner-icon">
                  {categoryIcons[activeCategoryMeta.id]}
                </div>
                <div className="labs-category-banner-text">
                  <h3 className="labs-category-banner-title">
                    {activeCategoryMeta.name} LABS
                  </h3>
                  <p className="labs-category-banner-desc">
                    {activeCategoryMeta.description}
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="labs-filter-bar">
                <div className="labs-filter-buttons">
                  <button
                    type="button"
                    className={`labs-filter-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('ALL')}
                  >
                    All ({categoryLabs.length})
                  </button>
                  <button
                    type="button"
                    className={`labs-filter-btn ${statusFilter === 'COMPLETED' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('COMPLETED')}
                  >
                    Completed ({completedCount})
                  </button>
                  <button
                    type="button"
                    className={`labs-filter-btn ${statusFilter === 'IN PROGRESS' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('IN PROGRESS')}
                  >
                    In Progress ({inProgressCount})
                  </button>
                  <button
                    type="button"
                    className={`labs-filter-btn ${statusFilter === 'PLANNED' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('PLANNED')}
                  >
                    Planned ({plannedCount})
                  </button>
                </div>
              </div>

              {/* Lab Cards List */}
              <div className="labs-items-grid">
                {filteredLabs.length === 0 ? (
                  <div className="labs-empty-state">
                    <p>No labs found matching this status filter.</p>
                    <button
                      type="button"
                      className="labs-pill-btn-small"
                      onClick={() => setStatusFilter('ALL')}
                    >
                      Show All Labs
                    </button>
                  </div>
                ) : (
                  filteredLabs.map((lab) => (
                    <div
                      key={lab.id}
                      className="lab-item-card"
                      onClick={() => handleSelectLab(lab.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectLab(lab.id);
                        }
                      }}
                    >
                      <div className="lab-item-header">
                        <span className={`lab-status-badge lab-status-badge--${lab.status.toLowerCase().replace(' ', '-')}`}>
                          {lab.status}
                        </span>
                        {lab.difficulty && (
                          <span className="lab-difficulty-badge">{lab.difficulty}</span>
                        )}
                        {lab.date && <span className="lab-date-tag">{lab.date}</span>}
                      </div>

                      <h4 className="lab-item-title">{lab.title}</h4>
                      <p className="lab-item-summary">{lab.summary}</p>

                      <div className="lab-item-tools">
                        {lab.tools.map((tool) => (
                          <span key={tool} className="lab-tool-tag">
                            {tool}
                          </span>
                        ))}
                      </div>

                      <div className="lab-item-footer">
                        <span className="lab-item-action">
                          View Lab Details <span className="lab-item-action-arrow">→</span>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* VIEW 3: LAB DETAIL VIEW */}
          {selectedCategory && selectedLabId && selectedLab && (
            <motion.div
              key={`lab-detail-${selectedLabId}`}
              className="labs-subview labs-detail-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Back Bar */}
              <div className="labs-subview-nav">
                <button
                  type="button"
                  className="labs-back-btn"
                  onClick={handleBackToList}
                >
                  <span className="labs-back-arrow">←</span>
                  <span>Back to {selectedLab.category} Labs</span>
                </button>

                <button
                  type="button"
                  className="labs-back-btn labs-back-btn--subtle"
                  onClick={handleBackToCategories}
                >
                  <span>All Categories</span>
                </button>
              </div>

              {/* Lab Detail Card */}
              <div className="lab-detail-container">
                {/* Notice banner for sample templates */}
                {selectedLab.isSamplePlaceholder && (
                  <div className="lab-placeholder-notice">
                    <span className="lab-notice-icon">ℹ</span>
                    <span>
                      <strong>Sample Lab Template:</strong> Structured template for Rakesh&apos;s practical cybersecurity lab logs, configurations, and write-ups.
                    </span>
                  </div>
                )}

                {/* Detail Header */}
                <div className="lab-detail-header">
                  <div className="lab-detail-meta-row">
                    <span className={`lab-status-badge lab-status-badge--${selectedLab.status.toLowerCase().replace(' ', '-')}`}>
                      {selectedLab.status}
                    </span>
                    <span className="lab-category-pill">{selectedLab.category}</span>
                    {selectedLab.difficulty && (
                      <span className="lab-difficulty-badge">{selectedLab.difficulty}</span>
                    )}
                    {selectedLab.date && (
                      <span className="lab-date-tag">{selectedLab.date}</span>
                    )}
                  </div>

                  <h3 className="lab-detail-title">{selectedLab.title}</h3>
                  <p className="lab-detail-lead">{selectedLab.summary}</p>
                </div>

                <div className="lab-detail-divider" />

                {/* Lab Objectives */}
                {selectedLab.objectives && selectedLab.objectives.length > 0 && (
                  <div className="lab-detail-section">
                    <h5 className="lab-section-heading">LAB OBJECTIVES & METHODOLOGY</h5>
                    <ul className="lab-objectives-list">
                      {selectedLab.objectives.map((obj, i) => (
                        <li key={i} className="lab-objective-item">
                          <span className="lab-objective-bullet">▸</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lab Overview Description */}
                <div className="lab-detail-section">
                  <h5 className="lab-section-heading">DETAILED LAB OVERVIEW</h5>
                  <p className="lab-description-text">{selectedLab.description}</p>
                </div>

                {/* Tools & Environment */}
                <div className="lab-detail-section">
                  <h5 className="lab-section-heading">TOOLS & ENVIRONMENT</h5>
                  <div className="lab-tools-list">
                    {selectedLab.tools.map((t) => (
                      <span key={t} className="lab-tool-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Takeaways */}
                {selectedLab.keyTakeaways && selectedLab.keyTakeaways.length > 0 && (
                  <div className="lab-detail-section">
                    <h5 className="lab-section-heading">KEY SECURITY TAKEAWAYS</h5>
                    <ul className="lab-takeaways-list">
                      {selectedLab.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="lab-takeaway-item">
                          <span className="lab-takeaway-check">✓</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Screenshots & Artifacts Section */}
                <div className="lab-detail-section">
                  <h5 className="lab-section-heading">DOCUMENTATION & SCREENSHOTS</h5>
                  {selectedLab.screenshots && selectedLab.screenshots.length > 0 ? (
                    <div className="lab-screenshots-grid">
                      {selectedLab.screenshots.map((shot, idx) => (
                        <div key={idx} className="lab-screenshot-card">
                          {shot.url ? (
                            <img
                              src={shot.url}
                              alt={shot.caption}
                              className="lab-screenshot-img"
                            />
                          ) : (
                            <div className="lab-terminal-mockup">
                              <div className="lab-terminal-bar">
                                <span className="lab-term-dot red" />
                                <span className="lab-term-dot yellow" />
                                <span className="lab-term-dot green" />
                                <span className="lab-terminal-title">lab-session://evidence-artifact-{idx + 1}</span>
                              </div>
                              <pre className="lab-terminal-content">
                                <code>{shot.placeholderText || `$ cat /var/log/audit.log | grep "SECURITY_EVENT"`}</code>
                              </pre>
                            </div>
                          )}
                          <p className="lab-screenshot-caption">{shot.caption}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="lab-terminal-mockup">
                      <div className="lab-terminal-bar">
                        <span className="lab-term-dot red" />
                        <span className="lab-term-dot yellow" />
                        <span className="lab-term-dot green" />
                        <span className="lab-terminal-title">terminal://lab-evidence</span>
                      </div>
                      <pre className="lab-terminal-content">
                        <code>[Artifact / Screenshot Placeholder — Add image URL in src/data/cyberLabs.ts]</code>
                      </pre>
                      <p className="lab-screenshot-caption">Screenshots will be attached upon lab completion.</p>
                    </div>
                  )}
                </div>

                {/* Bottom Back Button */}
                <div className="lab-detail-bottom-actions">
                  <button
                    type="button"
                    className="labs-action-btn-primary"
                    onClick={handleBackToList}
                  >
                    <span>← Return to {selectedLab.category} Labs</span>
                  </button>
                  <button
                    type="button"
                    className="labs-action-btn-secondary"
                    onClick={handleBackToCategories}
                  >
                    <span>Browse All Categories</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Labs;

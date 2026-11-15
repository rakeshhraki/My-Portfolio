import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';


interface ContactLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const ArrowIcon: React.FC = () => (
  <svg
    className="contact-link-arrow"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const contactLinks: ContactLink[] = [
  {
    label: 'itzrakesh003@gmail.com',
    href: 'mailto:itzrakesh003@gmail.com',
    icon: <EmailIcon />,
  },
  {
    label: 'LinkedIn Profile',
    href: 'https://www.linkedin.com/in/rakeshh003/',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub Profile',
    href: 'https://github.com/rakeshhraki',
    icon: <GitHubIcon />,
  },
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <motion.span
          className="contact-section-number"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          11
        </motion.span>

        <motion.h2
          className="contact-heading"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          LET&rsquo;S CONNECT<span className="contact-heading-dot">.</span>
        </motion.h2>

        <motion.p
          className="contact-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Interested in cybersecurity, technology, collaboration or opportunities? Let&rsquo;s connect.
        </motion.p>

        <motion.div
          className="contact-links"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              className="contact-link-item"
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              data-cursor="pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ x: 6 }}
            >
              <span className="contact-link-icon">{link.icon}</span>
              <span className="contact-link-label">{link.label}</span>
              <ArrowIcon />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="contact-bottom-line"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </section>
  );
};

export default Contact;

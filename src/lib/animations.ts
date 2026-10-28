import type { Variants } from 'framer-motion';

// ============================================================
// RAKESH S. — Cybersecurity Portfolio
// Framer Motion Animation Variants
// ============================================================

// ────────────────────────────────────────────────────────────
// § Fade Variants
// ────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo
    },
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ────────────────────────────────────────────────────────────
// § Stagger Container
// ────────────────────────────────────────────────────────────

/**
 * Creates a stagger container variant with configurable delay between children.
 * @param staggerDelay — delay in seconds between each child. Default: 0.1
 * @param delayChildren — initial delay before stagger starts. Default: 0
 */
export const staggerContainer = (
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// ────────────────────────────────────────────────────────────
// § Mask Reveal (clipPath)
// ────────────────────────────────────────────────────────────

export const maskReveal: Variants = {
  hidden: {
    clipPath: 'inset(0 100% 0 0)',
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1.0,
      ease: [0.85, 0, 0.15, 1], // ease-in-out-circ
    },
  },
};

export const maskRevealVertical: Variants = {
  hidden: {
    clipPath: 'inset(100% 0 0 0)',
  },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 1.0,
      ease: [0.85, 0, 0.15, 1],
    },
  },
};

// ────────────────────────────────────────────────────────────
// § Scale In
// ────────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ────────────────────────────────────────────────────────────
// § Slide Up
// ────────────────────────────────────────────────────────────

export const slideUp: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ────────────────────────────────────────────────────────────
// § Letter Animation (for character-by-character text reveal)
// ────────────────────────────────────────────────────────────

export const letterContainer: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const letterAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ────────────────────────────────────────────────────────────
// § Hero Sequence Variants (staggered hero load)
// ────────────────────────────────────────────────────────────

export const heroSequence = {
  container: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  } as Variants,

  tagline: {
    hidden: {
      opacity: 0,
      y: 20,
      letterSpacing: '0.1em',
    },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: '0.35em',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as Variants,

  title: {
    hidden: {
      opacity: 0,
      y: 80,
      clipPath: 'inset(100% 0 0 0)',
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0 0 0)',
      transition: {
        duration: 1.0,
        ease: [0.85, 0, 0.15, 1],
      },
    },
  } as Variants,

  description: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      },
    },
  } as Variants,

  cta: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      },
    },
  } as Variants,

  decoration: {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as Variants,

  line: {
    hidden: {
      scaleX: 0,
      originX: 0,
    },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.0,
        ease: [0.85, 0, 0.15, 1],
      },
    },
  } as Variants,

  scrollIndicator: {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 1.5,
      },
    },
  } as Variants,
};

// ────────────────────────────────────────────────────────────
// § Section Reveal
// ────────────────────────────────────────────────────────────

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ────────────────────────────────────────────────────────────
// § Additional Utility Variants
// ────────────────────────────────────────────────────────────

/** Fade in with no movement */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/** Horizontal line draw animation */
export const drawLine: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.0,
      ease: [0.85, 0, 0.15, 1],
    },
  },
};

/** Card hover animation (for use with whileHover) */
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Rotate in from slight angle */
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -5,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Number counter reveal (for section numbers) */
export const numberReveal: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Nav item animation */
export const navItem: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Mobile menu slide */
export const mobileMenu: Variants = {
  closed: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.85, 0, 0.15, 1],
    },
  },
  open: {
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

/** Tooltip / popover appear */
export const tooltipAppear: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

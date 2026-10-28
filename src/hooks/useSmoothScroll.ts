import { useCallback } from 'react';

/**
 * Options for the smooth scroll behavior.
 */
interface UseSmoothScrollOptions {
  /** Vertical offset in pixels to account for fixed headers. Default: 80 */
  offset?: number;
  /** Scroll behavior. Default: 'smooth' */
  behavior?: ScrollBehavior;
  /** Duration in ms for the manual scroll fallback (when native smooth scroll isn't ideal). Default: 800 */
  duration?: number;
}

/**
 * Easing function: ease-in-out cubic
 */
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Custom hook that provides a smooth-scrolling function for navigating
 * to sections identified by their element ID.
 *
 * @param options - Configuration for offset, behavior, etc.
 * @returns An object with `scrollToSection` function.
 *
 * @example
 * ```tsx
 * const { scrollToSection } = useSmoothScroll({ offset: 100 });
 * <button onClick={() => scrollToSection('about')}>Go to About</button>
 * ```
 */
export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { offset = 80, behavior = 'smooth', duration = 800 } = options;

  /**
   * Scrolls smoothly to the element with the given ID.
   * The ID should NOT include the '#' prefix.
   *
   * @param elementId - The ID of the target element (without '#').
   */
  const scrollToSection = useCallback(
    (elementId: string) => {
      // Strip leading '#' if accidentally included
      const cleanId = elementId.replace(/^#/, '');
      const element = document.getElementById(cleanId);

      if (!element) {
        console.warn(
          `[useSmoothScroll] Element with id "${cleanId}" not found.`
        );
        return;
      }

      const targetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - offset;

      // Check for native smooth scroll support and user preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        // Instant scroll for users who prefer reduced motion
        window.scrollTo({
          top: targetPosition,
          behavior: 'auto',
        });
        return;
      }

      if ('scrollBehavior' in document.documentElement.style && behavior === 'smooth') {
        // Use native smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      } else {
        // Manual smooth scroll fallback with easing
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        function animation(currentTime: number) {
          if (startTime === null) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          window.scrollTo(0, startPosition + distance * easedProgress);

          if (progress < 1) {
            requestAnimationFrame(animation);
          }
        }

        requestAnimationFrame(animation);
      }

      // Update URL hash without triggering scroll
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${cleanId}`);
      }
    },
    [offset, behavior, duration]
  );

  /**
   * Scrolls to the top of the page.
   */
  const scrollToTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, []);

  return { scrollToSection, scrollToTop };
}

export default useSmoothScroll;

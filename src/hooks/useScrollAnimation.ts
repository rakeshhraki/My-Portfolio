import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Options for the useScrollAnimation hook.
 */
interface UseScrollAnimationOptions {
  /** Intersection Observer threshold (0–1). Default: 0.15 */
  threshold?: number;
  /** Root margin string, e.g. "0px 0px -100px 0px". Default: "0px 0px -60px 0px" */
  rootMargin?: string;
  /** If true, the element can re-animate when it leaves and re-enters the viewport. Default: false */
  triggerOnce?: boolean;
  /** Delay in ms before setting isVisible to true after intersection. Default: 0 */
  delay?: number;
}

/**
 * Custom hook that uses the Intersection Observer API to detect when
 * an element enters the viewport, enabling scroll-triggered animations.
 *
 * @param options - Configuration for threshold, rootMargin, etc.
 * @returns An object with `ref` (to attach to the target element) and `isVisible` (boolean).
 *
 * @example
 * ```tsx
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
 * return (
 *   <div ref={ref} className={isVisible ? 'animate-fadeUp' : 'opacity-0'}>
 *     Content
 *   </div>
 * );
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }

          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          // Reset visibility when element leaves viewport (re-triggerable mode)
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setIsVisible(false);
        }
      });
    },
    [triggerOnce, delay]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for Intersection Observer support
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: just make it visible immediately
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isVisible };
}

export default useScrollAnimation;

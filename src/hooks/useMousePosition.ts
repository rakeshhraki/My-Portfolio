import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Mouse position data returned by useMousePosition.
 */
interface MousePosition {
  /** Raw X coordinate (pixels from left edge of viewport). */
  x: number;
  /** Raw Y coordinate (pixels from top edge of viewport). */
  y: number;
  /** Normalized X: -1 (left edge) to 1 (right edge) relative to viewport center. */
  normalizedX: number;
  /** Normalized Y: -1 (top edge) to 1 (bottom edge) relative to viewport center. */
  normalizedY: number;
}

/**
 * Options for useMousePosition.
 */
interface UseMousePositionOptions {
  /** If true, the hook will not attach event listeners. Default: false */
  disabled?: boolean;
  /** Smoothing factor (0–1). Lower = smoother/slower tracking. Default: 1 (no smoothing) */
  smoothing?: number;
}

/**
 * Custom hook that tracks the mouse position across the viewport.
 * Returns both raw pixel coordinates and normalized values (-1 to 1)
 * relative to the viewport center, useful for parallax and cursor effects.
 *
 * @param options - Optional configuration
 * @returns MousePosition object
 *
 * @example
 * ```tsx
 * const { normalizedX, normalizedY } = useMousePosition();
 * const parallaxStyle = {
 *   transform: `translate(${normalizedX * 20}px, ${normalizedY * 20}px)`,
 * };
 * ```
 */
export function useMousePosition(
  options: UseMousePositionOptions = {}
): MousePosition {
  const { disabled = false, smoothing = 1 } = options;

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const lerp = useCallback(
    (start: number, end: number, factor: number): number => {
      return start + (end - start) * factor;
    },
    []
  );

  const updatePosition = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (smoothing < 1) {
      currentRef.current.x = lerp(
        currentRef.current.x,
        targetRef.current.x,
        smoothing
      );
      currentRef.current.y = lerp(
        currentRef.current.y,
        targetRef.current.y,
        smoothing
      );
    } else {
      currentRef.current.x = targetRef.current.x;
      currentRef.current.y = targetRef.current.y;
    }

    const x = currentRef.current.x;
    const y = currentRef.current.y;

    const normalizedX = vw > 0 ? (x / vw) * 2 - 1 : 0;
    const normalizedY = vh > 0 ? (y / vh) * 2 - 1 : 0;

    setPosition({
      x: Math.round(x),
      y: Math.round(y),
      normalizedX: parseFloat(normalizedX.toFixed(4)),
      normalizedY: parseFloat(normalizedY.toFixed(4)),
    });

    if (smoothing < 1) {
      const dx = Math.abs(targetRef.current.x - currentRef.current.x);
      const dy = Math.abs(targetRef.current.y - currentRef.current.y);
      if (dx > 0.1 || dy > 0.1) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    }
  }, [smoothing, lerp]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;

      if (smoothing < 1) {
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(updatePosition);
        }
      } else {
        updatePosition();
      }
    },
    [smoothing, updatePosition]
  );

  useEffect(() => {
    if (disabled) return;

    // Check if we're in a browser environment with mouse support
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isTouch) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [disabled, handleMouseMove]);

  return position;
}

export default useMousePosition;

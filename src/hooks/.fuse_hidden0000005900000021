'use client';

import { useEffect, useState, useRef } from 'react';

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCountUp(
  end: number,
  duration: number = 2000,
  start: number = 0,
  enabled: boolean = true
): number {
  const [current, setCurrent] = useState(start);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCurrent(start);
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const value = start + (end - start) * easedProgress;

      setCurrent(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, start, enabled]);

  return current;
}

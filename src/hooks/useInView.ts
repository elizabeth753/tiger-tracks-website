'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  /** Fallback delay (ms) - element becomes visible even if observer fails */
  fallbackDelay?: number;
}

export function useInView({
  threshold = 0.15,
  triggerOnce = true,
  fallbackDelay = 800,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback timer: ensure content becomes visible even if IO never fires
    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, fallbackDelay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer);
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce, fallbackDelay]);

  return { ref, inView };
}

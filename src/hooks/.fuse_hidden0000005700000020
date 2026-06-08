'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView({ threshold = 0.15, triggerOnce = true }: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce]);

  return { ref, inView };
}

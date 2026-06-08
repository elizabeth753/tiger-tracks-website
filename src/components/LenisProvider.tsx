'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Global smooth-scroll provider using Lenis.
 * Applies momentum-based scrolling on desktop only.
 * Disabled on mobile/touch devices and when prefers-reduced-motion is active.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip on mobile / touch devices
    const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      touchMultiplier: 0, // disable on touch
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Remove native smooth-scroll so Lenis takes over
    document.documentElement.style.scrollBehavior = 'auto';

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
}

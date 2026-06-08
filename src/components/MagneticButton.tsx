'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  /** Pixel radius within which the magnetic pull activates */
  attractRadius?: number;
  /** Strength multiplier for the container pull (0-1) */
  strength?: number;
  /** Parallax text offset multiplier (higher = text moves faster than container) */
  textParallax?: number;
}

/**
 * Magnetic CTA button wrapper.
 *
 * When the cursor enters within `attractRadius` px, the button translates
 * toward the cursor on X/Y. Inner text moves at a faster rate (`textParallax`)
 * to create a depth-parallax effect. Uses Framer Motion spring physics.
 */
export function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  target,
  rel,
  onClick,
  attractRadius = 50,
  strength = 0.35,
  textParallax = 1.6,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring configs for that expensive, decelerating feel
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const textSpringConfig = { stiffness: 200, damping: 18, mass: 0.08 };

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const textX = useSpring(0, textSpringConfig);
  const textY = useSpring(0, textSpringConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Pull strength falls off linearly within attract radius
      const pull = Math.max(0, 1 - distance / (rect.width / 2 + attractRadius));

      x.set(dx * strength * pull);
      y.set(dy * strength * pull);
      textX.set(dx * strength * textParallax * pull);
      textY.set(dy * strength * textParallax * pull);
    },
    [attractRadius, strength, textParallax, x, y, textX, textY],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    scale.set(1.05);
  }, [scale]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
    scale.set(1);
  }, [x, y, textX, textY, scale]);

  const MotionComponent = as === 'a' ? motion.a : motion.button;

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, scale }}
      className="inline-block will-change-transform"
    >
      <MotionComponent
        href={as === 'a' ? href : undefined}
        target={as === 'a' ? target : undefined}
        rel={as === 'a' ? rel : undefined}
        onClick={onClick}
        className={className}
        data-magnetic="true"
      >
        <motion.span
          style={{ x: textX, y: textY }}
          className="relative z-10 inline-flex items-center gap-2 will-change-transform"
        >
          {children}
        </motion.span>
      </MotionComponent>
    </motion.div>
  );
}

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Results', href: '/results' },
  { label: 'TT AI-Tools', href: '/ai-tools' },
  { label: 'Wayfinder AI', href: '/wayfinder' },
  { label: 'PE & VC Partners', href: '/pe-vc' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Company', href: '/company' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic-pull CTA
  const handleCtaMouse = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.15;
    const dy = (e.clientY - cy) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const handleCtaLeave = useCallback(() => {
    const el = ctaRef.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/50 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-black/50 backdrop-blur-md border-b border-transparent'
      }`}
    >
      {/* Scroll-progress gradient indicator bar */}
      <div
        className="absolute bottom-0 left-0 h-px"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #5BA4A4, #E8793A)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo with hover glow */}
        <Link
          href="/"
          className="group relative flex items-center gap-2.5 font-inter text-xl font-bold tracking-tight text-white transition-all duration-300 hover:text-white/70"
        >
          {/* SVG tiger mark */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-tt-teal transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(91,164,164,0.5)]">
            <path
              d="M4 4l4 6h8l4-6M8 10l-2 10h12l-2-10M10 14h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(91,164,164,0.3)]">TIGER TRACKS</span>
          <span className="absolute inset-0 -m-2 rounded-lg bg-tt-teal/0 group-hover:bg-tt-teal/5 transition-colors duration-300" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-tt-gray-400 transition-colors duration-300 hover:text-white group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-tt-teal to-tt-teal/50 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Magnetic-pull CTA */}
          <Link
            ref={ctaRef}
            href="/get-started"
            onMouseMove={handleCtaMouse}
            onMouseLeave={handleCtaLeave}
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-tt-orange to-tt-orange-dark px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-tt-orange/20 active:translate-y-0"
            style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease' }}
          >
            <span className="relative z-10">Request a Strategic Diagnostic</span>
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              style={{
                transform: 'translateX(-100%)',
                animation: 'shimmer 3s cubic-bezier(0.16, 1, 0.3, 1) infinite',
                animationDelay: '1s',
              }}
            />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 lg:hidden p-2 -m-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0 scale-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile slide-out panel */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-tt-black/95 backdrop-blur-xl border-l border-white/[0.06] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 px-8 pt-24">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg text-tt-gray-300 transition-all duration-300 hover:text-white hover:translate-x-2 py-3 border-b border-white/5"
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-started"
            onClick={() => setMobileOpen(false)}
            className="mt-6 btn-primary text-center justify-center"
          >
            Request a Strategic Diagnostic
          </Link>
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}

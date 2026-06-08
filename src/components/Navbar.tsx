'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagneticButton } from '@/components/MagneticButton';

const navLinks = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Results', href: '/results' },
  { label: 'PE & VC Partners', href: '/pe-vc' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Company', href: '/company' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
        {/* Logo */}
        <Link
          href="/"
          className="group relative flex items-center"
        >
          <Image
            src="/images/TT.LOGO-02.png"
            alt="Tiger Tracks"
            width={160}
            height={100}
            priority
            className="h-9 w-auto md:h-11 object-contain transition-all duration-300 brightness-0 invert group-hover:opacity-80 group-hover:drop-shadow-[0_0_12px_rgba(91,164,164,0.4)]"
          />
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
          <MagneticButton
            as="a"
            href="/get-started"
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-tt-orange to-tt-orange-dark px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-tt-orange/20 active:translate-y-0 inline-block"
            attractRadius={60}
            strength={0.3}
            textParallax={1.8}
          >
            Request a Strategic Diagnostic
          </MagneticButton>
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

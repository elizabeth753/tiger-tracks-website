'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ================================================================
   DATA
   ================================================================ */

const companyLinks = [
  { label: 'Company', href: '/company' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
];

const solutionLinks = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Results', href: '/results' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'PE & VC Partners', href: '/pe-vc' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const offices = [
  { city: 'Palm Beach', tz: 'America/New_York' },
  { city: 'NYC', tz: 'America/New_York' },
  { city: 'Chicago', tz: 'America/Chicago' },
  { city: 'LA', tz: 'America/Los_Angeles' },
] as const;

/* ================================================================
   LIVE CLOCK
   ================================================================ */

function LiveClock({ city, tz }: { city: string; tz: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(formatted);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tt-gray-500">
        {city}
      </span>
      <span
        className="text-lg sm:text-xl font-mono font-light text-tt-gray-300 tabular-nums tracking-wider"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {time || ' '}
      </span>
    </div>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */

export function Footer() {
  return (
    <footer className="relative bg-tt-black overflow-hidden">
      {/* Top gradient divider */}
      <div className="section-divider-glow" />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(91,164,164,0.03) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ---- Live Clocks ---- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16">
        <div className="flex items-center justify-center gap-8 sm:gap-16">
          {offices.map((o) => (
            <LiveClock key={o.city} city={o.city} tz={o.tz} />
          ))}
        </div>

        {/* Thin divider below clocks */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ---- Navigation Grid ---- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {/* Col 1: Logo & tagline */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="group inline-block">
              <Image
                src="/images/TT.LOGO-02.png"
                alt="Tiger Tracks"
                width={160}
                height={100}
                className="h-10 w-auto object-contain brightness-0 invert transition-all duration-300 group-hover:opacity-80 group-hover:drop-shadow-[0_0_12px_rgba(91,164,164,0.4)]"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-tt-gray-500">
              Performance marketing built by ex-Google leaders.
            </p>
            <div className="mt-6 flex gap-4">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/tigertracks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/tigertracks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* X */}
              <a
                href="https://x.com/tigertracks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                aria-label="X (Twitter)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tt-gray-400">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tt-gray-400">
              Solutions
            </h4>
            <ul className="mt-4 space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tt-gray-400">
              Connect
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="mailto:info@tigertracks.ai"
                  className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                >
                  info@tigertracks.ai
                </a>
              </li>
              <li>
                <Link
                  href="/get-started"
                  className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                >
                  Request a Diagnostic
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-tt-gray-400">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tt-gray-600 transition-colors duration-300 hover:text-tt-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---- Massive Wordmark ---- */}
      <div className="relative z-10 overflow-hidden select-none" aria-hidden="true">
        <div
          className="w-full text-center font-extrabold leading-none"
          style={{
            fontSize: 'clamp(6rem, 15vw, 18rem)',
            letterSpacing: '-0.04em',
            color: 'rgba(30, 41, 59, 0.35)',
            lineHeight: 0.85,
            paddingBottom: '0.05em',
          }}
        >
          TIGER TRACKS
        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className="relative z-10 border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-tt-gray-600">
            &copy; 2026 Tiger Tracks. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-tt-gray-600">
            <span>Inc. 5000</span>
            <span className="h-3 w-px bg-tt-gray-800" />
            <span>Meta Business Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

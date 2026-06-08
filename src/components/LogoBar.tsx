'use client';

import { clientLogos } from './ClientLogos';

export function LogoBar() {
  return (
    <div className="bg-tt-black py-12">
      <p className="mb-8 text-center text-sm uppercase tracking-widest text-tt-gray-500">
        Trusted by marketing teams at
      </p>

      {/* Scroll container */}
      <div className="relative overflow-hidden">
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-tt-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-tt-black to-transparent" />

        {/* Scrolling row */}
        <div className="flex animate-logo-scroll items-center">
          {/* First set */}
          {clientLogos.map(({ key, Component }) => (
            <div
              key={`a-${key}`}
              className="mx-8 shrink-0 text-tt-gray-500 transition hover:text-white"
            >
              <Component />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clientLogos.map(({ key, Component }) => (
            <div
              key={`b-${key}`}
              className="mx-8 shrink-0 text-tt-gray-500 transition hover:text-white"
            >
              <Component />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

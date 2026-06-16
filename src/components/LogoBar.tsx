'use client';

import { clientLogos, googleEraLogos } from './ClientLogos';

export function LogoBar() {
  return (
    <div className="bg-tt-black py-12">
      {/* --- Current Tiger Tracks clients --- */}
      <p className="mb-8 text-center text-sm uppercase tracking-widest text-tt-gray-500">
        Our clients
      </p>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-tt-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-tt-black to-transparent" />

        <div className="flex animate-logo-scroll items-center gap-16" role="list" aria-label="Tiger Tracks client logos">
          {clientLogos.map(({ key, Component }) => (
            <div key={`a-${key}`} className="shrink-0 text-tt-gray-500 transition hover:text-white" role="listitem">
              <Component />
            </div>
          ))}
          {clientLogos.map(({ key, Component }) => (
            <div key={`b-${key}`} className="shrink-0 text-tt-gray-500 transition hover:text-white" aria-hidden="true">
              <Component />
            </div>
          ))}
        </div>
      </div>

      {/* --- Brands the founders built at Google (founder experience, not clients) --- */}
      <p className="mt-14 mb-8 text-center text-sm uppercase tracking-widest text-tt-gray-500">
        Brands our founders built at Google
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 px-6" role="list" aria-label="Brands the founders managed while at Google">
        {googleEraLogos.map(({ key, Component }) => (
          <div key={key} className="shrink-0 text-tt-gray-600 transition hover:text-tt-gray-400" role="listitem">
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}

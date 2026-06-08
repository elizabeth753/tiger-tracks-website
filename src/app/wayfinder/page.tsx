'use client';

import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { useInView } from '@/hooks/useInView';

/* ------------------------------------------------------------------ */
/*  Pillar Data                                                         */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    id: 'attribution',
    headline: 'See What’s Actually Driving Revenue',
    body: 'Most attribution tools tell you what happened. Wayfinder tells you what caused it. Multi-touch, data-driven attribution that goes beyond last-click to reveal the true contribution of every channel, creative, and audience segment.',
    stat: 'Avg 34% reallocation of budget in first 60 days',
    icon: 'attribution',
  },
  {
    id: 'mmm',
    headline: 'Optimize Across Channels, Not Just Within Them',
    body: 'Wayfinder’s MMM engine ingests your full media spend, external signals, and seasonality to build a live model of your marketing system. The result: budget allocations that maximize revenue, not platform-reported ROAS.',
    stat: '+147% avg ROAS lift across client portfolio',
    icon: 'mmm',
  },
  {
    id: 'geo',
    headline: 'Own the Results AI Is Reading',
    body: 'Generative Engine Optimization is the search channel most agencies don’t know exists yet. Wayfinder identifies where your brand appears (or doesn’t) in AI-generated answers across ChatGPT, Perplexity, and Google AI Overviews - and builds the content and signal strategy to dominate them.',
    stat: 'GEO visibility audits across 50+ AI answer surfaces',
    icon: 'geo',
  },
];

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                           */
/* ------------------------------------------------------------------ */

function PillarIcon({ type }: { type: string }) {
  const shared = 'w-10 h-10';

  if (type === 'attribution') {
    // Branching node graph
    return (
      <svg className={shared} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="8" r="3.5" stroke="#FF6B35" strokeWidth="1.5" />
        <circle cx="10" cy="32" r="3.5" stroke="#FF6B35" strokeWidth="1.5" />
        <circle cx="30" cy="32" r="3.5" stroke="#FF6B35" strokeWidth="1.5" />
        <circle cx="30" cy="20" r="2.5" stroke="#FF6B35" strokeWidth="1.5" />
        <line x1="20" y1="11.5" x2="10" y2="28.5" stroke="#229FA1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="11.5" x2="30" y2="17.5" stroke="#229FA1" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="30" y1="22.5" x2="30" y2="28.5" stroke="#229FA1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'mmm') {
    // Overlapping wave/signal chart
    return (
      <svg className={shared} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 28C8 28 10 14 14 14C18 14 18 24 22 24C26 24 26 10 30 10C34 10 36 20 36 20" stroke="#229FA1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 32C8 32 10 20 14 20C18 20 20 28 24 28C28 28 30 16 34 16C36 16 36 22 36 22" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <path d="M4 34C10 34 12 26 16 26C20 26 22 32 26 32C30 32 32 22 36 22" stroke="#229FA1" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      </svg>
    );
  }

  // GEO - Expanding radar/search ring
  return (
    <svg className={shared} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="5" stroke="#FF6B35" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="11" stroke="#229FA1" strokeWidth="1" opacity="0.6" />
      <circle cx="20" cy="20" r="17" stroke="#229FA1" strokeWidth="0.75" opacity="0.3" />
      <line x1="20" y1="2" x2="20" y2="8" stroke="#229FA1" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="20" y1="32" x2="20" y2="38" stroke="#229FA1" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="2" y1="20" x2="8" y2="20" stroke="#229FA1" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <line x1="32" y1="20" x2="38" y2="20" stroke="#229FA1" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                        */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 50% 55% at 75% 20%, rgba(34,159,161,0.10) 0%, transparent 55%),
          radial-gradient(ellipse 45% 50% at 20% 75%, rgba(255,107,53,0.06) 0%, transparent 60%),
          #0A1119
        `,
      }}
    >
      {/* Atmospheric orbs */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle 320px at 70% 25%, rgba(34,159,161,0.12) 0%, transparent 70%),
            radial-gradient(circle 260px at 25% 65%, rgba(255,107,53,0.07) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[4px] mb-6"
            style={{ color: '#229FA1' }}
          >
            Proprietary AI Platform
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            <span style={{ color: '#F4F1EB' }}>
              The Intelligence Layer Your Agency Should Have Built Years Ago.
            </span>
          </h1>

          <p
            className="mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#9CA3AF' }}
          >
            Wayfinder is Tiger Tracks&apos; proprietary AI platform - built by ex-Google engineers
            to do what no off-the-shelf tool can: optimize your entire media mix in real time,
            across every channel, against your actual business outcomes.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/get-started"
              className="inline-block rounded-full px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: '#FF6B35' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e55a28')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF6B35')}
            >
              Run Wayfinder on Your Account
            </Link>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              See where your budget is leaking - live, in 30 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Three-Pillar Feature Section                                        */
/* ------------------------------------------------------------------ */

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className="relative rounded-2xl p-8 sm:p-10 h-full backdrop-blur-sm overflow-hidden"
        style={{
          backgroundColor: 'rgba(27,33,38,0.7)',
          border: '1px solid rgba(34,159,161,0.2)',
        }}
      >
        {/* Subtle top-edge glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(34,159,161,0.4), transparent)',
          }}
        />

        <div className="flex items-start gap-5">
          <div
            className="flex-shrink-0 rounded-xl p-3"
            style={{ backgroundColor: 'rgba(34,159,161,0.08)' }}
          >
            <PillarIcon type={pillar.icon} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: '#F4F1EB' }}
            >
              {pillar.headline}
            </h3>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: '#9CA3AF' }}
            >
              {pillar.body}
            </p>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                backgroundColor: 'rgba(34,159,161,0.08)',
                border: '1px solid rgba(34,159,161,0.2)',
                color: '#229FA1',
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              {pillar.stat}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarsSection() {
  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 30%, rgba(34,159,161,0.04) 0%, transparent 60%),
          #0A1119
        `,
      }}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-[4px] mb-4"
            style={{ color: '#229FA1' }}
          >
            What Powers Wayfinder
          </p>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: '#F4F1EB' }}
          >
            Three Pillars. One Unfair Advantage.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard Mockup Section                                            */
/* ------------------------------------------------------------------ */

function DashboardMockupSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 50%, rgba(34,159,161,0.03) 0%, transparent 60%),
          #0A1119
        `,
      }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: '#F4F1EB' }}
          >
            This Is What Your Budget Looks Like Inside Wayfinder
          </h2>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="wayfinder-ui-mockup mx-auto rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#1B2126',
              border: '1px solid rgba(34,159,161,0.35)',
              boxShadow:
                '0 0 60px rgba(34,159,161,0.08), 0 0 120px rgba(34,159,161,0.04)',
              maxWidth: '1000px',
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="ml-3 flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-wider" style={{ color: '#229FA1' }}>WAYFINDER</span>
                <span className="text-[10px]" style={{ color: '#4A4A5A' }}>|</span>
                <span className="text-[10px]" style={{ color: '#6B6B7B' }}>Budget Optimization Dashboard</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 md:p-6">
              <div className="flex gap-5">
                {/* Sidebar */}
                <div className="hidden md:block w-32 space-y-2 flex-shrink-0">
                  {['Overview', 'Attribution', 'MMM', 'GEO', 'Reports'].map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-[11px]"
                      style={{
                        backgroundColor: i === 0 ? 'rgba(34,159,161,0.1)' : 'transparent',
                        color: i === 0 ? '#229FA1' : '#6B6B7B',
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: i === 0 ? '#229FA1' : '#4A4A5A' }}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main area */}
                <div className="flex-1 space-y-4">
                  {/* KPI row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'ROAS', value: '4.7x', change: '+23%', up: true },
                      { label: 'BLENDED CAC', value: '$18.20', change: '-31%', up: false },
                      { label: 'BUDGET UTIL.', value: '94%', change: '+12%', up: true },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg p-3"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <p className="text-[9px] uppercase tracking-wider" style={{ color: '#6B6B7B' }}>{m.label}</p>
                        <p className="mt-1 text-lg font-bold text-white">{m.value}</p>
                        <p className="text-[11px] font-semibold" style={{ color: m.up ? '#229FA1' : '#FF6B35' }}>{m.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chart area */}
                  <div className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] uppercase tracking-wider" style={{ color: '#6B6B7B' }}>Channel Performance</p>
                      <p className="text-[10px]" style={{ color: '#229FA1' }}>Live Optimization</p>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[35, 50, 42, 62, 48, 70, 55, 78, 65, 82, 72, 88].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t"
                          style={{ height: `${h}%`, background: `rgba(34,159,161,${0.35 + h / 200})` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* AI Insight */}
                  <div
                    className="rounded-lg p-3 flex items-center gap-3"
                    style={{ background: 'rgba(34,159,161,0.05)', border: '1px solid rgba(34,159,161,0.12)' }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(34,159,161,0.15)' }}>
                      <svg className="w-3 h-3" style={{ color: '#229FA1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <p className="text-xs" style={{ color: '#9C9CAE' }}>
                      <span className="font-semibold" style={{ color: '#229FA1' }}>Wayfinder:</span> Reallocate 18% of Meta prospecting to Google NB Search. Predicted +$24K incremental revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function WayfinderPage() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <DashboardMockupSection />
      <CTASection
        headline="See What Wayfinder Can Do For Your Brand"
        subheadline="Run Wayfinder on Your Account / 30-minute live diagnostic"
        primaryCTA={{ text: 'Run Wayfinder on Your Account', href: '/get-started' }}
        secondaryCTA={{ text: 'Talk to an Engineer', href: '/get-started' }}
        dark
        badges={[
          'Built by Ex-Google Engineers',
          'SOC 2 Type II',
          'Your Data Stays Yours',
        ]}
      />
    </main>
  );
}

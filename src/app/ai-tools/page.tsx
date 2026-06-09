'use client';

import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Tools Data                                                         */
/* ------------------------------------------------------------------ */

const tools = [
  {
    title: 'Video & Image Optimization',
    subtitle: 'Key to performance on Meta Ads, TikTok',
    description:
      'AI-powered creative scoring and optimization for video and image assets across paid social. Our models identify which hooks, thumbnails, and visual elements drive conversions, then generate optimized variants automatically.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
    iconColor: '#FF6B35',
  },
  {
    title: 'Targeting, Analytics, & Measurement',
    subtitle: 'Know exactly where your dollars work hardest',
    description:
      'Predictive attribution and media mix modeling that ingests spend, conversion, and revenue data across every channel. Get an independent, incrementality-tested view of what actually drives revenue.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    iconColor: '#229FA1',
  },
  {
    title: 'LTV Extension (Lifecycle Marketing)',
    subtitle: 'Maximize customer lifetime value through data-driven retention',
    description:
      'Predicts churn probability per customer segment, optimizes email/SMS send cadence, and maximizes lifetime value through intelligent retention programs that keep your best customers engaged longer.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    iconColor: '#FF6B35',
  },
  {
    title: 'Website Optimization & CRO',
    subtitle: 'Materially increase conversion-rate of landing pages and overall site',
    description:
      'ML-powered testing identifies conversion bottlenecks and generates optimized variants. Average lift: 18-32% CVR improvement in 90 days across landing pages and full-site funnels.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
      </svg>
    ),
    iconColor: '#229FA1',
  },
  {
    title: 'GEO & AEO',
    subtitle: 'Optimize site to show up in LLM results like ChatGPT, Claude, Gemini, etc.',
    description:
      'Generative Engine Optimization and Answer Engine Optimization ensure your brand appears in AI-generated answers and bolsters traffic to your website through structured data optimization and content authority building.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
    iconColor: '#FF6B35',
  },
  {
    title: 'SEO & Content Marketing',
    subtitle: 'Compound organic traffic growth month over month',
    description:
      'Keyword gap analysis, content scoring, and technical SEO automation. Our AI identifies the highest-impact content opportunities and generates optimized assets that build organic authority over time.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    iconColor: '#229FA1',
  },
  {
    title: 'Paid Social, Paid Search & Upper-Funnel',
    subtitle: 'Full-funnel automation across every major ad platform',
    description:
      'Automated bid and budget pacing across Meta, Google, TikTok, and programmatic DSPs. Reacts to performance shifts in minutes, enforces pacing rules, and handles cross-platform budget rebalancing automatically.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    iconColor: '#FF6B35',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AIToolsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen" style={{ background: '#0A1119' }}>
      {/* ============================================================
          HERO - 50/50 Split
          ============================================================ */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-[-10%] left-[20%] h-[600px] w-[600px] rounded-full animate-mesh-drift"
            style={{ background: 'radial-gradient(circle, rgba(34,159,161,0.12) 0%, transparent 60%)', filter: 'blur(80px)' }}
          />
          <div
            className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full animate-float-slower"
            style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 60%)', filter: 'blur(100px)' }}
          />
          <div className="absolute inset-0 dot-grid-subtle animate-dot-pulse" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div
                className={`inline-flex items-center gap-2.5 rounded-full border border-[#229FA1]/20 bg-[#229FA1]/5 px-5 py-2 mb-8 transition-all duration-1000 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#229FA1] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#229FA1]" />
                </span>
                <span className="text-sm font-medium text-[#229FA1] tracking-wide">Built In-House. Not White-Labeled.</span>
              </div>

              <h1
                className={`text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl transition-all duration-1000 delay-200 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ color: '#F4F1EB' }}
              >
                Tiger Tracks Proprietary AI&nbsp;Tools
              </h1>

              <p
                className={`mt-6 max-w-xl text-lg leading-relaxed transition-all duration-1000 delay-500 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ color: '#9C9CAE' }}
              >
                Reach out to us directly for a demo and free trial of any of Tiger Tracks&apos; proprietary in-house AI tools. Our custom, LLM-based products are cutting-edge solutions built for specific performance-marketing use cases, each augmenting CAC reduction, LTV extension, organic growth, and EBITDA acceleration.
              </p>

              <div
                className={`mt-10 transition-all duration-1000 delay-700 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B35]/20 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #E8793A)' }}
                >
                  Request a Demo &amp; Free Trial
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Hero Image Placeholder */}
            <div
              className={`circuit-tiger-hero-image relative transition-all duration-1000 delay-500 ${
                mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{ aspectRatio: '4 / 3' }}
              >
                {/* Teal radial glow behind */}
                <div
                  className="absolute inset-0 -m-8"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(34,159,161,0.15) 0%, transparent 65%)',
                    filter: 'blur(40px)',
                  }}
                />
                {/* Card surface */}
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(27, 33, 38, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(34, 159, 161, 0.2)',
                    boxShadow: '0 0 60px rgba(34,159,161,0.08), 0 8px 32px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Decorative circuit pattern */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="circuit-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#229FA1" strokeWidth="0.5" />
                        <circle cx="0" cy="0" r="1.5" fill="#229FA1" />
                        <circle cx="48" cy="48" r="1.5" fill="#229FA1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit-grid)" />
                  </svg>

                  {/* Floating orbs */}
                  <div
                    className="absolute rounded-full blur-[80px] animate-mesh-drift"
                    style={{ width: '50%', height: '50%', background: '#229FA1', opacity: 0.1, top: '10%', right: '10%' }}
                  />
                  <div
                    className="absolute rounded-full blur-[60px]"
                    style={{ width: '35%', height: '35%', background: '#FF6B35', opacity: 0.06, bottom: '15%', left: '15%' }}
                  />

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(34,159,161,0.12)', border: '1px solid rgba(34,159,161,0.25)' }}
                    >
                      <svg className="w-10 h-10 text-[#229FA1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                      </svg>
                    </div>
                    <p className="text-base font-semibold text-white/60 tracking-wide">AI-Powered Tools Suite</p>
                    <p className="text-xs text-[#229FA1]/60 uppercase tracking-[3px]">Tiger Tracks</p>
                  </div>

                  {/* Corner glow accents */}
                  <div className="absolute top-0 left-0 w-32 h-32" style={{ background: 'radial-gradient(circle at top left, rgba(34,159,161,0.08) 0%, transparent 70%)' }} />
                  <div className="absolute bottom-0 right-0 w-32 h-32" style={{ background: 'radial-gradient(circle at bottom right, rgba(255,107,53,0.06) 0%, transparent 70%)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TOOLS GRID - 3 Column Glassmorphism Cards
          ============================================================ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#229FA1]/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[4px] text-[#229FA1] mb-4">The Arsenal</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: '#F4F1EB' }}>
              7 AI Tools. One Integrated Ecosystem.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <div
                key={tool.title}
                className="group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: 'rgba(27, 33, 38, 0.7)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${tool.iconColor}0F 0%, transparent 60%)`,
                  }}
                />
                {/* Hover border */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    border: `1px solid ${tool.iconColor}40`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${tool.iconColor}15`,
                      border: `1px solid ${tool.iconColor}30`,
                      boxShadow: `0 0 20px ${tool.iconColor}10`,
                    }}
                  >
                    <span style={{ color: tool.iconColor }}>{tool.icon}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-1" style={{ color: '#F4F1EB' }}>
                    {tool.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: '#FF6B35' }}>
                    {tool.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#9C9CAE' }}>
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WAYFINDER BRIDGE SECTION
          ============================================================ */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#0d1520' }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#229FA1]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#229FA1]/15 to-transparent" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(34,159,161,0.06) 0%, transparent 60%)', filter: 'blur(80px)' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#229FA1]/40" />
            <span className="text-xs font-bold uppercase tracking-[4px] text-[#229FA1]">Ecosystem</span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#229FA1]/40" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6" style={{ color: '#F4F1EB' }}>
            Powered by the Wayfinder AI&nbsp;Ecosystem
          </h2>

          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: '#9C9CAE' }}>
            While these tools can be deployed a la carte, they were built to feed directly into Wayfinder AI&#8201;&#8212;&#8201;our flagship predictive media mix modeling platform.
          </p>

          <Link
            href="/wayfinder"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#229FA1]/15"
            style={{
              color: '#229FA1',
              border: '1px solid rgba(34,159,161,0.3)',
              background: 'rgba(34,159,161,0.08)',
            }}
          >
            Explore Wayfinder AI
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <CTASection
        headline="See the Tools in Action"
        subheadline="30-day free trial of any tool. No setup fees. Validate ROI before you commit."
        primaryCTA={{ text: 'Request a Demo & Free Trial', href: '/get-started' }}
        secondaryCTA={{ text: 'Talk to an Engineer', href: '/get-started' }}
        dark
        badges={[
          'SOC 2 Type II',
          'Built by Ex-Google',
          '30-Day Free Trial',
        ]}
      />
    </main>
  );
}

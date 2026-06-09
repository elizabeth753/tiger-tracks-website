'use client';

import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Tools Data with column spans                                       */
/* ------------------------------------------------------------------ */

const tools = [
  {
    title: 'Video & Image Optimization',
    subtitle: 'Key to performance on Meta Ads, TikTok',
    description:
      'AI-powered creative scoring and optimization for video and image assets across paid social. Our models identify which hooks, thumbnails, and visual elements drive conversions, then generate optimized variants automatically.',
    colSpan: 'md:col-span-2',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),
    iconColor: '#FF6B35',
  },
  {
    title: 'Targeting, Analytics, & Measurement',
    subtitle: 'Know exactly where your dollars work hardest',
    description:
      'Predictive attribution and media mix modeling that ingests spend, conversion, and revenue data across every channel. Get an independent, incrementality-tested view of what actually drives revenue.',
    colSpan: 'md:col-span-1',
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
    colSpan: 'md:col-span-1',
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
    colSpan: 'md:col-span-2',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
    iconColor: '#229FA1',
  },
  {
    title: 'GEO & AEO',
    subtitle: 'Optimize site to show up in LLM results like ChatGPT, Claude, Gemini, etc.',
    description:
      'Generative Engine Optimization and Answer Engine Optimization ensure your brand appears in AI-generated answers through structured data optimization and content authority building.',
    colSpan: 'md:col-span-1',
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
    colSpan: 'md:col-span-1',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    iconColor: '#229FA1',
  },
  {
    title: 'Paid Social, Paid Search & Upper-Funnel',
    subtitle: 'Full-funnel automation across every major ad platform',
    description:
      'Automated bid and budget pacing across Meta, Google, TikTok, and programmatic DSPs. Reacts to performance shifts in minutes, enforces pacing rules, and handles cross-platform budget rebalancing automatically.',
    colSpan: 'md:col-span-1',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
          HERO - 50/50 SPLIT
          ============================================================ */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-[-10%] left-[20%] h-[600px] w-[600px] rounded-full animate-mesh-drift"
            style={{ background: 'radial-gradient(circle, rgba(34,159,161,0.12) 0%, transparent 60%)', filter: 'blur(80px)' }}
          />
          <div
            className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full animate-float-slower"
            style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 60%)', filter: 'blur(100px)' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Left column: Content */}
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
                className={`mt-6 text-lg leading-relaxed transition-all duration-1000 delay-500 ${
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

            {/* Right column: Glowing placeholder for circuit-tiger image */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#229FA1]/20 to-[#FF6B35]/10 border border-[#229FA1]/30 flex items-center justify-center relative overflow-hidden">
                {/* Inner glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(34,159,161,0.15) 0%, transparent 60%)',
                  }}
                />
                {/* Circuit grid pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hero-circuit" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#229FA1" strokeWidth="0.5" />
                      <circle cx="0" cy="0" r="1.5" fill="#229FA1" />
                      <circle cx="48" cy="48" r="1.5" fill="#229FA1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-circuit)" />
                </svg>
                {/* Center icon */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(34,159,161,0.12)', border: '1px solid rgba(34,159,161,0.25)' }}
                  >
                    <svg className="w-10 h-10 text-[#229FA1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                    </svg>
                  </div>
                  <p className="text-base font-semibold text-white/50 tracking-wide">AI-Powered Suite</p>
                  <p className="text-xs text-[#229FA1]/50 uppercase tracking-[3px]">Tiger Tracks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BENTO BOX GRID - Perfect Rectangle, Zero Dead Space
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

          {/* Bento grid: 3 cols, specific spans for flush rectangle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">
            {tools.map((tool, i) => (
              <div
                key={tool.title}
                className={`group relative bg-[#1B2126] border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-[#229FA1] transition-all duration-500 hover:-translate-y-1 overflow-hidden ${tool.colSpan}`}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${tool.iconColor}0C 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${tool.iconColor}15`,
                      border: `1px solid ${tool.iconColor}30`,
                      boxShadow: `0 0 24px ${tool.iconColor}10`,
                    }}
                  >
                    <span style={{ color: tool.iconColor }}>{tool.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#F4F1EB' }}>
                    {tool.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm font-medium mb-3" style={{ color: '#FF6B35' }}>
                    {tool.subtitle}
                  </p>

                  {/* Description */}
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
          WAYFINDER AI BRIDGE SECTION
          ============================================================ */}
      <section className="mt-24 py-16 text-center border-y border-[#229FA1]/20 relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(34,159,161,0.08) 0%, transparent 60%)', filter: 'blur(60px)' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6" style={{ color: '#F4F1EB' }}>
            Powered by the Wayfinder AI&nbsp;Ecosystem
          </h2>

          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: '#9C9CAE' }}>
            While these tools can be deployed a la carte, they were built to feed directly into Wayfinder AI&#8212;our flagship predictive media mix modeling platform.
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

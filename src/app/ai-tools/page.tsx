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
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
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
  },
  {
    title: 'Website Optimization & CRO',
    subtitle: 'Materially increase conversion-rate of landing pages and overall site',
    description:
      'ML-powered testing identifies conversion bottlenecks and generates optimized variants. Average lift: 18-32% CVR improvement in 90 days across landing pages and full-site funnels.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'GEO & AEO',
    subtitle: 'Optimize site to show up in LLM results like ChatGPT, Claude, Gemini, etc.',
    description:
      'Generative Engine Optimization and Answer Engine Optimization ensure your brand appears in AI-generated answers and bolsters traffic to your website through structured data optimization and content authority building.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
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
  },
  {
    title: 'Paid Social, Paid Search, Upper-Funnel Optimization, and More',
    subtitle: 'Full-funnel automation across every major ad platform',
    description:
      'Automated bid and budget pacing across Meta, Google, TikTok, and programmatic DSPs. Reacts to performance shifts in minutes, enforces pacing rules, and handles cross-platform budget rebalancing automatically.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
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
          HERO
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

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
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
            Tiger Tracks Proprietary AI Tools
          </h1>

          <p
            className={`mt-6 max-w-3xl mx-auto text-lg leading-relaxed transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: '#9C9CAE' }}
          >
            Reach out to us directly for a demo and free trial of any of Tiger Tracks&apos; proprietary in-house AI tools. Our custom, LLM-based AI products are cutting edge solutions developed for specific performance-marketing use cases, each of which augments performance including CaC reduction, LTV extension, Organic &amp; Viral marketing, and of course EBITDA and Enterprise Value growth. These tools include the below and many more:
          </p>

          <div
            className={`mt-10 flex justify-center transition-all duration-1000 delay-700 ${
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
      </section>

      {/* ============================================================
          TOOLS GRID - 3 Column Glassmorphism Cards
          ============================================================ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#229FA1]/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <div
                key={tool.title}
                className="group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#229FA1]/40"
                style={{
                  background: 'rgba(27, 33, 38, 0.7)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Subtle glassmorphism inner glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(34,159,161,0.06) 0%, transparent 60%)',
                  }}
                />

                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#229FA1]/20 mb-5" style={{ background: 'rgba(34,159,161,0.1)' }}>
                    <span className="text-[#229FA1]">{tool.icon}</span>
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

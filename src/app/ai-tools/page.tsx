'use client';

import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    number: '01',
    title: 'Predictive Attribution & Media Mix',
    subtitle: 'Know exactly where your dollars work hardest',
    description:
      'Wayfinder ingests spend, conversion, and revenue data across every channel and builds a custom media mix model for your brand. Instead of relying on platform-reported ROAS (which double-counts), you get an independent, incrementality-tested view of what actually drives revenue.',
    benefits: [
      'Identify the 20-30% of spend that produces zero incremental lift',
      'Reallocate budget in days, not quarters',
      'Media mix models updated weekly, not annually',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Automated Bid & Budget Pacing',
    subtitle: 'Real-time optimization across every platform',
    description:
      'Our bidding engine connects directly to Meta, Google, TikTok, and programmatic DSPs via API. It monitors performance signals every 15 minutes and adjusts bids, budgets, and audience targeting automatically based on your CAC and ROAS thresholds.',
    benefits: [
      'Reacts to performance shifts in minutes, not days',
      'Enforces pacing rules so you never over- or under-spend',
      'Handles cross-platform budget rebalancing automatically',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Creative & Feed Intelligence',
    subtitle: 'Data-driven creative decisions, not guesswork',
    description:
      'Every ad creative and product feed attribute is scored against conversion probability using our ML pipeline. You see exactly which hooks, thumbnails, CTAs, and product titles drive purchases, and which ones waste brand reach.',
    benefits: [
      'Creative fatigue detection before performance drops',
      'Product feed titles and descriptions optimized for each channel',
      'A/B test velocity increased 3-4x through automated variant generation',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

const additionalTools = [
  {
    title: 'LTV Extension Engine',
    description: 'Predicts churn probability per customer segment, optimizes email/SMS send cadence, and maximizes lifetime value through data-driven retention programs.',
  },
  {
    title: 'Website & CRO Intelligence',
    description: 'ML-powered landing page testing that identifies conversion bottlenecks and generates optimized variants. Average lift: 18-32% CVR improvement in 90 days.',
  },
  {
    title: 'GEO & AEO Optimization',
    description: 'Ensures your brand appears in LLM-generated answers (ChatGPT, Claude, Gemini, Perplexity) through structured data optimization and content authority building.',
  },
  {
    title: 'SEO & Content Intelligence',
    description: 'Keyword gap analysis, content scoring, and technical SEO automation that compounds organic traffic growth month over month.',
  },
];

const faqs = [
  {
    question: 'Is this a white-labeled wrapper on ChatGPT or OpenAI?',
    answer: 'No. Our tools use multiple ML approaches including custom-trained models, gradient-boosted decision trees for bid optimization, and proprietary data pipelines. Where we use LLM capabilities (creative analysis, GEO optimization), we build task-specific fine-tuned models. Your data never trains third-party models.',
  },
  {
    question: 'How does data security work?',
    answer: 'All client data is encrypted at rest (AES-256) and in transit (TLS 1.3). Each client gets an isolated data environment. We are SOC 2 Type II compliant. Your ad platform credentials are stored via OAuth tokens with minimum required permissions. We never share data between clients or use it for training.',
  },
  {
    question: 'What integrations are supported?',
    answer: 'Direct API integrations with Google Ads, GA4, Search Console, Meta Ads, TikTok Ads, Amazon Ads, Shopify, HubSpot, Salesforce, Klaviyo, and 20+ other platforms. CRM data syncs bi-directionally. Custom integrations typically take 1-2 weeks.',
  },
  {
    question: 'How long does onboarding take?',
    answer: 'Platform connections are live within 48 hours. Your first media mix model is calibrated within 2 weeks. Full optimization (bid automation + creative intelligence + feed optimization) is typically operational within 30 days. You see measurable impact on CAC within the first 90 days.',
  },
  {
    question: 'What does pricing look like?',
    answer: 'Pricing is based on managed ad spend and the number of tools activated. We offer a free 30-day trial of any individual tool so you can validate ROI before committing. No setup fees, no long-term contracts required.',
  },
];

/* ------------------------------------------------------------------ */
/*  Dashboard Mockup Component                                         */
/* ------------------------------------------------------------------ */

function DashboardMockup() {
  return (
    <div className="rounded-2xl border border-tt-gray-700/50 bg-tt-gray-900/80 p-3 sm:p-6 backdrop-blur-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-tt-gray-700/30">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-tt-teal/30 flex items-center justify-center">
            <span className="text-[8px] font-bold text-tt-teal">TT</span>
          </div>
          <span className="text-[10px] font-semibold text-tt-gray-400 tracking-wider uppercase">AI-Tools Dashboard</span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-tt-teal/50" />
          <div className="h-2 w-2 rounded-full bg-tt-orange/50" />
          <div className="h-2 w-2 rounded-full bg-tt-gray-600" />
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'ROAS', value: '4.2x', change: '+18%', up: true },
          { label: 'CAC', value: '$23.40', change: '-34%', up: true },
          { label: 'Conv. Rate', value: '3.8%', change: '+22%', up: true },
          { label: 'Wasted Spend', value: '$0', change: '-$47K', up: true },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-tt-gray-700/40 bg-tt-black/60 p-2.5">
            <p className="text-[8px] uppercase tracking-wider text-tt-gray-500">{m.label}</p>
            <p className="mt-0.5 text-sm font-bold text-white">{m.value}</p>
            <p className={`text-[10px] ${m.up ? 'text-tt-teal' : 'text-red-400'}`}>{m.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Chart area */}
        <div className="col-span-3 rounded-lg border border-tt-gray-700/40 bg-tt-black/60 p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[8px] uppercase tracking-wider text-tt-gray-500">Cross-Channel Attribution</p>
            <div className="flex gap-2">
              {['Meta', 'Google', 'TikTok'].map((ch) => (
                <span key={ch} className="text-[7px] text-tt-gray-500 flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${ch === 'Meta' ? 'bg-tt-teal' : ch === 'Google' ? 'bg-tt-orange' : 'bg-tt-gold'}`} />
                  {ch}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1 h-20">
            {[35, 50, 42, 60, 48, 72, 55, 78, 65, 82, 70, 88].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col gap-[1px]">
                <div className="rounded-t bg-tt-teal/60" style={{ height: `${h * 0.5}%` }} />
                <div className="rounded-t bg-tt-orange/40" style={{ height: `${h * 0.3}%` }} />
                <div className="rounded-t bg-tt-gold/30" style={{ height: `${h * 0.2}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Insights panel */}
        <div className="col-span-2 rounded-lg border border-tt-gray-700/40 bg-tt-black/60 p-3">
          <p className="text-[8px] uppercase tracking-wider text-tt-gray-500 mb-2">Live Alerts</p>
          <div className="space-y-2">
            {[
              { text: 'Meta CBO overspending on low-LTV segment', type: 'warn' },
              { text: 'Google Shopping feed: 340 titles optimized', type: 'success' },
              { text: 'TikTok creative #47 fatigue detected', type: 'warn' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[9px] leading-tight">
                <span className={`mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${alert.type === 'warn' ? 'bg-tt-orange' : 'bg-tt-teal'}`} />
                <span className="text-tt-gray-400">{alert.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data Flow Diagram                                                   */
/* ------------------------------------------------------------------ */

function DataFlowDiagram() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        {/* Sources */}
        <div className="md:col-span-2 space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-tt-gray-500 mb-3 text-center">Data Sources</p>
          {['Google Ads', 'Meta Ads', 'TikTok Ads', 'Shopify / CRM', 'GA4 / Analytics'].map((src) => (
            <div key={src} className="rounded-lg border border-tt-gray-700/40 bg-tt-black/40 px-3 py-2 text-xs text-tt-gray-300 text-center">
              {src}
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="md:col-span-1 flex md:flex-col items-center justify-center py-2">
          <div className="hidden md:block h-full w-px bg-gradient-to-b from-transparent via-tt-teal/40 to-transparent" style={{ minHeight: '120px' }} />
          <svg className="w-6 h-6 text-tt-teal rotate-90 md:rotate-0 my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Wayfinder Core */}
        <div className="md:col-span-1 flex items-center justify-center">
          <div className="relative rounded-2xl border border-tt-teal/30 bg-tt-teal/5 p-4 text-center animate-glow-pulse" style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="h-10 w-10 mx-auto rounded-xl bg-tt-teal/20 flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
              </svg>
            </div>
            <p className="text-xs font-bold text-tt-teal">TT AI Engine</p>
            <p className="text-[8px] text-tt-gray-500 mt-1">ML Pipeline</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="md:col-span-1 flex md:flex-col items-center justify-center py-2">
          <svg className="w-6 h-6 text-tt-orange rotate-90 md:rotate-0 my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Outputs */}
        <div className="md:col-span-2 space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-tt-gray-500 mb-3 text-center">Actionable Outputs</p>
          {['Budget Reallocation', 'Bid Adjustments', 'Creative Scores', 'Feed Optimization', 'Incrementality Reports'].map((out) => (
            <div key={out} className="rounded-lg border border-tt-orange/20 bg-tt-orange/5 px-3 py-2 text-xs text-tt-gray-300 text-center">
              {out}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Use Case Scenario                                                   */
/* ------------------------------------------------------------------ */

function UseCaseSection() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-teal/20 to-transparent" />
      </div>

      <div ref={ref} className={`relative z-10 mx-auto max-w-4xl px-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-orange mb-4 text-center">Real Result</p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center mb-12">
          How a DTC Brand Recovered $47K/Month in Wasted Spend
        </h2>

        <div className="glass-card-elevated rounded-2xl p-8 sm:p-10">
          <div className="space-y-6 text-sm text-tt-gray-300 leading-relaxed">
            <p>
              <span className="text-white font-semibold">The problem:</span> A growth-stage DTC brand spending $380K/month across Meta, Google, and TikTok was seeing declining ROAS but couldn&apos;t identify the source. Each platform reported strong returns individually, but blended numbers told a different story.
            </p>
            <p>
              <span className="text-white font-semibold">What Wayfinder found:</span> Our media mix model revealed that 12% of their Meta spend was targeting users who would have converted organically through brand search. Another 8% of Google Shopping budget was going to products with negative margin after shipping. Platform-reported ROAS was inflating true performance by 2.1x.
            </p>
            <p>
              <span className="text-white font-semibold">The fix:</span> We reallocated the wasted Meta budget to prospecting audiences with validated incrementality. Google Shopping feeds were re-optimized to suppress negative-margin SKUs and boost high-LTV products. Bid automation enforced CAC guardrails in real time.
            </p>
            <p>
              <span className="text-white font-semibold">The result:</span> Within 60 days, blended CAC dropped 34%, incremental ROAS improved from 2.1x to 4.2x, and $47K/month in previously wasted spend was redirected to profitable acquisition.
            </p>
          </div>

          {/* Result metrics */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/[0.06]">
            {[
              { label: 'CAC Reduction', value: '34%', prefix: '' },
              { label: 'Wasted Spend Recovered', value: '$47K', prefix: '' },
              { label: 'Incremental ROAS', value: '4.2x', prefix: '' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-tt-teal metric-glow">{m.value}</p>
                <p className="text-xs text-tt-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Section                                                         */
/* ------------------------------------------------------------------ */

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm sm:text-base font-medium text-white group-hover:text-tt-teal transition-colors pr-4">
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-tt-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-tt-gray-400 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}

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
      <main className="min-h-screen bg-tt-black">
        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="absolute top-[-10%] left-[20%] h-[600px] w-[600px] rounded-full animate-mesh-drift"
              style={{ background: 'radial-gradient(circle, rgba(91,164,164,0.12) 0%, transparent 60%)', filter: 'blur(80px)' }}
            />
            <div
              className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full animate-float-slower"
              style={{ background: 'radial-gradient(circle, rgba(232,121,58,0.07) 0%, transparent 60%)', filter: 'blur(100px)' }}
            />
            <div className="absolute inset-0 dot-grid-subtle animate-dot-pulse" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div
                  className={`inline-flex items-center gap-2.5 rounded-full border border-tt-teal/20 bg-tt-teal/5 px-5 py-2 mb-8 transition-all duration-1000 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tt-teal opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-tt-teal" />
                  </span>
                  <span className="text-sm font-medium text-tt-teal tracking-wide">Built In-House. Not White-Labeled.</span>
                </div>

                <h1
                  className={`text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl transition-all duration-1000 delay-200 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  TT AI-Tools
                </h1>

                <p
                  className={`mt-6 max-w-xl text-lg text-tt-gray-300 leading-relaxed transition-all duration-1000 delay-500 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  Custom ML models built by the same team that ran campaigns at Google. Three core systems that find wasted ad spend, automate bid optimization, and score every piece of creative before it burns budget.
                </p>

                <div
                  className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <Link href="/get-started" className="btn-primary text-lg">
                    Request a Demo
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a href="#how-it-works" className="btn-ghost text-lg">
                    See How It Works
                  </a>
                </div>
              </div>

              {/* Dashboard Mockup */}
              <div className={`hidden lg:block transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <DashboardMockup />
              </div>
            </div>

            {/* Mobile mockup */}
            <div className={`mt-12 lg:hidden transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <DashboardMockup />
            </div>
          </div>
        </section>

        {/* ============================================================
            THREE PILLARS
            ============================================================ */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-teal/20 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-teal mb-4">Three Core Systems</p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What the Tools Actually Do
              </h2>
              <p className="mt-4 text-lg text-tt-gray-400">
                No buzzwords. Here is exactly what each system does, how it works, and what it means for your P&L.
              </p>
            </div>

            <div className="space-y-6">
              {pillars.map((pillar, i) => {
                return (
                  <div
                    key={pillar.title}
                    className="group glass-card rounded-2xl p-8 sm:p-10 card-shimmer"
                  >
                    <div className="grid gap-8 lg:grid-cols-5">
                      <div className="lg:col-span-3">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tt-teal/10 text-tt-teal ring-1 ring-tt-teal/20">
                            {pillar.icon}
                          </div>
                          <div>
                            <span className="text-xs font-mono text-tt-teal/60">{pillar.number}</span>
                            <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-tt-orange font-medium mb-3">{pillar.subtitle}</p>
                        <p className="text-sm text-tt-gray-400 leading-relaxed">{pillar.description}</p>
                      </div>

                      <div className="lg:col-span-2">
                        <p className="text-xs uppercase tracking-wider text-tt-gray-500 mb-3">Concrete Benefits</p>
                        <ul className="space-y-3">
                          {pillar.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-3 text-sm text-tt-gray-300">
                              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            DATA FLOW DIAGRAM
            ============================================================ */}
        <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-teal/20 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-teal mb-4">Architecture</p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                How Your Data Flows Through TT AI-Tools
              </h2>
              <p className="mt-4 text-tt-gray-400">
                Your ad platforms connect via API. Raw data flows into our ML pipeline. Actionable outputs flow back as optimizations, not just dashboards.
              </p>
            </div>

            <DataFlowDiagram />
          </div>
        </section>

        {/* ============================================================
            USE CASE
            ============================================================ */}
        <UseCaseSection />

        {/* ============================================================
            ADDITIONAL TOOLS
            ============================================================ */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-teal/20 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The Full Toolkit
              </h2>
              <p className="mt-4 text-tt-gray-400">
                Beyond the three core systems, our AI-powered tools cover every stage of the growth funnel.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {additionalTools.map((tool) => (
                <div
                  key={tool.title}
                  className="glass-card rounded-2xl p-8 card-shimmer"
                >
                  <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-3">
                    <span className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-tt-teal" />
                    {tool.title}
                  </h3>
                  <p className="text-sm text-tt-gray-400 leading-relaxed">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            TECHNICAL FAQ
            ============================================================ */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tt-teal/20 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-teal mb-4">Technical FAQ</p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The Questions Enterprise Buyers Actually Ask
              </h2>
            </div>

            <div className="glass-card-elevated rounded-2xl p-6 sm:p-8">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} />
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
          primaryCTA={{ text: 'Request Your Free Trial', href: '/get-started' }}
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

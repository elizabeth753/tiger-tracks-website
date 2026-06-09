'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CTASection } from '@/components/CTASection';

/* ------------------------------------------------------------------ */
/*  Tools Data                                                          */
/* ------------------------------------------------------------------ */

const tools = [
  {
    title: 'Video & Image Optimization',
    subtitle: 'Key to performance on Meta Ads, TikTok',
    description:
      'AI-powered creative scoring and optimization for video and image assets across paid social. Our models identify which hooks, thumbnails, and visual elements drive conversions, then generate optimized variants automatically.',
    image: '/images/u7815321835_System_Persona_Act_as_an_elite_3D_UIUX_conceptual_a5dd05eb-c484-4adc-9c52-3527f94df735_1.png',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),
    iconColor: '#FF6B35',
    stats: ['3.2x avg ROAS lift', '68% faster creative testing'],
  },
  {
    title: 'Targeting, Analytics & Measurement',
    subtitle: 'Know exactly where your dollars work hardest',
    description:
      'Predictive attribution and media mix modeling that ingests spend, conversion, and revenue data across every channel. Get an independent, incrementality-tested view of what actually drives revenue.',
    image: '/images/u7815321835_Act_as_an_elite_3D_UIUX_conceptual_artist_special_76fb5e52-247d-4def-ae7e-8351b40a9da8_2.png',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    iconColor: '#229FA1',
    stats: ['Cross-channel attribution', 'Incrementality tested'],
  },
  {
    title: 'LTV Extension (Lifecycle Marketing)',
    subtitle: 'Maximize customer lifetime value',
    description:
      'Predicts churn probability per customer segment, optimizes email/SMS send cadence, and maximizes lifetime value through intelligent retention programs that keep your best customers engaged longer.',
    image: '/images/u7815321835_Asset_3_LTV_Extension_UI._A_sleek_dark-mode_inter_87a21d51-880f-4fc3-9bc3-240857c48f35_0.png',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    iconColor: '#FF6B35',
    stats: ['22% churn reduction', 'Automated cadence optimization'],
  },
  {
    title: 'Website Optimization & CRO',
    subtitle: 'Materially increase conversion rates',
    description:
      'ML-powered testing identifies conversion bottlenecks and generates optimized variants. Average lift: 18-32% CVR improvement in 90 days across landing pages and full-site funnels.',
    image: '/images/u7815321835_Asset_4_Website_Optimization__CRO_UI._A_dark-mode_eaed8369-2775-4ca4-8a23-8f16cac74642_2.png',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
    iconColor: '#229FA1',
    stats: ['18-32% CVR lift', '90-day deployment'],
  },
  {
    title: 'GEO & AEO',
    subtitle: 'Show up in AI-generated answers',
    description:
      'Generative Engine Optimization and Answer Engine Optimization ensure your brand appears in AI-generated answers from ChatGPT, Claude, Gemini, and Perplexity through structured data optimization and content authority building.',
    image: '/images/u7815321835_Asset_5_GEO__AEO_UI._A_command-line_or_developer-_6a60436b-f2cf-4132-b1e1-405df38f9815_1.png',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
    iconColor: '#FF6B35',
    stats: ['ChatGPT, Claude, Gemini', 'Structured data optimization'],
  },
  {
    title: 'SEO & Content Marketing',
    subtitle: 'Compound organic growth month over month',
    description:
      'Keyword gap analysis, content scoring, and technical SEO automation. Our AI identifies the highest-impact content opportunities and generates optimized assets that build organic authority over time.',
    image: '/images/u7815321835_Asset_6_SEO__Content_UI._A_dark-mode_dashboard_fe_abc54993-90f4-41b9-b1a7-e6aa87859fea_1.png',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    iconColor: '#229FA1',
    stats: ['Keyword gap analysis', 'Authority building'],
  },
  {
    title: 'Paid Social, Paid Search & Upper-Funnel',
    subtitle: 'Full-funnel automation across every major platform',
    description:
      'Automated bid and budget pacing across Meta, Google, TikTok, and programmatic DSPs. Reacts to performance shifts in minutes, enforces pacing rules, and handles cross-platform budget rebalancing automatically.',
    image: '/images/u7815321835_Asset_7_Full-Funnel_Automation_UI._A_high-end_tra_adffdfab-ecb5-4242-a455-6472b91e14ed_1.png',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    iconColor: '#FF6B35',
    stats: ['Meta, Google, TikTok, DSPs', 'Minute-level pacing'],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                  */
/* ------------------------------------------------------------------ */

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const panelVariants = {
  enter: { opacity: 0, scale: 0.96, y: 16 },
  center: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, scale: 0.96, y: -12, transition: { duration: 0.3, ease: 'easeIn' as const } },
};

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AIToolsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tools[activeIndex];

  return (
    <div className="min-h-screen" style={{ background: '#0A1119' }}>

      {/* ==============================================================
          HERO - Cinematic Entrance
          ============================================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Teal radial glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-[20%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(34,159,161,0.10) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute bottom-[5%] right-[15%] h-[300px] w-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
          />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#229FA1]/20 bg-[#229FA1]/5 px-5 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#229FA1] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#229FA1]" />
              </span>
              <span className="text-sm font-medium text-[#229FA1] tracking-wide">Built In-House. Not White-Labeled.</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ color: '#F4F1EB' }}
          >
            The AI Command Center
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#9C9CAE' }}
          >
            Seven proprietary, LLM-powered tools purpose-built for performance marketing. Each one reduces CAC, extends LTV, and accelerates EBITDA.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10">
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
          </motion.div>
        </motion.div>
      </section>

      {/* ==============================================================
          COMMAND CENTER - Interactive Tabbed Interface
          ============================================================== */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#229FA1]/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[4px] text-[#229FA1] mb-4">The Arsenal</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: '#F4F1EB' }}>
              7 AI Tools. One Integrated Ecosystem.
            </h2>
          </motion.div>

          {/* 12-col grid: selector | display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column - Tool Selector (col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-1">
              {tools.map((tool, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={tool.title}
                    onClick={() => setActiveIndex(i)}
                    className={`group relative text-left w-full rounded-xl px-5 py-4 transition-all duration-300 ${
                      isActive
                        ? 'bg-white/[0.05] border-l-4 border-[#229FA1] backdrop-blur-sm'
                        : 'bg-transparent border-l-4 border-transparent hover:bg-white/[0.02] hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                          isActive ? 'scale-110' : 'opacity-50 group-hover:opacity-70'
                        }`}
                        style={{
                          background: isActive ? `${tool.iconColor}18` : 'rgba(255,255,255,0.03)',
                          border: isActive ? `1px solid ${tool.iconColor}35` : '1px solid transparent',
                        }}
                      >
                        <span style={{ color: isActive ? tool.iconColor : '#64748b' }}>{tool.icon}</span>
                      </div>

                      <div className="min-w-0">
                        <h3
                          className={`text-sm font-semibold truncate transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                          }`}
                        >
                          {tool.title}
                        </h3>
                        <p
                          className={`text-xs truncate transition-colors duration-300 mt-0.5 ${
                            isActive ? 'text-slate-400' : 'text-slate-600 group-hover:text-slate-500'
                          }`}
                        >
                          {tool.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full bg-[#229FA1]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column - Display Window (col-span-7) */}
            <div className="lg:col-span-7">
              <div
                className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0D151E]"
                style={{ minHeight: 540 }}
              >
                {/* Subtle inner glow */}
                <div
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, ${active.iconColor}08 0%, transparent 50%)`,
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative z-10 flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                      <Image
                        src={active.image}
                        alt={active.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(180deg, transparent 40%, #0D151E 100%)',
                        }}
                      />
                    </div>

                    {/* Content overlay */}
                    <div className="px-8 pb-8 -mt-16 relative z-10">
                      {/* Tool number badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
                          style={{
                            background: `${active.iconColor}20`,
                            color: active.iconColor,
                            border: `1px solid ${active.iconColor}30`,
                          }}
                        >
                          {String(activeIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[3px] text-slate-500">
                          Tiger Tracks AI
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">
                        {active.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-xl">
                        {active.description}
                      </p>

                      {/* Stat pills */}
                      <div className="flex flex-wrap gap-2">
                        {active.stats.map((stat) => (
                          <span
                            key={stat}
                            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                              background: `${active.iconColor}10`,
                              color: active.iconColor,
                              border: `1px solid ${active.iconColor}20`,
                            }}
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          WAYFINDER AI "BRAIN" SECTION
          ============================================================== */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            className="rounded-3xl border border-[#229FA1]/15 p-10 md:p-16 relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(13,21,30,0.8) 0%, rgba(10,17,25,0.95) 100%)',
              boxShadow: 'inset 0 0 50px rgba(34,159,161,0.1)',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background glow */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background: 'radial-gradient(ellipse at 50% 30%, rgba(34,159,161,0.06) 0%, transparent 60%)',
              }}
            />

            <div className="relative z-10 text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-[#229FA1] mb-4">
                Core Infrastructure
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6" style={{ color: '#F4F1EB' }}>
                Powered by the Wayfinder AI&nbsp;Ecosystem
              </h2>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#9C9CAE' }}>
                While these tools can be deployed a la carte, they were built to feed directly into Wayfinder AI, our flagship predictive media mix modeling platform.
              </p>
            </div>

            {/* 16:9 Brain visual */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]" style={{ aspectRatio: '16 / 9' }}>
              <Image
                src="/images/u7815321835_Asset_8_Wayfinder_AI_Central_Ecosystem._An_abstra_82f4470c-e2ab-41f1-89ba-e26a9a5b50f5_1.png"
                alt="Wayfinder AI neural network visualization"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1100px"
              />
              {/* Overlay for depth */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,17,25,0.6) 100%)',
                }}
              />
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-sm"
                    style={{
                      background: 'rgba(34,159,161,0.12)',
                      border: '1px solid rgba(34,159,161,0.3)',
                      boxShadow: '0 0 40px rgba(34,159,161,0.15)',
                    }}
                  >
                    <svg className="w-8 h-8 text-[#229FA1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-white/70 tracking-wide">WAYFINDER AI</p>
                  <p className="text-xs text-[#229FA1]/60 uppercase tracking-[3px] mt-1">Neural Core</p>
                </div>
              </div>
            </div>

            {/* CTA under the brain */}
            <div className="text-center mt-10">
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
          </motion.div>
        </div>
      </section>

      {/* ==============================================================
          CTA
          ============================================================== */}
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
    </div>
  );
}

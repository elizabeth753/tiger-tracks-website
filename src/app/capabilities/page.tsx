'use client';

import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { STATS } from '@/lib/stats';
import { useInView } from '@/hooks/useInView';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Framer Motion Presets                                              */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
};

const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type GrowthObjective = 'acquisition' | 'profitability' | 'retention';

interface Capability {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  objective: GrowthObjective;
  objectiveLabel: string;
  description: string;
  extendedDescription: string;
  insiderTactic?: { title: string; detail: string };
  services: string[];
  proof: { headline: string; detail: string };
  linkLabel: string;
  linkHref: string;
  gradient: { from: string; to: string; orb: string };
  imagePlaceholder: { label: string; icon: string };
  image: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const objectiveLabels: Record<GrowthObjective, { label: string; color: string }> = {
  acquisition: { label: 'Customer Acquisition', color: '#5BA4A4' },
  profitability: { label: 'Scaling Profitability', color: '#E8793A' },
  retention: { label: 'Retention & LTV', color: '#7CB4B4' },
};

const capabilities: Capability[] = [
  {
    id: 'media-buying',
    number: '01',
    title: 'Full-Funnel Demand Generation',
    shortTitle: 'Demand Gen',
    objective: 'acquisition',
    objectiveLabel: 'Customer Acquisition',
    description:
      'Acquire customers at scale while maintaining unit economics. We manage $200M+ in annual ad spend using proprietary AI bidding models that adapt in real time to maximize your LTV/CAC ratio.',
    extendedDescription:
      'Most agencies treat media buying as a commodity: set budgets, pick audiences, let the algorithm run. We treat it as applied data science. Our team of ex-Google paid media experts built the auction systems your ads compete in. We combine that insider knowledge with proprietary bid optimization models that analyze thousands of signals per auction.',
    insiderTactic: {
      title: 'Ex-Google Insider Advantage',
      detail:
        'We deploy Alpha/Beta campaign architecture (exact-match "alpha" campaigns siphon proven converters from broad-match "beta" campaigns), Quality Score engineering that reduces CPCs 15-30% before a single bid change, and proprietary auction-time signal layering. On YouTube, we leverage TrueView for Action sequencing and custom intent audiences built from Search query data.',
    },
    services: [
      'Paid Search with Alpha/Beta architecture (Google, Bing, Apple Search Ads)',
      'Paid Social full-funnel builds (Meta, TikTok, Pinterest, Snapchat, Reddit)',
      'Programmatic & Display (DV360, The Trade Desk)',
      'YouTube TrueView for Action & demand gen campaigns',
      'Retail Media (Amazon, Walmart, Instacart, Target)',
      'Connected TV & Streaming Audio',
    ],
    proof: {
      headline: 'AG1: +51% monthly acquired customers, -5% CAC YoY',
      detail:
        'Scaled Meta spend 3x while maintaining efficiency through creative diversification and audience expansion strategy.',
    },
    linkLabel: 'See the AG1 case study',
    linkHref: '/results/ag1-meta',
    gradient: { from: '#5BA4A4', to: '#2d7a7a', orb: '#E8793A' },
    imagePlaceholder: { label: 'Campaign Performance Dashboard', icon: 'chart-bar' },
    image: '/images/media-buying-dashboard.png',
  },
  {
    id: 'creative',
    number: '02',
    title: 'Performance Creative That Converts',
    shortTitle: 'Creative',
    objective: 'acquisition',
    objectiveLabel: 'Customer Acquisition',
    description:
      'Turn creative from a cost center into your highest-leverage growth driver. We produce 500+ data-born assets per month, each designed to lower CAC and scale winning concepts.',
    extendedDescription:
      'Creative is the single biggest lever in paid media, yet most agencies separate creative from performance. We don\'t. Every concept is born from data and built to be tested in structured experiments.',
    services: [
      'Image & Video Ad Creative (static, motion, full-production)',
      'UGC & Creator Content with Paid Allowlisting',
      'Creative Testing Programs (structured A/B and multivariate)',
      'Landing Page Design & Optimization',
      'Brand-to-Performance Creative Strategy',
      'AI-Assisted Creative Concepting & Iteration',
    ],
    proof: {
      headline: 'Anastasia Beverly Hills: +22% Meta ROAS',
      detail:
        'UGC-first TikTok strategy drove 22% ROAS improvement while reducing creative production costs by 40%.',
    },
    linkLabel: 'See the ABH case study',
    linkHref: '/results/anastasia-beverly-hills',
    gradient: { from: '#E8793A', to: '#c45a20', orb: '#5BA4A4' },
    imagePlaceholder: { label: 'Creative Testing Matrix', icon: 'sparkles' },
    image: '/images/creative-ugc-phone-mockup.png',
  },
  {
    id: 'website-cro',
    number: '03',
    title: 'Conversion & Revenue Optimization',
    shortTitle: 'CRO',
    objective: 'profitability',
    objectiveLabel: 'Scaling Profitability',
    description:
      'A 10% lift in conversion rate has the same P&L impact as a 10% reduction in media cost. We find and fix the highest-value friction points so every dollar of traffic works harder.',
    extendedDescription:
      'Our team runs continuous experimentation programs, combining quantitative analytics with qualitative user research to deliver compounding gains. We measure impact in revenue, not just statistical significance.',
    services: [
      'Full Site Builds & Redesigns (Shopify, Custom)',
      'Landing Page A/B & Multivariate Testing',
      'Conversion Rate Optimization Programs',
      'Checkout Flow Optimization',
      'Heatmap & Session Recording Analysis',
      'Post-Purchase Experience Design',
    ],
    proof: {
      headline: 'Online Labels: +37% AOV, +41% Conversion Rate',
      detail:
        'Systematic testing program across PDP and checkout flow delivered compounding gains over 6 months.',
    },
    linkLabel: 'See the Online Labels case study',
    linkHref: '/results/online-labels',
    gradient: { from: '#5BA4A4', to: '#3d8888', orb: '#E8793A' },
    imagePlaceholder: { label: 'Funnel Conversion Heatmap', icon: 'cursor-arrow-rays' },
    image: '/images/ab-testing-browser-mockup.png',
  },
  {
    id: 'analytics',
    number: '04',
    title: 'LTV/CAC Optimization & Measurement',
    shortTitle: 'Analytics',
    objective: 'profitability',
    objectiveLabel: 'Scaling Profitability',
    description:
      'You can\'t scale profitably if you can\'t measure profitably. We build the attribution and measurement infrastructure most agencies skip.',
    extendedDescription:
      'In a post-iOS 14 world, measurement is broken for most brands. We fix it. Our analytics practice builds custom attribution models, implements server-side tracking, runs incrementality tests, and deploys media mix models.',
    insiderTactic: {
      title: 'Ex-Google Insider Advantage',
      detail:
        'Our team includes former Google Analytics and Ads measurement engineers who understand exactly how Google\'s conversion modeling, data-driven attribution, and consent mode work under the hood. We configure enhanced conversions and server-side tagging at a level of precision most agencies can\'t match.',
    },
    services: [
      'Analytics Setup & Server-Side Tracking',
      'Multi-Touch Attribution Modeling',
      'Media Mix Modeling (MMM)',
      'Incrementality Testing',
      'Dashboard & Reporting Infrastructure',
      'Data Warehouse & Integration Architecture',
    ],
    proof: {
      headline: 'AG1: -31% Brand Search CAC via attribution audit',
      detail:
        'Attribution audit revealed $1.2M in misallocated spend. Reallocation drove 31% CAC reduction on brand search within 60 days.',
    },
    linkLabel: 'See the AG1 case study',
    linkHref: '/results/ag1-brand-search',
    gradient: { from: '#5BA4A4', to: '#4a9494', orb: '#E8793A' },
    imagePlaceholder: { label: 'Attribution Model Architecture', icon: 'chart-pie' },
    image: '/images/scatter-plot-data-viz.png',
  },
  {
    id: 'organic-growth',
    number: '05',
    title: 'Organic & AI-Search Visibility',
    shortTitle: 'Organic',
    objective: 'acquisition',
    objectiveLabel: 'Customer Acquisition',
    description:
      'Be found where your customers are looking, including AI-powered search engines. We\'re pioneering Generative Engine Optimization to future-proof your organic visibility.',
    extendedDescription:
      'Search is fragmenting: Google, TikTok, Amazon, ChatGPT, Perplexity. We build organic strategies that work across all of them, with particular depth in GEO.',
    services: [
      'Technical & Content SEO',
      'App Store Optimization (ASO)',
      'Generative Engine Optimization (GEO/AEO)',
      'Content Strategy & Production',
      'Local SEO & Google Business Profile',
      'AI Search Monitoring & Optimization',
    ],
    proof: {
      headline: 'Pioneering GEO intelligence for AI-era visibility',
      detail:
        'Our proprietary GEO monitoring tracks brand mentions across 6 AI platforms, informing content strategy that drives measurable AI referral traffic.',
    },
    linkLabel: 'Read our GEO intelligence',
    linkHref: '/intelligence',
    gradient: { from: '#2d7a7a', to: '#1a5c5c', orb: '#5BA4A4' },
    imagePlaceholder: { label: 'AI Search Visibility Map', icon: 'globe-alt' },
    image: '/images/network-connection-map.png',
  },
  {
    id: 'lifecycle',
    number: '06',
    title: 'Retention & Lifetime Value Growth',
    shortTitle: 'Lifecycle',
    objective: 'retention',
    objectiveLabel: 'Retention & LTV',
    description:
      'The brands that win long-term aren\'t the ones with the lowest CAC. They\'re the ones with the highest LTV. We build lifecycle programs that compound your growth.',
    extendedDescription:
      'Our lifecycle team builds segmented, behavior-triggered programs across email, SMS, and push that increase repeat purchase rate, reduce churn, and maximize customer lifetime value.',
    services: [
      'Email & SMS Strategy and Execution',
      'Behavioral Segmentation & Personalization',
      'LTV-Focused Retention Programs',
      'Win-Back & Re-Engagement Campaigns',
      'Post-Purchase & Loyalty Flows',
      'Subscription Optimization',
    ],
    proof: {
      headline: '2-3x LTV increases across lifecycle clients',
      detail:
        'Data-driven segmentation and trigger-based flows consistently double or triple customer lifetime value within 12 months.',
    },
    linkLabel: 'Start the conversation',
    linkHref: '/get-started',
    gradient: { from: '#E8793A', to: '#d06628', orb: '#5BA4A4' },
    imagePlaceholder: { label: 'Cohort LTV Curves', icon: 'arrow-trending-up' },
    image: '/images/lifecycle-journey-visualization.png',
  },
  {
    id: 'partnerships',
    number: '07',
    title: 'Growth Ecosystem & PE/VC Acceleration',
    shortTitle: 'Partners',
    objective: 'acquisition',
    objectiveLabel: 'Customer Acquisition',
    description:
      'We don\'t just run ads. We build growth ecosystems that connect brands, investors, and platforms into mutually reinforcing relationships.',
    extendedDescription:
      'Our PE/VC practice is unique in the agency world. We work directly with fund operating partners to accelerate portfolio company growth, running audit-led sales motions that convert at 90%+.',
    services: [
      'Audit-Led Sales Motions for PE/VC Portfolios',
      'Referral & Partner Ecosystems',
      'Capability-Led Partner Programs',
      'Co-Marketing & Joint Ventures',
      'Platform Beta Programs & Strategic Partnerships',
      'Investor Relations Marketing Support',
    ],
    proof: {
      headline: '90%+ of fund-referred clients expand scope within 6 months',
      detail:
        'Our audit-first approach builds trust. Portfolio companies consistently expand from single-channel to full-funnel within two quarters.',
    },
    linkLabel: 'Learn about our PE/VC practice',
    linkHref: '/pe-vc',
    gradient: { from: '#2d7a7a', to: '#1f6565', orb: '#E8793A' },
    imagePlaceholder: { label: 'Portfolio Growth Network', icon: 'users' },
    image: '/images/project-timeline-ui.png',
  },
];

const outcomes = [
  { title: 'Acquisition Efficiency', stat: STATS.avg.cacReduction, statLabel: 'avg. CAC reduction', description: 'Sustained downward pressure on cost-per-acquisition through continuous optimization and creative iteration.' },
  { title: 'Incremental Revenue', stat: STATS.avg.roas, statLabel: 'avg. ROAS', description: 'Attributable revenue validated through incrementality testing, not just platform-reported ROAS.' },
  { title: 'Conversion Yield', stat: STATS.avg.cvrLift, statLabel: 'avg. CVR lift', description: 'Measurable lifts to conversion rate, AOV, and funnel efficiency through structured testing.' },
  { title: 'Lifetime Value', stat: STATS.avg.ltvIncrease, statLabel: 'avg. LTV increase', description: 'LTV:CAC ratio improvements from segmented lifecycle and retention programs that drive EBITDA alignment.' },
  { title: 'Budget Acceleration', stat: STATS.avg.scaleSpend6mo, statLabel: 'clients scale spend', description: 'Majority of clients increase managed media budget within 6 months as efficiency improves.' },
  { title: 'Recurring Revenue', stat: STATS.avg.projectToRetainer, statLabel: 'project-to-retainer', description: 'Conversion of audit and project work into long-term retained partnerships.' },
];

const tiers = [
  { name: 'Enterprise', spend: '$1M-$5M/mo ad spend', revenue: '$250M-$2B revenue', description: 'Multi-channel, multi-market strategies with dedicated senior team and custom reporting.', highlighted: true },
  { name: 'Growth-Stage', spend: '$500K-$1M/mo', revenue: '$50M-$250M revenue', description: 'Scaling proven channels while expanding into new acquisition and retention vectors.', highlighted: true },
  { name: 'Mid-Market', spend: '$100K-$500K/mo', revenue: 'Scaling proven channels', description: 'Optimizing core channels and building the measurement infrastructure for scale.', highlighted: false },
  { name: 'Emerging', spend: 'Under $100K/mo', revenue: 'Building the playbook', description: 'We design the repeatable growth playbook and prioritize the highest-ROI channels first.', highlighted: false },
];

const timelinePhases = [
  {
    period: '30 Days',
    title: 'Audit & Foundation',
    items: [
      'Comprehensive channel audit with scored findings',
      'Baseline performance report across all active platforms',
      'Tracking & attribution health check (GA4, pixels, CAPI)',
      'Competitive landscape analysis with share-of-voice data',
      'Strategic roadmap with prioritized quick-wins',
      '3 immediate optimizations launched (avg. 8-12% efficiency gain)',
    ],
  },
  {
    period: '60 Days',
    title: 'Optimization & Testing',
    items: [
      'Restructured campaigns (Alpha/Beta architecture for Search)',
      'First creative testing sprint: 15-20 ad variants in-market',
      'Landing page test plan with 2-3 live experiments',
      'Audience segmentation build across paid channels',
      'Weekly performance dashboard with annotated insights',
      'Bi-weekly strategy calls with your dedicated team',
    ],
  },
  {
    period: '90 Days',
    title: 'Scale & Compound',
    items: [
      'First measurable uplift report: KPIs vs. baseline',
      'Winning creative scaled, losing creative cut (data report)',
      'Channel expansion recommendation with projected ROI',
      'Attribution model v1 deployed and validated',
      'Lifecycle/retention program design (if in scope)',
      '90-day performance review + next quarter growth plan',
    ],
  },
  {
    period: '6 Months',
    title: 'Compounding Growth',
    items: [
      'Cross-channel compounding effects visible',
      'New channel expansion underway',
      'Lifecycle programs driving repeat revenue',
      'Attribution model refined & trusted',
    ],
  },
  {
    period: '12 Months',
    title: 'Full Scale',
    items: [
      'Full-funnel integration delivering compound growth',
      'Managed budget scaled with efficiency gains',
      'LTV and retention metrics at new highs',
      'Strategic partnership fully embedded',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Image Placeholder Component                                        */
/* ------------------------------------------------------------------ */

function ServiceImage({ src, label, gradient }: { src: string; label: string; gradient: { from: string; to: string } }) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden group/img"
      style={{ aspectRatio: '16 / 9' }}
    >
      {/* Real image */}
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
      />
      {/* Subtle gradient overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 40%, ${gradient.to}90 100%)`,
        }}
      />
      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${gradient.from}40, transparent)`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky Sub-Navigation                                              */
/* ------------------------------------------------------------------ */

function ServiceSubNav({ activeId }: { activeId: string }) {
  return (
    <nav className="sticky top-[72px] z-40 bg-tt-gray-900/90 backdrop-blur-md border-b border-tt-gray-700/50">
      <div className="mx-auto max-w-7xl px-6 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 py-3 min-w-max">
          {capabilities.map((cap) => (
            <a
              key={cap.id}
              href={`#${cap.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeId === cap.id
                  ? 'bg-tt-teal/20 text-tt-teal'
                  : 'text-tt-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cap.shortTitle}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 - Hero with Glassmorphism Stat Cards                     */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.15 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 800); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden" style={{
      background: `
        radial-gradient(ellipse 50% 50% at 60% 20%, rgba(91, 164, 164, 0.06) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 20% 70%, rgba(232, 121, 58, 0.04) 0%, transparent 55%),
        #0A1119
      `,
    }}>
      <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden="true" style={{
        backgroundImage: 'url(/images/services-hero.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
      }} />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40"
      >
        <motion.p variants={fadeUp} transition={transition} className="text-tt-teal uppercase tracking-[4px] text-sm font-semibold mb-6">
          GROWTH OBJECTIVES, NOT CHANNEL LISTS
        </motion.p>
        <motion.h1 variants={fadeUp} transition={transition} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
          Acquire. Scale Profitably.
          <br className="hidden md:block" />
          Retain. Repeat.
        </motion.h1>
        <motion.p variants={fadeUp} transition={transition} className="mt-6 text-xl text-tt-gray-400 max-w-3xl leading-relaxed">
          Seven capabilities organized around three growth objectives. Each layer
          compounds the impact of the others. Built by ex-Google leaders who know
          the systems from the inside.
        </motion.p>

        {/* Growth Objective Pills */}
        <motion.div variants={fadeUp} transition={transition} className="mt-8 flex flex-wrap gap-3">
          {Object.entries(objectiveLabels).map(([key, { label, color }]) => (
            <span
              key={key}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
              style={{ borderColor: `${color}40`, color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Hero Stats in Glassmorphism Cards */}
        <motion.div variants={fadeUp} transition={transition} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '$200M+', label: 'Annual ad spend managed' },
            { value: '50+', label: 'Active brand partners' },
            { value: '2,954%', label: '3-year growth (Inc. 5000)' },
            { value: '#123', label: 'Inc. 5000 ranking' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
              }}
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 - Sticky Scroll Capability Areas                         */
/* ------------------------------------------------------------------ */

function CapabilitySection({ capability, index }: { capability: Capability; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.1 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;
  const objStyle = objectiveLabels[capability.objective];

  return (
    <section
      id={capability.id}
      className="relative border-t border-white/[0.04]"
      style={{
        scrollMarginTop: '120px',
        background: `
          radial-gradient(ellipse 60% 40% at ${index % 2 === 0 ? '20%' : '80%'} 30%, ${capability.gradient.from}06 0%, transparent 60%),
          #0A1119
        `,
      }}
    >
      <div ref={ref} className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* ---- LEFT COLUMN: Sticky ---- */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={staggerContainer}
              >
                {/* Objective badge */}
                <motion.div variants={fadeUp} transition={transition}>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
                    style={{
                      backgroundColor: `${objStyle.color}12`,
                      color: objStyle.color,
                      border: `1px solid ${objStyle.color}25`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: objStyle.color }} />
                    {capability.objectiveLabel}
                  </span>
                </motion.div>

                {/* Large number */}
                <motion.p
                  variants={fadeUp}
                  transition={transition}
                  className="text-[7rem] md:text-[9rem] font-extrabold leading-none select-none -ml-2"
                  style={{
                    background: `linear-gradient(180deg, ${capability.gradient.from}25, ${capability.gradient.from}08)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {capability.number}
                </motion.p>

                {/* Title */}
                <motion.h2 variants={fadeUp} transition={transition} className="text-3xl md:text-4xl font-bold text-white tracking-tight -mt-4">
                  {capability.title}
                </motion.h2>

                {/* Description */}
                <motion.p variants={fadeUp} transition={transition} className="mt-5 text-lg text-tt-gray-400 leading-relaxed">
                  {capability.description}
                </motion.p>

                <motion.p variants={fadeUp} transition={transition} className="mt-4 text-base text-tt-gray-500 leading-relaxed">
                  {capability.extendedDescription}
                </motion.p>

                {/* Ex-Google Insider Tactic callout */}
                {capability.insiderTactic && (
                  <motion.div
                    variants={fadeUp}
                    transition={transition}
                    className="mt-8 rounded-xl border border-amber-600/25 bg-amber-950/20 p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.82 4.82L10 13.27l-4.32 2.23.82-4.82L3 7.27l4.91-1.01L10 2z" fill="#E8793A" />
                      </svg>
                      <p className="text-xs font-bold uppercase tracking-[2px] text-amber-400">
                        {capability.insiderTactic.title}
                      </p>
                    </div>
                    <p className="text-amber-200/70 text-sm leading-relaxed">
                      {capability.insiderTactic.detail}
                    </p>
                  </motion.div>
                )}

                {/* CTA Link */}
                <motion.div variants={fadeUp} transition={transition}>
                  <Link
                    href={capability.linkHref}
                    className="mt-8 inline-flex items-center gap-2 text-tt-teal font-semibold transition-colors hover:text-white group"
                  >
                    {capability.linkLabel}
                    <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* ---- RIGHT COLUMN: Scrolling content ---- */}
          <div className="md:col-span-8">
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* 16:9 Service Image */}
              <motion.div variants={scaleIn} transition={transition}>
                <ServiceImage
                  src={capability.image}
                  label={capability.imagePlaceholder.label}
                  gradient={capability.gradient}
                />
              </motion.div>

              {/* Services List */}
              <motion.div variants={fadeUp} transition={transition}>
                <h3 className="text-xs font-semibold uppercase tracking-[3px] text-tt-teal mb-5">
                  What This Includes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {capability.services.map((service, i) => (
                    <motion.div
                      key={service}
                      variants={fadeUp}
                      transition={{ ...transition, delay: i * 0.05 }}
                      className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.03]"
                      style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tt-teal/60" />
                      <span className="text-sm text-tt-gray-300 leading-relaxed">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Proof Point - Bento Card with orange left border */}
              <motion.div variants={fadeUp} transition={transition}>
                <div
                  className="rounded-xl border-l-4 border-l-tt-orange p-6 transition-all duration-300 hover:bg-white/[0.03]"
                  style={{
                    background: 'rgba(20, 25, 32, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderLeft: '4px solid #E8793A',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-[2px] text-tt-orange mb-3">
                    Proof Point
                  </p>
                  <p className="text-white font-semibold text-lg leading-snug mb-2">
                    {capability.proof.headline}
                  </p>
                  <p className="text-tt-gray-400 text-sm leading-relaxed">
                    {capability.proof.detail}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 - Outcomes Framework                                     */
/* ------------------------------------------------------------------ */

function OutcomesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.1 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section id="measure" className="py-24 px-6 border-t border-white/[0.04] scroll-mt-24" style={{
      background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,164,164,0.04) 0%, transparent 60%), #0d1520`,
    }}>
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} transition={transition} className="text-tt-teal uppercase tracking-[4px] text-sm font-semibold mb-4">
            Outcomes
          </motion.p>
          <motion.h2 variants={fadeUp} transition={transition} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            How We Measure Success
          </motion.h2>
          <motion.p variants={fadeUp} transition={transition} className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            Every engagement is measured against outcomes that matter to your P&L, not vanity metrics.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {outcomes.map((outcome) => (
            <motion.div
              key={outcome.title}
              variants={scaleIn}
              transition={transition}
              className="glass-card p-6 card-shimmer"
            >
              <div className="mb-4">
                <AnimatedCounter value={outcome.stat} label={outcome.statLabel} className="text-left" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {outcome.title}
              </h3>
              <p className="text-tt-gray-400 text-sm leading-relaxed">
                {outcome.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 - Client Tiers (Card Grid with Orange Glow)              */
/* ------------------------------------------------------------------ */

function ClientTiersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.1 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section className="py-24 px-6 border-t border-white/[0.04]" style={{
      background: `radial-gradient(ellipse 50% 50% at 70% 50%, rgba(232,121,58,0.03) 0%, transparent 60%), #0A1119`,
    }}>
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} transition={transition} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            We Work With Brands That
            <br className="hidden md:block" />
            Prioritize Measurable Growth
          </motion.h2>
          <motion.p variants={fadeUp} transition={transition} className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            From emerging DTC brands to enterprise portfolios, we tailor our approach to your stage and scale.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={scaleIn}
              transition={transition}
              className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
              style={{
                background: tier.highlighted
                  ? 'rgba(232, 121, 58, 0.04)'
                  : 'rgba(20, 27, 35, 0.5)',
                backdropFilter: 'blur(12px)',
                border: tier.highlighted
                  ? '1px solid rgba(232, 121, 58, 0.25)'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: tier.highlighted
                  ? '0 0 40px rgba(232, 121, 58, 0.08), 0 8px 32px rgba(0,0,0,0.2)'
                  : '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              {tier.highlighted && (
                <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[2px] text-tt-orange bg-tt-orange/10 px-3 py-1 rounded-full">
                  Ideal Fit
                </span>
              )}
              <h3 className="font-bold text-lg text-white mb-3">{tier.name}</h3>
              <p className="text-tt-teal font-semibold mb-1">{tier.spend}</p>
              <p className="text-sm text-tt-gray-400 mb-3">{tier.revenue}</p>
              <p className="text-sm text-tt-gray-500 leading-relaxed">{tier.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 - Glowing Vertical Timeline                              */
/* ------------------------------------------------------------------ */

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.05 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section className="py-24 px-6 border-t border-white/[0.04]" style={{
      background: `radial-gradient(ellipse 50% 40% at 30% 50%, rgba(91,164,164,0.03) 0%, transparent 50%), #0d1520`,
    }}>
      <div ref={ref} className="mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} transition={transition} className="text-tt-teal uppercase tracking-[4px] text-sm font-semibold mb-4">
            YOUR FIRST YEAR
          </motion.p>
          <motion.h2 variants={fadeUp} transition={transition} className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            What Success Looks Like
          </motion.h2>
          <motion.p variants={fadeUp} transition={transition} className="mt-4 text-lg text-tt-gray-400 max-w-2xl mx-auto">
            Every engagement begins with a structured onboarding that delivers measurable results within the first quarter, then compounds.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="relative"
        >
          {/* Vertical Line */}
          <div
            className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, rgba(100,116,139,0.5) 0%, rgba(100,116,139,0.2) 100%)',
            }}
          />

          <div className="space-y-12">
            {timelinePhases.map((phase, i) => (
              <motion.div
                key={phase.period}
                variants={fadeUp}
                transition={{ ...transition, delay: i * 0.12 }}
                className="relative pl-14 md:pl-16"
              >
                {/* Glowing Orange Dot */}
                <div className="absolute left-0 top-1 flex items-center justify-center">
                  {/* Outer glow ring */}
                  <div
                    className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full animate-glow-orange"
                    style={{
                      background: 'radial-gradient(circle, rgba(232,121,58,0.15) 0%, transparent 70%)',
                    }}
                  />
                  {/* Dot */}
                  <div
                    className="relative w-[10px] h-[10px] rounded-full z-10"
                    style={{
                      backgroundColor: '#E8793A',
                      boxShadow: '0 0 12px rgba(232,121,58,0.5), 0 0 24px rgba(232,121,58,0.2)',
                    }}
                  />
                </div>

                {/* Content card */}
                <div
                  className="rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 card-shimmer"
                  style={{
                    background: 'rgba(20, 27, 35, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-tt-orange font-bold text-lg">{phase.period}</span>
                    <span className="h-px flex-1 bg-white/[0.06]" />
                    <span className="text-white font-semibold text-sm">{phase.title}</span>
                  </div>

                  <ul className="space-y-2.5">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                        <svg className="mt-0.5 flex-shrink-0 w-4 h-4 text-tt-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 - SEEEN Interactive Video Commerce                       */
/* ------------------------------------------------------------------ */

function SeenCommerceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const framerInView = useFramerInView(ref, { once: true, amount: 0.15 });
  const [fallback, setFallback] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFallback(true), 1000); return () => clearTimeout(t); }, []);
  const isInView = framerInView || fallback;

  return (
    <section className="py-24 px-6 border-t border-white/[0.04]" style={{
      background: `
        radial-gradient(ellipse 55% 45% at 65% 30%, rgba(91, 164, 164, 0.05) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 25% 70%, rgba(232, 121, 58, 0.03) 0%, transparent 55%),
        #0A1119
      `,
    }}>
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} transition={transition} className="text-center mb-16">
            <p className="text-tt-teal uppercase tracking-[4px] text-sm font-semibold mb-4">
              Exclusive Partnership
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-4xl mx-auto">
              Turn 80% of Video Engagement into Immediate Commerce.
            </h2>
            <p className="mt-6 text-lg text-tt-gray-400 max-w-3xl mx-auto leading-relaxed">
              Through our exclusive partnership with SEEEN plc, we transform passive video consumption into shoppable, high-converting assets. Stop losing users between the view and the checkout.
            </p>
          </motion.div>

          {/* Glassmorphism card with image mockup */}
          <motion.div variants={scaleIn} transition={transition} className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 md:p-12 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(20, 27, 35, 0.6)',
                backdropFilter: 'blur(20px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
              }}
            >
              {/* 16:9 Video Commerce Mockup */}
              <div
                className="seeen-commerce-mockup relative w-full rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: '16 / 9',
                  background: '#1B2126',
                  boxShadow: '0 0 30px rgba(34, 159, 161, 0.12), 0 0 60px rgba(34, 159, 161, 0.06)',
                  border: '1px solid rgba(34, 159, 161, 0.2)',
                }}
              >
                {/* Subtle grid pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="seeen-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#229FA1" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#seeen-grid)" />
                </svg>

                {/* Floating teal accent orb */}
                <div
                  className="absolute rounded-full blur-[100px] animate-mesh-drift"
                  style={{
                    width: '45%',
                    height: '45%',
                    background: '#229FA1',
                    opacity: 0.08,
                    top: '15%',
                    right: '15%',
                  }}
                />

                {/* Floating orange accent orb */}
                <div
                  className="absolute rounded-full blur-[80px]"
                  style={{
                    width: '30%',
                    height: '30%',
                    background: '#FF6B35',
                    opacity: 0.05,
                    bottom: '10%',
                    left: '10%',
                  }}
                />

                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  {/* Play icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(34, 159, 161, 0.15)', border: '1px solid rgba(34, 159, 161, 0.25)' }}
                  >
                    <svg className="w-8 h-8 text-tt-teal ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-base font-semibold text-white/70 tracking-wide">
                    Interactive Video Commerce
                  </p>
                  <p className="text-xs text-tt-gray-500 uppercase tracking-[3px]">
                    Powered by SEEEN
                  </p>
                </div>

                {/* Bottom border glow */}
                <div
                  className="absolute bottom-0 left-[10%] right-[10%] h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(34, 159, 161, 0.35), transparent)',
                  }}
                />

                {/* Corner teal glow accents */}
                <div
                  className="absolute top-0 left-0 w-32 h-32"
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(34, 159, 161, 0.08) 0%, transparent 70%)',
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-32 h-32"
                  style={{
                    background: 'radial-gradient(circle at bottom right, rgba(34, 159, 161, 0.08) 0%, transparent 70%)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Assembly                                                      */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(capabilities[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    capabilities.forEach((cap) => {
      const el = document.getElementById(cap.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveService(cap.id);
          }
        },
        { threshold: 0.15, rootMargin: '-120px 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div>
      <HeroSection />

      <ServiceSubNav activeId={activeService} />

      {capabilities.map((cap, i) => (
        <CapabilitySection key={cap.id} capability={cap} index={i} />
      ))}

      <OutcomesSection />
      <ClientTiersSection />
      <TimelineSection />
      <SeenCommerceSection />

      <CTASection
        headline="Let's Build Your Growth Engine"
        subheadline="Book a free audit and see exactly where your revenue is leaking."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        secondaryCTA={{ text: 'View Case Studies', href: '/results' }}
        dark
      />
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BlogPost, blogPosts } from '@/data/blogPosts';
import { CTASection } from '@/components/CTASection';
import { NotionBlockRenderer } from '@/components/NotionBlockRenderer';
import type { NotionBlock } from '@/lib/notion';

/* ------------------------------------------------------------------ */
/*  Category Image Mapping (fallback when no Notion cover exists)      */
/* ------------------------------------------------------------------ */

const CATEGORY_IMAGES: Record<string, string> = {
  'AI & Automation': '/images/u7815321835_Act_as_an_elite_3D_UIUX_conceptual_artist_special_74b5fb3c-ed00-4c91-a0e7-860928ebe252_2.png',
  'Platform Strategy': '/images/u7815321835_Prompt_for_Article_2_SEOOrganic_Discovery_Abstrac_d2cca25d-600d-402d-8f6c-5e757eda639d_2.png',
  'Measurement & Attribution': '/images/u7815321835_Prompt_for_Article_4_Conversion_Rate_Optimization_72cfca36-1e4b-413a-921f-1f59ea26c504_3.png',
  'Creative & Content': '/images/u7815321835_Prompt_for_Article_3_CreativeUGC_Performance_High_b5888fe1-9bcf-448f-a37f-299e6bf00bb3_2.png',
  'Agency Strategy': '/images/u7815321835_System_Persona_Act_as_an_elite_creative_art_direc_8ad21d42-af5c-4802-a878-67b0de780348_1.png',
  'PE/VC': '/images/u7815321835_High-end_3D_render_minimalist_financial_technolog_ec076a26-4eea-4540-8a0a-71a45f4e61d2_1.png',
};

/* ------------------------------------------------------------------ */
/*  Reading Progress Bar                                               */
/* ------------------------------------------------------------------ */

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #229FA1, #5BA4A4, #229FA1)',
        boxShadow: '0 0 10px rgba(34,159,161,0.5), 0 0 30px rgba(34,159,161,0.2)',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Share Bar                                                          */
/* ------------------------------------------------------------------ */

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== 'undefined' ? window.location.href : '';

  const shareLinkedIn = () => {
    const url = getUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer,width=600,height=500'
    );
  };

  const shareX = () => {
    const url = getUrl();
    window.open(
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      '_blank',
      'noopener,noreferrer,width=600,height=500'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  const btnClass =
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-slate-500 mr-1">Share</span>

      <button
        onClick={shareLinkedIn}
        className={btnClass}
        style={{ background: 'rgba(34,159,161,0.08)', border: '1px solid rgba(34,159,161,0.2)', color: '#229FA1' }}
        aria-label="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </button>

      <button
        onClick={shareX}
        className={btnClass}
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d1d8' }}
        aria-label="Share on X"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X
      </button>

      <button
        onClick={copyLink}
        className={btnClass}
        style={{
          background: copied ? 'rgba(34,159,161,0.15)' : 'rgba(255,255,255,0.05)',
          border: copied ? '1px solid rgba(34,159,161,0.4)' : '1px solid rgba(255,255,255,0.1)',
          color: copied ? '#229FA1' : '#d1d1d8',
        }}
        aria-label="Copy link"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          )}
        </svg>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cinematic Parallax Hero                                            */
/* ------------------------------------------------------------------ */

function CinematicHero({ article }: { article: BlogPost }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  /* Parallax: image moves slower than scroll */
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  /* Fade out as user scrolls past */
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const coverSrc =
    article.coverImage || CATEGORY_IMAGES[article.category] || null;
  const sourceBadge =
    article.source === 'notion' ? 'Research Report' : 'Article';

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ height: '70vh', minHeight: 500 }}
    >
      {/* Background image with parallax */}
      {coverSrc && (
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src={coverSrc}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized={
              coverSrc.startsWith('https://prod-files-secure') ||
              coverSrc.startsWith('https://s3')
            }
          />
        </motion.div>
      )}

      {/* Heavy gradient overlay for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: coverSrc
            ? 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.75) 60%, rgba(10,17,25,1) 100%)'
            : 'linear-gradient(180deg, rgba(10,17,25,0.6) 0%, rgba(10,17,25,1) 100%)',
        }}
      />

      {/* Teal ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 80%, rgba(34,159,161,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 lg:pb-16"
        style={{ opacity }}
      >
        <div className="mx-auto w-full max-w-4xl">
          {/* Back link */}
          <Link
            href="/intelligence"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-[#229FA1] mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Intelligence
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block rounded-full bg-[#229FA1]/15 border border-[#229FA1]/25 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[3px] font-mono text-[#229FA1]">
              {article.category}
            </span>
            <span className="inline-block rounded-full border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-slate-400">
              {sourceBadge}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight max-w-3xl"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {article.title}
          </h1>

          {/* Meta line */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-3">
              {/* Author avatar placeholder */}
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: 'rgba(34,159,161,0.12)',
                  border: '1px solid rgba(34,159,161,0.25)',
                  color: '#229FA1',
                }}
              >
                TT
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  {article.author || 'Tiger Tracks'}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span>{article.date}</span>
                  <span className="text-[#229FA1]">&bull;</span>
                  <span>{article.readTime} read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Share bar */}
          <div className="mt-6">
            <ShareBar title={article.title} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Static Fallback Body (when no Notion blocks are available)         */
/* ------------------------------------------------------------------ */

function StaticArticleBody({ article }: { article: BlogPost }) {
  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="border-l-4 border-[#229FA1] bg-[#1B2126]/50 rounded-r-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-white mb-2">Executive Summary</h2>
        <p className="font-serif italic text-slate-300 text-lg leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      {/* Key Findings */}
      <div>
        <h2 className="mt-14 mb-5 text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Key Findings
        </h2>
        <ul className="space-y-4 ml-0">
          {[
            'The competitive landscape is shifting rapidly as new technologies redefine how brands connect with their audiences, requiring marketers to rethink foundational strategies.',
            'Early adopters who invest in this area are seeing measurable advantages in efficiency, reach, and return on ad spend compared to industry benchmarks.',
            'The window for competitive advantage is narrowing, and organizations that delay adoption risk falling behind peers who have already operationalized these capabilities.',
          ].map((text, i) => (
            <li key={i} className="flex gap-3 text-[#9E9E9E] leading-[1.85]">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#229FA1]" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Market Context */}
      <div>
        <h2 className="mt-14 mb-5 text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Market Context
        </h2>
        <p className="text-[#9E9E9E] leading-[1.85] text-base lg:text-lg">
          This section explores the broader market dynamics driving the trends
          analyzed in this report. Understanding the macroeconomic, regulatory, and
          technological forces at play is critical to interpreting the tactical
          recommendations that follow.
        </p>
        <div className="mt-6 border-l-4 border-[#229FA1] bg-[#1B2126]/50 rounded-r-xl p-6 backdrop-blur-sm">
          <p className="font-serif italic text-slate-300 text-base leading-relaxed">
            Full market analysis with data tables and charts available in the
            complete research report on our Notion platform.
          </p>
        </div>
      </div>

      {/* Strategic Implications */}
      <div>
        <h2 className="mt-14 mb-5 text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Strategic Implications
        </h2>
        <p className="text-[#9E9E9E] leading-[1.85] text-base lg:text-lg">
          Based on our analysis, we identify three primary strategic pathways for
          brands looking to capitalize on these trends. Each pathway is evaluated
          across feasibility, investment requirements, and expected time-to-impact.
        </p>
      </div>

      {/* Tactical Playbook */}
      <div>
        <h2 className="mt-14 mb-5 text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Tactical Playbook
        </h2>
        <p className="text-[#9E9E9E] leading-[1.85] text-base lg:text-lg">
          Our tactical recommendations are designed for immediate implementation.
          Each action item includes priority level, resource requirements, and key
          performance indicators to track progress.
        </p>
        <div className="mt-6 border-l-4 border-[#229FA1] bg-[#1B2126]/50 rounded-r-xl p-6 backdrop-blur-sm">
          <p className="font-serif italic text-slate-300 text-base leading-relaxed">
            Detailed playbook with step-by-step implementation guides available in
            the complete research report on our Notion platform.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 pt-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#229FA1]/20 to-transparent" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#229FA1]/30" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#229FA1]/20 to-transparent" />
      </div>

      {/* Methodology */}
      <div>
        <h3 className="mt-10 mb-4 text-xl lg:text-2xl font-semibold text-white tracking-tight">
          Methodology
        </h3>
        <p className="text-[#9E9E9E] leading-[1.85] text-sm">
          This research combines primary and secondary data sources including
          proprietary campaign performance data, industry analyst reports, platform
          API data, and expert interviews.
        </p>
      </div>

      {/* References */}
      <div>
        <h3 className="mt-10 mb-4 text-xl lg:text-2xl font-semibold text-white tracking-tight">
          References &amp; Further Reading
        </h3>
        <ol className="space-y-2 text-sm text-[#9E9E9E] list-decimal ml-5">
          <li>Industry benchmark data and platform performance reports (2025-2026)</li>
          <li>Tiger Tracks proprietary campaign performance database (n = 500+ campaigns)</li>
          <li>Expert interviews with senior marketing and technology leaders</li>
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Related Article Card (dark theme)                                  */
/* ------------------------------------------------------------------ */

function RelatedCard({ post }: { post: BlogPost }) {
  const [isHovered, setIsHovered] = useState(false);
  const imgSrc = CATEGORY_IMAGES[post.category];

  return (
    <Link
      href={`/intelligence/${post.slug}`}
      className="group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{
        background: '#1B2126',
        border: isHovered
          ? '1px solid rgba(34,159,161,0.35)'
          : '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(34,159,161,0.10) 0%, rgba(10,17,25,0.95) 100%)',
            }}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(27,33,38,0.95) 100%)' }}
        />
      </div>

      <div className="p-6">
        <span className="inline-block rounded-full bg-[#229FA1]/10 border border-[#229FA1]/20 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#229FA1]">
          {post.category}
        </span>
        <h3 className="mt-3 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#229FA1] line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-[#9C9CAE] line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-[#9E9E9E]">
          <span>{post.date}</span>
          <span className="text-[#229FA1]">&bull;</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Bottom border animation */}
      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-500"
        style={{
          width: isHovered ? '100%' : '0%',
          background: 'linear-gradient(90deg, transparent, #229FA1, transparent)',
          boxShadow: isHovered ? '0 0 8px rgba(34,159,161,0.4)' : 'none',
        }}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Article Page (Main Export)                                          */
/* ------------------------------------------------------------------ */

interface ArticlePageClientProps {
  article: BlogPost;
  blocks?: NotionBlock[];
}

export function ArticlePageClient({ article, blocks }: ArticlePageClientProps) {
  const hasNotionContent = blocks && blocks.length > 0;

  /* Related articles */
  const sameCat = blogPosts.filter(
    (p) => p.category === article.category && p.slug !== article.slug,
  );
  const otherPosts = blogPosts.filter(
    (p) => p.category !== article.category && p.slug !== article.slug,
  );
  const related = [...sameCat, ...otherPosts].slice(0, 3);

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Cinematic Parallax Hero */}
      <CinematicHero article={article} />

      {/* ============================================================ */}
      {/*  Article Body - Dark Mode Editorial                           */}
      {/* ============================================================ */}
      <section className="relative" style={{ background: '#0A1119' }}>
        {/* Top fade from hero into body */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10,17,25,1) 0%, transparent 100%)',
          }}
        />

        <motion.article
          className="relative z-10 mx-auto max-w-3xl px-6 py-16 lg:py-24"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {hasNotionContent ? (
            <NotionBlockRenderer blocks={blocks} />
          ) : (
            <StaticArticleBody article={article} />
          )}
        </motion.article>
      </section>

      {/* ============================================================ */}
      {/*  Sticky Share Bar (bottom of article)                         */}
      {/* ============================================================ */}
      <section style={{ background: '#0A1119' }}>
        <div className="mx-auto max-w-3xl px-6 pb-12">
          <div className="flex items-center gap-4 py-6 border-t border-white/[0.06]">
            <ShareBar title={article.title} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Related Research (Dark Theme)                                */}
      {/* ============================================================ */}
      <section className="py-20 px-6" style={{ background: '#0A1119' }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-[#229FA1]/30 to-transparent" />
            <h2 className="text-sm font-bold uppercase tracking-[4px] text-[#229FA1] whitespace-nowrap">
              Related Research
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-[#229FA1]/30 to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((post) => (
              <RelatedCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Put This Research Into Action"
        subheadline="Book a free audit and see how these insights apply to your specific business."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        secondaryCTA={{ text: 'Read More Research', href: '/intelligence' }}
        dark
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BlogPost, blogPosts } from '@/data/blogPosts';
import { CTASection } from '@/components/CTASection';
import { NotionBlockRenderer } from '@/components/NotionBlockRenderer';
import type { NotionBlock } from '@/lib/notion';

/* ------------------------------------------------------------------ */
/*  Category Image Mapping (for related cards)                         */
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
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left print:hidden"
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
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 print:hidden';

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
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
/*  Static Fallback Body (when no Notion blocks are available)         */
/* ------------------------------------------------------------------ */

function StaticArticleBody({ article }: { article: BlogPost }) {
  return (
    <div className="space-y-6 font-serif text-[#9E9E9E] text-justify leading-[1.95] print:text-black print:leading-[1.7]">
      {/* Abstract */}
      <div className="border-l-2 border-[#229FA1] pl-6 py-2 my-8 print:border-black">
        <p className="text-xs font-mono uppercase tracking-[3px] text-[#229FA1] mb-3 not-italic print:text-black">
          Abstract
        </p>
        <p className="text-sm italic text-slate-300 leading-[1.85] print:text-gray-700">
          {article.excerpt}
        </p>
      </div>

      <hr className="border-t border-white/10 my-8 print:border-gray-300" />

      {/* Key Findings */}
      <h2 className="mt-10 mb-4 text-xl font-bold text-white font-sans tracking-tight print:text-black">
        1. Key Findings
      </h2>
      <ul className="space-y-3 ml-5 list-disc marker:text-[#229FA1] print:marker:text-black">
        {[
          'The competitive landscape is shifting rapidly as new technologies redefine how brands connect with their audiences, requiring marketers to rethink foundational strategies.',
          'Early adopters who invest in this area are seeing measurable advantages in efficiency, reach, and return on ad spend compared to industry benchmarks.',
          'The window for competitive advantage is narrowing, and organizations that delay adoption risk falling behind peers who have already operationalized these capabilities.',
        ].map((text, i) => (
          <li key={i} className="leading-[1.85]">{text}</li>
        ))}
      </ul>

      {/* Market Context */}
      <h2 className="mt-10 mb-4 text-xl font-bold text-white font-sans tracking-tight print:text-black">
        2. Market Context
      </h2>
      <p>
        This section explores the broader market dynamics driving the trends
        analyzed in this report. Understanding the macroeconomic, regulatory, and
        technological forces at play is critical to interpreting the tactical
        recommendations that follow.
      </p>

      {/* Strategic Implications */}
      <h2 className="mt-10 mb-4 text-xl font-bold text-white font-sans tracking-tight print:text-black">
        3. Strategic Implications
      </h2>
      <p>
        Based on our analysis, we identify three primary strategic pathways for
        brands looking to capitalize on these trends. Each pathway is evaluated
        across feasibility, investment requirements, and expected time-to-impact.
      </p>

      {/* Tactical Playbook */}
      <h2 className="mt-10 mb-4 text-xl font-bold text-white font-sans tracking-tight print:text-black">
        4. Tactical Playbook
      </h2>
      <p>
        Our tactical recommendations are designed for immediate implementation.
        Each action item includes priority level, resource requirements, and key
        performance indicators to track progress.
      </p>

      <hr className="border-t border-white/10 my-8 print:border-gray-300" />

      {/* Methodology */}
      <h2 className="mt-10 mb-4 text-lg font-bold text-white font-sans tracking-tight print:text-black">
        5. Methodology
      </h2>
      <p className="text-sm">
        This research combines primary and secondary data sources including
        proprietary campaign performance data, industry analyst reports, platform
        API data, and expert interviews.
      </p>

      {/* References */}
      <h2 className="mt-10 mb-4 text-lg font-bold text-white font-sans tracking-tight print:text-black">
        References
      </h2>
      <ol className="space-y-2 text-sm list-decimal ml-5">
        <li>Industry benchmark data and platform performance reports (2025-2026)</li>
        <li>Tiger Tracks proprietary campaign performance database (n = 500+ campaigns)</li>
        <li>Expert interviews with senior marketing and technology leaders</li>
      </ol>
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
/*  Article Page (Main Export) - Academic White Paper Layout            */
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

      {/* ============================================================ */}
      {/*  Full Page Background                                         */}
      {/* ============================================================ */}
      <section
        className="relative min-h-screen py-12 md:py-20 px-4 sm:px-6 print:py-0 print:px-0 print:bg-white"
        style={{ background: '#0A1119' }}
      >
        {/* Back navigation */}
        <div className="mx-auto max-w-4xl mb-6 print:hidden">
          <Link
            href="/intelligence"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-[#229FA1]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Intelligence
          </Link>
        </div>

        {/* ========================================================== */}
        {/*  The Manuscript Container                                    */}
        {/* ========================================================== */}
        <motion.article
          className="mx-auto max-w-4xl bg-[#1B2126] border border-white/10 shadow-2xl rounded-sm p-8 md:p-16 print:bg-white print:border-none print:shadow-none print:rounded-none print:p-[1in] print:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Print/Download Button */}
          <div className="flex justify-end mb-8 print:hidden">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-widest text-slate-400 transition-all duration-300 hover:border-[#229FA1]/30 hover:text-[#229FA1] hover:bg-[#229FA1]/[0.04]"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download / Print Memorandum
            </button>
          </div>

          {/* ====================================================== */}
          {/*  Academic Title Header                                   */}
          {/* ====================================================== */}
          <header className="text-center mb-8">
            {/* Category badge */}
            <div className="mb-6">
              <span className="inline-block font-mono text-[10px] uppercase tracking-[4px] text-[#229FA1] print:text-gray-600">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15] tracking-tight mx-auto max-w-3xl print:text-black"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {article.title}
            </h1>

            {/* Metadata line */}
            <div className="mt-6 font-mono text-[11px] text-[#9E9E9E] uppercase tracking-[2px] leading-relaxed print:text-gray-500">
              <span>Author: {article.author || 'Tiger Tracks Research Division'}</span>
              <span className="mx-3 text-white/20 print:text-gray-300">|</span>
              <span>Published: {article.date || '2026'}</span>
              <span className="mx-3 text-white/20 print:text-gray-300">|</span>
              <span>{article.readTime} read</span>
            </div>

            {/* Share bar */}
            <div className="mt-6 flex justify-center">
              <ShareBar title={article.title} />
            </div>
          </header>

          {/* Manuscript rule */}
          <hr className="border-t border-white/10 mb-10 print:border-gray-300" />

          {/* ====================================================== */}
          {/*  Article Body                                            */}
          {/* ====================================================== */}
          {hasNotionContent ? (
            <NotionBlockRenderer blocks={blocks} />
          ) : (
            <StaticArticleBody article={article} />
          )}

          {/* ====================================================== */}
          {/*  Footer Rule + Share                                     */}
          {/* ====================================================== */}
          <hr className="border-t border-white/10 mt-12 mb-8 print:border-gray-300" />

          <div className="flex items-center justify-between print:hidden">
            <ShareBar title={article.title} />
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 transition hover:text-[#229FA1]"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
              Print
            </button>
          </div>

          {/* Print footer */}
          <div className="hidden print:block mt-12 pt-6 border-t border-gray-300 text-center text-xs text-gray-500">
            <p>Tiger Tracks Research Division &bull; tigertracks.ai &bull; Confidential</p>
          </div>
        </motion.article>
      </section>

      {/* ============================================================ */}
      {/*  Related Research (Dark Theme)                                */}
      {/* ============================================================ */}
      <section className="py-20 px-6 print:hidden" style={{ background: '#0A1119' }}>
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
      <div className="print:hidden">
        <CTASection
          headline="Put This Research Into Action"
          subheadline="Book a free audit and see how these insights apply to your specific business."
          primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
          secondaryCTA={{ text: 'Read More Research', href: '/intelligence' }}
          dark
        />
      </div>
    </>
  );
}

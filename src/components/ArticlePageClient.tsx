'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BlogPost, blogPosts } from '@/data/blogPosts';
import { CTASection } from '@/components/CTASection';
import { NotionBlockRenderer, shouldSkipOptimizer } from '@/components/NotionBlockRenderer';
import type { NotionBlock } from '@/lib/notion';

/* ------------------------------------------------------------------ */
/*  Category Image Mapping (for related cards)                         */
/* ------------------------------------------------------------------ */

const CATEGORY_IMAGES: Record<string, string> = {
  'AI & Automation': '/images/ai-automation-abstract.png',
  'Platform Strategy': '/images/seo-organic-discovery.png',
  'Measurement & Attribution': '/images/conversion-optimization-abstract.png',
  'Creative & Content': '/images/creative-ugc-performance.png',
  'Agency Strategy': '/images/agency-strategy-abstract.png',
  'PE/VC': '/images/pe-vc-financial-tech.png',
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
/*  Content Loading Fallback (when Notion blocks are unavailable)      */
/* ------------------------------------------------------------------ */

function ContentFallback({ article }: { article: BlogPost }) {
  return (
    <div className="py-12 text-center">
      <p className="text-[#F0EFED] text-base font-sans mb-4">
        This article is loading its content from Notion.
      </p>
      {article.excerpt && (
        <p className="text-[#F0EFED]/60 text-base font-sans italic max-w-lg mx-auto mb-8">
          {article.excerpt}
        </p>
      )}
      <p className="text-sm text-[#F0EFED]/40 font-sans">
        If this persists, the content may be temporarily unavailable. Please try refreshing in a moment.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Related Article Card                                               */
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
/*  Format date for metadata line                                      */
/* ------------------------------------------------------------------ */

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

/* ------------------------------------------------------------------ */
/*  Article Page (Main Export) - Notion-Style Layout                    */
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
      {/*  Full Page Background (#191919 = Notion dark mode)            */}
      {/* ============================================================ */}
      <section
        className="relative min-h-screen py-12 md:py-20 px-4 sm:px-6 print:py-0 print:px-0 print:bg-white"
        style={{ background: '#191919' }}
      >
        {/* Back navigation */}
        <div className="mx-auto max-w-[720px] mb-6 print:hidden">
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
        {/*  Content Container (720px, no manuscript border)            */}
        {/* ========================================================== */}
        <motion.article
          className="mx-auto max-w-[720px] print:bg-white print:max-w-none print:p-[1in]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ====================================================== */}
          {/*  Cover Image                                            */}
          {/* ====================================================== */}
          {article.coverImage && (
            <div className="mb-8">
              <Image
                src={article.coverImage}
                alt={article.title}
                width={720}
                height={405}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 720px"
                priority
                unoptimized={shouldSkipOptimizer(article.coverImage)}
              />
            </div>
          )}

          {/* ====================================================== */}
          {/*  Title                                                   */}
          {/* ====================================================== */}
          <header className="mb-8">
            <h1
              className="font-sans text-[40px] font-bold text-[#F0EFED] leading-[48px] print:text-black"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {article.title}
            </h1>

            {/* Metadata line: italic, 16px */}
            <p className="mt-4 text-base font-sans italic text-[#F0EFED]/60 print:text-gray-500">
              Tiger Tracks &middot; Eye of the Tiger &middot; {article.category} &middot; {formatDate(article.date)}
            </p>

            {/* Share bar */}
            <div className="mt-4">
              <ShareBar title={article.title} />
            </div>
          </header>

          {/* Divider */}
          <hr className="border-t border-white/[0.08] mb-6 print:border-gray-300" />

          {/* ====================================================== */}
          {/*  Article Body                                            */}
          {/* ====================================================== */}
          {hasNotionContent ? (
            <NotionBlockRenderer blocks={blocks} />
          ) : (
            <ContentFallback article={article} />
          )}

          {/* ====================================================== */}
          {/*  Footer                                                  */}
          {/* ====================================================== */}
          <hr className="border-t border-white/[0.08] mt-10 mb-6 print:border-gray-300" />

          <div className="flex items-center justify-between print:hidden">
            <ShareBar title={article.title} />
          </div>

          {/* Print footer */}
          <div className="hidden print:block mt-12 pt-6 border-t border-gray-300 text-center text-xs text-gray-500">
            <p>Tiger Tracks &bull; tigertracks.ai</p>
          </div>
        </motion.article>
      </section>

      {/* ============================================================ */}
      {/*  Related Research                                             */}
      {/* ============================================================ */}
      <section className="py-20 px-6 print:hidden" style={{ background: '#191919' }}>
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

'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/data/blogPosts';
import { CTASection } from '@/components/CTASection';
import { useInView } from '@/hooks/useInView';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SWIMLANE_CATEGORIES = [
  'AI & Automation',
  'Platform Strategy',
  'Measurement & Attribution',
  'Creative & Content',
  'Agency Strategy',
  'PE/VC',
] as const;

const DEEP_REPORTS = [
  {
    category: 'PE/VC',
    title: "Unlocking General Catalyst's Customer Value Fund",
    desc: 'Top US subscription companies poised for non-dilutive growth capital.',
    slug: 'unlocking-general-catalysts-customer-value-fund',
  },
  {
    category: 'AI & Automation',
    title: 'The AI Efficiency Playbook',
    desc: 'Which model wins for every task. A comprehensive comparison for marketers.',
    slug: 'the-ai-model-wars-what-gpt-5-4-claude-4-5-and-gemini-2-5-mean-for-your-marketing-stack',
  },
];

/* ------------------------------------------------------------------ */
/*  Utility: Author avatar (initials)                                  */
/* ------------------------------------------------------------------ */

function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-tt-teal/30 to-tt-teal/10 border border-tt-teal/20">
      <span className="text-[10px] font-bold text-tt-teal">{initials}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Author metadata row                                                */
/* ------------------------------------------------------------------ */

function AuthorMeta({ post, showDate = true }: { post: BlogPost; showDate?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {post.author && <AuthorAvatar name={post.author} />}
      <div className="flex flex-col">
        {post.author && (
          <span className="text-xs font-semibold text-white/80">{post.author}</span>
        )}
        <div className="flex items-center gap-2 text-[11px] text-tt-gray-500">
          {post.authorPedigree && (
            <span className="rounded-full bg-tt-teal/8 border border-tt-teal/15 px-2 py-px text-tt-teal font-medium">
              {post.authorPedigree}
            </span>
          )}
          {showDate && <span>{post.date}</span>}
          <span>{post.readTime}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image placeholder                                                  */
/* ------------------------------------------------------------------ */

function ImagePlaceholder({
  category,
  aspect = '16/9',
  large = false,
}: {
  category: string;
  aspect?: string;
  large?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          background: `
            linear-gradient(135deg, rgba(91, 164, 164, 0.12) 0%, rgba(232, 121, 58, 0.06) 50%, rgba(20, 27, 35, 0.9) 100%),
            linear-gradient(180deg, #141b23 0%, #1a2230 100%)
          `,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm border border-white/10">
          <svg
            className={`text-tt-gray-500 ${large ? 'h-10 w-10' : 'h-6 w-6'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <span
          className={`font-semibold uppercase tracking-widest text-tt-gray-500 ${
            large ? 'text-sm' : 'text-xs'
          }`}
        >
          {category}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Horizontal Swimlane                                                */
/* ------------------------------------------------------------------ */

function Swimlane({ title, posts }: { title: string; posts: BlogPost[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (posts.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="rounded-full bg-white/5 p-2 text-tt-gray-400 hover:bg-white/10 hover:text-white transition"
            aria-label="Scroll left"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="rounded-full bg-white/5 p-2 text-tt-gray-400 hover:bg-white/10 hover:text-white transition"
            aria-label="Scroll right"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/intelligence/${post.slug}`}
            className="group flex-none w-[300px] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(91,164,164,0.06)]"
            style={{
              background: '#1B2126',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              scrollSnapAlign: 'start',
            }}
          >
            <div className="overflow-hidden">
              <ImagePlaceholder category={post.category} aspect="16/9" />
            </div>
            <div className="p-5">
              <h4 className="text-sm font-semibold text-white line-clamp-2 transition-colors duration-300 group-hover:text-tt-teal">
                {post.title}
              </h4>
              <p className="mt-2 text-xs text-tt-gray-400 line-clamp-2">{post.excerpt}</p>
              <div className="mt-3">
                <AuthorMeta post={post} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Standard article card (for 3-col grid)                             */
/* ------------------------------------------------------------------ */

function ArticleCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  return (
    <Link
      href={`/intelligence/${post.slug}`}
      className="group block rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(91,164,164,0.06)]"
      style={{
        background: '#1B2126',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="overflow-hidden">
        <ImagePlaceholder category={post.category} aspect="16/9" />
      </div>
      <div className="p-5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-tt-teal">
          {post.category}
        </span>
        <h3 className="mt-2 text-base font-semibold text-white transition-colors duration-300 group-hover:text-tt-teal line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-tt-gray-400 line-clamp-2">{post.excerpt}</p>
        <div className="mt-4">
          <AuthorMeta post={post} />
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Deep Reports Banner                                                */
/* ------------------------------------------------------------------ */

function DeepReportsBanner() {
  return (
    <section
      className="py-16 px-6"
      style={{
        background: `
          linear-gradient(135deg, #0d1520 0%, #111b27 50%, #0d1520 100%)
        `,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f1923 0%, #162030 100%)',
            border: '1px solid rgba(91, 164, 164, 0.15)',
          }}
        >
          <div className="p-10 md:p-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-tt-teal/40 to-transparent" />
              <span className="text-xs font-bold uppercase tracking-[4px] text-tt-teal">
                Deep Reports
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-tt-teal/40 to-transparent" />
            </div>

            <p className="text-center text-tt-gray-400 mb-10 max-w-xl mx-auto">
              In-depth research that goes beyond the blog. Download our premium
              reports and get the full strategic picture.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              {DEEP_REPORTS.map((report) => (
                <Link
                  key={report.slug}
                  href={`/intelligence/${report.slug}`}
                  className="group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span className="inline-block rounded-full bg-tt-teal/10 border border-tt-teal/20 px-3 py-1 text-xs font-semibold text-tt-teal">
                    {report.category}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white group-hover:text-tt-teal transition-colors">
                    {report.title}
                  </h3>
                  <p className="mt-2 text-sm text-tt-gray-400">{report.desc}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-sm font-semibold text-tt-orange flex items-center gap-2">
                      Download Report
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Email capture */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email for early access"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-tt-gray-500 focus:outline-none focus:border-tt-teal/40 transition"
              />
              <button className="shrink-0 rounded-lg bg-tt-teal px-6 py-3 text-sm font-semibold text-white hover:bg-tt-teal-dark transition">
                Get Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function IntelligenceHubClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.05 });

  /* Split posts into zones */
  const featured = posts[0]; // "Beyond the Chatbox"
  const latestSix = posts.slice(1, 7);
  const swimlanePosts = posts.slice(7);

  /* Group remaining posts by category for swimlanes */
  const postsByCategory: Record<string, BlogPost[]> = {};
  for (const cat of SWIMLANE_CATEGORIES) {
    postsByCategory[cat] = swimlanePosts.filter((p) => p.category === cat);
  }

  /* Filtered view (when a category filter is active) */
  const isFiltered = activeCategory !== 'All';
  const filteredPosts = isFiltered
    ? posts.filter((p) => p.category === activeCategory)
    : [];

  const categories = [
    'All',
    'AI & Automation',
    'Platform Strategy',
    'Measurement & Attribution',
    'Creative & Content',
    'PE/VC',
    'Agency Strategy',
  ];

  return (
    <>
      {/* ── Section 1: Header + Hero ─────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: '#0A1119' }}
      >
        {/* Background accent */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 50% 30%, rgba(91, 164, 164, 0.05) 0%, transparent 60%)
            `,
          }}
        />

        <div
          className={`relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-8 transition-all duration-700 ${
            heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[4px] text-tt-teal">
            Intelligence Series
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl max-w-4xl leading-tight">
            Eye of the Tiger: Intelligence Series
          </h1>
          <p className="mt-4 text-lg text-tt-gray-400 max-w-2xl">
            Strategic research and tactical playbooks for the performance era.
          </p>
        </div>

        {/* Hero featured article: 50/50 split */}
        {featured && (
          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-8">
            <Link
              href={`/intelligence/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(91,164,164,0.08)]"
              style={{
                background: '#1B2126',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div className="grid md:grid-cols-2">
                {/* Left: image */}
                <ImagePlaceholder category={featured.category} aspect="4/3" large />

                {/* Right: content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block rounded-full bg-tt-teal/10 border border-tt-teal/20 px-3 py-1 text-xs font-semibold text-tt-teal">
                      {featured.category}
                    </span>
                    <span className="inline-block rounded-full bg-tt-orange/10 border border-tt-orange/20 px-3 py-1 text-xs font-semibold text-tt-orange">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-tt-teal transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-tt-gray-400 leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5">
                    <AuthorMeta post={featured} />
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-tt-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-tt-teal-dark">
                      Read the Report
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </section>

      {/* ── Section 2: Category Filters (sticky) ─────────────────── */}
      <div
        className="sticky top-16 z-30 border-b border-white/5"
        style={{
          background: 'rgba(10, 17, 25, 0.85)',
          backdropFilter: 'blur(16px) saturate(150%)',
          WebkitBackdropFilter: 'blur(16px) saturate(150%)',
        }}
      >
        <div className="mx-auto max-w-6xl py-4 px-6 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat
                    ? 'bg-tt-teal text-white'
                    : 'bg-white/5 text-tt-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── When a category is filtered: simple grid ─────────────── */}
      {isFiltered ? (
        <section
          className="py-16 px-6"
          style={{ background: '#0A1119' }}
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-xl font-bold text-white mb-8">{activeCategory}</h2>
            {filteredPosts.length === 0 ? (
              <p className="py-16 text-center text-tt-gray-500">
                No articles in this category yet.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, i) => (
                  <ArticleCard key={post.slug} post={post} delay={i * 50} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          {/* ── Section 3: Latest Intelligence (3-col grid) ──────── */}
          <section
            ref={gridRef}
            className="py-16 px-6"
            style={{
              background: `
                radial-gradient(ellipse 80% 40% at 50% 0%, rgba(91, 164, 164, 0.03) 0%, transparent 50%),
                #0A1119
              `,
            }}
          >
            <div className="mx-auto max-w-6xl">
              <h2 className="text-xl font-bold text-white mb-8">Latest Intelligence</h2>
              <div
                className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${
                  gridInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                {latestSix.map((post, i) => (
                  <ArticleCard key={post.slug} post={post} delay={i * 50} />
                ))}
              </div>
            </div>
          </section>

          {/* ── Section 4: Deep Reports Interruption ─────────────── */}
          <DeepReportsBanner />

          {/* ── Section 5: Category Swimlanes ────────────────────── */}
          <section className="py-16 px-6" style={{ background: '#0A1119' }}>
            <div className="mx-auto max-w-6xl">
              {SWIMLANE_CATEGORIES.map((cat) => (
                <Swimlane
                  key={cat}
                  title={cat}
                  posts={postsByCategory[cat]}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Section 6: CTA ───────────────────────────────────────── */}
      <CTASection
        headline="Stay Ahead of the Curve"
        subheadline="Subscribe to Tiger Tracks Intelligence for strategic research delivered to your inbox."
        primaryCTA={{ text: 'Request a Strategic Diagnostic', href: '/get-started' }}
        dark
      />

    </>
  );
}

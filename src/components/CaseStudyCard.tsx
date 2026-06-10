'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CaseStudyCardProps {
  slug: string;
  client: string;
  heroMetric: string;
  heroMetricLabel: string;
  category: string;
  channels: string[];
  industry: string;
  challengeType: string;
  summary: string;
  wayfinderTitle: string;
  resultCount: number;
  heroImage?: string;
  isPlaceholder?: boolean;
}

export function CaseStudyCard({
  slug,
  client,
  heroMetric,
  heroMetricLabel,
  category,
  channels,
  industry,
  challengeType,
  summary,
  wayfinderTitle,
  resultCount,
  heroImage,
  isPlaceholder,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/results/${slug}`}
      className="group block relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(91,164,164,0.15)] hover:border-tt-teal/30"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Placeholder badge */}
      {isPlaceholder && (
        <div className="absolute top-3 right-3 z-20 rounded-full bg-tt-orange/15 border border-tt-orange/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-tt-orange">
          Representative
        </div>
      )}

      {/* Hero image area (top 50%) */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-tt-teal/10 to-tt-orange/5">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={`${client} case study`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Fallback gradient with client initials */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1119] via-[#1B2126] to-[#0A1119]" />
            <div className="absolute inset-0 dot-grid-subtle opacity-30" />
            <span className="relative z-10 text-4xl font-extrabold text-tt-teal/20 tracking-widest">
              {client}
            </span>
          </div>
        )}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,17,25,0.9)] via-[rgba(10,17,25,0.3)] to-transparent" />

        {/* Overlay badges on image */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-tt-gray-300">
            {challengeType}
          </span>
        </div>

        {/* Hero metric overlaid at bottom of image */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <p className="text-5xl font-extrabold tabular-nums tracking-tight text-white group-hover:text-tt-teal transition-colors duration-500 leading-none drop-shadow-lg">
            {heroMetric}
          </p>
          <p className="mt-1.5 text-sm text-tt-gray-300 drop-shadow-md">{heroMetricLabel}</p>
        </div>
      </div>

      {/* Content section (bottom 50%) */}
      <div className="relative p-6 pt-4">
        {/* Client name */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-bold uppercase tracking-wider text-tt-teal">
            {client}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-tt-teal/20 to-transparent" />
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-tt-gray-400 line-clamp-2 mb-4">
          {summary}
        </p>

        {/* Channel tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {channels.map((channel) => (
            <span
              key={channel}
              className="rounded-full bg-white/5 border border-white/8 px-3 py-1 text-xs font-medium text-tt-gray-500"
            >
              {channel}
            </span>
          ))}
        </div>

        {/* Wayfinder AI badge */}
        <div className="flex items-center gap-2 py-3 px-3 rounded-lg bg-gradient-to-r from-tt-teal/5 to-transparent border border-tt-teal/10">
          <svg className="w-4 h-4 text-tt-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
          <span className="text-xs text-tt-teal font-medium truncate">
            Wayfinder AI: {wayfinderTitle}
          </span>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-tt-gray-500">
            {resultCount} verified metric{resultCount !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-tt-orange group-hover:text-tt-orange transition-colors">
            <span>Full story</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

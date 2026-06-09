import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogPosts';
import {
  fetchBlogPostBySlug,
  fetchPageBlocks,
} from '@/lib/notion';
import { ArticlePageClient } from '@/components/ArticlePageClient';

export const revalidate = 3600;
export const dynamicParams = true;

/* ------------------------------------------------------------------ */
/*  OG Image Fallbacks (keyed by category)                             */
/* ------------------------------------------------------------------ */

const CATEGORY_OG_IMAGES: Record<string, string> = {
  'AI & Automation': '/images/u7815321835_Act_as_an_elite_3D_UIUX_conceptual_artist_special_74b5fb3c-ed00-4c91-a0e7-860928ebe252_2.png',
  'Platform Strategy': '/images/u7815321835_Prompt_for_Article_2_SEOOrganic_Discovery_Abstrac_d2cca25d-600d-402d-8f6c-5e757eda639d_2.png',
  'Measurement & Attribution': '/images/u7815321835_Prompt_for_Article_4_Conversion_Rate_Optimization_72cfca36-1e4b-413a-921f-1f59ea26c504_3.png',
  'Creative & Content': '/images/u7815321835_Prompt_for_Article_3_CreativeUGC_Performance_High_b5888fe1-9bcf-448f-a37f-299e6bf00bb3_2.png',
  'Agency Strategy': '/images/u7815321835_System_Persona_Act_as_an_elite_creative_art_direc_8ad21d42-af5c-4802-a878-67b0de780348_1.png',
  'PE/VC': '/images/u7815321835_High-end_3D_render_minimalist_financial_technolog_ec076a26-4eea-4540-8a0a-71a45f4e61d2_1.png',
};

const SITE_URL = 'https://tigertracks.ai';
const FALLBACK_DESCRIPTION =
  'Strategic research and tactical playbooks from Tiger Tracks. Inc. 5000 #123 performance marketing agency powered by proprietary AI.';

/* ------------------------------------------------------------------ */
/*  Helper: resolve the article for a given slug (shared by both       */
/*  generateMetadata and the page component)                           */
/* ------------------------------------------------------------------ */

async function resolveArticle(slug: string) {
  let article = await fetchBlogPostBySlug(slug);
  if (!article) {
    article = blogPosts.find((p) => p.slug === slug);
  }
  return article ?? null;
}

/* ------------------------------------------------------------------ */
/*  Dynamic Metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await resolveArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  /* Title uses the layout template: "%s | Tiger Tracks" */
  const title = `${article.title} | Tiger Tracks Intelligence`;
  const description = article.excerpt?.trim() || FALLBACK_DESCRIPTION;

  /* Image priority: Notion cover > category fallback > site default */
  const ogImage =
    article.coverImage ||
    CATEGORY_OG_IMAGES[article.category] ||
    '/images/og-default.png';

  /* Build absolute URL for local images (Notion URLs are already absolute) */
  const ogImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_URL}${ogImage}`;

  const canonicalUrl = `${SITE_URL}/intelligence/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'Tiger Tracks',
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/png',
        },
      ],
      publishedTime: article.date || undefined,
      authors: [article.author || 'Tiger Tracks'],
      tags: [article.category],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@TigerTracksAI',
      site: '@TigerTracksAI',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  // Return only static slugs at build time to avoid Notion API rate limits.
  // All other slugs are fetched on-demand via ISR (dynamicParams = true).
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await resolveArticle(slug);

  if (!article) {
    notFound();
  }

  const blocks = article.pageId
    ? await fetchPageBlocks(article.pageId)
    : [];

  return <ArticlePageClient article={article} blocks={blocks} />;
}

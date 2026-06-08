import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogPosts';
import { fetchBlogPosts, fetchBlogPostBySlug } from '@/lib/notion';
import { ArticlePageClient } from '@/components/ArticlePageClient';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await fetchBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    // Fall back to static data for static export
    return blogPosts.map((post) => ({ slug: post.slug }));
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article = await fetchBlogPostBySlug(slug);

  // Final fallback to static data
  if (!article) {
    article = blogPosts.find((p) => p.slug === slug);
  }

  if (!article) {
    notFound();
  }

  return <ArticlePageClient article={article} />;
}

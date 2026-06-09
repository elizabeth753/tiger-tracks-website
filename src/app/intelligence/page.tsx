import type { Metadata } from 'next';
import { fetchBlogPosts } from '@/lib/notion';
import { IntelligenceHubClient } from '@/components/IntelligenceHubClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Intelligence Series',
  description:
    'Strategic research and tactical playbooks for the performance era. Deep analysis from the ex-Google team at Tiger Tracks.',
  openGraph: {
    title: 'Intelligence Series | Tiger Tracks',
    description:
      'Strategic research and tactical playbooks for the performance era. Deep analysis from the ex-Google team at Tiger Tracks.',
    url: 'https://tigertracks.ai/intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intelligence Series | Tiger Tracks',
    description:
      'Strategic research and tactical playbooks for the performance era.',
  },
};

export default async function IntelligencePage() {
  const posts = await fetchBlogPosts();

  return <IntelligenceHubClient posts={posts} />;
}

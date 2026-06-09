import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { IntelligenceHubClient } from '@/components/IntelligenceHubClient';

export const metadata: Metadata = {
  title: 'Intelligence Series',
  description:
    'Eye of the Tiger Intelligence Series -- AI strategy briefings for business leaders.',
  openGraph: {
    title: 'Intelligence Series | Tiger Tracks',
    description:
      'Eye of the Tiger Intelligence Series -- AI strategy briefings for business leaders.',
    url: 'https://tigertracks.ai/intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intelligence Series | Tiger Tracks',
    description:
      'Eye of the Tiger Intelligence Series -- AI strategy briefings for business leaders.',
  },
};

export default function IntelligencePage() {
  return <IntelligenceHubClient posts={blogPosts} />;
}

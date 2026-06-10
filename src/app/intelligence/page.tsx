import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { IntelligenceHubClient } from '@/components/IntelligenceHubClient';

export const metadata: Metadata = {
  title: 'Thought Leadership & Intelligence',
  description:
    'Eye of the Tiger Thought Leadership & Intelligence -- AI strategy briefings for business leaders.',
  openGraph: {
    title: 'Thought Leadership & Intelligence | Tiger Tracks',
    description:
      'Eye of the Tiger Thought Leadership & Intelligence -- AI strategy briefings for business leaders.',
    url: 'https://tigertracks.ai/intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thought Leadership & Intelligence | Tiger Tracks',
    description:
      'Eye of the Tiger Thought Leadership & Intelligence -- AI strategy briefings for business leaders.',
  },
};

export default function IntelligencePage() {
  return <IntelligenceHubClient posts={blogPosts} />;
}

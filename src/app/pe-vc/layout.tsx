import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PE & VC Partners',
  description:
    'Performance marketing partner for private equity and venture capital portfolio companies. Tiger Tracks accelerates growth across your portfolio.',
  openGraph: {
    title: 'PE & VC Partners | Tiger Tracks',
    description:
      'Performance marketing partner for PE and VC portfolio companies.',
    url: 'https://tigertracks.ai/pe-vc',
    images: [{ url: 'https://tigertracks.ai/images/social-share-card-bg.png' }],
  },
};

export default function PEVCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

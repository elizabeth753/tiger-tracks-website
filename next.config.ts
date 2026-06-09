import type { NextConfig } from 'next';

// Vercel handles Next.js natively with SSR/ISR — no need for static export.
// The previous `output: 'export'` has been removed to enable full Next.js
// features on Vercel (API routes, ISR, middleware, image optimization, etc.).
const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/intelligence',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/get-started',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/results',
        permanent: true,
      },
      {
        source: '/insights/case-studies',
        destination: '/results',
        permanent: true,
      },
      {
        source: '/insights/case-study/capezio',
        destination: '/results/capezio',
        permanent: true,
      },
      {
        source: '/insights/case-study/dovetail',
        destination: '/results/dovetail',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

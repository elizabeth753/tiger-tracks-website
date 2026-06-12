import type { NextConfig } from 'next';

// Vercel handles Next.js natively with SSR/ISR — no need for static export.
// The previous `output: 'export'` has been removed to enable full Next.js
// features on Vercel (API routes, ISR, middleware, image optimization, etc.).
const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    // Allow external article images (Manus CDN + Notion file uploads).
    // Without these, /_next/image rejects remote URLs with a 400 and
    // article images render as broken alt text.
    remotePatterns: [
      { protocol: 'https', hostname: 'files.manuscdn.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'www.notion.so' },
    ],
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
      {
        source: '/pe-vc-partners',
        destination: '/pe-vc',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

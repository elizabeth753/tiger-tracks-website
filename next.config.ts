import type { NextConfig } from 'next';

// Vercel handles Next.js natively with SSR/ISR — no need for static export.
// The previous `output: 'export'` has been removed to enable full Next.js
// features on Vercel (API routes, ISR, middleware, image optimization, etc.).
const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
};

export default nextConfig;

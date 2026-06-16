'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Core Web Vitals field-data reporter (dependency-free).
 *
 * Pushes each metric (LCP, CLS, INP, FCP, TTFB, FID) into the GTM dataLayer so
 * it can be forwarded to GA4 / any analytics destination once a real GTM
 * container ID replaces the GTM-PLACEHOLDER in layout.tsx.
 *
 * For Vercel's hosted field data, additionally enable Speed Insights in the
 * Vercel project settings (or add the `@vercel/speed-insights` package and
 * render <SpeedInsights /> here).
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'web-vitals',
      metric_name: metric.name,
      metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
    });
  });

  return null;
}

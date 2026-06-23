import type { MetadataRoute } from 'next';

const SITE_URL = 'https://tigertracks.ai';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // NOTE: Do not disallow /about, /services, /case-studies, /insights here.
      // Those paths 301-redirect to canonical equivalents (see next.config.ts).
      // Google must be allowed to crawl them so it can follow the redirect and
      // consolidate them to the canonical URL. Blocking them in robots.txt strands
      // the old URLs in the index with no snippet ("No information is available").
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

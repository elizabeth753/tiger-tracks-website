import type { MetadataRoute } from 'next';

const SITE_URL = 'https://tigertracks.ai';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Legacy / duplicate routes that 301-redirect to canonical equivalents.
      disallow: ['/about', '/services', '/case-studies', '/insights'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

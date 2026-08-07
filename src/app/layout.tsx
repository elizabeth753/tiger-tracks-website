import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClientBody } from '@/components/ClientBody';
import { WebVitals } from '@/components/WebVitals';
import { CookieConsent } from '@/components/CookieConsent';

const SITE_URL = 'https://tigertracks.ai';
const OG_IMAGE = '/images/social-share-card-bg.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
    template: '%s | Tiger Tracks',
  },
  description:
    'Inc. 5000 #123 agency with 2,954% growth. Tiger Tracks delivers full-funnel performance marketing powered by proprietary AI for brands spending $100K–$5M/month. Book your free Strategic Diagnostic.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Tiger Tracks',
    title: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
    description:
      'Inc. 5000 #123 agency with 2,954% growth. Proprietary AI. Trusted by AG1, ABH, and 50+ growth brands.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Tiger Tracks - Performance Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
    description:
      'Inc. 5000 #123 agency with 2,954% growth. Proprietary AI. Trusted by AG1, ABH, and 50+ growth brands.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Office locations for LocalBusiness structured data.
// Fill in streetAddress / postalCode per office once confirmed; they are
// emitted into the structured data only when present (see below), so partial
// data is safe to ship.
interface Office {
  city: string;
  region: string;
  streetAddress?: string;
  postalCode?: string;
}

const OFFICES: Office[] = [
  { city: 'Palm Beach', region: 'FL' },
  { city: 'New York', region: 'NY' },
  { city: 'Chicago', region: 'IL' },
  { city: 'Los Angeles', region: 'CA' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Consent Mode v2 defaults (denied) + Cookiebot CMP - must precede GTM */}
        <CookieConsent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TGZKSQMT');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tiger Tracks',
              url: 'https://tigertracks.ai',
              logo: 'https://tigertracks.ai/images/TT.LOGO-02.png',
              description: 'Inc. 5000 #123 performance marketing agency built by ex-Google leaders.',
              foundingDate: '2019',
              sameAs: [
                'https://www.linkedin.com/company/tiger-tracks-ai',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@tigertracks.ai',
                contactType: 'sales',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Tiger Tracks',
              url: 'https://tigertracks.ai',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              OFFICES.map((o) => ({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: `Tiger Tracks - ${o.city}`,
                url: 'https://tigertracks.ai',
                image: 'https://tigertracks.ai/images/TT.LOGO-02.png',
                parentOrganization: { '@type': 'Organization', name: 'Tiger Tracks' },
                address: {
                  '@type': 'PostalAddress',
                  ...(o.streetAddress && { streetAddress: o.streetAddress }),
                  addressLocality: o.city,
                  addressRegion: o.region,
                  ...(o.postalCode && { postalCode: o.postalCode }),
                  addressCountry: 'US',
                },
              })),
            ),
          }}
        />
      </head>
      <body className="font-sans antialiased text-white">
        <WebVitals />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGZKSQMT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ClientBody>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-tt-orange focus:text-white focus:rounded-md focus:outline-none"
          >
            Skip to content
          </a>
          <div className="ambient-light" aria-hidden="true" />
          <Navbar />
          <main id="main-content" className="relative z-[5]">{children}</main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClientBody } from '@/components/ClientBody';

// Tracking components — extracted from legacy tigertracks.ai
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/tracking/GoogleTagManager';
import { HubSpotTracking } from '@/components/tracking/HubSpotTracking';
import { MetaPixel } from '@/components/tracking/MetaPixel';
import { HubSpotMeetingEvents } from '@/components/tracking/HubSpotMeetingEvents';

export const metadata: Metadata = {
  title: {
      default: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
          template: '%s | Tiger Tracks',
            },
              description:
                  'Inc. 5000 #123 agency with 2,954% growth. Tiger Tracks delivers full-funnel performance marketing powered by proprietary AI for brands spending $100K-$5M/month. Book your free audit.',
                    keywords: [
                        'performance marketing agency',
                            'ex-Google marketing',
                                'digital marketing agency',
                                    'PE portfolio marketing',
                                        'AI marketing platform',
                                            'paid media agency',
                                                'growth marketing',
                                                  ],
                                                    openGraph: {
                                                        type: 'website',
                                                            locale: 'en_US',
                                                                url: 'https://tigertracks.ai',
                                                                    siteName: 'Tiger Tracks',
                                                                        title: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
                                                                            description:
                                                                                  'Inc. 5000 #123 agency with 2,954% growth. Proprietary AI. Trusted by AG1, ABH, and 50+ growth brands.',
                                                                                    },
                                                                                      twitter: {
                                                                                          card: 'summary_large_image',
                                                                                              title: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
                                                                                                  description:
                                                                                                        'Inc. 5000 #123 agency with 2,954% growth. Proprietary AI. Trusted by AG1, ABH, and 50+ growth brands.',
                                                                                                          },
                                                                                                            robots: {
                                                                                                                index: true,
                                                                                                                    follow: true,
                                                                                                                      },
                                                                                                                        verification: {
                                                                                                                            google: 'NJCbWRQQDLmkvCYAkbjIxTJ-UuClVYayvFqoz67Xns4',
                                                                                                                              },
                                                                                                                              };

                                                                                                                              export default function RootLayout({
                                                                                                                                children,
                                                                                                                                }: {
                                                                                                                                  children: React.ReactNode;
                                                                                                                                  }) {
                                                                                                                                    return (
                                                                                                                                        <html lang="en">
                                                                                                                                              <head>
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
                                                                                                                                                                                                                                                <GoogleTagManagerHead />
                                                                                                                                                                                                                                                      </head>
                                                                                                                                                                                                                                                            <body className="font-sans antialiased text-white">
                                                                                                                                                                                                                                                                    <GoogleTagManagerBody />
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
                                                                                                                                                                                                                                                                                                                                                                                                      <HubSpotTracking />
                                                                                                                                                                                                                                                                                                                                                                                                              <MetaPixel />
                                                                                                                                                                                                                                                                                                                                                                                                                      <HubSpotMeetingEvents />
                                                                                                                                                                                                                                                                                                                                                                                                                            </body>
                                                                                                                                                                                                                                                                                                                                                                                                                                </html>
                                                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                                                  }
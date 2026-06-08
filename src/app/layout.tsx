import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ClientBody } from '@/components/ClientBody';

export const metadata: Metadata = {
  title: {
    default: 'Tiger Tracks | Performance Marketing Built by Ex-Google Leaders',
    template: '%s | Tiger Tracks',
  },
  description:
    'Inc. 5000 #123 agency with 2,954% growth. Tiger Tracks delivers full-funnel performance marketing powered by proprietary AI for brands spending $100K–$5M/month. Book your free audit.',
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
      </head>
      <body className="font-sans antialiased text-white">
        <ClientBody>
          <div className="ambient-light" aria-hidden="true" />
          <Navbar />
          <main className="relative z-[5]">{children}</main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}

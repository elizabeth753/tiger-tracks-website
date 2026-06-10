import { GoogleTagManager as NextGTM } from '@next/third-parties/google';

const GTM_ID = 'GTM-TGZKSQMT';

/**
 * Place <GoogleTagManagerHead /> inside <head> in layout.tsx.
  * Uses Next.js optimized script loading — no render blocking.
   */
   export function GoogleTagManagerHead() {
     return <NextGTM gtmId={GTM_ID} />;
     }

     /**
      * Place <GoogleTagManagerBody /> immediately after <body> in layout.tsx.
       * This is the noscript iframe fallback required by GTM.
        */
        export function GoogleTagManagerBody() {
          return (
              <noscript>
                    <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                                    height="0"
                                            width="0"
                                                    style={{ display: 'none', visibility: 'hidden' }}
                                                          />
                                                              </noscript>
                                                                );
                                                                }
import Script from 'next/script';

const HS_PORTAL_ID = '44278456';

export function HubSpotTracking() {
  return (
      <Script
            id="hs-script-loader"
                  src={`//js.hs-scripts.com/${HS_PORTAL_ID}.js`}
                        strategy="afterInteractive"
                            />
                              );
                              }
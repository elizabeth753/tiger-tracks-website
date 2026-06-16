import Script from 'next/script';

/**
 * Cookie consent + Google Consent Mode v2.
 *
 * 1. ConsentModeDefault sets all consent signals to "denied" BEFORE GTM/gtag
 *    loads, so no non-essential tags fire until the visitor opts in. This runs
 *    with strategy="beforeInteractive" so it precedes the GTM bootstrap.
 * 2. CookiebotScript loads the Cookiebot (by Usercentrics) CMP, which renders
 *    the banner, blocks non-essential cookies/tags automatically, and updates
 *    Consent Mode when the visitor makes a choice.
 *
 * Setup: create a Cookiebot account, then set NEXT_PUBLIC_COOKIEBOT_ID to your
 * domain group ID. Until that env var is present, the banner does not load (the
 * Consent Mode "denied" default still applies, keeping the site privacy-safe).
 */

export function CookieConsent() {
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;

  return (
    <>
      <Script id="consent-mode-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'denied',
            personalization_storage: 'denied',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('set', 'ads_data_redaction', true);
        `}
      </Script>

      {cookiebotId && (
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={cookiebotId}
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
      )}
    </>
  );
}

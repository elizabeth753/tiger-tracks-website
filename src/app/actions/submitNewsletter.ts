'use server';

/* ------------------------------------------------------------------ */
/*  Newsletter subscription server action                             */
/*  Captures an email for the "Eye of the Tiger" intelligence series  */
/*  and pushes it to HubSpot via the Forms API (same portal as the    */
/*  diagnostic form). Best-effort Slack ping for visibility.          */
/* ------------------------------------------------------------------ */

const HUBSPOT_PORTAL_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '44278456';

// Dedicated newsletter form GUID if provided, otherwise fall back to the
// shared diagnostic form so subscriptions are never dropped.
const HUBSPOT_NEWSLETTER_FORM_GUID =
  process.env.NEXT_PUBLIC_HUBSPOT_NEWSLETTER_FORM_GUID ||
  process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID ||
  '7ebf07f8-8a2d-4120-8502-e40e863e6126';

export interface NewsletterPayload {
  email: string;
  /** Article/page the signup came from, for attribution. */
  source?: string;
  /** HubSpot tracking cookie + page context (passed from client). */
  hutk?: string;
  pageUri?: string;
  pageName?: string;
  /** Honeypot field - must stay empty. If a value arrives, it's a bot. */
  hp?: string;
}

export interface NewsletterResult {
  success: boolean;
  message: string;
}

async function submitToHubSpot(p: NewsletterPayload): Promise<boolean> {
  const fields = [
    { name: 'email', value: p.email.trim() },
    {
      name: 'message',
      value: `Newsletter signup - Eye of the Tiger intelligence series${
        p.source ? ` (from: ${p.source})` : ''
      }`,
    },
  ];

  const context: Record<string, string> = {
    pageUri: p.pageUri || 'https://tigertracks.ai/intelligence',
    pageName: p.pageName || 'Tiger Tracks Intelligence',
  };
  if (p.hutk) context.hutk = p.hutk;

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_NEWSLETTER_FORM_GUID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context }),
      },
    );
    if (res.ok) return true;
    console.error(
      '[submitNewsletter] HubSpot error:',
      res.status,
      await res.text(),
    );
    return false;
  } catch (err) {
    console.error('[submitNewsletter] HubSpot exception:', err);
    return false;
  }
}

async function postToSlack(p: NewsletterPayload): Promise<boolean> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return false;
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `*New newsletter subscriber* :tada:\n:email: ${p.email.trim()}${
          p.source ? `\n:page_facing_up: From: ${p.source}` : ''
        }`,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitNewsletter(
  payload: NewsletterPayload,
): Promise<NewsletterResult> {
  /* Honeypot: pretend success so the bot does not retry. */
  if (payload.hp && payload.hp.trim() !== '') {
    return { success: true, message: 'Subscribed.' };
  }

  if (!payload.email?.trim()) {
    return { success: false, message: 'Email is required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  const [hubspotOk] = await Promise.all([
    submitToHubSpot(payload),
    postToSlack(payload),
  ]);

  if (hubspotOk) {
    return { success: true, message: "You're subscribed. Watch your inbox." };
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn('[submitNewsletter] Dev mode, logging:', payload.email);
    return { success: true, message: 'Logged locally (dev mode).' };
  }

  return {
    success: false,
    message: 'We could not subscribe you right now. Please try again shortly.',
  };
}

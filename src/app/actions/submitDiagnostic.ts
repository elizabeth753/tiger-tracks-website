'use server';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DiagnosticPayload {
  goal: string;
  budget: string;
  name: string;
  email: string;
  companyUrl: string;
}

export interface DiagnosticResult {
  success: boolean;
  message: string;
}

/* ------------------------------------------------------------------ */
/*  Server Action                                                      */
/* ------------------------------------------------------------------ */

export async function submitDiagnostic(
  payload: DiagnosticPayload
): Promise<DiagnosticResult> {
  /* ---- Validation ---- */
  if (!payload.name?.trim()) {
    return { success: false, message: 'Name is required.' };
  }
  if (!payload.email?.trim()) {
    return { success: false, message: 'Email is required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  /* ---- Build the outbound body ---- */
  const body = {
    goal: payload.goal,
    budget: payload.budget,
    name: payload.name.trim(),
    email: payload.email.trim(),
    companyUrl: payload.companyUrl?.trim() || '',
    submittedAt: new Date().toISOString(),
    source: 'tiger-tracks-diagnostic-form',
  };

  /* ---- 1. Primary: Webhook (Zapier / Make / CRM) ---- */
  const webhookUrl = process.env.WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok) {
        return { success: true, message: 'Diagnostic request received.' };
      }

      /* Non-200 from webhook: fall through to Formspree fallback */
      console.error(
        `[submitDiagnostic] Webhook returned ${res.status}: ${res.statusText}`
      );
    } catch (err) {
      console.error('[submitDiagnostic] Webhook error:', err);
    }
  }

  /* ---- 2. Fallback: Formspree ---- */
  const formspreeId = process.env.FORMSPREE_ID;

  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok) {
        return { success: true, message: 'Diagnostic request received.' };
      }

      console.error(
        `[submitDiagnostic] Formspree returned ${res.status}: ${res.statusText}`
      );
    } catch (err) {
      console.error('[submitDiagnostic] Formspree error:', err);
    }
  }

  /* ---- Neither configured or both failed ---- */
  if (!webhookUrl && !formspreeId) {
    console.warn(
      '[submitDiagnostic] Neither WEBHOOK_URL nor FORMSPREE_ID is set. ' +
        'Logging payload for dev:',
      body
    );
    /* In dev, treat as success so the UI flow works end-to-end */
    if (process.env.NODE_ENV === 'development') {
      return { success: true, message: 'Logged locally (dev mode).' };
    }
  }

  return {
    success: false,
    message:
      'We were unable to process your request right now. Please try again or email us directly.',
  };
}

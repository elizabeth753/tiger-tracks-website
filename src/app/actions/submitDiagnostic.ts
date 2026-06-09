'use server';

import { Resend } from 'resend';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DiagnosticPayload {
  goal: string;
  budget: string;
  channels?: string;
  name: string;
  email: string;
  companyUrl: string;
}

export interface DiagnosticResult {
  success: boolean;
  message: string;
}

/* ------------------------------------------------------------------ */
/*  Email Template                                                     */
/* ------------------------------------------------------------------ */

function buildEmailHtml(body: Record<string, string>): string {
  const rows = [
    ['Name', body.name],
    ['Email', body.email],
    ['Company URL', body.companyUrl || 'Not provided'],
    ['Goal', body.goal],
    ['Budget', body.budget],
    ['Channels', body.channels || 'Not specified'],
    ['Submitted', body.submittedAt],
  ];

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #0A1119; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #229FA1, #1e8b8d); padding: 32px 24px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">
          New Diagnostic Request
        </h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
          Tiger Tracks Strategic Diagnostic Form
        </p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${rows
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #9E9E9E; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; width: 130px; vertical-align: top;">
                ${label}
              </td>
              <td style="padding: 12px 8px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #ffffff; font-size: 14px;">
                ${value}
              </td>
            </tr>
          `,
            )
            .join('')}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: rgba(34,159,161,0.08); border: 1px solid rgba(34,159,161,0.2); border-radius: 8px;">
          <p style="margin: 0; color: #229FA1; font-size: 13px;">
            Reply directly to this email to reach <strong>${body.name}</strong> at <strong>${body.email}</strong>.
          </p>
        </div>
      </div>
      <div style="padding: 16px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06);">
        <p style="margin: 0; color: #6b7280; font-size: 11px;">
          Sent from tigertracks.ai diagnostic form
        </p>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Server Action                                                      */
/* ------------------------------------------------------------------ */

export async function submitDiagnostic(
  payload: DiagnosticPayload,
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
  const body: Record<string, string> = {
    goal: payload.goal,
    budget: payload.budget,
    channels: payload.channels || '',
    name: payload.name.trim(),
    email: payload.email.trim(),
    companyUrl: payload.companyUrl?.trim() || '',
    submittedAt: new Date().toISOString(),
    source: 'tiger-tracks-diagnostic-form',
  };

  /* ---- Resend ---- */
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);

      const { error } = await resend.emails.send({
        from: 'Tiger Tracks <notifications@tigertracks.ai>',
        to: ['info@tigertracks.ai'],
        replyTo: payload.email.trim(),
        subject: `New Diagnostic Request from ${body.name}`,
        html: buildEmailHtml(body),
      });

      if (!error) {
        return { success: true, message: 'Diagnostic request received.' };
      }

      console.error('[submitDiagnostic] Resend error:', error);
    } catch (err) {
      console.error('[submitDiagnostic] Resend exception:', err);
    }
  }

  /* ---- Resend not configured ---- */
  if (!resendKey) {
    console.warn(
      '[submitDiagnostic] RESEND_API_KEY is not set. Logging payload for dev:',
      body,
    );
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

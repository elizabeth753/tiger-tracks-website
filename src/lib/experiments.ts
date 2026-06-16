/**
 * experiments.ts
 * -----------------------------------------------------------------------------
 * Lightweight, dependency-free A/B testing scaffold for Tiger Tracks.
 *
 * Goals:
 *  - Stable, deterministic variant assignment per visitor (cookie-based id).
 *  - No external libraries, no client runtime cost.
 *  - Easy to override for QA via a query parameter.
 *  - Analysis happens downstream by recording an "exposure" event to the
 *    dataLayer (GTM / GA4), keyed by experiment + variant.
 *
 * IMPORTANT: This file is the scaffold only. No existing page is wired to run a
 * live test. To launch a test you opt a single component in (see USAGE below).
 *
 * -----------------------------------------------------------------------------
 * HOW IT WORKS
 * -----------------------------------------------------------------------------
 * Each visitor gets a persistent random id stored in the `tt_uid` cookie. We
 * hash (experiment name + uid) into a number and bucket it. Because the uid is
 * stable, a given visitor always lands in the same variant for a given
 * experiment, across page loads and across experiments independently.
 *
 * -----------------------------------------------------------------------------
 * USAGE - SERVER COMPONENT (recommended)
 * -----------------------------------------------------------------------------
 * In a Server Component you can read/set the cookie via next/headers. Because
 * Server Components cannot set cookies directly, either (a) ensure `tt_uid` is
 * set in middleware (preferred, see below), or (b) fall back to assigning a
 * transient id when the cookie is absent.
 *
 *   // app/some-page/page.tsx (server component)
 *   import { cookies } from 'next/headers';
 *   import { assignVariant, getOverrideFromSearchParams } from '@/lib/experiments';
 *
 *   export default async function Page({
 *     searchParams,
 *   }: {
 *     searchParams: Promise<Record<string, string | string[] | undefined>>;
 *   }) {
 *     const sp = await searchParams;
 *     const cookieStore = await cookies();
 *     const uid = cookieStore.get('tt_uid')?.value;
 *
 *     // Query override (?exp_hero-form=variant) wins for QA; otherwise hash.
 *     const variant =
 *       getOverrideFromSearchParams('hero-form', sp) ??
 *       assignVariant('hero-form', uid);
 *
 *     return variant === 'variant' ? <HeroWithForm /> : <CleanerHero />;
 *   }
 *
 * Then record exposure on the client (see recordExposure / dataLayer section).
 *
 * -----------------------------------------------------------------------------
 * USAGE - MIDDLEWARE (to guarantee a stable cookie)
 * -----------------------------------------------------------------------------
 * Middleware is the cleanest place to mint `tt_uid` so every request downstream
 * has a stable id. Example middleware.ts at the project root:
 *
 *   import { NextResponse, type NextRequest } from 'next/server';
 *   import { TT_UID_COOKIE, generateUid } from '@/lib/experiments';
 *
 *   export function middleware(req: NextRequest) {
 *     const res = NextResponse.next();
 *     if (!req.cookies.get(TT_UID_COOKIE)) {
 *       res.cookies.set(TT_UID_COOKIE, generateUid(), {
 *         path: '/',
 *         maxAge: 60 * 60 * 24 * 365, // 1 year
 *         sameSite: 'lax',
 *       });
 *     }
 *     return res;
 *   }
 *
 *   export const config = { matcher: ['/((?!_next|api|.*\\..*).*)'] };
 *
 * NOTE: static export (output: 'export') does not run middleware. In that case
 * generate/persist the cookie on the client with ensureClientUid() on mount.
 *
 * -----------------------------------------------------------------------------
 * RECORDING EXPOSURE FOR ANALYSIS
 * -----------------------------------------------------------------------------
 * Variant assignment is meaningless for analysis unless you log that the visitor
 * was actually exposed to it. Push an exposure event to the dataLayer so GTM/GA4
 * can attribute downstream conversions to the variant:
 *
 *   'use client';
 *   import { useEffect } from 'react';
 *   import { recordExposure } from '@/lib/experiments';
 *
 *   export function ExperimentExposure({
 *     experiment, variant,
 *   }: { experiment: string; variant: Variant }) {
 *     useEffect(() => {
 *       recordExposure(experiment, variant);
 *     }, [experiment, variant]);
 *     return null;
 *   }
 *
 * In GA4/GTM, create a custom event trigger on `tt_experiment_exposure` and
 * compare conversion rate by `variant`. Suggested playbook test:
 *
 *   experiment: 'hero-form'
 *     - 'variant'  -> hero with inline lead-capture form
 *     - 'control'  -> cleaner hero (no form), CTA links to /get-started
 */

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

export type Variant = 'control' | 'variant';

/** Name of the cookie holding the persistent per-visitor id. */
export const TT_UID_COOKIE = 'tt_uid';

/* ------------------------------------------------------------------ */
/*  ID generation                                                      */
/* ------------------------------------------------------------------ */

/**
 * Generate a reasonably-unique opaque visitor id. Uses crypto.randomUUID when
 * available (modern browsers + Node 16+), with a non-crypto fallback so the
 * function never throws in any runtime.
 */
export function generateUid(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through to fallback */
  }
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10)
  );
}

/* ------------------------------------------------------------------ */
/*  Hashing                                                            */
/* ------------------------------------------------------------------ */

/**
 * Deterministic 32-bit string hash (FNV-1a style). Same input always yields the
 * same unsigned integer, with no dependencies. Not cryptographically secure;
 * it only needs to be stable and well-distributed for bucketing.
 */
function hashString(input: string): number {
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    // 32-bit FNV prime multiply via shifts to stay in integer range
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  // Coerce to unsigned 32-bit
  return hash >>> 0;
}

/* ------------------------------------------------------------------ */
/*  Assignment                                                         */
/* ------------------------------------------------------------------ */

/**
 * Deterministically assign a visitor to a variant for a given experiment.
 *
 * The assignment is stable for a given (experiment, uid) pair: the same visitor
 * always sees the same variant, and assignment for one experiment is
 * independent of another (the experiment name is part of the hash input).
 *
 * @param experiment  Stable experiment key, e.g. 'hero-form'.
 * @param uid         Persistent visitor id (from the `tt_uid` cookie). If
 *                    omitted, a transient id is generated so the call still
 *                    returns a value, but assignment will not be stable across
 *                    requests - set the cookie (middleware or client) for real
 *                    tests.
 * @param split       Fraction (0..1) of traffic allocated to 'variant'.
 *                    Defaults to 0.5 (an even 50/50 split).
 */
export function assignVariant(
  experiment: string,
  uid?: string,
  split = 0.5,
): Variant {
  const id = uid && uid.length > 0 ? uid : generateUid();
  const bucket = hashString(`${experiment}:${id}`) / 0xffffffff; // 0..1
  return bucket < split ? 'variant' : 'control';
}

/* ------------------------------------------------------------------ */
/*  Query-param override (for QA / forcing a variant)                  */
/* ------------------------------------------------------------------ */

/** Normalize an arbitrary string into a Variant, or null if unrecognized. */
function parseVariant(value: string | undefined | null): Variant | null {
  if (value === 'variant' || value === 'control') return value;
  return null;
}

/**
 * Read a forced variant override from already-parsed search params, e.g.
 * Next.js Server Component `searchParams`. Looks for the key `exp_<experiment>`.
 *
 *   ?exp_hero-form=variant   ->  returns 'variant'
 *   ?exp_hero-form=control   ->  returns 'control'
 *
 * Returns null when no valid override is present (caller then falls back to
 * assignVariant).
 */
export function getOverrideFromSearchParams(
  experiment: string,
  searchParams: Record<string, string | string[] | undefined>,
): Variant | null {
  const raw = searchParams[`exp_${experiment}`];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return parseVariant(value);
}

/**
 * Browser-only variant of the override reader, for client components that read
 * directly from the URL (window.location.search).
 */
export function getOverrideFromLocation(experiment: string): Variant | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return parseVariant(params.get(`exp_${experiment}`));
}

/* ------------------------------------------------------------------ */
/*  Client cookie helper (for static-export / no-middleware setups)    */
/* ------------------------------------------------------------------ */

/**
 * Ensure a persistent `tt_uid` cookie exists on the client and return its
 * value. Safe to call on mount in a client component when middleware is not
 * available (e.g. static export). No-ops to a generated value on the server.
 */
export function ensureClientUid(): string {
  if (typeof document === 'undefined') return generateUid();

  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${TT_UID_COOKIE}=`));
  if (match) return decodeURIComponent(match.split('=')[1]);

  const uid = generateUid();
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${TT_UID_COOKIE}=${encodeURIComponent(
    uid,
  )}; path=/; max-age=${oneYear}; samesite=lax`;
  return uid;
}

/* ------------------------------------------------------------------ */
/*  Exposure logging (dataLayer)                                       */
/* ------------------------------------------------------------------ */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Push an experiment exposure event to the GTM/GA4 dataLayer. Call this once,
 * client-side, when the visitor actually sees the assigned variant (e.g. in a
 * useEffect). Analysts can then segment conversions by `variant`.
 *
 * Event shape:
 *   { event: 'tt_experiment_exposure', experiment: '<name>', variant: '<v>' }
 */
export function recordExposure(experiment: string, variant: Variant): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'tt_experiment_exposure',
    experiment,
    variant,
  });
}

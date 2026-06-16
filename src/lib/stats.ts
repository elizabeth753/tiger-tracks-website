/**
 * Single source of truth for Tiger Tracks marketing statistics.
 *
 * Every hard-coded metric on the site should be imported from here so the
 * numbers stay consistent across pages. When a figure changes, change it once
 * in this file.
 *
 * Figures marked CONFIRM depend on internal figures only Tiger Tracks can
 * verify against its books - treat them as the canonical public claim.
 */

export const STATS = {
  // --- Company headline ---
  revenueGrowth: '2,954%', // Inc. 5000 three-year revenue growth
  incRank: '#123', // Inc. 5000 ranking
  foundingYear: 2021,
  teamSize: 40, // total headcount - "40 specialists" / "senior specialists, zero generalists"
  brandsServed: '50+',
  industries: '12',
  avgClientTenure: '18 mo',

  // --- Ad spend managed ---
  // Annual figure is the primary, explicitly-scoped claim.
  adSpendAnnual: '$200M+', // CONFIRM - "$200M+ in annual ad spend managed"
  adSpendLifetime: '$500M+', // CONFIRM - cumulative; only ever shown as "managed to date"

  // --- CEO / Ready valuation (matches public press) ---
  readyValuation: '$350M+', // was "$500M+" on-site; press reports "$350M+"

  // --- Portfolio averages (canonical) ---
  // These are the only figures that may be labeled "average". Source of truth
  // is the Capabilities "How We Measure Success" block.
  avg: {
    cacReduction: '-18%',
    roas: '4.2x',
    cvrLift: '+29%',
    ltvIncrease: '2.3x',
    scaleSpend6mo: '67%', // % of clients who scale spend within 6 months
    projectToRetainer: '85%',
  },

  // --- Representative (best-case, client-attributed) results ---
  // NEVER present these as averages. Always label "representative" / per-client.
  representative: {
    roasLift: '+147%',
    cvrLift: '+42%',
    organicTraffic: '+89%',
    ltvIncrease: '+34%',
    creativeWinRate: '3x',
  },
} as const;

export type SiteStats = typeof STATS;

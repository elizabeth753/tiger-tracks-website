export interface TimelineDataPoint {
  label: string;
  value: number;
}

export interface CaseStudy {
  slug: string;
  client: string;
  heroMetric: string;
  heroMetricLabel: string;
  category: string;
  channels: string[];
  industry: string;
  challengeType: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  results: { metric: string; value: string; metricType?: 'cac' | 'ltv' | 'roas' | 'revenue' | 'leads' | 'efficiency' }[];
  wayfinderTactic: { title: string; description: string };
  attribution: string;
  timeline: { before: TimelineDataPoint[]; after: TimelineDataPoint[] };
  testimonial?: { quote: string; name: string; title: string; company: string };
  logoPlaceholder: string;
  heroImage?: string;
  isPlaceholder?: boolean;
}

export const challengeTypes = [
  'All Challenges',
  'Lowering CAC',
  'Scaling Spend',
  'Improving ROAS',
  'Channel Diversification',
  'Account Restructure',
  'Full-Funnel Build',
] as const;

export const industryFilters = [
  'All Industries',
  'DTC',
  'E-Commerce',
  'Finance',
  'Health',
  'Beauty',
  'Telecom',
  'Real Estate',
  'B2C',
  'SaaS',
  'B2B',
  'PE Portfolio',
] as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ag1-meta',
    client: 'AG1',
    heroMetric: '+51%',
    heroMetricLabel: 'Monthly Acquired Customers YoY',
    category: 'DTC / Multi-Channel',
    channels: ['Meta'],
    industry: 'DTC',
    challengeType: 'Lowering CAC',
    summary:
      'How we restructured Meta campaigns to drive compounding acquisition growth while cutting CAC 5% year-over-year.',
    problem:
      'AG1\'s Meta performance had plateaued. A legacy account and campaign structure limited learning velocity, forcing delivery to spread thin across too many ad sets. Customer acquisition costs were rising while monthly new customer volume stayed flat. The growth team needed a way to unlock scale without blowing past efficiency targets.',
    solution:
      'We rebuilt the entire Meta campaign architecture aligned with current best practices and full-funnel optimization. Creative testing was moved to mid-funnel to separate learning from conversion campaigns. Wayfinder AI ran daily anomaly detection across 200+ ad sets, surfacing creative fatigue and audience saturation before they impacted performance. We implemented a disciplined creative analysis process that fed winning concepts back into production within 48 hours.',
    impact:
      'Monthly acquired customers grew 51% year-over-year while CAC dropped 5%. The restructured account unlocked consistent learning signals that compounded over time, turning a plateau into an acceleration curve.',
    results: [
      { metric: 'Monthly Acquired Customers', value: '+51% YoY', metricType: 'leads' },
      { metric: 'Customer Acquisition Cost', value: '-5% YoY', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Anomaly Detection Across 200+ Ad Sets',
      description: 'Wayfinder AI monitored creative fatigue and audience saturation signals daily, flagging underperforming ad sets before they dragged down campaign-level efficiency.',
    },
    attribution: 'Meta Conversions API with server-side deduplication, cross-referenced against Shopify order data. Incrementality validated via geo-holdout testing.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 98 },
        { label: 'Month 3', value: 102 },
        { label: 'Month 4', value: 97 },
        { label: 'Month 5', value: 101 },
        { label: 'Month 6', value: 99 },
      ],
      after: [
        { label: 'Month 7', value: 112 },
        { label: 'Month 8', value: 125 },
        { label: 'Month 9', value: 134 },
        { label: 'Month 10', value: 141 },
        { label: 'Month 11', value: 148 },
        { label: 'Month 12', value: 151 },
      ],
    },
    testimonial: {
      quote:
        'Partnering with Tiger Tracks has been amazing. They work fast, execute flawlessly and apply specialized knowledge of ad platforms with a relentless focus on hitting growth goals.',
      name: 'Jason Marshall',
      title: 'Chief Growth Officer',
      company: 'AG1',
    },
    logoPlaceholder: 'AG1',
  },
  {
    slug: 'ag1-brand-search',
    client: 'AG1',
    heroMetric: '-31%',
    heroMetricLabel: 'Brand Search CAC',
    category: 'DTC / Google',
    channels: ['Google'],
    industry: 'DTC',
    challengeType: 'Lowering CAC',
    summary:
      'Reducing Brand Search overspend to unlock incremental growth budget and cut CAC by 31%.',
    problem:
      'AG1 was over-investing in Google Brand Search, capturing users who would have converted organically. This inflated reported ROAS while starving incremental channels of budget. The result: high apparent efficiency masking low actual incrementality, with limited room to grow.',
    solution:
      'We reset the role of Brand Search in the overall channel mix. Using Wayfinder AI, we modeled the incrementality of every brand keyword cluster and systematically reduced spend on queries with high organic overlap. Freed budget was reallocated to higher-incrementality channels with verified lift.',
    impact:
      'Brand Search CAC dropped 31%. More importantly, the budget freed up funded incremental growth elsewhere in the channel mix, improving overall unit economics without sacrificing volume.',
    results: [
      { metric: 'Brand Search CAC', value: '-31%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Incrementality Modeling by Keyword Cluster',
      description: 'Wayfinder AI scored every brand keyword cluster by organic overlap rate, enabling surgical budget cuts that preserved true incremental conversions.',
    },
    attribution: 'Incrementality measured via controlled geo-holdout tests across brand keyword clusters. Results validated against Google Analytics 4 conversion paths.',
    timeline: {
      before: [
        { label: 'Q1', value: 45 },
        { label: 'Q2', value: 44 },
        { label: 'Q3', value: 46 },
        { label: 'Q4', value: 47 },
      ],
      after: [
        { label: 'Q5', value: 38 },
        { label: 'Q6', value: 34 },
        { label: 'Q7', value: 32 },
        { label: 'Q8', value: 32 },
      ],
    },
    testimonial: {
      quote:
        'Partnering with Tiger Tracks has been amazing. They work fast, execute flawlessly and apply specialized knowledge of ad platforms with a relentless focus on hitting growth goals.',
      name: 'Jason Marshall',
      title: 'Chief Growth Officer',
      company: 'AG1',
    },
    logoPlaceholder: 'AG1',
  },
  {
    slug: 'anastasia-beverly-hills',
    client: 'Anastasia Beverly Hills',
    heroMetric: '+22%',
    heroMetricLabel: 'Meta ROAS',
    category: 'Beauty / TikTok + Meta',
    channels: ['TikTok', 'Meta'],
    industry: 'Beauty',
    challengeType: 'Channel Diversification',
    summary:
      'UGC-first TikTok strategy driving off-platform conversions and a 22% ROAS lift for prestige beauty.',
    problem:
      'ABH needed to scale TikTok as a demand driver without cannibalizing margins through TikTok Shop. Previous in-platform commerce had hurt brand perception and margin structure. The challenge: use TikTok for upper-funnel demand while keeping all conversions on ABH.com where margins were intact.',
    solution:
      'We built a UGC-first creative system (tutorials, GRWM, product reactions, shade tests, before/after) optimized for reach, ROAS impact, and qualified traffic. Wayfinder AI tracked cross-platform attribution signals to connect TikTok brand reach to downstream Meta and Google conversions, proving halo effect value.',
    impact:
      'Meta ROAS increased 22% as TikTok-driven demand lifted conversion rates across all channels. Brand perception remained premium with zero TikTok Shop dependency.',
    results: [
      { metric: 'Meta ROAS', value: '+22%', metricType: 'roas' },
    ],
    wayfinderTactic: {
      title: 'Cross-Platform Halo Effect Tracking',
      description: 'Wayfinder AI correlated TikTok brand reach spikes with downstream Meta and Google conversion lifts, proving TikTok\'s true contribution beyond last-click.',
    },
    attribution: 'Multi-touch attribution combining TikTok pixel data with Meta Conversions API and Google Analytics 4 assisted conversion paths. Cross-platform halo measured via time-series correlation analysis.',
    timeline: {
      before: [
        { label: 'Jan', value: 2.1 },
        { label: 'Feb', value: 2.0 },
        { label: 'Mar', value: 2.2 },
        { label: 'Apr', value: 1.9 },
        { label: 'May', value: 2.1 },
        { label: 'Jun', value: 2.0 },
      ],
      after: [
        { label: 'Jul', value: 2.2 },
        { label: 'Aug', value: 2.4 },
        { label: 'Sep', value: 2.5 },
        { label: 'Oct', value: 2.6 },
        { label: 'Nov', value: 2.5 },
        { label: 'Dec', value: 2.6 },
      ],
    },
    logoPlaceholder: 'ABH',
  },
  {
    slug: 'monarch-money',
    client: 'Monarch Money',
    heroMetric: '+368%',
    heroMetricLabel: 'Increase in Users',
    category: 'Finance / Multi-Channel',
    channels: ['Multi-Channel'],
    industry: 'Finance',
    challengeType: 'Scaling Spend',
    summary:
      'Scaling user acquisition 368% for the personal finance platform PE funds are watching.',
    problem:
      'Monarch Money needed to rapidly scale user acquisition to establish category leadership in personal finance. Efficient unit economics were non-negotiable given investor scrutiny. Existing channels were near capacity, and scaling further risked CAC inflation that would damage the company\'s growth narrative.',
    solution:
      'We built a full-funnel user acquisition strategy across multiple channels with rigorous measurement at every stage. Wayfinder AI continuously rebalanced budget allocation across channels based on real-time CAC and LTV signals, shifting spend toward whichever channel offered the best marginal unit economics at any given moment.',
    impact:
      'Users grew 368% while maintaining the efficient unit economics that matter to investors. The diversified channel mix reduced dependency on any single platform.',
    results: [
      { metric: 'Users', value: '+368%', metricType: 'leads' },
    ],
    wayfinderTactic: {
      title: 'Real-Time Cross-Channel Budget Rebalancing',
      description: 'Wayfinder AI monitored marginal CAC across all channels hourly, automatically flagging reallocation opportunities when one channel\'s efficiency shifted.',
    },
    attribution: 'Server-side event tracking with cohort-based LTV analysis. Channel contribution measured via media mix modeling with weekly recalibration.',
    timeline: {
      before: [
        { label: 'Q1', value: 100 },
        { label: 'Q2', value: 108 },
        { label: 'Q3', value: 112 },
        { label: 'Q4', value: 115 },
      ],
      after: [
        { label: 'Q5', value: 165 },
        { label: 'Q6', value: 245 },
        { label: 'Q7', value: 358 },
        { label: 'Q8', value: 468 },
      ],
    },
    logoPlaceholder: 'MM',
  },
  {
    slug: 'rho-nutrition',
    client: 'Rho Nutrition',
    heroMetric: '+78%',
    heroMetricLabel: 'Revenue During Partnership',
    category: 'DTC / Multi-Channel',
    channels: ['Multi-Channel'],
    industry: 'DTC',
    challengeType: 'Scaling Spend',
    summary:
      'Driving 78% revenue growth through optimized multi-channel performance while maintaining profitability.',
    problem:
      'Rho Nutrition had strong product-market fit but lacked the media infrastructure to scale efficiently. Ad spend was increasing without proportional revenue growth, and there was no unified view of which channels were actually driving profitable orders versus cannibalizing organic demand.',
    solution:
      'We consolidated measurement across all channels, built a unified attribution view, and optimized each channel for its role in the funnel. Wayfinder AI provided daily spend-to-revenue efficiency scoring, enabling rapid reallocation to the highest-returning opportunities.',
    impact:
      'Revenue grew 78% during the partnership while maintaining healthy margins. The unified measurement framework gave the team confidence in where every dollar was going.',
    results: [
      { metric: 'Revenue', value: '+78%', metricType: 'revenue' },
    ],
    wayfinderTactic: {
      title: 'Daily Spend-to-Revenue Efficiency Scoring',
      description: 'Wayfinder AI generated daily efficiency scores for every active campaign, ranking them by marginal revenue contribution to guide same-day optimization decisions.',
    },
    attribution: 'Multi-touch revenue attribution combining platform conversion data with backend order revenue. Blended ROAS calculated daily at the campaign level.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 103 },
        { label: 'Month 3', value: 99 },
        { label: 'Month 4', value: 105 },
      ],
      after: [
        { label: 'Month 5', value: 118 },
        { label: 'Month 6', value: 135 },
        { label: 'Month 7', value: 156 },
        { label: 'Month 8', value: 178 },
      ],
    },
    logoPlaceholder: 'RN',
  },
  {
    slug: 'aura-health',
    client: 'Aura Health',
    heroMetric: '-37%',
    heroMetricLabel: 'Cost Per Trial YoY',
    category: 'Health / Multi-Channel',
    channels: ['Multi-Channel'],
    industry: 'Health',
    challengeType: 'Lowering CAC',
    summary:
      'Reducing cost per trial 37% while scaling health app user acquisition.',
    problem:
      'Aura Health\'s cost per trial was too high to scale user acquisition profitably. The trial-to-paid conversion funnel was leaking at multiple points, and creative messaging wasn\'t resonating with the highest-LTV segments. Without lowering CPT, the growth math simply didn\'t work.',
    solution:
      'We optimized the full acquisition funnel from impression to trial activation. Wayfinder AI analyzed creative performance across audience segments, identifying which messages drove not just trials but trial-to-paid conversions. This shifted creative strategy from volume to quality.',
    impact:
      'Cost per trial dropped 37% year-over-year. More importantly, trial quality improved as the new creative strategy attracted higher-intent users who converted to paid at better rates.',
    results: [
      { metric: 'Cost Per Trial', value: '-37% YoY', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Creative-to-LTV Segment Matching',
      description: 'Wayfinder AI correlated creative variations with downstream trial-to-paid conversion rates by audience segment, revealing which messages attracted high-LTV users.',
    },
    attribution: 'Mobile measurement partner (MMP) data combined with in-app event tracking. Trial-to-paid conversion tracked at the campaign level over 30/60/90-day windows.',
    timeline: {
      before: [
        { label: 'Q1', value: 12.5 },
        { label: 'Q2', value: 13.2 },
        { label: 'Q3', value: 12.8 },
        { label: 'Q4', value: 13.5 },
      ],
      after: [
        { label: 'Q5', value: 11.0 },
        { label: 'Q6', value: 9.8 },
        { label: 'Q7', value: 8.9 },
        { label: 'Q8', value: 8.5 },
      ],
    },
    logoPlaceholder: 'AH',
  },
  {
    slug: 'online-labels',
    client: 'Online Labels',
    heroMetric: '+151%',
    heroMetricLabel: 'Profit Growth',
    category: 'E-Commerce / Google',
    channels: ['Google'],
    industry: 'E-Commerce',
    challengeType: 'Account Restructure',
    summary:
      'From 18,000 keywords and declining performance to 151% profit growth in 90 days.',
    problem:
      'Online Labels\' Google Ads account was a post-COVID mess: 18,000 keywords, 15,000 ads, 11,000 products. Performance was regressing, wasted spend was rampant, and the complexity made it nearly impossible to diagnose what was working. The team was flying blind on profitability at the product and keyword level.',
    solution:
      'We took a two-pronged approach: grow revenue via strategic keyword expansion while simultaneously eliminating wasted spend. Wayfinder AI mapped profitability at the product-keyword intersection, identifying which of the 18,000 keywords actually drove profit versus just qualified pipeline. Automated bidding, new ad copy, and custom audiences completed the rebuild.',
    impact:
      'Profit grew 151% in 90 days. Revenue grew 42%, conversion rate improved 41%, and average order value jumped 37%. Monthly profit grew 52% in just the first 30 days.',
    results: [
      { metric: 'Profit', value: '+151%', metricType: 'revenue' },
      { metric: 'Revenue', value: '+42%', metricType: 'revenue' },
      { metric: 'Conversion Rate', value: '+41%', metricType: 'efficiency' },
      { metric: 'Avg. Order Value', value: '+37%', metricType: 'revenue' },
    ],
    wayfinderTactic: {
      title: 'Product-Keyword Profitability Mapping',
      description: 'Wayfinder AI calculated true margin contribution at the product-keyword intersection across 18,000 keywords, enabling surgical pruning of unprofitable traffic.',
    },
    attribution: 'Google Ads conversion tracking integrated with backend revenue and margin data. Profitability measured at the keyword-product level with daily reconciliation against order management system.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 94 },
        { label: 'Month 3', value: 88 },
        { label: 'Month 4', value: 91 },
        { label: 'Month 5', value: 85 },
        { label: 'Month 6', value: 82 },
      ],
      after: [
        { label: 'Month 7', value: 125 },
        { label: 'Month 8', value: 168 },
        { label: 'Month 9', value: 198 },
        { label: 'Month 10', value: 215 },
        { label: 'Month 11', value: 230 },
        { label: 'Month 12', value: 251 },
      ],
    },
    testimonial: {
      quote:
        'The Tiger Tracks team boosted the profitability of our non-branded search campaigns by 151% in the first few months, and set new overall ad revenue records shortly after.',
      name: 'Steven Leung',
      title: 'Director of Marketing',
      company: 'Online Labels',
    },
    logoPlaceholder: 'OL',
  },
  {
    slug: 'lightyear',
    client: 'Lightyear',
    heroMetric: '+100%',
    heroMetricLabel: 'Qualified Leads Per Month',
    category: 'Telecom / Google',
    channels: ['Google'],
    industry: 'Telecom',
    challengeType: 'Account Restructure',
    summary: 'Doubling qualified leads for enterprise telecom after a previous agency failed to deliver for over a year.',
    problem:
      'Lightyear had run Google Ads with another agency for over a year with limited success. The campaigns were generating qualified pipeline but not qualified leads that sales could close. Lead quality was poor, conversion tracking was unreliable, and the team had lost confidence in paid as a growth channel.',
    solution:
      'We revamped campaign architecture, keyword segmentation, and conversion tracking from scratch. Wayfinder AI built lead quality scoring models that fed back into bidding, shifting spend toward queries that generated sales-qualified (not just marketing-qualified) leads.',
    impact:
      'Qualified leads per month doubled. More importantly, lead quality improved so meaningfully that the sales team\'s close rate increased, compounding the impact beyond just volume.',
    results: [
      { metric: 'Qualified Leads Per Month', value: '+100%', metricType: 'leads' },
    ],
    wayfinderTactic: {
      title: 'Lead Quality Scoring Fed Into Bidding',
      description: 'Wayfinder AI built lead quality models from CRM close-rate data, then fed quality signals back into Google\'s bidding to optimize for revenue, not just form fills.',
    },
    attribution: 'Offline conversion imports from CRM (HubSpot) to Google Ads. Lead quality tracked from click to SQL to closed deal with full funnel visibility.',
    timeline: {
      before: [
        { label: 'Month 1', value: 22 },
        { label: 'Month 2', value: 19 },
        { label: 'Month 3', value: 24 },
        { label: 'Month 4', value: 20 },
        { label: 'Month 5', value: 21 },
        { label: 'Month 6', value: 23 },
      ],
      after: [
        { label: 'Month 7', value: 30 },
        { label: 'Month 8', value: 36 },
        { label: 'Month 9', value: 40 },
        { label: 'Month 10', value: 43 },
        { label: 'Month 11', value: 44 },
        { label: 'Month 12', value: 46 },
      ],
    },
    testimonial: {
      quote:
        'Through their deep sophistication in analytics, funnel attribution, and campaign execution, Tiger Tracks took our performance marketing to the next level.',
      name: 'Matt McGill',
      title: 'VP of Performance Marketing',
      company: 'Lightyear',
    },
    logoPlaceholder: 'LY',
  },
  {
    slug: 'leonard-truck',
    client: 'Leonard Truck Outfitters',
    heroMetric: '+39%',
    heroMetricLabel: 'Leads',
    category: 'B2C / Google',
    channels: ['Google'],
    industry: 'B2C',
    challengeType: 'Account Restructure',
    summary:
      'Consolidating multi-agency chaos into a 39% lead increase with 63% conversion rate improvement.',
    problem:
      'Leonard had multiple agencies with overlapping responsibilities, fragmented campaign ownership, and conflicting optimization signals. Geographic market variations, different product categories, and strong seasonality added complexity. Nobody had a unified view of what was driving conversions.',
    solution:
      'We consolidated all conversion signals into a single source of truth, rebuilt campaign structure to accelerate algorithm learning, and segmented by geography and product category. Wayfinder AI unified reporting across the previously fragmented agency structure, revealing overlap and waste.',
    impact:
      'Leads grew 39.45%, conversion rate jumped 63.42%, and CPA dropped 12.22%. The consolidated structure finally gave the team confidence in their numbers.',
    results: [
      { metric: 'Leads', value: '+39.45%', metricType: 'leads' },
      { metric: 'Conversion Rate', value: '+63.42%', metricType: 'efficiency' },
      { metric: 'CPA Reduction', value: '-12.22%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Unified Multi-Agency Signal Consolidation',
      description: 'Wayfinder AI merged conversion signals from multiple agency accounts into a single attribution model, exposing overlapping spend and cannibalized conversions.',
    },
    attribution: 'Consolidated Google Ads conversion tracking with CRM lead data. Geographic and product-level attribution reconciled weekly against actual sales.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 96 },
        { label: 'Month 3', value: 104 },
        { label: 'Month 4', value: 98 },
      ],
      after: [
        { label: 'Month 5', value: 112 },
        { label: 'Month 6', value: 126 },
        { label: 'Month 7', value: 133 },
        { label: 'Month 8', value: 139 },
      ],
    },
    testimonial: {
      quote:
        'I believe the learning curve was accelerated by the team\'s accessibility and strategic thinking.',
      name: 'Rick Coffee',
      title: 'Head of Marketing',
      company: 'Leonard Truck Outfitters',
    },
    logoPlaceholder: 'LT',
  },
  {
    slug: 'sovereign-labs',
    client: 'Sovereign Labs',
    heroMetric: '+94%',
    heroMetricLabel: 'ROAS YoY',
    category: 'DTC / Meta',
    channels: ['Meta'],
    industry: 'DTC',
    challengeType: 'Improving ROAS',
    summary:
      'Building a full-funnel Meta strategy that nearly doubled ROAS for the colostrum supplement leader.',
    problem:
      'Sovereign Labs lacked a cohesive full-funnel Meta strategy. Upper-funnel efforts were disconnected from conversion campaigns, creative was stale, and there was no system for testing and scaling new concepts. ROAS was underperforming relative to the brand\'s strong repeat purchase rate and customer LTV.',
    solution:
      'We built a comprehensive full-funnel Meta strategy with compelling vertical video. Wayfinder AI modeled the LTV of customers acquired through different creative angles, revealing that educational content about colostrum benefits drove 2.3x higher LTV than discount-led creative. This insight reshaped the entire creative brief.',
    impact:
      'ROAS increased 94% year-over-year. The LTV-informed creative strategy attracted higher-value customers, making the improvement durable rather than a one-time optimization bump.',
    results: [
      { metric: 'ROAS', value: '+94% YoY', metricType: 'roas' },
    ],
    wayfinderTactic: {
      title: 'LTV-Informed Creative Strategy',
      description: 'Wayfinder AI modeled customer LTV by acquisition creative type, revealing educational content drove 2.3x higher LTV than promotional angles.',
    },
    attribution: 'Meta Conversions API with server-side event matching. LTV tracked over 90-day cohorts with Shopify order data integration.',
    timeline: {
      before: [
        { label: 'Q1', value: 1.8 },
        { label: 'Q2', value: 1.7 },
        { label: 'Q3', value: 1.9 },
        { label: 'Q4', value: 1.8 },
      ],
      after: [
        { label: 'Q5', value: 2.3 },
        { label: 'Q6', value: 2.8 },
        { label: 'Q7', value: 3.2 },
        { label: 'Q8', value: 3.5 },
      ],
    },
    logoPlaceholder: 'SL',
  },
  {
    slug: 'snapnhd',
    client: 'SnapNHD',
    heroMetric: '-47%',
    heroMetricLabel: 'Customer Acquisition Cost',
    category: 'Real Estate / Google',
    channels: ['Google'],
    industry: 'Real Estate',
    challengeType: 'Lowering CAC',
    summary:
      'Overhauling Google Ads to cut acquisition costs nearly in half for real estate services.',
    problem:
      'SnapNHD was experiencing growth deceleration from rising CAC and ineffective digital marketing. The Google Ads program had not been significantly updated, and performance was degrading as competition increased. Without a dramatic improvement in acquisition efficiency, growth would stall.',
    solution:
      'We overhauled the entire Google Ads program: new ad copy, shifted targeting strategies, and implemented advanced automated bidding. Wayfinder AI identified geographic and temporal patterns in conversion data, enabling hyper-targeted bid adjustments that reduced waste.',
    impact:
      'Customer acquisition cost dropped 47%. The overhauled account structure and targeting created a sustainable foundation for scaling, not just a one-time improvement.',
    results: [
      { metric: 'Customer Acquisition Cost', value: '-47%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Geographic + Temporal Bid Optimization',
      description: 'Wayfinder AI identified conversion patterns by geography and time of day/week, enabling automated bid modifiers that concentrated spend on highest-converting windows.',
    },
    attribution: 'Google Ads conversion tracking with backend customer data integration. CAC calculated on actual customers acquired, not just leads.',
    timeline: {
      before: [
        { label: 'Month 1', value: 85 },
        { label: 'Month 2', value: 90 },
        { label: 'Month 3', value: 88 },
        { label: 'Month 4', value: 92 },
      ],
      after: [
        { label: 'Month 5', value: 72 },
        { label: 'Month 6', value: 58 },
        { label: 'Month 7', value: 50 },
        { label: 'Month 8', value: 47 },
      ],
    },
    logoPlaceholder: 'SN',
  },
  {
    slug: 'honeydew',
    client: 'Honeydew',
    heroMetric: '-28%',
    heroMetricLabel: 'CAC While Scaling 3x Volume',
    category: 'Health / Google',
    channels: ['Google'],
    industry: 'Health',
    challengeType: 'Full-Funnel Build',
    summary:
      'Scaling online dermatology growth 3x while cutting CAC 28% through full-funnel restructure.',
    problem:
      'Honeydew\'s Google Search strategy was heavily segmented, limiting growth. Tight CAC goals conflicted with ambitious growth targets. Geotargeting wasn\'t aligned with actual provider availability, meaning ad spend was driving leads in markets where Honeydew couldn\'t serve patients.',
    solution:
      'We conducted a full funnel audit, restructured campaigns, and aligned geotargeting with provider availability. Wayfinder AI mapped conversion potential by ZIP code against Honeydew\'s provider network, eliminating waste from serving ads in areas without coverage.',
    impact:
      'Volume grew 3x while CAC dropped 28%. The geographic alignment alone recovered significant wasted spend that was redirected into high-coverage markets.',
    results: [
      { metric: 'CAC Reduction', value: '-28%', metricType: 'cac' },
      { metric: 'Patient Volume', value: '3x Growth', metricType: 'leads' },
    ],
    wayfinderTactic: {
      title: 'Provider Network / Ad Coverage Alignment',
      description: 'Wayfinder AI mapped ad spend by ZIP code against Honeydew\'s provider availability, identifying and eliminating spend in markets with zero fulfillment capacity.',
    },
    attribution: 'Google Ads conversion tracking with patient intake system integration. Geographic attribution at the ZIP-code level, reconciled against provider network data.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 104 },
        { label: 'Month 3', value: 98 },
        { label: 'Month 4', value: 102 },
      ],
      after: [
        { label: 'Month 5', value: 135 },
        { label: 'Month 6', value: 185 },
        { label: 'Month 7', value: 245 },
        { label: 'Month 8', value: 300 },
      ],
    },
    testimonial: {
      quote:
        'The Tiger Tracks team has been a true partner in our company\'s growth. They\'re collaborative, nimble, and thoughtful, really acting as an extension of our own team.',
      name: 'Connor Kreutz',
      title: 'Head of Growth',
      company: 'Honeydew',
    },
    logoPlaceholder: 'HD',
  },
  {
    slug: 'capezio',
    client: 'Capezio',
    heroMetric: '+54%',
    heroMetricLabel: 'ROAS (EU Market)',
    category: 'E-Commerce / Google',
    channels: ['Google'],
    industry: 'E-Commerce',
    challengeType: 'Improving ROAS',
    summary:
      'Scaling international markets without cannibalizing U.S. performance through geo-segmented Performance Max optimization.',
    problem:
      'Capezio needed to scale into EU, UK, and Australian markets but risked diluting their strong U.S. performance. Existing campaign structures were not segmented by geography, making it impossible to optimize for regional nuances in search behavior, audience intent, and competitive dynamics.',
    solution:
      'We ran a full-funnel audit that identified keyword restrictions limiting international reach, then launched revamped Performance Max campaigns with refreshed audience data segmented by geo-market. A revamped Search strategy drove down-funnel movement while isolating each market for independent optimization.',
    impact:
      'EU ROAS grew 54%, UK ROAS improved 10%, and Australian ROAS increased 54%. U.S. performance remained stable throughout the international expansion, proving the geo-segmentation thesis.',
    results: [
      { metric: 'EU ROAS', value: '+54%', metricType: 'roas' },
      { metric: 'UK ROAS', value: '+10%', metricType: 'roas' },
      { metric: 'AUS ROAS', value: '+54%', metricType: 'roas' },
    ],
    wayfinderTactic: {
      title: 'Geo-Segmented Performance Max Optimization',
      description: 'Wayfinder AI analyzed performance signals by geographic market, enabling independent bid strategies and audience targeting for each region without cross-contamination.',
    },
    attribution: 'Google Ads conversion tracking segmented by market region. ROAS calculated at the geo-campaign level with backend revenue reconciliation.',
    timeline: {
      before: [
        { label: 'Month 1', value: 1.8 },
        { label: 'Month 2', value: 1.7 },
        { label: 'Month 3', value: 1.9 },
        { label: 'Month 4', value: 1.8 },
        { label: 'Month 5', value: 1.7 },
        { label: 'Month 6', value: 1.8 },
      ],
      after: [
        { label: 'Month 7', value: 2.1 },
        { label: 'Month 8', value: 2.4 },
        { label: 'Month 9', value: 2.6 },
        { label: 'Month 10', value: 2.7 },
        { label: 'Month 11', value: 2.8 },
        { label: 'Month 12', value: 2.8 },
      ],
    },
    logoPlaceholder: 'CZ',
    heroImage: '/images/u7815321835_Close-up_cinematic_portrait_of_professional_satin_82fcb77f-e229-455a-b0dc-373b9ba5da18_3.png',
  },
  {
    slug: 'dovetail',
    client: 'Dovetail Furniture',
    heroMetric: '+103%',
    heroMetricLabel: 'Increase in Leads',
    category: 'E-Commerce / Google',
    channels: ['Google'],
    industry: 'E-Commerce',
    challengeType: 'Lowering CAC',
    summary:
      'Lowering CAC 46% while more than doubling lead volume through bid signal correction and campaign structure optimization.',
    problem:
      'Dovetail Furniture was sending misleading algorithm signals through their existing campaign structure, inflating customer acquisition costs while lead volume stagnated. Bid strategies were optimizing toward the wrong conversion actions, and the campaign structure was too fragmented to generate meaningful learning signals.',
    solution:
      'We ran a full-funnel audit and corrected the misleading algorithm signals that were driving inefficiency. Campaign structure was consolidated to improve bid strategy learning, and conversion action optimizations were refined to align with actual business outcomes rather than proxy metrics.',
    impact:
      'Leads increased 103% while CAC dropped 46%. The corrected signal architecture gave Google\'s algorithms accurate data to optimize against, compounding improvements over time.',
    results: [
      { metric: 'Leads', value: '+103%', metricType: 'leads' },
      { metric: 'CAC Reduction', value: '-46%', metricType: 'cac' },
    ],
    wayfinderTactic: {
      title: 'Bid Signal Correction & Structure Optimization',
      description: 'Wayfinder AI identified misleading conversion signals and structural fragmentation, then corrected the data pipeline to give bidding algorithms accurate optimization targets.',
    },
    attribution: 'Google Ads conversion tracking with CRM lead data integration. CAC calculated on qualified leads, not just form submissions.',
    timeline: {
      before: [
        { label: 'Month 1', value: 100 },
        { label: 'Month 2', value: 96 },
        { label: 'Month 3', value: 102 },
        { label: 'Month 4', value: 98 },
      ],
      after: [
        { label: 'Month 5', value: 128 },
        { label: 'Month 6', value: 158 },
        { label: 'Month 7', value: 186 },
        { label: 'Month 8', value: 203 },
      ],
    },
    testimonial: {
      quote:
        'Working with Tiger Tracks has been exceptional from the start! Their team took the time to deeply understand Dovetail Furniture\'s business model, and the results speak for themselves.',
      name: 'Marco Mazzoni',
      title: 'Director of Technology and Digital Marketing',
      company: 'Dovetail Furniture',
    },
    logoPlaceholder: 'DT',
    heroImage: '/images/u7815321835_Architectural_minimalist_product_visualization_fe_98c468f7-2a68-4904-aba1-853fc23864b3_2.png',
  },
  // --- PLACEHOLDER CASE STUDIES: Missing Industries ---
  {
    slug: 'saas-pipeline-acceleration',
    client: 'Series B SaaS Platform',
    heroMetric: '+215%',
    heroMetricLabel: 'Marketing-Qualified Pipeline',
    category: 'SaaS / Multi-Channel',
    channels: ['Google', 'Meta', 'LinkedIn'],
    industry: 'SaaS',
    challengeType: 'Scaling Spend',
    summary:
      'Scaling marketing-qualified pipeline 215% for a Series B SaaS company preparing for growth-stage fundraise.',
    problem:
      'A Series B SaaS platform needed to demonstrate scalable, efficient customer acquisition ahead of a growth-stage raise. Existing campaigns generated leads but couldn\'t connect marketing spend to pipeline and ARR. Investors wanted proof that paid channels could scale without CAC inflation.',
    solution:
      'We rebuilt the full demand gen stack: campaign architecture, conversion tracking tied to CRM pipeline stages, and creative optimized for demo requests over ebook downloads. Wayfinder AI connected ad platform data to CRM pipeline data, enabling optimization toward revenue-stage events rather than top-of-funnel vanity metrics.',
    impact:
      'Marketing-qualified pipeline grew 215% while CAC-to-LTV ratio improved from 1:2.8 to 1:4.1. The pipeline data gave the fundraise narrative concrete, defensible numbers.',
    results: [
      { metric: 'MQ Pipeline', value: '+215%', metricType: 'leads' },
      { metric: 'CAC:LTV Ratio', value: '1:4.1 (from 1:2.8)', metricType: 'ltv' },
      { metric: 'SQL Conversion Rate', value: '+67%', metricType: 'efficiency' },
    ],
    wayfinderTactic: {
      title: 'CRM Pipeline-Stage Optimization',
      description: 'Wayfinder AI connected ad platform click data to CRM pipeline stages, enabling bidding optimization toward demo-to-close events rather than form fills.',
    },
    attribution: 'Full CRM integration (Salesforce) with offline conversion imports to Google and Meta. Pipeline attribution tracked from first touch to closed-won with multi-touch weighting.',
    timeline: {
      before: [
        { label: 'Q1', value: 100 },
        { label: 'Q2', value: 110 },
        { label: 'Q3', value: 108 },
        { label: 'Q4', value: 115 },
      ],
      after: [
        { label: 'Q5', value: 155 },
        { label: 'Q6', value: 210 },
        { label: 'Q7', value: 275 },
        { label: 'Q8', value: 315 },
      ],
    },
    logoPlaceholder: 'SaaS',
    isPlaceholder: true,
  },
  {
    slug: 'b2b-enterprise-lead-gen',
    client: 'Enterprise Services Provider',
    heroMetric: '-41%',
    heroMetricLabel: 'Cost Per Sales-Qualified Lead',
    category: 'B2B / Google + LinkedIn',
    channels: ['Google', 'LinkedIn'],
    industry: 'B2B',
    challengeType: 'Lowering CAC',
    summary:
      'Cutting cost per SQL 41% for an enterprise services company drowning in unqualified leads.',
    problem:
      'An enterprise services provider was spending heavily on Google and LinkedIn but generating a flood of unqualified leads that wasted sales team time. Cost per sales-qualified lead was unsustainable, and the marketing team couldn\'t justify additional budget without proving pipeline quality improvement.',
    solution:
      'We restructured campaigns around intent signals rather than volume. Wayfinder AI built a lead scoring model from historical CRM data, identifying which keyword and audience combinations produced leads that actually closed. This model fed directly into platform bidding strategies.',
    impact:
      'Cost per SQL dropped 41% while SQL volume held steady. Sales team efficiency improved dramatically as they stopped chasing dead-end leads, and marketing earned back budget credibility.',
    results: [
      { metric: 'Cost Per SQL', value: '-41%', metricType: 'cac' },
      { metric: 'Lead-to-SQL Rate', value: '+89%', metricType: 'efficiency' },
      { metric: 'Sales Cycle Length', value: '-18 days', metricType: 'efficiency' },
    ],
    wayfinderTactic: {
      title: 'CRM-Trained Lead Quality Scoring',
      description: 'Wayfinder AI trained on historical CRM close-rate data to score leads at the keyword-audience level, then fed quality signals back into platform bidding.',
    },
    attribution: 'CRM-integrated offline conversion tracking. Lead quality measured from MQL to SQL to closed-won, with revenue attribution at the campaign and keyword level.',
    timeline: {
      before: [
        { label: 'Month 1', value: 850 },
        { label: 'Month 2', value: 880 },
        { label: 'Month 3', value: 870 },
        { label: 'Month 4', value: 900 },
      ],
      after: [
        { label: 'Month 5', value: 720 },
        { label: 'Month 6', value: 610 },
        { label: 'Month 7', value: 545 },
        { label: 'Month 8', value: 530 },
      ],
    },
    logoPlaceholder: 'B2B',
    isPlaceholder: true,
  },
  {
    slug: 'pe-portfolio-turnaround',
    client: 'PE Portfolio Company',
    heroMetric: '+340%',
    heroMetricLabel: 'ROAS in 120 Days',
    category: 'PE Portfolio / Multi-Channel',
    channels: ['Google', 'Meta'],
    industry: 'PE Portfolio',
    challengeType: 'Full-Funnel Build',
    summary:
      'Turning around a PE portfolio company\'s digital marketing from near-zero to 3.4x ROAS in 120 days.',
    problem:
      'A PE firm acquired a consumer brand with no meaningful digital marketing infrastructure. The previous owners had run sporadic campaigns with no tracking, no attribution, and no optimization. The PE ops team needed to prove a digital growth thesis within the first two quarters post-acquisition.',
    solution:
      'We deployed Tiger Tracks\' Growth Accelerator Audit framework: forensic analysis of digital marketing efficiency, competitive positioning, technical infrastructure, and growth potential. From the audit findings, we built the full stack from scratch. Wayfinder AI provided the measurement backbone, giving the PE ops team a live dashboard of marketing efficiency metrics against their investment thesis benchmarks.',
    impact:
      'ROAS went from effectively unmeasured to 3.4x within 120 days. The PE firm got the data infrastructure and performance proof they needed for their next board presentation.',
    results: [
      { metric: 'ROAS', value: '3.4x (from ~0)', metricType: 'roas' },
      { metric: 'Revenue from Digital', value: '+$2.1M annualized', metricType: 'revenue' },
      { metric: 'Time to Measurable ROI', value: '120 days', metricType: 'efficiency' },
    ],
    wayfinderTactic: {
      title: 'PE Ops Dashboard with Thesis Benchmarks',
      description: 'Wayfinder AI provided a live dashboard mapping marketing performance metrics directly against the PE firm\'s investment thesis KPIs, enabling real-time thesis validation.',
    },
    attribution: 'Built from scratch: server-side conversion tracking, GA4 implementation, platform pixel deployment, and CRM integration. Full attribution stack deployed in 30 days.',
    timeline: {
      before: [
        { label: 'Day 1', value: 0 },
        { label: 'Day 15', value: 5 },
        { label: 'Day 30', value: 15 },
        { label: 'Day 45', value: 20 },
      ],
      after: [
        { label: 'Day 60', value: 45 },
        { label: 'Day 75', value: 85 },
        { label: 'Day 90', value: 140 },
        { label: 'Day 120', value: 215 },
      ],
    },
    logoPlaceholder: 'PE',
    isPlaceholder: true,
  },
];

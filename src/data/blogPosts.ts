export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  source: 'notion' | 'wordpress';
  author?: string;
  authorPedigree?: string;
  /** Notion page ID (needed to fetch child blocks) */
  pageId?: string;
  /** Cover image URL pulled from Notion page cover */
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  // ── Notion posts ──────────────────────────────────────────────
  {
    slug: 'beyond-the-chatbox-the-no-shame-guide-to-the-agentic-ai-era-of-2026',
    title: 'Beyond the Chatbox: The No-Shame Guide to the Agentic AI Era of 2026',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'A practical breakdown of how agentic AI is reshaping marketing workflows, from autonomous campaign management to real-time creative optimization.',
    readTime: '12 min',
    source: 'notion',
  },
  {
    slug: 'agentic-commerce-how-ai-shopping-agents-are-rewriting-the-rules-of-consumer-behavior',
    title: 'Agentic Commerce: How AI Shopping Agents Are Rewriting the Rules of Consumer Behavior',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'AI shopping agents are making purchase decisions on behalf of consumers, fundamentally changing how brands need to position and advertise their products.',
    readTime: '10 min',
    source: 'notion',
  },
  {
    slug: 'geo-is-the-new-seo-why-generative-engine-optimization-is-not-optional-in-2026',
    title: 'GEO Is the New SEO: Why Generative Engine Optimization Is Not Optional in 2026',
    category: 'Platform Strategy',
    date: '2026',
    excerpt:
      'As AI-generated answers replace traditional search results, brands must optimize for generative engines or risk becoming invisible.',
    readTime: '9 min',
    source: 'notion',
  },
  {
    slug: 'the-cookieless-reckoning-first-party-data-incrementality-and-the-measurement-stack-that-survives',
    title: 'The Cookieless Reckoning: First-Party Data, Incrementality, and the Measurement Stack That Survives',
    category: 'Measurement & Attribution',
    date: '2026',
    excerpt:
      'The death of third-party cookies demands a new measurement architecture built on first-party data and incrementality testing.',
    readTime: '11 min',
    source: 'notion',
  },
  {
    slug: 'creative-fatigue-is-a-solved-problem-how-ai-autonomous-optimization-changes-the-game',
    title: 'Creative Fatigue Is a Solved Problem: How AI Autonomous Optimization Changes the Game',
    category: 'Creative & Content',
    date: '2026',
    excerpt:
      'AI-powered creative rotation and autonomous optimization systems are eliminating ad fatigue before it impacts performance.',
    readTime: '8 min',
    source: 'notion',
  },
  {
    slug: 'the-saaspocalypse-is-here-how-agentic-workflows-are-replacing-your-software-stack',
    title: 'The SaaSpocalypse Is Here: How Agentic Workflows Are Replacing Your Software Stack',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'Agentic AI workflows are collapsing entire SaaS categories into single intelligent systems, disrupting the software industry from the inside.',
    readTime: '10 min',
    source: 'notion',
  },
  {
    slug: 'the-ai-model-wars-what-gpt-5-4-claude-4-5-and-gemini-2-5-mean-for-your-marketing-stack',
    title: 'The AI Model Wars: What GPT-5.4, Claude 4.5, and Gemini 2.5 Mean for Your Marketing Stack',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'A comparison of the leading AI models and what their respective strengths mean for marketers choosing tools in 2026.',
    readTime: '13 min',
    source: 'notion',
  },
  {
    slug: 'mmm-vs-mta-the-measurement-debate-that-determines-where-your-budget-goes',
    title: 'MMM vs. MTA: The Measurement Debate That Determines Where Your Budget Goes',
    category: 'Measurement & Attribution',
    date: '2026',
    excerpt:
      'Media mix modeling and multi-touch attribution each tell a different story about performance. Understanding both is critical to smart budget allocation.',
    readTime: '11 min',
    source: 'notion',
  },
  {
    slug: 'the-trust-threshold-why-consumers-are-skeptical-of-ai-and-what-brands-must-do-about-it',
    title: 'The Trust Threshold: Why Consumers Are Skeptical of AI and What Brands Must Do About It',
    category: 'Creative & Content',
    date: '2026',
    excerpt:
      'Consumer trust in AI-generated content is eroding, and brands that fail to communicate authenticity will lose ground fast.',
    readTime: '8 min',
    source: 'notion',
  },
  {
    slug: 'ai-to-ai-advertising-when-the-buyer-and-the-seller-are-both-machines',
    title: 'AI-to-AI Advertising: When the Buyer and the Seller Are Both Machines',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'A new advertising paradigm is emerging where AI agents negotiate, bid, and transact on behalf of both advertisers and consumers.',
    readTime: '9 min',
    source: 'notion',
  },
  {
    slug: 'the-modern-marketers-survival-guide-what-ai-killed-what-it-created-and-where-you-fit',
    title: 'The Modern Marketer\'s Survival Guide: What AI Killed, What It Created, and Where You Fit',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'AI has eliminated some marketing roles while creating entirely new ones. Here is how to position yourself on the right side of the shift.',
    readTime: '14 min',
    source: 'notion',
  },
  {
    slug: 'your-ai-agent-is-only-as-good-as-the-prompt-behind-it',
    title: 'Your AI Agent Is Only as Good as the Prompt Behind It',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'The quality of your AI agent output depends entirely on the quality of your prompting strategy and system design.',
    readTime: '7 min',
    source: 'notion',
  },
  {
    slug: 'sales-team-architecture-for-modern-performance-marketing-agencies',
    title: 'Sales Team Architecture for Modern Performance Marketing Agencies',
    category: 'Agency Strategy',
    date: '2026',
    excerpt:
      'How performance marketing agencies should structure their sales teams to close higher-value accounts and reduce churn.',
    readTime: '10 min',
    source: 'notion',
  },
  {
    slug: 'zero-click-marketing-how-to-win-customers-when-google-answers-the-query-directly',
    title: 'Zero-Click Marketing: How to Win Customers When Google Answers the Query Directly',
    category: 'Platform Strategy',
    date: '2026',
    excerpt:
      'With over 60% of Google searches ending without a click, brands must rethink their search strategy to capture value upstream.',
    readTime: '9 min',
    source: 'notion',
  },
  {
    slug: 'the-57-billion-ai-ad-spend-where-brands-are-placing-their-biggest-bets-in-2026',
    title: 'The $57 Billion AI Ad Spend: Where Brands Are Placing Their Biggest Bets in 2026',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'A data-driven look at where the largest advertising budgets are flowing as AI transforms every channel in the marketing mix.',
    readTime: '12 min',
    source: 'notion',
  },
  {
    slug: 'ai-slop-fatigue-why-authenticity-is-the-most-valuable-asset-in-the-age-of-generative-content',
    title: 'AI Slop Fatigue: Why Authenticity is the Most Valuable Asset in the Age of Generative Content',
    category: 'Creative & Content',
    date: '2026',
    excerpt:
      'Audiences are drowning in AI-generated mediocrity, making authentic human-crafted content a competitive differentiator.',
    readTime: '8 min',
    source: 'notion',
  },
  {
    slug: 'the-automation-of-influencer-casting-how-ai-is-changing-creator-partnerships',
    title: 'The Automation of Influencer Casting: How AI is Changing Creator Partnerships',
    category: 'Creative & Content',
    date: '2026',
    excerpt:
      'AI-powered influencer matching platforms are transforming how brands discover, evaluate, and partner with content creators.',
    readTime: '9 min',
    source: 'notion',
  },
  {
    slug: 'ai-for-main-street-how-small-businesses-are-adopting-enterprise-grade-automation',
    title: 'AI for Main Street: How Small Businesses Are Adopting Enterprise-Grade Automation',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'Enterprise-level AI tools are now accessible to small businesses, leveling the playing field in digital advertising.',
    readTime: '7 min',
    source: 'notion',
  },
  {
    slug: 'the-trust-gap-closing-the-divide-between-scaled-content-production-and-audience-skepticism',
    title: 'The Trust Gap: Closing the Divide Between Scaled Content Production and Audience Skepticism',
    category: 'Creative & Content',
    date: '2026',
    excerpt:
      'Scaling content production with AI introduces a trust deficit that brands must proactively address with transparency and quality signals.',
    readTime: '10 min',
    source: 'notion',
  },
  {
    slug: 'real-time-adaptive-campaigns-the-end-of-the-monthly-marketing-report',
    title: 'Real-Time Adaptive Campaigns: The End of the Monthly Marketing Report',
    category: 'Measurement & Attribution',
    date: '2026',
    excerpt:
      'Continuous optimization loops powered by AI are making static monthly reporting obsolete in favor of real-time performance dashboards.',
    readTime: '8 min',
    source: 'notion',
  },
  {
    slug: 'the-ai-overviews-effect-preparing-your-brand-for-the-dominance-of-generative-search',
    title: 'The AI Overviews Effect: Preparing Your Brand for the Dominance of Generative Search',
    category: 'Platform Strategy',
    date: '2026',
    excerpt:
      'Google AI Overviews are cannibalizing organic traffic, and brands need a new strategy to maintain search visibility.',
    readTime: '9 min',
    source: 'notion',
  },
  {
    slug: 'automated-ideation-to-optimization-the-new-workflow-for-social-media-managers',
    title: 'Automated Ideation to Optimization: The New Workflow for Social Media Managers',
    category: 'Creative & Content',
    date: '2026',
    excerpt:
      'From concept generation to post-publish optimization, AI is automating the entire social media content lifecycle.',
    readTime: '7 min',
    source: 'notion',
  },
  {
    slug: 'the-roi-of-ai-integration-why-14-percent-of-marketers-are-outperforming-the-rest',
    title: 'The ROI of AI Integration: Why 14% of Marketers Are Outperforming the Rest',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'Only 14% of marketing teams have deeply integrated AI into their workflows, and they are dramatically outperforming everyone else.',
    readTime: '10 min',
    source: 'notion',
  },
  {
    slug: 'synthetic-audiences-vs-real-customers-navigating-the-new-data-reality',
    title: 'Synthetic Audiences vs. Real Customers: Navigating the New Data Reality',
    category: 'Measurement & Attribution',
    date: '2026',
    excerpt:
      'Synthetic audience data offers scale but introduces new risks around accuracy, bias, and real-world performance correlation.',
    readTime: '11 min',
    source: 'notion',
  },
  {
    slug: 'the-end-of-the-per-seat-saas-model-moving-to-outcome-based-software-pricing',
    title: 'The End of the Per-Seat SaaS Model: Moving to Outcome-Based Software Pricing',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'As AI agents replace human users, software pricing is shifting from per-seat licenses to outcome-based models tied to business results.',
    readTime: '8 min',
    source: 'notion',
  },
  {
    slug: 'metas-fully-automated-ad-creation-promise-what-it-means-for-media-buyers',
    title: "Meta's Fully Automated Ad Creation Promise: What It Means for Media Buyers",
    category: 'Platform Strategy',
    date: '2026',
    excerpt:
      'Meta is pushing toward fully automated ad creation. Here is what media buyers need to understand about the shift and how to stay relevant.',
    readTime: '9 min',
    source: 'notion',
  },
  {
    slug: 'human-led-strategy-in-an-ai-driven-world-finding-the-balance',
    title: 'Human-Led Strategy in an AI-Driven World: Finding the Balance',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'The most effective marketing teams pair AI execution power with human strategic judgment, and the balance is harder than it sounds.',
    readTime: '8 min',
    source: 'notion',
  },
  {
    slug: 'the-rise-of-social-commerce-and-the-blurring-lines-of-content-and-conversion',
    title: 'The Rise of Social Commerce and the Blurring Lines of Content and Conversion',
    category: 'Platform Strategy',
    date: '2026',
    excerpt:
      'Social platforms are becoming full-funnel commerce engines, erasing the boundary between content consumption and purchase behavior.',
    readTime: '10 min',
    source: 'notion',
  },
  {
    slug: 'the-synthetic-data-flywheel-how-manufactured-expertise-is-replacing-the-internet',
    title: 'The Synthetic Data Flywheel: How Manufactured Expertise is Replacing the Internet',
    category: 'AI & Automation',
    date: '2026',
    excerpt:
      'AI models trained on synthetic data are creating a self-referential knowledge loop with profound implications for content strategy.',
    readTime: '12 min',
    source: 'notion',
  },
  {
    slug: 'unlocking-general-catalysts-customer-value-fund',
    title: "Unlocking General Catalyst's Customer Value Fund",
    category: 'PE/VC',
    date: '2026',
    excerpt:
      'How General Catalyst’s Customer Value Fund creates a new model for portfolio growth through embedded performance marketing partnerships.',
    readTime: '7 min',
    source: 'notion',
  },

  // ── WordPress posts ───────────────────────────────────────────
  {
    slug: 'closing-the-ad-to-action-gap-tiger-tracks-partners-with-seeen',
    title: 'Closing the Ad-to-Action Gap: Tiger Tracks Partners with SEEEN',
    category: 'Platform Strategy',
    date: '2026-03-26',
    excerpt:
      'Tiger Tracks and SEEEN are partnering to bridge the gap between ad brand reach and measurable consumer actions through interactive video.',
    readTime: '6 min',
    source: 'wordpress',
  },
  {
    slug: 'programmatic-and-ctv-in-practice',
    title: 'Programmatic & CTV in Practice',
    category: 'Platform Strategy',
    date: '2026-02-11',
    excerpt:
      'A hands-on guide to running programmatic and connected TV campaigns that actually drive measurable performance outcomes.',
    readTime: '10 min',
    source: 'wordpress',
  },
  {
    slug: 'tiktok-ads-a-senior-media-buyers-playbook',
    title: "TikTok Ads: A Senior Media Buyer's Playbook",
    category: 'Platform Strategy',
    date: '2026-02-02',
    excerpt:
      'Battle-tested TikTok advertising strategies from senior media buyers covering creative formats, targeting, and optimization tactics.',
    readTime: '14 min',
    source: 'wordpress',
  },
  {
    slug: 'when-cfos-run-cmos-forecasts-uplift-and-the-new-growth-mandate',
    title: 'When CFOs Run CMOs: Forecasts, Uplift, And The New Growth Mandate',
    category: 'Measurement & Attribution',
    date: '2026-01-29',
    excerpt:
      'As CFOs take greater control over marketing budgets, CMOs must speak the language of forecasting, incrementality, and financial accountability.',
    readTime: '11 min',
    source: 'wordpress',
  },
  {
    slug: 'conversational-collaboration-using-generative-ai-and-voice',
    title: 'Conversational Collaboration: Using Generative AI and Voice',
    category: 'AI & Automation',
    date: '2025-12-28',
    excerpt:
      'Voice-powered generative AI tools are transforming how marketing teams brainstorm, draft, and iterate on campaign strategies.',
    readTime: '8 min',
    source: 'wordpress',
  },
  {
    slug: 'headline-copy-secrets-proven-ab-testing-strategies',
    title: 'Headline Copy Secrets: Proven A/B Testing Strategies',
    category: 'Creative & Content',
    date: '2025-12-26',
    excerpt:
      'Data-backed headline testing frameworks that consistently lift click-through rates and conversion across paid and organic channels.',
    readTime: '9 min',
    source: 'wordpress',
  },
  {
    slug: 'the-geometry-of-growth-how-tiger-tracks-reengineers-ecommerce-performance',
    title: 'The Geometry of Growth: How Tiger Tracks Reengineers E-Commerce Performance',
    category: 'Agency Strategy',
    date: '2025-11-19',
    excerpt:
      'A deep dive into the structural approach Tiger Tracks uses to diagnose and fix underperforming e-commerce advertising programs.',
    readTime: '12 min',
    source: 'wordpress',
  },
  {
    slug: 'why-your-cac-is-lying-to-you',
    title: 'Why Your CAC Is Lying to You',
    category: 'Measurement & Attribution',
    date: '2025-11-16',
    excerpt:
      'Most brands calculate customer acquisition cost incorrectly, leading to flawed budget decisions and inflated growth projections.',
    readTime: '8 min',
    source: 'wordpress',
  },
  {
    slug: 'the-future-of-growth-marketing-is-native-nimble-and-no-longer-polished',
    title: 'The Future of Growth Marketing Is Native, Nimble, and No Longer Polished',
    category: 'Creative & Content',
    date: '2025-04-17',
    excerpt:
      'Overly polished creative is losing to native, authentic content, and the smartest growth teams are leaning into raw, platform-native formats.',
    readTime: '7 min',
    source: 'wordpress',
  },
  {
    slug: 'digital-marketing-due-diligence-the-overlooked-lever-in-private-equity-value-creation',
    title: 'Digital Marketing Due Diligence: The Overlooked Lever in Private Equity Value Creation',
    category: 'PE/VC',
    date: '2025-03-06',
    excerpt:
      'Private equity firms that evaluate digital marketing capabilities during due diligence consistently unlock more post-acquisition value.',
    readTime: '11 min',
    source: 'wordpress',
  },
  {
    slug: 'conversion-tracking-reinvented-precision-in-the-age-of-privacy',
    title: 'Conversion Tracking Reinvented: Precision in the Age of Privacy',
    category: 'Measurement & Attribution',
    date: '2025-02-02',
    excerpt:
      'Privacy regulations have broken traditional conversion tracking, but new server-side and modeled approaches are restoring measurement accuracy.',
    readTime: '10 min',
    source: 'wordpress',
  },
  {
    slug: 'the-invisible-hand-how-digital-marketing-is-rewriting-the-rules-of-business-in-2025',
    title: 'The Invisible Hand: How Digital Marketing Is Rewriting the Rules of Business in 2025',
    category: 'Agency Strategy',
    date: '2025-01-14',
    excerpt:
      'Digital marketing has become the primary growth engine for businesses of all sizes, reshaping competitive dynamics across every industry.',
    readTime: '13 min',
    source: 'wordpress',
  },
  {
    slug: 'the-great-splintering-why-everything-you-know-about-video-advertising-is-wrong',
    title: 'The Great Splintering: Why Everything You Know About Video Advertising Is Wrong',
    category: 'Platform Strategy',
    date: '2025-01-02',
    excerpt:
      'The fragmentation of video platforms has shattered legacy video advertising strategies, demanding a fundamentally new approach.',
    readTime: '15 min',
    source: 'wordpress',
  },
  {
    slug: 'the-top-5-criteria-for-evaluating-your-marketing-agency',
    title: 'The Top 5 Criteria for Evaluating Your Marketing Agency',
    category: 'Agency Strategy',
    date: '2024-12-09',
    excerpt:
      'Five critical evaluation criteria that separate high-performing marketing agencies from those that waste your budget.',
    readTime: '6 min',
    source: 'wordpress',
  },
].map((post) => ({
  ...post,
  author: 'Tiger Tracks' as const,
} as BlogPost));

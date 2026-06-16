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
  // -- Notion posts (auto-synced from Notion, do not edit manually) --
  {
    slug: 'the-20-percent-problem-why-every-pe-portfolio-company-is-wasting-a-fifth-of-its-ad-budget-and-how-to-find-it-in-14-days',
    title: 'The 20 Percent Problem: Why Every PE Portfolio Company Is Wasting a Fifth of Its Ad Budget, and How to Find It in 14 Days',
    category: 'PE/VC',
    date: '2026-06-05',
    excerpt:
      'Executive Summary: Private equity firms trying to preserve cash and accelerate revenue are exposing a recurring source of avoidable loss: roughly 20 percent of digital ad budgets are often ineffective or redundant inside typical portfolio companie...',
    readTime: '8 min',
    source: 'notion',
    pageId: '37681f05-1e83-81aa-9a25-c0692559f7ea',
  },
  {
    slug: 'google-ads-in-the-age-of-ai-overviews-what-ex-googlers-see-that-most-media-buyers-miss',
    title: 'Google Ads in the Age of AI Overviews: What Ex-Googlers See That Most Media Buyers Miss',
    category: 'Platform Strategy',
    date: '2026-06-05',
    excerpt:
      'Executive Summary: Google has layered generative AI features, called AI Overviews and AI Mode, into Search to provide synthesized answers and broader exploration for complex queries. These features run a query fan-out to gather and summarize infor...',
    readTime: '8 min',
    source: 'notion',
    pageId: '37681f05-1e83-81b3-8401-db642535b2f5',
  },
  {
    slug: 'ugc-at-scale-how-the-best-dtc-brands-are-turning-creator-content-into-a-performance-engine',
    title: 'UGC at Scale: How the Best DTC Brands Are Turning Creator Content Into a Performance Engine',
    category: 'Creative & Content',
    date: '2026-06-05',
    excerpt:
      'Executive Summary: Creative production speed, not targeting, has become the principal limiter on paid performance for modern direct-to-consumer brands. Brands that move from one-off UGC to a system that continuously sources, refreshes, and tests c...',
    readTime: '7 min',
    source: 'notion',
    pageId: '37681f05-1e83-81a8-b10f-ebe867516981',
  },
  {
    slug: 'your-product-feed-is-your-most-undervalued-marketing-asset-how-ai-feed-optimization-changes-the-unit-economics-of-shopping-ads',
    title: 'Your Product Feed Is Your Most Undervalued Marketing Asset: How AI Feed Optimization Changes the Unit Economics of Shopping Ads',
    category: 'AI & Automation',
    date: '2026-06-05',
    excerpt:
      'Executive Summary: The product feed is the foundational input for Google Shopping and similar shopping ad ecosystems, yet many marketing budgets continue to prioritize bidding and creative while under-investing in feed quality. Poor product data c...',
    readTime: '7 min',
    source: 'notion',
    pageId: '37681f05-1e83-816b-9c3c-df9503599ed8',
  },
  {
    slug: 'the-70-billion-dollar-satisfier-why-retail-media-is-the-channel-your-brand-cannot-afford-to-treat-as-an-afterthought',
    title: 'The 70 Billion Dollar Satisfier: Why Retail Media Is the Channel Your Brand Cannot Afford to Treat as an Afterthought',
    category: 'AI & Automation',
    date: '2026-06-05',
    excerpt:
      'Executive Summary: Retail media is no longer a tactical test, it is a strategic channel. US advertisers are forecast to spend roughly $71.09 billion on retail media in 2026, with global retail media expected to exceed $300 billion by 2030 [2] [8]....',
    readTime: '7 min',
    source: 'notion',
    pageId: '37681f05-1e83-817f-9896-e6bc194db259',
  },
  {
    slug: 'ctv-just-passed-linear-tv-here-is-what-that-actually-means-for-your-media-budget',
    title: 'CTV Just Passed Linear TV. Here Is What That Actually Means for Your Media Budget.',
    category: 'PE/VC',
    date: '2026-06-05',
    excerpt:
      'Executive Summary: U.S. digital video ad spend is projected to top $80 billion in 2026, growing faster than the total ad market and shifting the balance of TV buying toward digital formats, including Connected TV or CTV [1]. eMarketer estimates pu...',
    readTime: '7 min',
    source: 'notion',
    pageId: '37681f05-1e83-812b-86ad-e9530a752bb3',
  },
  {
    slug: 'the-cro-multiplier-why-conversion-rate-is-the-cheapest-growth-lever-you-are-not-pulling',
    title: 'The CRO Multiplier: Why Conversion Rate Is the Cheapest Growth Lever You Are Not Pulling',
    category: 'PE/VC',
    date: '2026-06-05',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Conversion Rate Optimization · June 2026',
    readTime: '6 min',
    source: 'notion',
    pageId: '37681f05-1e83-8144-b8c3-c6de23954ba5',
  },
  {
    slug: 'email-and-sms-are-not-boring-the-highest-roi-channels-you-are-probably-underinvesting-in',
    title: 'Email and SMS Are Not Boring: The Highest ROI Channels You Are Probably Underinvesting In',
    category: 'AI & Automation',
    date: '2026-06-05',
    excerpt:
      'Executive Summary: Email and SMS are the highest ROI channels in most ecommerce stacks, and many brands still underinvest. Automated flows consistently deliver 6 to 8 times more revenue per send versus campaigns, according to Klaviyo benchmarks, m...',
    readTime: '7 min',
    source: 'notion',
    pageId: '37681f05-1e83-8171-9288-eec0630277c5',
  },
  {
    slug: 'the-compounding-effect-why-full-funnel-integration-is-the-only-defensible-growth-strategy-left',
    title: 'The Compounding Effect: Why Full-Funnel Integration Is the Only Defensible Growth Strategy Left',
    category: 'AI & Automation',
    date: '2026-06-05',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Growth Strategy · June 2026',
    readTime: '6 min',
    source: 'notion',
    pageId: '37681f05-1e83-81d5-b7ea-d213b90a4946',
  },
  {
    slug: 'video-is-the-new-landing-page-how-short-form-content-converts-across-the-entire-funnel',
    title: 'Video Is the New Landing Page: How Short-Form Content Converts Across the Entire Funnel',
    category: 'Creative & Content',
    date: '2026-06-05',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Marketing Strategy · June 2026',
    readTime: '6 min',
    source: 'notion',
    pageId: '37681f05-1e83-8142-b233-d91fefb7fa6f',
  },
  {
    slug: 'the-ai-efficiency-playbook-which-model-wins-for-every-task-may-2026',
    title: 'The AI Efficiency Playbook: Which Model Wins for Every Task (May 2026)',
    category: 'AI & Automation',
    date: '2026-05-28',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Technology Intelligence · May 2026',
    readTime: '8 min',
    source: 'notion',
    pageId: '36e81f05-1e83-818e-a9aa-c2cd1fa2e2c6',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/PexlaCVSpdzldpUW.png',
  },
  {
    slug: 'unlocking-general-catalyst-s-customer-value-fund-the-top-us-subscription-companies-poised-for-non-dilutive-growth',
    title: 'Unlocking General Catalyst\'s Customer Value Fund: The Top US Subscription Companies Poised for Non-Dilutive Growth',
    category: 'PE/VC',
    date: '2026-04-16',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Intelligence Briefing · April 2026',
    readTime: '6 min',
    source: 'notion',
    pageId: '34481f05-1e83-815d-9ea1-ce694e188a68',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'zero-click-marketing-how-to-win-customers-when-google-answers-the-query-directly',
    title: 'Zero-Click Marketing: How to Win Customers When Google Answers the Query Directly',
    category: 'Platform Strategy',
    date: '2026-04-07',
    excerpt:
      '> Zero-click searches now represent over 65% of all Google queries, fundamentally altering how brands attract and convert customers. As Google increasingly provides direct answers, marketers must evolve from traditional click-driven strategies to ...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33b81f05-1e83-81e9-97ea-f1f1615c44f3',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-57-billion-ai-ad-spend-where-brands-are-placing-their-biggest-bets-in-2026',
    title: 'The $57 Billion AI Ad Spend: Where Brands Are Placing Their Biggest Bets in 2026',
    category: 'AI & Automation',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Meta & Paid Social · April 2026',
    readTime: '8 min',
    source: 'notion',
    pageId: '33b81f05-1e83-8134-bc9a-ca916326b0a5',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'ai-slop-fatigue-why-authenticity-is-the-most-valuable-asset-in-the-age-of-generative-content',
    title: 'AI Slop Fatigue: Why Authenticity is the Most Valuable Asset in the Age of Generative Content',
    category: 'Creative & Content',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Consumer Behavior · April 2026',
    readTime: '7 min',
    source: 'notion',
    pageId: '33b81f05-1e83-81c6-bb1e-f107c0b2bc97',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-automation-of-influencer-casting-how-ai-is-changing-creator-partnerships',
    title: 'The Automation of Influencer Casting: How AI is Changing Creator Partnerships',
    category: 'AI & Automation',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Creative Scale · April 2026',
    readTime: '7 min',
    source: 'notion',
    pageId: '33b81f05-1e83-816b-8bfd-e61b2014c3d3',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'ai-for-main-street-how-small-businesses-are-adopting-enterprise-grade-automation',
    title: 'AI for Main Street: How Small Businesses Are Adopting Enterprise-Grade Automation',
    category: 'AI & Automation',
    date: '2026-04-07',
    excerpt:
      ' 🟩 Executive Summary Small businesses across Main Street are rapidly integrating enterprise-grade AI automation to streamline operations, enhance customer engagement, and compete more effectively in a digital-first economy. By 2026, over 60% of s...',
    readTime: '7 min',
    source: 'notion',
    pageId: '33b81f05-1e83-81b3-87b3-e29b34a0d20c',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-trust-gap-closing-the-divide-between-scaled-content-production-and-audience-skepticism',
    title: 'The Trust Gap: Closing the Divide Between Scaled Content Production and Audience Skepticism',
    category: 'Creative & Content',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Consumer Behavior · April 2026',
    readTime: '6 min',
    source: 'notion',
    pageId: '33b81f05-1e83-8189-b5fb-d4c6478b95ce',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'real-time-adaptive-campaigns-the-end-of-the-monthly-marketing-report',
    title: 'Real-Time Adaptive Campaigns: The End of the Monthly Marketing Report',
    category: 'Measurement & Attribution',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Measurement & Privacy · April 2026',
    readTime: '5 min',
    source: 'notion',
    pageId: '33b81f05-1e83-8162-b911-c1468becb7fd',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-ai-overviews-effect-preparing-your-brand-for-the-dominance-of-generative-search',
    title: 'The AI Overviews Effect: Preparing Your Brand for the Dominance of Generative Search',
    category: 'Platform Strategy',
    date: '2026-04-07',
    excerpt:
      '> The rise of generative search engines is transforming how users discover and interact with information online, fundamentally altering digital marketing strategies. By 2026, over 70% of search queries will be filtered through AI-driven overview r...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33b81f05-1e83-81dd-936b-c4967125d48a',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'automated-ideation-to-optimization-the-new-workflow-for-social-media-managers',
    title: 'Automated Ideation to Optimization: The New Workflow for Social Media Managers',
    category: 'Creative & Content',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Creative Scale · April 2026',
    readTime: '8 min',
    source: 'notion',
    pageId: '33b81f05-1e83-81c8-bc75-fbaf84f18343',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-roi-of-ai-integration-why-14-of-marketers-are-outperforming-the-rest',
    title: 'The ROI of AI Integration: Why 14% of Marketers Are Outperforming the Rest',
    category: 'AI & Automation',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Measurement & Privacy · April 2026',
    readTime: '6 min',
    source: 'notion',
    pageId: '33b81f05-1e83-811b-8378-d5e6ede42422',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'synthetic-audiences-vs-real-customers-navigating-the-new-data-reality',
    title: 'Synthetic Audiences vs. Real Customers: Navigating the New Data Reality',
    category: 'Measurement & Attribution',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Measurement & Privacy · April 2026',
    readTime: '6 min',
    source: 'notion',
    pageId: '33b81f05-1e83-81e6-ae15-c3a1b9fe98e9',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-end-of-the-per-seat-saas-model-moving-to-outcome-based-software-pricing',
    title: 'The End of the Per-Seat SaaS Model: Moving to Outcome-Based Software Pricing',
    category: 'AI & Automation',
    date: '2026-04-07',
    excerpt:
      ' 🟩 Executive Summary The traditional per-seat SaaS pricing model is rapidly becoming obsolete as businesses demand software that aligns directly with measurable outcomes. This shift is driven by advances in agentic AI, which enable dynamic, intel...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33b81f05-1e83-81b3-9a35-c7c79390819e',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'meta-s-fully-automated-ad-creation-promise-what-it-means-for-media-buyers',
    title: 'Meta\'s Fully Automated Ad Creation Promise: What It Means for Media Buyers',
    category: 'AI & Automation',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Meta & Paid Social · April 2026',
    readTime: '6 min',
    source: 'notion',
    pageId: '33b81f05-1e83-8140-8ad6-e8a43cf0748c',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'human-led-strategy-in-an-ai-driven-world-finding-the-balance',
    title: 'Human-Led Strategy in an AI-Driven World: Finding the Balance',
    category: 'AI & Automation',
    date: '2026-04-07',
    excerpt:
      '> The integration of AI into digital marketing has transformed the strategic landscape, yet human-led decision-making remains critical for sustainable competitive advantage. Recent studies show that companies balancing AI automation with human age...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33b81f05-1e83-819b-8d17-fe93af07f302',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-rise-of-social-commerce-and-the-blurring-lines-of-content-and-conversion',
    title: 'The Rise of Social Commerce and the Blurring Lines of Content and Conversion',
    category: 'Platform Strategy',
    date: '2026-04-07',
    excerpt:
      'Tiger Tracks · Eye of the Tiger · Consumer Behavior · April 2026',
    readTime: '5 min',
    source: 'notion',
    pageId: '33b81f05-1e83-8147-a0c4-d570f9dacc18',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-synthetic-data-flywheel-how-manufactured-expertise-is-replacing-the-internet',
    title: 'The Synthetic Data Flywheel: How Manufactured Expertise is Replacing the Internet',
    category: 'AI & Automation',
    date: '2026-04-07',
    excerpt:
      'The AI training paradigm is shifting from amassing vast raw data to generating high-quality synthetic data that acts as a superior training signal. This new approach replaces noisy, shallow internet scraping with self-reinforcing synthetic data lo...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33b81f05-1e83-813b-8b64-df955c67df73',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'your-ai-agent-is-only-as-good-as-the-prompt-behind-it-how-to-use-claude-as-your-personal-prompt-engineer',
    title: 'Your AI Agent Is Only as Good as the Prompt Behind It: How to Use Claude as Your Personal Prompt Engineer',
    category: 'AI & Automation',
    date: '2026-04-03',
    excerpt:
      'Executive Summary Most marketers are leaving significant performance on the table because they are writing prompts the same way they write emails. Claude, Anthropic\'s AI assistant, can act as a dedicated prompt engineer, designing, testing, and re...',
    readTime: '7 min',
    source: 'notion',
    pageId: '33781f05-1e83-811f-8250-eaa46db61fde',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'agentic-commerce-how-ai-shopping-agents-are-rewriting-the-rules-of-consumer-behavior',
    title: 'Agentic Commerce: How AI Shopping Agents Are Rewriting the Rules of Consumer Behavior',
    category: 'AI & Automation',
    date: '2026-04-01',
    excerpt:
      'Agentic commerce refers to shopping interactions driven by AI agents that act autonomously on behalf of consumers. These AI shopping agents analyze preferences, compare products, and complete transactions, shifting traditional consumer behavior pa...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-81bd-b12c-f1f3bf0ba2e5',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'geo-is-the-new-seo-why-generative-engine-optimization-is-not-optional-in-2026',
    title: 'GEO Is the New SEO: Why Generative Engine Optimization Is Not Optional in 2026',
    category: 'Platform Strategy',
    date: '2026-04-01',
    excerpt:
      'Executive Summary The rise of AI-powered search transforms how people find information online. Instead of scanning lists of links, users ask AI direct questions and receive concise answers. This shift signals the decline of traditional SEO and t...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-810f-a7be-c13ce73e0d62',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-cookieless-reckoning-first-party-data-incrementality-and-the-measurement-stack-that-survives',
    title: 'The Cookieless Reckoning: First-Party Data, Incrementality, and the Measurement Stack That Survives',
    category: 'Measurement & Attribution',
    date: '2026-04-01',
    excerpt:
      'Executive Summary The 2026 third-party cookie deprecation forces organizations to own legal compliance and data consent. Marketers must pivot to cookieless attribution methods, incrementality testing, and marketing mix modeling (MMM). First-part...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-81ac-abce-cd7a264fd4e8',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'creative-fatigue-is-a-solved-problem-how-ai-autonomous-optimization-changes-the-game',
    title: 'Creative Fatigue Is a Solved Problem: How AI Autonomous Optimization Changes the Game',
    category: 'Creative & Content',
    date: '2026-04-01',
    excerpt:
      'Executive Summary Over half of UK and US content professionals now use AI to accelerate creative production. However, the greatest evolution in Meta advertising for 2026 is not the creative itself, but targeting strategy. Manual interest stackin...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-81a2-a762-f515efe559e5',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-saaspocalypse-is-here-how-agentic-workflows-are-replacing-your-software-stack',
    title: 'The SaaSpocalypse Is Here: How Agentic Workflows Are Replacing Your Software Stack',
    category: 'AI & Automation',
    date: '2026-04-01',
    excerpt:
      'Executive Summary The SaaSpocalypse signals a monumental shift from traditional software to AI-driven, agentic workflows. By the end of 2026, 40% of applications will integrate task-specific AI agents that drive continuous outcomes. Marketing le...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-8180-ae51-fec9e405d3f1',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-ai-model-wars-what-gpt-5-4-claude-4-5-and-gemini-2-5-mean-for-your-marketing-stack',
    title: 'The AI Model Wars: What GPT-5.4, Claude 4.5, and Gemini 2.5 Mean for Your Marketing Stack',
    category: 'AI & Automation',
    date: '2026-04-01',
    excerpt:
      'Executive Summary OpenAI’s GPT-5.4 raises the bar with a 1 million token context window and enhanced native coding capabilities. Google’s Gemini 2.5 Pro and Anthropic’s Claude 4.5 battle for dominance across real-world benchmarks. The future of ...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-816d-978b-fad86b852688',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'mmm-vs-mta-the-measurement-debate-that-determines-where-your-budget-goes',
    title: 'MMM vs. MTA: The Measurement Debate That Determines Where Your Budget Goes',
    category: 'Measurement & Attribution',
    date: '2026-04-01',
    excerpt:
      'Executive Summary Marketing leaders in 2026 face new challenges measuring incremental revenue due to privacy changes and cookie deprecation. Media Mix Modeling (MMM), combined with experimental incrementality data, fills critical measurement gap...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-813d-bc1e-c6ef5a740c54',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-trust-threshold-why-consumers-are-skeptical-of-ai-and-what-brands-must-do-about-it',
    title: 'The Trust Threshold: Why Consumers Are Skeptical of AI and What Brands Must Do About It',
    category: 'AI & Automation',
    date: '2026-04-01',
    excerpt:
      'Executive Summary Privacy and trust remain nonnegotiable pillars of consumer relationships in the digital age. AI enables brands to scale micro-moments of trust by personalizing interactions at unprecedented levels. However, navigating the uncan...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-8159-98fe-d12ffdf27ab4',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'ai-to-ai-advertising-when-the-buyer-and-the-seller-are-both-machines',
    title: 'AI-to-AI Advertising: When the Buyer and the Seller Are Both Machines',
    category: 'AI & Automation',
    date: '2026-04-01',
    excerpt:
      'Executive Summary AI-driven advertising transforms paid social media across Meta, Google, and Amazon. By 2026, digital ads will claim 69% of global ad spend, with AI agents autonomously managing media buying workflows. This article explores how ...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-81a1-bc21-ccd81c45136e',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'the-modern-marketer-s-survival-guide-what-ai-killed-what-it-created-and-where-you-fit',
    title: 'The Modern Marketer\'s Survival Guide: What AI Killed, What It Created, and Where You Fit',
    category: 'AI & Automation',
    date: '2026-04-01',
    excerpt:
      'Executive Summary AI transforms marketing by eliminating poor positioning, not jobs. Success depends on marketers who can clearly define goals for AI agents to execute. The future favors those who design effective systems over those who simply u...',
    readTime: '5 min',
    source: 'notion',
    pageId: '33581f05-1e83-814f-b4e8-d06660e49bf6',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'beyond-the-chatbox-the-no-shame-guide-to-the-agentic-ai-era-of-2026',
    title: 'Beyond the Chatbox: The No-Shame Guide to the Agentic AI Era of 2026',
    category: 'AI & Automation',
    date: '2026-03-26',
    excerpt:
      'Executive Summary: The Agentic AI market is projected to grow from $9.14 billion in 2026 to over $139 billion by 2034, a 40.5% CAGR. This guide is for every professional who feels like they missed a meeting: the one where everyone else apparently ...',
    readTime: '10 min',
    source: 'notion',
    pageId: '32f81f05-1e83-819a-a18f-f4da0dc19222',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },
  {
    slug: 'sales-team-architecture-for-modern-performance-marketing-agencies-a-data-driven-framework-for-sustainable-revenue-growth',
    title: 'Sales Team Architecture for Modern Performance Marketing Agencies: A Data-Driven Framework for Sustainable Revenue Growth',
    category: 'Agency Strategy',
    date: '2026-03-25',
    excerpt:
      'Tiger Tracks  ·  Eye of the Tiger  ·  Sales Strategy & Agency Growth  ·  March 2026',
    readTime: '10 min',
    source: 'notion',
    pageId: '32e81f05-1e83-815f-813e-dc45c3609ff4',
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663435712979/VHEvNbIkhuFDnaIO.png',
  },

  // -- WordPress posts (manually curated, preserved across syncs) --
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
    title: 'TikTok Ads: A Senior Media Buyer',
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

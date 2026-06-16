#!/usr/bin/env npx tsx
/**
 * sync-notion.ts
 *
 * Fetches all published child pages from the Notion "Eye of the Tiger"
 * parent page and rebuilds src/data/blogPosts.ts as the single source
 * of truth. WordPress posts are preserved from the existing file.
 *
 * Usage:
 *   NOTION_API_KEY=<key> npm run sync-posts
 *
 * The script:
 *  1. Lists child_page blocks under the parent page (1-2 API calls)
 *  2. Retrieves each child page to extract title, date, cover, properties
 *  3. Fetches the first ~2000 words of body blocks to estimate read time
 *     and extract a lead paragraph for the excerpt
 *  4. Writes a fully typed blogPosts.ts, Notion posts first then WordPress
 */

import { Client } from '@notionhq/client';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PARENT_PAGE_ID = '32481f051e838043a9b4dd0881c79986';
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/blogPosts.ts');
const DELAY_MS = 1000; // 1s between API calls to avoid rate limits
const WORDS_PER_MINUTE = 200;

// ---------------------------------------------------------------------------
// Notion client
// ---------------------------------------------------------------------------

const apiKey = process.env.NOTION_API_KEY;
if (!apiKey) {
  console.error('ERROR: NOTION_API_KEY environment variable is required.');
  process.exit(1);
}

const notion = new Client({ auth: apiKey, timeoutMs: 30_000 });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function withRetry<T>(
  fn: () => Promise<T>,
  label: string,
  maxRetries = 3,
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      const isRateLimited =
        error instanceof Error &&
        'code' in error &&
        (error as { code: string }).code === 'rate_limited';

      if (!isRateLimited || attempt === maxRetries) throw error;

      const waitMs = 3000 * Math.pow(2, attempt);
      console.log(`  Rate limited on ${label}, retrying in ${waitMs}ms...`);
      await sleep(waitMs);
    }
  }
  throw new Error('Unreachable');
}

// ---------------------------------------------------------------------------
// Category detection from page content
// ---------------------------------------------------------------------------

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'AI & Automation': ['ai', 'agent', 'agentic', 'automation', 'gpt', 'claude', 'gemini', 'llm', 'model', 'prompt', 'saas', 'synthetic', 'machine'],
  'Platform Strategy': ['seo', 'geo', 'google', 'meta', 'tiktok', 'platform', 'social commerce', 'zero-click', 'search', 'overviews'],
  'Measurement & Attribution': ['measurement', 'attribution', 'mmm', 'mta', 'cookie', 'incrementality', 'tracking', 'data', 'adaptive', 'real-time'],
  'Creative & Content': ['creative', 'content', 'ugc', 'influencer', 'fatigue', 'authenticity', 'slop', 'trust', 'ideation'],
  'Agency Strategy': ['agency', 'sales team', 'growth marketing', 'geometry'],
  'PE/VC': ['pe', 'vc', 'private equity', 'venture', 'general catalyst', 'due diligence', 'portfolio'],
};

function detectCategory(title: string, excerpt: string): string {
  const text = `${title} ${excerpt}`.toLowerCase();

  let bestCategory = 'AI & Automation';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

// ---------------------------------------------------------------------------
// Notion data extraction
// ---------------------------------------------------------------------------

interface RawPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  source: 'notion';
  pageId: string;
  coverImage?: string;
}

/**
 * Extract title from a Notion page object.
 */
function extractTitle(page: Record<string, unknown>): string {
  const props = page.properties as Record<string, unknown> | undefined;
  if (!props) return '';

  for (const val of Object.values(props)) {
    if (
      val &&
      typeof val === 'object' &&
      'type' in (val as Record<string, unknown>) &&
      (val as { type: string }).type === 'title'
    ) {
      const segments = (val as { title: { plain_text: string }[] }).title;
      return segments.map((s) => s.plain_text).join('');
    }
  }
  return '';
}

/**
 * Extract cover image URL from a Notion page.
 */
function extractCover(page: Record<string, unknown>): string | undefined {
  if (!('cover' in page) || !page.cover) return undefined;
  const cover = page.cover as {
    type: string;
    external?: { url: string };
    file?: { url: string };
  };
  if (cover.type === 'external') return cover.external?.url;
  if (cover.type === 'file') return cover.file?.url;
  return undefined;
}

/**
 * Extract created/last_edited date from a Notion page.
 */
function extractDate(page: Record<string, unknown>): string {
  // Try properties for a "Date" or "Published" property first
  const props = page.properties as Record<string, unknown> | undefined;
  if (props) {
    for (const [key, val] of Object.entries(props)) {
      if (
        val &&
        typeof val === 'object' &&
        'type' in (val as Record<string, unknown>) &&
        (val as { type: string }).type === 'date'
      ) {
        const dateObj = (val as { date: { start?: string } | null }).date;
        if (dateObj?.start) return dateObj.start;
      }
    }
  }

  // Fall back to created_time
  if ('created_time' in page && typeof page.created_time === 'string') {
    return page.created_time.slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

/**
 * Extract a select/multi_select property value (for category).
 */
function extractSelectProperty(
  page: Record<string, unknown>,
  propertyName: string,
): string | null {
  const props = page.properties as Record<string, unknown> | undefined;
  if (!props) return null;

  for (const [key, val] of Object.entries(props)) {
    if (key.toLowerCase() !== propertyName.toLowerCase()) continue;
    if (!val || typeof val !== 'object') continue;

    const typed = val as { type: string; select?: { name: string } | null; multi_select?: { name: string }[] };
    if (typed.type === 'select' && typed.select?.name) {
      return typed.select.name;
    }
    if (typed.type === 'multi_select' && typed.multi_select?.length) {
      return typed.multi_select[0].name;
    }
  }
  return null;
}

/**
 * Fetch first ~50 blocks of a page to extract excerpt and word count.
 */
async function fetchExcerptAndWordCount(
  pageId: string,
): Promise<{ excerpt: string; wordCount: number }> {
  let allText = '';
  let excerpt = '';

  try {
    const response = await withRetry(
      () => notion.blocks.children.list({ block_id: pageId, page_size: 50 }),
      `blocks(${pageId.slice(0, 8)})`,
    );

    for (const block of response.results) {
      if (!('type' in block)) continue;
      const b = block as Record<string, unknown>;
      const type = b.type as string;

      // Skip non-text blocks
      if (['child_page', 'child_database', 'image', 'video', 'embed', 'divider', 'table'].includes(type)) {
        continue;
      }

      const blockData = (b[type] ?? {}) as Record<string, unknown>;
      const richText = blockData.rich_text as { plain_text: string }[] | undefined;
      if (!richText?.length) continue;

      const text = richText.map((s) => s.plain_text).join('');
      allText += text + ' ';

      // Use the first substantial paragraph as the excerpt
      if (!excerpt && type === 'paragraph' && text.length > 60) {
        excerpt = text.length > 250 ? text.slice(0, 247) + '...' : text;
      }

      // Also check callouts for excerpts (executive summaries)
      if (!excerpt && type === 'callout' && text.length > 60) {
        excerpt = text.length > 250 ? text.slice(0, 247) + '...' : text;
      }
    }
  } catch (error) {
    console.warn(`  Warning: could not fetch blocks for ${pageId}`);
  }

  const wordCount = allText.split(/\s+/).filter(Boolean).length;
  return { excerpt, wordCount };
}

// ---------------------------------------------------------------------------
// Read existing WordPress posts from the current file
// ---------------------------------------------------------------------------

interface WordPressPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  source: 'wordpress';
}

function readExistingWordPressPosts(): WordPressPost[] {
  try {
    const content = fs.readFileSync(OUTPUT_PATH, 'utf-8');

    // Find the WordPress section and extract posts line-by-line
    const lines = content.split('\n');
    let inWpSection = false;
    let objectLines: string[] = [];
    const posts: WordPressPost[] = [];

    for (const line of lines) {
      if (line.includes('WordPress posts')) {
        inWpSection = true;
        continue;
      }
      if (!inWpSection) continue;
      if (line.includes('].map(')) break;

      objectLines.push(line);

      // When we hit a closing brace, parse the accumulated object
      if (line.trim() === '},' || line.trim() === '}') {
        const objStr = objectLines.join('\n');

        const slugMatch = objStr.match(/slug:\s*'([^']*)'/);
        const titleMatch = objStr.match(/title:\s*['"]([^'"]*(?:\\.[^'"]*)*)['"]/);
        const catMatch = objStr.match(/category:\s*'([^']*)'/);
        const dateMatch = objStr.match(/date:\s*'([^']*)'/);
        const excerptMatch = objStr.match(/excerpt:[^']*'([^']*)'/);
        const readTimeMatch = objStr.match(/readTime:\s*'([^']*)'/);
        const sourceMatch = objStr.match(/source:\s*'wordpress'/);

        if (slugMatch && titleMatch && catMatch && dateMatch && excerptMatch && readTimeMatch && sourceMatch) {
          posts.push({
            slug: slugMatch[1],
            title: titleMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"'),
            category: catMatch[1],
            date: dateMatch[1],
            excerpt: excerptMatch[1].replace(/\\'/g, "'"),
            readTime: readTimeMatch[1],
            source: 'wordpress',
          });
        }

        objectLines = [];
      }
    }

    console.log(`  Found ${posts.length} existing WordPress posts to preserve`);
    return posts;
  } catch {
    console.log('  No existing blogPosts.ts found, starting fresh');
    return [];
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Syncing blog posts from Notion...\n');

  // 1. List all child_page blocks under the parent page
  console.log('Step 1: Listing child pages...');
  const childPages: { id: string; title: string }[] = [];
  let cursor: string | undefined;

  do {
    const response = await withRetry(
      () => notion.blocks.children.list({
        block_id: PARENT_PAGE_ID,
        start_cursor: cursor,
        page_size: 100,
      }),
      'blocks.children.list',
    );

    for (const block of response.results) {
      if (!('type' in block)) continue;
      const b = block as Record<string, unknown>;
      if (b.type !== 'child_page') continue;

      const childPageData = b.child_page as { title?: string } | undefined;
      const title = childPageData?.title ?? '';
      if (title) {
        childPages.push({ id: b.id as string, title });
      }
    }

    cursor = response.has_more
      ? (response.next_cursor ?? undefined) as string | undefined
      : undefined;
  } while (cursor);

  console.log(`  Found ${childPages.length} child pages\n`);

  if (childPages.length === 0) {
    console.error('ERROR: No child pages found. Aborting to prevent data loss.');
    process.exit(1);
  }

  // 2. Retrieve each page and extract metadata
  console.log('Step 2: Fetching page metadata and excerpts...');
  const notionPosts: RawPost[] = [];

  for (let i = 0; i < childPages.length; i++) {
    const { id, title: childTitle } = childPages[i];
    console.log(`  [${i + 1}/${childPages.length}] ${childTitle.slice(0, 60)}...`);

    try {
      // Fetch page metadata
      await sleep(DELAY_MS);
      const page = await withRetry(
        () => notion.pages.retrieve({ page_id: id }),
        `pages.retrieve(${id.slice(0, 8)})`,
      ) as Record<string, unknown>;

      if (!('properties' in page)) {
        console.log('    Skipped (no properties)');
        continue;
      }

      const title = extractTitle(page) || childTitle;
      const slug = slugify(title);

      // Skip internal/planning pages
      const lowerTitle = title.toLowerCase();
      if (
        lowerTitle.includes('roadmap') ||
        lowerTitle.includes('article brief') ||
        lowerTitle.includes('planning') ||
        lowerTitle.includes('template') ||
        lowerTitle.includes('draft notes')
      ) {
        console.log('    Skipped (internal/planning page)');
        continue;
      }

      const date = extractDate(page);
      const coverImage = extractCover(page);

      // Try to get category from properties
      let category = extractSelectProperty(page, 'category')
        ?? extractSelectProperty(page, 'Category')
        ?? extractSelectProperty(page, 'tags')
        ?? extractSelectProperty(page, 'Tags');

      // Fetch excerpt and word count
      await sleep(DELAY_MS);
      const { excerpt, wordCount } = await fetchExcerptAndWordCount(id);

      // Detect category from content if not set via properties
      if (!category) {
        category = detectCategory(title, excerpt);
      }

      // Calculate read time
      const minutes = Math.max(5, Math.ceil(wordCount / WORDS_PER_MINUTE));
      const readTime = `${minutes} min`;

      notionPosts.push({
        slug,
        title,
        category,
        date,
        excerpt: excerpt || `${title} -- strategic analysis from Tiger Tracks.`,
        readTime,
        source: 'notion',
        pageId: id,
        ...(coverImage && { coverImage }),
      });

      console.log(`    OK: ${category} | ${readTime} | ${wordCount} words`);
    } catch (error) {
      console.error(`    ERROR: Failed to process page ${id}:`, error);
    }
  }

  // Sort Notion posts by date descending
  notionPosts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  console.log(`\n  Processed ${notionPosts.length} Notion articles`);

  // 3. Read existing WordPress posts
  console.log('\nStep 3: Preserving WordPress posts...');
  const wpPosts = readExistingWordPressPosts();

  // 4. Write the output file
  console.log('\nStep 4: Writing blogPosts.ts...');

  // Escape for embedding inside a single-quoted TS string literal.
  // Crucially, collapse any newlines/tabs/runs of whitespace to single spaces:
  // Notion callouts and paragraphs can contain hard line breaks (\n) in their
  // plain_text, and a raw newline inside a single-quoted literal is an
  // "Unterminated string constant" syntax error that breaks the production build.
  const escapeStr = (s: string): string =>
    s
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\s+/g, ' ')
      .trim();

  let output = `export interface BlogPost {
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
`;

  // Notion posts
  output += `  // -- Notion posts (auto-synced from Notion, do not edit manually) --\n`;
  for (const post of notionPosts) {
    output += `  {\n`;
    output += `    slug: '${escapeStr(post.slug)}',\n`;
    output += `    title: '${escapeStr(post.title)}',\n`;
    output += `    category: '${escapeStr(post.category)}',\n`;
    output += `    date: '${escapeStr(post.date)}',\n`;
    output += `    excerpt:\n`;
    output += `      '${escapeStr(post.excerpt)}',\n`;
    output += `    readTime: '${escapeStr(post.readTime)}',\n`;
    output += `    source: 'notion',\n`;
    output += `    pageId: '${post.pageId}',\n`;
    if (post.coverImage) {
      output += `    coverImage: '${escapeStr(post.coverImage)}',\n`;
    }
    output += `  },\n`;
  }

  // WordPress posts
  if (wpPosts.length > 0) {
    output += `\n  // -- WordPress posts (manually curated, preserved across syncs) --\n`;
    for (const post of wpPosts) {
      output += `  {\n`;
      output += `    slug: '${escapeStr(post.slug)}',\n`;
      output += `    title: '${escapeStr(post.title)}',\n`;
      output += `    category: '${escapeStr(post.category)}',\n`;
      output += `    date: '${escapeStr(post.date)}',\n`;
      output += `    excerpt:\n`;
      output += `      '${escapeStr(post.excerpt)}',\n`;
      output += `    readTime: '${escapeStr(post.readTime)}',\n`;
      output += `    source: 'wordpress',\n`;
      output += `  },\n`;
    }
  }

  output += `].map((post) => ({
  ...post,
  author: 'Tiger Tracks' as const,
} as BlogPost));
`;

  fs.writeFileSync(OUTPUT_PATH, output, 'utf-8');

  const total = notionPosts.length + wpPosts.length;
  console.log(`\nDone! Wrote ${total} posts (${notionPosts.length} Notion + ${wpPosts.length} WordPress)`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});

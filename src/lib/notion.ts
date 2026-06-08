import { Client } from '@notionhq/client';
import { blogPosts, BlogPost } from '@/data/blogPosts';

// ---------------------------------------------------------------------------
// Notion client (initialized lazily so the app works without env vars)
// ---------------------------------------------------------------------------

function getNotionClient(): Client | null {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return null;
  return new Client({ auth: apiKey });
}

function getDatabaseId(): string | null {
  return process.env.NOTION_DATABASE_ID ?? null;
}

// ---------------------------------------------------------------------------
// Helpers to extract typed property values from Notion page properties
// ---------------------------------------------------------------------------

type NotionPage = Awaited<
  ReturnType<Client['databases']['query']>
>['results'][number];

function getRichText(prop: unknown): string {
  if (
    prop &&
    typeof prop === 'object' &&
    'rich_text' in (prop as Record<string, unknown>)
  ) {
    const rt = (prop as { rich_text: { plain_text: string }[] }).rich_text;
    return rt.map((t) => t.plain_text).join('');
  }
  return '';
}

function getTitle(prop: unknown): string {
  if (
    prop &&
    typeof prop === 'object' &&
    'title' in (prop as Record<string, unknown>)
  ) {
    const t = (prop as { title: { plain_text: string }[] }).title;
    return t.map((s) => s.plain_text).join('');
  }
  return '';
}

function getSelect(prop: unknown): string {
  if (
    prop &&
    typeof prop === 'object' &&
    'select' in (prop as Record<string, unknown>)
  ) {
    const sel = (prop as { select: { name: string } | null }).select;
    return sel?.name ?? '';
  }
  return '';
}

function getDate(prop: unknown): string {
  if (
    prop &&
    typeof prop === 'object' &&
    'date' in (prop as Record<string, unknown>)
  ) {
    const d = (prop as { date: { start: string } | null }).date;
    return d?.start ?? '';
  }
  return '';
}

// ---------------------------------------------------------------------------
// Map a Notion page to the BlogPost interface
// ---------------------------------------------------------------------------

function mapPageToBlogPost(page: NotionPage): BlogPost | null {
  if (!('properties' in page)) return null;

  const props = page.properties as Record<string, unknown>;

  const title = getTitle(props['Title'] ?? props['Name']);
  const slug =
    getRichText(props['Slug']) ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  if (!title || !slug) return null;

  return {
    slug,
    title,
    category: getSelect(props['Category']) || 'Uncategorized',
    date: getDate(props['Date']) || '',
    excerpt: getRichText(props['Excerpt']) || '',
    readTime: getRichText(props['Read Time']) || '5 min',
    source: 'notion',
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch all blog posts from Notion, falling back to static data on failure.
 * Designed to work with ISR (revalidate = 3600) when deployed on Vercel, and
 * with static export (returns static data when env vars are absent).
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const notion = getNotionClient();
  const databaseId = getDatabaseId();

  if (!notion || !databaseId) {
    // No Notion credentials - use static data
    return blogPosts;
  }

  try {
    const allPosts: BlogPost[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: cursor,
        page_size: 100,
        sorts: [{ property: 'Date', direction: 'descending' }],
      });

      for (const page of response.results) {
        const post = mapPageToBlogPost(page);
        if (post) allPosts.push(post);
      }

      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor);

    // Return Notion data if we got any; otherwise fall back to static
    return allPosts.length > 0 ? allPosts : blogPosts;
  } catch (error) {
    console.error('[notion] Failed to fetch blog posts:', error);
    return blogPosts;
  }
}

/**
 * Fetch a single blog post by slug.
 * Tries Notion first, then falls back to static data.
 */
export async function fetchBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const notion = getNotionClient();
  const databaseId = getDatabaseId();

  if (!notion || !databaseId) {
    return blogPosts.find((p) => p.slug === slug);
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
      page_size: 1,
    });

    if (response.results.length > 0) {
      const post = mapPageToBlogPost(response.results[0]);
      if (post) return post;
    }

    // Slug not found in Notion - check static data
    return blogPosts.find((p) => p.slug === slug);
  } catch (error) {
    console.error(`[notion] Failed to fetch post "${slug}":`, error);
    return blogPosts.find((p) => p.slug === slug);
  }
}

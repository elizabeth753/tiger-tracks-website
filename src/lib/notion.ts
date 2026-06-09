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

function getCoverUrl(page: NotionPage): string | undefined {
  if (!('cover' in page) || !page.cover) return undefined;
  const cover = page.cover as { type: string; external?: { url: string }; file?: { url: string } };
  if (cover.type === 'external') return cover.external?.url;
  if (cover.type === 'file') return cover.file?.url;
  return undefined;
}

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
    pageId: page.id,
    coverImage: getCoverUrl(page),
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
    console.log(`[notion] No credentials, falling back to static for "${slug}"`);
    return blogPosts.find((p) => p.slug === slug);
  }

  try {
    console.log(`[notion] Querying Notion for slug="${slug}", dbId=${databaseId}`);
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
      page_size: 1,
    });

    console.log(`[notion] Query returned ${response.results.length} results for slug="${slug}"`);

    if (response.results.length > 0) {
      const post = mapPageToBlogPost(response.results[0]);
      console.log(`[notion] Mapped post: pageId=${post?.pageId}, title="${post?.title}"`);
      if (post) return post;
    }

    // Slug not found in Notion - check static data
    console.log(`[notion] Slug "${slug}" not found in Notion, using static fallback`);
    return blogPosts.find((p) => p.slug === slug);
  } catch (error) {
    console.error(`[notion] Failed to fetch post "${slug}":`, error);
    return blogPosts.find((p) => p.slug === slug);
  }
}

// ---------------------------------------------------------------------------
// Notion Block Types (serializable subset for the client renderer)
// ---------------------------------------------------------------------------

export interface NotionRichText {
  plain_text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
}

export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  /* Each block type stores its data under its own key. We keep a loose shape
     here to avoid importing the full Notion SDK types on the client. */
  data: {
    rich_text?: NotionRichText[];
    language?: string;
    caption?: NotionRichText[];
    url?: string;
    icon?: { type: string; emoji?: string };
    checked?: boolean;
    expression?: string;
    cells?: NotionRichText[][];
    /* table rows */
    rows?: { cells: NotionRichText[][] }[];
  };
}

/**
 * Fetch all child blocks for a Notion page (handles pagination).
 * Returns a serializable array safe to pass from server to client components.
 */
export async function fetchPageBlocks(
  pageId: string,
): Promise<NotionBlock[]> {
  const notion = getNotionClient();
  if (!notion) {
    console.log(`[notion] No client for fetchPageBlocks, returning empty`);
    return [];
  }

  try {
    console.log(`[notion] Fetching blocks for pageId=${pageId}`);
    const blocks: NotionBlock[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });

      for (const block of response.results) {
        if (!('type' in block)) continue;
        const b = block as Record<string, unknown>;
        const type = b.type as string;
        const blockData = (b[type] ?? {}) as Record<string, unknown>;

        const parsed: NotionBlock = {
          id: b.id as string,
          type,
          has_children: b.has_children as boolean,
          data: {
            rich_text: blockData.rich_text as NotionRichText[] | undefined,
            language: blockData.language as string | undefined,
            caption: blockData.caption as NotionRichText[] | undefined,
            url: blockData.url as string | undefined,
            icon: blockData.icon as { type: string; emoji?: string } | undefined,
            checked: blockData.checked as boolean | undefined,
            expression: blockData.expression as string | undefined,
            cells: blockData.cells as NotionRichText[][] | undefined,
          },
        };

        /* Handle image blocks (file vs external) */
        if (type === 'image') {
          const imgType = blockData.type as string | undefined;
          if (imgType === 'file') {
            parsed.data.url = (blockData.file as { url: string })?.url;
          } else if (imgType === 'external') {
            parsed.data.url = (blockData.external as { url: string })?.url;
          }
        }

        /* Handle video/embed URL blocks similarly */
        if (type === 'video' || type === 'embed') {
          const mediaType = blockData.type as string | undefined;
          if (mediaType === 'external') {
            parsed.data.url = (blockData.external as { url: string })?.url;
          }
        }

        /* Recursively fetch children for toggles, column_lists, etc. */
        if (parsed.has_children) {
          parsed.children = await fetchPageBlocks(b.id as string);
        }

        blocks.push(parsed);
      }

      cursor = response.has_more
        ? (response.next_cursor ?? undefined)
        : undefined;
    } while (cursor);

    console.log(`[notion] Fetched ${blocks.length} blocks for pageId=${pageId}`);
    return blocks;
  } catch (error) {
    console.error(`[notion] Failed to fetch blocks for ${pageId}:`, error);
    return [];
  }
}

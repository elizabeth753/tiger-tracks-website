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

/** The parent page ID that contains child_page blocks (one per article). */
function getParentPageId(): string | null {
  return process.env.NOTION_DATABASE_ID ?? null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Retrieve a Notion page and extract a BlogPost from it.
 * Works with child pages (no database properties) by deriving
 * slug from title and using sensible defaults.
 */
async function childPageToBlogPost(
  notion: Client,
  pageId: string,
): Promise<BlogPost | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    if (!('properties' in page)) return null;

    const props = page.properties as Record<string, unknown>;

    // Extract title from the "title" type property
    let title = '';
    for (const val of Object.values(props)) {
      if (
        val &&
        typeof val === 'object' &&
        'type' in (val as Record<string, unknown>) &&
        (val as { type: string }).type === 'title'
      ) {
        const t = (val as { title: { plain_text: string }[] }).title;
        title = t.map((s) => s.plain_text).join('');
        break;
      }
    }

    if (!title) return null;

    const slug = slugify(title);

    // Try to match against static data for enriched metadata (category, excerpt, etc.)
    const staticMatch = blogPosts.find(
      (p) => p.slug === slug || slugify(p.title) === slug,
    );

    // Extract cover image
    let coverImage: string | undefined;
    if ('cover' in page && page.cover) {
      const cover = page.cover as {
        type: string;
        external?: { url: string };
        file?: { url: string };
      };
      if (cover.type === 'external') coverImage = cover.external?.url;
      if (cover.type === 'file') coverImage = cover.file?.url;
    }

    // Extract created date
    let date = '';
    if ('created_time' in page) {
      date = (page.created_time as string).slice(0, 10); // YYYY-MM-DD
    }

    return {
      slug: staticMatch?.slug ?? slug,
      title,
      category: staticMatch?.category ?? 'Uncategorized',
      date: staticMatch?.date ?? date,
      excerpt: staticMatch?.excerpt ?? '',
      readTime: staticMatch?.readTime ?? '5 min',
      source: 'notion',
      pageId,
      coverImage,
      author: staticMatch?.author,
      authorPedigree: staticMatch?.authorPedigree,
    };
  } catch (error) {
    console.error(`[notion] Failed to retrieve child page ${pageId}:`, error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch all blog posts by listing child_page blocks inside the parent page.
 * Falls back to static data when env vars are absent or on error.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const notion = getNotionClient();
  const parentPageId = getParentPageId();

  if (!notion || !parentPageId) {
    return blogPosts;
  }

  try {
    // 1. List all children of the parent page, collect child_page IDs
    const childPageIds: string[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: parentPageId,
        start_cursor: cursor,
        page_size: 100,
      });

      for (const block of response.results) {
        if ('type' in block && (block as { type: string }).type === 'child_page') {
          childPageIds.push((block as { id: string }).id);
        }
      }

      cursor = response.has_more
        ? (response.next_cursor ?? undefined)
        : undefined;
    } while (cursor);

    if (childPageIds.length === 0) {
      console.log('[notion] No child pages found, using static data');
      return blogPosts;
    }

    // 2. Retrieve each child page in parallel (batched)
    const posts = await Promise.all(
      childPageIds.map((id) => childPageToBlogPost(notion, id)),
    );

    const validPosts = posts.filter((p): p is BlogPost => p !== null);

    // 3. Sort by date descending
    validPosts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    console.log(
      `[notion] Fetched ${validPosts.length} posts from ${childPageIds.length} child pages`,
    );

    return validPosts.length > 0 ? validPosts : blogPosts;
  } catch (error) {
    console.error('[notion] Failed to fetch blog posts:', error);
    return blogPosts;
  }
}

/**
 * Fetch a single blog post by slug.
 * Uses the full post list (cached by ISR) then matches by slug.
 */
export async function fetchBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const notion = getNotionClient();
  const parentPageId = getParentPageId();

  if (!notion || !parentPageId) {
    return blogPosts.find((p) => p.slug === slug);
  }

  try {
    const allPosts = await fetchBlogPosts();
    const match = allPosts.find((p) => p.slug === slug);
    if (match) return match;

    // Slug not found in Notion child pages, try static
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
  data: {
    rich_text?: NotionRichText[];
    language?: string;
    caption?: NotionRichText[];
    url?: string;
    icon?: { type: string; emoji?: string };
    checked?: boolean;
    expression?: string;
    cells?: NotionRichText[][];
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
  if (!notion) return [];

  try {
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

        // Skip child_page and child_database blocks inside article content
        if (type === 'child_page' || type === 'child_database') continue;

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
            icon: blockData.icon as
              | { type: string; emoji?: string }
              | undefined,
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

    return blocks;
  } catch (error) {
    console.error(`[notion] Failed to fetch blocks for ${pageId}:`, error);
    return [];
  }
}

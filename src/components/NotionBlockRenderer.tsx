'use client';

import Image from 'next/image';
import type { NotionBlock, NotionRichText } from '@/lib/notion';

/* ------------------------------------------------------------------ */
/*  Rich Text Renderer                                                 */
/* ------------------------------------------------------------------ */

function RichText({ segments }: { segments: NotionRichText[] }) {
  if (!segments || segments.length === 0) return null;

  return (
    <>
      {segments.map((seg, i) => {
        let node: React.ReactNode = seg.plain_text;

        if (seg.annotations.code) {
          node = (
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.88em] font-mono text-[#229FA1] print:bg-gray-100 print:text-gray-800">
              {node}
            </code>
          );
        }
        if (seg.annotations.bold) {
          node = <strong className="font-semibold text-white print:text-black">{node}</strong>;
        }
        if (seg.annotations.italic) {
          node = <em>{node}</em>;
        }
        if (seg.annotations.strikethrough) {
          node = <s>{node}</s>;
        }
        if (seg.annotations.underline) {
          node = <u>{node}</u>;
        }
        if (seg.href) {
          node = (
            <a
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#229FA1] underline decoration-[#229FA1]/30 underline-offset-4 transition-colors duration-300 hover:decoration-[#229FA1] print:text-blue-700 print:decoration-blue-700/50"
            >
              {node}
            </a>
          );
        }

        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Individual Block Components                                        */
/* ------------------------------------------------------------------ */

function Paragraph({ block }: { block: NotionBlock }) {
  const rt = block.data.rich_text;
  if (!rt || rt.length === 0) return <div className="h-6 print:h-4" />;
  return (
    <p className="font-serif text-[#9E9E9E] leading-[1.95] text-base lg:text-lg text-justify print:text-black print:text-sm print:leading-[1.7]">
      <RichText segments={rt} />
    </p>
  );
}

function Heading1({ block }: { block: NotionBlock }) {
  return (
    <h2 className="mt-16 mb-6 text-2xl lg:text-3xl font-bold text-white tracking-tight font-sans uppercase print:text-black print:text-xl print:mt-10 print:mb-4">
      <RichText segments={block.data.rich_text ?? []} />
    </h2>
  );
}

function Heading2({ block }: { block: NotionBlock }) {
  return (
    <h2 className="mt-14 mb-5 text-xl lg:text-2xl font-bold text-white tracking-tight font-sans print:text-black print:text-lg print:mt-8 print:mb-3">
      <RichText segments={block.data.rich_text ?? []} />
    </h2>
  );
}

function Heading3({ block }: { block: NotionBlock }) {
  return (
    <h3 className="mt-10 mb-4 text-lg lg:text-xl font-semibold text-white tracking-tight font-sans print:text-black print:text-base print:mt-6 print:mb-2">
      <RichText segments={block.data.rich_text ?? []} />
    </h3>
  );
}

function BulletedListItem({ block }: { block: NotionBlock }) {
  return (
    <li className="font-serif text-[#9E9E9E] leading-[1.85] marker:text-[#229FA1] print:text-black print:marker:text-black print:text-sm">
      <RichText segments={block.data.rich_text ?? []} />
      {block.children && block.children.length > 0 && (
        <ul className="mt-2 ml-5 list-disc space-y-1.5">
          {block.children.map((child) => (
            <BlockRenderer key={child.id} block={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function NumberedListItem({ block }: { block: NotionBlock }) {
  return (
    <li className="font-serif text-[#9E9E9E] leading-[1.85] marker:text-[#229FA1] print:text-black print:marker:text-black print:text-sm">
      <RichText segments={block.data.rich_text ?? []} />
      {block.children && block.children.length > 0 && (
        <ol className="mt-2 ml-5 list-decimal space-y-1.5">
          {block.children.map((child) => (
            <BlockRenderer key={child.id} block={child} />
          ))}
        </ol>
      )}
    </li>
  );
}

function TodoItem({ block }: { block: NotionBlock }) {
  return (
    <li className="flex items-start gap-3 font-serif text-[#9E9E9E] leading-[1.85] print:text-black print:text-sm">
      <span className={`mt-1.5 h-4 w-4 shrink-0 rounded border ${block.data.checked ? 'bg-[#229FA1] border-[#229FA1] print:bg-black print:border-black' : 'border-white/20 print:border-gray-400'} flex items-center justify-center`}>
        {block.data.checked && (
          <svg className="w-2.5 h-2.5 text-white print:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className={block.data.checked ? 'line-through opacity-60' : ''}>
        <RichText segments={block.data.rich_text ?? []} />
      </span>
    </li>
  );
}

/**
 * Academic Abstract block: used for the FIRST quote or callout in an article.
 * Renders as a formal abstract with teal left border and italic serif text.
 */
function AbstractBlock({ block }: { block: NotionBlock }) {
  return (
    <div className="my-10 border-l-4 border-[#229FA1] bg-[#229FA1]/[0.04] p-6 md:p-8 print:border-l-2 print:border-gray-400 print:bg-gray-50 print:p-4">
      <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-[#229FA1] print:text-gray-600">
        Abstract
      </p>
      <p className="font-serif italic text-slate-300 text-base lg:text-lg leading-[1.95] text-justify print:text-black print:text-sm print:leading-[1.7]">
        <RichText segments={block.data.rich_text ?? []} />
      </p>
    </div>
  );
}

function Quote({ block }: { block: NotionBlock }) {
  return (
    <blockquote className="my-8 border-l-4 border-[#229FA1]/40 bg-white/[0.02] p-6 print:border-l-2 print:border-gray-300 print:bg-gray-50 print:p-4">
      <p className="font-serif italic text-slate-300 text-base lg:text-lg leading-[1.85] text-justify print:text-gray-700 print:text-sm">
        <RichText segments={block.data.rich_text ?? []} />
      </p>
    </blockquote>
  );
}

function Callout({ block }: { block: NotionBlock }) {
  const emoji = block.data.icon?.type === 'emoji' ? block.data.icon.emoji : null;
  return (
    <div className="my-8 flex gap-4 border-l-4 border-[#229FA1]/40 bg-white/[0.02] p-6 print:border-l-2 print:border-gray-300 print:bg-gray-50 print:p-4">
      {emoji && <span className="text-2xl shrink-0 mt-0.5 print:text-lg">{emoji}</span>}
      <div className="font-serif italic text-slate-300 text-base lg:text-lg leading-[1.85] text-justify print:text-gray-700 print:text-sm print:not-italic">
        <RichText segments={block.data.rich_text ?? []} />
        {block.children && block.children.length > 0 && (
          <div className="mt-3 not-italic font-sans text-base print:text-sm">
            {block.children.map((child) => (
              <BlockRenderer key={child.id} block={child} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CodeBlock({ block }: { block: NotionBlock }) {
  const lang = block.data.language || '';
  const text = (block.data.rich_text ?? []).map((s) => s.plain_text).join('');
  return (
    <div className="my-8 rounded-sm overflow-hidden border border-white/[0.06] print:border-gray-300 print:rounded-none">
      {/* Language tab */}
      <div className="flex items-center gap-2 bg-[#1B2126] px-4 py-2 border-b border-white/[0.06] print:bg-gray-100 print:border-gray-300">
        <div className="flex gap-1.5 print:hidden">
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <span className="ml-2 text-xs font-mono uppercase tracking-wider text-slate-500 print:text-gray-500 print:ml-0">{lang}</span>
      </div>
      <pre className="bg-[#0D151E] p-6 overflow-x-auto print:bg-gray-50 print:p-4">
        <code className="text-sm font-mono text-[#9E9E9E] leading-relaxed whitespace-pre print:text-black print:text-xs">{text}</code>
      </pre>
    </div>
  );
}

function NotionImage({ block }: { block: NotionBlock }) {
  const url = block.data.url;
  if (!url) return null;

  const caption = block.data.caption;
  const hasCaption = caption && caption.length > 0;

  return (
    <figure className="my-10 print:my-6">
      <div className="relative overflow-hidden border border-white/10 print:border-gray-300">
        <Image
          src={url}
          alt={hasCaption ? caption.map((s) => s.plain_text).join('') : 'Article image'}
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          unoptimized={url.startsWith('https://prod-files-secure') || url.startsWith('https://s3')}
        />
      </div>
      {hasCaption && (
        <figcaption className="mt-3 text-center text-sm font-serif italic text-slate-500 print:text-gray-500 print:text-xs">
          <RichText segments={caption} />
        </figcaption>
      )}
    </figure>
  );
}

function Divider() {
  return (
    <hr className="my-10 border-t border-white/10 print:border-gray-300 print:my-6" />
  );
}

function Toggle({ block }: { block: NotionBlock }) {
  return (
    <details className="my-4 group border border-white/[0.06] bg-white/[0.01] print:border-gray-300">
      <summary className="cursor-pointer px-5 py-4 text-white font-sans font-medium list-none flex items-center gap-3 print:text-black">
        <svg
          className="w-4 h-4 text-[#229FA1] transition-transform duration-200 group-open:rotate-90 print:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <RichText segments={block.data.rich_text ?? []} />
      </summary>
      <div className="px-5 pb-4 pl-12 space-y-3">
        {block.children?.map((child) => (
          <BlockRenderer key={child.id} block={child} />
        ))}
      </div>
    </details>
  );
}

function VideoEmbed({ block }: { block: NotionBlock }) {
  const url = block.data.url;
  if (!url) return null;

  /* Extract YouTube/Vimeo embed URLs */
  let embedUrl = url;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return (
    <div className="my-10 overflow-hidden border border-white/10 print:hidden" style={{ aspectRatio: '16/9' }}>
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    </div>
  );
}

function TableBlock({ block }: { block: NotionBlock }) {
  if (!block.children || block.children.length === 0) return null;

  return (
    <div className="my-8 overflow-hidden border border-white/[0.06] print:border-gray-300">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-serif print:text-xs">
          <tbody>
            {block.children.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={rowIdx === 0 ? 'bg-[#1B2126] print:bg-gray-100' : rowIdx % 2 === 0 ? 'bg-white/[0.02] print:bg-gray-50' : 'print:bg-white'}
              >
                {(row.data.cells ?? []).map((cell, cellIdx) => {
                  const Tag = rowIdx === 0 ? 'th' : 'td';
                  return (
                    <Tag
                      key={cellIdx}
                      className={`px-4 py-3 text-left border-b border-white/[0.04] print:border-gray-200 ${
                        rowIdx === 0
                          ? 'font-semibold text-white text-xs uppercase tracking-wider font-sans print:text-black'
                          : 'text-[#9E9E9E] print:text-black'
                      }`}
                    >
                      <RichText segments={cell} />
                    </Tag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Block Router                                                       */
/* ------------------------------------------------------------------ */

function BlockRenderer({ block, isFirstQuoteOrCallout }: { block: NotionBlock; isFirstQuoteOrCallout?: boolean }) {
  switch (block.type) {
    case 'paragraph':
      return <Paragraph block={block} />;
    case 'heading_1':
      return <Heading1 block={block} />;
    case 'heading_2':
      return <Heading2 block={block} />;
    case 'heading_3':
      return <Heading3 block={block} />;
    case 'bulleted_list_item':
      return <BulletedListItem block={block} />;
    case 'numbered_list_item':
      return <NumberedListItem block={block} />;
    case 'to_do':
      return <TodoItem block={block} />;
    case 'quote':
      return isFirstQuoteOrCallout ? <AbstractBlock block={block} /> : <Quote block={block} />;
    case 'callout':
      return isFirstQuoteOrCallout ? <AbstractBlock block={block} /> : <Callout block={block} />;
    case 'code':
      return <CodeBlock block={block} />;
    case 'image':
      return <NotionImage block={block} />;
    case 'divider':
      return <Divider />;
    case 'toggle':
      return <Toggle block={block} />;
    case 'video':
    case 'embed':
      return <VideoEmbed block={block} />;
    case 'table':
      return <TableBlock block={block} />;
    case 'column_list':
      return (
        <div className="my-8 grid gap-6 print:gap-4" style={{ gridTemplateColumns: `repeat(${block.children?.length ?? 2}, 1fr)` }}>
          {block.children?.map((col) => (
            <div key={col.id} className="space-y-4">
              {col.children?.map((child) => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </div>
          ))}
        </div>
      );
    case 'bookmark':
      return (
        <a
          href={block.data.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="my-6 flex items-center gap-3 border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-[#229FA1] text-sm font-mono hover:border-[#229FA1]/30 transition-colors duration-300 print:text-blue-700 print:border-gray-300 print:bg-gray-50"
        >
          <svg className="w-4 h-4 shrink-0 print:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="truncate">{block.data.url}</span>
        </a>
      );
    /* Unsupported block types render nothing */
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  List Grouper                                                       */
/*  Notion returns list items as siblings, not wrapped in <ul>/<ol>.   */
/*  This groups consecutive items before rendering.                     */
/* ------------------------------------------------------------------ */

interface GroupedBlock {
  kind: 'single' | 'bulleted_list' | 'numbered_list' | 'todo_list';
  blocks: NotionBlock[];
}

function groupBlocks(blocks: NotionBlock[]): GroupedBlock[] {
  const groups: GroupedBlock[] = [];
  let current: GroupedBlock | null = null;

  for (const block of blocks) {
    if (block.type === 'bulleted_list_item') {
      if (current?.kind === 'bulleted_list') {
        current.blocks.push(block);
      } else {
        current = { kind: 'bulleted_list', blocks: [block] };
        groups.push(current);
      }
    } else if (block.type === 'numbered_list_item') {
      if (current?.kind === 'numbered_list') {
        current.blocks.push(block);
      } else {
        current = { kind: 'numbered_list', blocks: [block] };
        groups.push(current);
      }
    } else if (block.type === 'to_do') {
      if (current?.kind === 'todo_list') {
        current.blocks.push(block);
      } else {
        current = { kind: 'todo_list', blocks: [block] };
        groups.push(current);
      }
    } else {
      current = null;
      groups.push({ kind: 'single', blocks: [block] });
    }
  }

  return groups;
}

/* ------------------------------------------------------------------ */
/*  Public Export                                                       */
/* ------------------------------------------------------------------ */

export function NotionBlockRenderer({ blocks }: { blocks: NotionBlock[] }) {
  const grouped = groupBlocks(blocks);

  // Track whether we've rendered the first quote/callout as an abstract
  let hasRenderedAbstract = false;

  return (
    <>
      {grouped.map((group, i) => {
        if (group.kind === 'bulleted_list') {
          return (
            <ul key={i} className="my-4 ml-5 list-disc space-y-1.5">
              {group.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ul>
          );
        }
        if (group.kind === 'numbered_list') {
          return (
            <ol key={i} className="my-4 ml-5 list-decimal space-y-1.5">
              {group.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ol>
          );
        }
        if (group.kind === 'todo_list') {
          return (
            <ul key={i} className="my-4 space-y-2 list-none">
              {group.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ul>
          );
        }

        const block = group.blocks[0];
        const isQuoteOrCallout = block.type === 'quote' || block.type === 'callout';
        const shouldBeAbstract = isQuoteOrCallout && !hasRenderedAbstract;

        if (shouldBeAbstract) {
          hasRenderedAbstract = true;
        }

        return (
          <BlockRenderer
            key={block.id}
            block={block}
            isFirstQuoteOrCallout={shouldBeAbstract}
          />
        );
      })}
    </>
  );
}

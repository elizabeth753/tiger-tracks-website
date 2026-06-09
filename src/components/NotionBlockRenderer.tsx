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
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.88em] font-mono text-[#229FA1]">
              {node}
            </code>
          );
        }
        if (seg.annotations.bold) {
          node = <strong className="font-semibold text-white">{node}</strong>;
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
              className="text-[#229FA1] underline decoration-[#229FA1]/30 underline-offset-4 transition-colors duration-300 hover:decoration-[#229FA1]"
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
  if (!rt || rt.length === 0) return <div className="h-6" />;
  return (
    <p className="text-[#9E9E9E] leading-[1.85] text-base lg:text-lg">
      <RichText segments={rt} />
    </p>
  );
}

function Heading2({ block }: { block: NotionBlock }) {
  return (
    <h2 className="mt-14 mb-5 text-2xl lg:text-3xl font-bold text-white tracking-tight">
      <RichText segments={block.data.rich_text ?? []} />
    </h2>
  );
}

function Heading3({ block }: { block: NotionBlock }) {
  return (
    <h3 className="mt-10 mb-4 text-xl lg:text-2xl font-semibold text-white tracking-tight">
      <RichText segments={block.data.rich_text ?? []} />
    </h3>
  );
}

function Heading1({ block }: { block: NotionBlock }) {
  return (
    <h2 className="mt-16 mb-6 text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
      <RichText segments={block.data.rich_text ?? []} />
    </h2>
  );
}

function BulletedListItem({ block }: { block: NotionBlock }) {
  return (
    <li className="text-[#9E9E9E] leading-[1.85] marker:text-[#229FA1]">
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
    <li className="text-[#9E9E9E] leading-[1.85] marker:text-[#229FA1]">
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
    <li className="flex items-start gap-3 text-[#9E9E9E] leading-[1.85]">
      <span className={`mt-1.5 h-4 w-4 shrink-0 rounded border ${block.data.checked ? 'bg-[#229FA1] border-[#229FA1]' : 'border-white/20'} flex items-center justify-center`}>
        {block.data.checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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

function Quote({ block }: { block: NotionBlock }) {
  return (
    <blockquote className="my-8 border-l-4 border-[#229FA1] bg-[#1B2126]/50 rounded-r-xl p-6 backdrop-blur-sm">
      <p className="font-serif italic text-slate-300 text-lg leading-relaxed">
        <RichText segments={block.data.rich_text ?? []} />
      </p>
    </blockquote>
  );
}

function Callout({ block }: { block: NotionBlock }) {
  const emoji = block.data.icon?.type === 'emoji' ? block.data.icon.emoji : null;
  return (
    <div className="my-8 flex gap-4 border-l-4 border-[#229FA1] bg-[#1B2126]/50 rounded-r-xl p-6 backdrop-blur-sm">
      {emoji && <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>}
      <div className="font-serif italic text-slate-300 text-lg leading-relaxed">
        <RichText segments={block.data.rich_text ?? []} />
        {block.children && block.children.length > 0 && (
          <div className="mt-3 not-italic font-sans text-base">
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
    <div className="my-8 rounded-xl overflow-hidden border border-white/[0.06]">
      {/* Language tab */}
      <div className="flex items-center gap-2 bg-[#1B2126] px-4 py-2 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <span className="ml-2 text-xs font-mono uppercase tracking-wider text-slate-500">{lang}</span>
      </div>
      <pre className="bg-[#0D151E] p-6 overflow-x-auto">
        <code className="text-sm font-mono text-[#9E9E9E] leading-relaxed whitespace-pre">{text}</code>
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
    <figure className="my-10">
      <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
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
        <figcaption className="mt-3 text-center text-sm text-slate-500 italic">
          <RichText segments={caption} />
        </figcaption>
      )}
    </figure>
  );
}

function Divider() {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#229FA1]/20 to-transparent" />
      <div className="h-1.5 w-1.5 rounded-full bg-[#229FA1]/30" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#229FA1]/20 to-transparent" />
    </div>
  );
}

function Toggle({ block }: { block: NotionBlock }) {
  return (
    <details className="my-4 group rounded-xl border border-white/[0.06] bg-[#1B2126]/30">
      <summary className="cursor-pointer px-5 py-4 text-white font-medium list-none flex items-center gap-3">
        <svg
          className="w-4 h-4 text-[#229FA1] transition-transform duration-200 group-open:rotate-90"
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
    <div className="my-10 rounded-xl overflow-hidden border border-white/10 shadow-2xl" style={{ aspectRatio: '16/9' }}>
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
    <div className="my-8 rounded-xl overflow-hidden border border-white/[0.06]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {block.children.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={rowIdx === 0 ? 'bg-[#1B2126]' : rowIdx % 2 === 0 ? 'bg-white/[0.02]' : ''}
              >
                {(row.data.cells ?? []).map((cell, cellIdx) => {
                  const Tag = rowIdx === 0 ? 'th' : 'td';
                  return (
                    <Tag
                      key={cellIdx}
                      className={`px-4 py-3 text-left border-b border-white/[0.04] ${
                        rowIdx === 0
                          ? 'font-semibold text-white text-xs uppercase tracking-wider'
                          : 'text-[#9E9E9E]'
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

function BlockRenderer({ block }: { block: NotionBlock }) {
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
      return <Quote block={block} />;
    case 'callout':
      return <Callout block={block} />;
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
        <div className="my-8 grid gap-6" style={{ gridTemplateColumns: `repeat(${block.children?.length ?? 2}, 1fr)` }}>
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
          className="my-6 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#1B2126]/50 px-5 py-4 text-[#229FA1] text-sm hover:border-[#229FA1]/30 transition-colors duration-300"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        return <BlockRenderer key={group.blocks[0].id} block={group.blocks[0]} />;
      })}
    </>
  );
}

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import type { RichTextItemResponse } from "@notionhq/client";
import type { NotionBlockNode } from "@/lib/notion-blocks";

/** Renders Notion rich text, honoring inline formatting instead of flattening
 * to plain text (bold/italic/strikethrough/underline/code/links). */
function RichText({ richText }: { richText: RichTextItemResponse[] }) {
  return (
    <>
      {richText.map((item, i) => {
        let node: ReactNode = item.plain_text;
        const { bold, italic, strikethrough, underline, code } = item.annotations;
        if (code) {
          node = (
            <code className="px-1 py-0.5 rounded bg-muted text-sm">{node}</code>
          );
        }
        if (bold) node = <strong>{node}</strong>;
        if (italic) node = <em>{node}</em>;
        if (strikethrough) node = <s>{node}</s>;
        if (underline) node = <u>{node}</u>;
        if (item.href) {
          node = (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-2"
            >
              {node}
            </a>
          );
        }
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}

function NotionImage({
  block,
}: {
  block: Extract<NotionBlockNode, { type: "image" }>;
}) {
  const img = block.image;
  const url = img.type === "file" ? img.file.url : img.external.url;
  return (
    <figure className="my-6">
      {/* No fixed aspect-ratio box here on purpose: Notion's API doesn't
       * return image dimensions, and cropping a dashboard screenshot to a
       * forced ratio cuts off real content. width=0/height=0 + style
       * width:100%/height:auto is next/image's documented pattern for
       * "unknown intrinsic size, scale to container width, keep natural
       * ratio" — the image renders at its original aspect ratio, uncropped. */}
      <div className="w-full rounded-xl overflow-hidden border border-border">
        <Image
          src={url}
          alt=""
          width={0}
          height={0}
          sizes="(min-width: 768px) 700px, 100vw"
          quality={100}
          style={{ width: "100%", height: "auto" }}
          className="block"
        />
      </div>
      {img.caption.length > 0 && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          <RichText richText={img.caption} />
        </figcaption>
      )}
    </figure>
  );
}

// Content headings start at h2 — the page's own title is the h1, rendered by
// the detail page's hero, so this keeps the document outline correct.
function renderBlock(block: NotionBlockNode): ReactNode {
  switch (block.type) {
    case "paragraph":
      if (block.paragraph.rich_text.length === 0) return null;
      return (
        <p className="leading-relaxed mb-4">
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h2 className="text-2xl font-bold mt-10 mb-4">
          <RichText richText={block.heading_1.rich_text} />
        </h2>
      );
    case "heading_2":
      return (
        <h3 className="text-xl font-bold mt-8 mb-3">
          <RichText richText={block.heading_2.rich_text} />
        </h3>
      );
    case "heading_3":
      return (
        <h4 className="text-lg font-semibold mt-6 mb-2">
          <RichText richText={block.heading_3.rich_text} />
        </h4>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-6">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );
    case "divider":
      return <hr className="my-8 border-border" />;
    case "callout":
      return (
        <div className="flex gap-3 rounded-xl bg-muted/50 border border-border p-4 my-6">
          {block.callout.icon?.type === "emoji" && (
            <span aria-hidden>{block.callout.icon.emoji}</span>
          )}
          <div className="leading-relaxed">
            <RichText richText={block.callout.rich_text} />
          </div>
        </div>
      );
    case "image":
      return <NotionImage block={block} />;
    default:
      // Tables, toggles, embeds, videos, columns, etc. — out of scope for now,
      // skipped silently rather than crashing. Extend here if/when needed.
      return null;
  }
}

function listItemRichText(block: NotionBlockNode): RichTextItemResponse[] {
  if (block.type === "bulleted_list_item") return block.bulleted_list_item.rich_text;
  if (block.type === "numbered_list_item") return block.numbered_list_item.rich_text;
  return [];
}

/** Renders a Notion page body (as fetched by `getPageBlocks`). Consecutive
 * bulleted/numbered list items are grouped into a single `<ul>`/`<ol>` rather
 * than one list element per block. */
export function NotionBlocks({ blocks }: { blocks: NotionBlockNode[] }) {
  const elements: ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const listType = block.type;
      const group: NotionBlockNode[] = [];
      while (i < blocks.length && blocks[i].type === listType) {
        group.push(blocks[i]);
        i++;
      }
      const ListTag = listType === "bulleted_list_item" ? "ul" : "ol";
      elements.push(
        <ListTag
          key={`list-${group[0].id}`}
          className={
            listType === "bulleted_list_item"
              ? "list-disc pl-6 my-4 space-y-1"
              : "list-decimal pl-6 my-4 space-y-1"
          }
        >
          {group.map((item) => (
            <li key={item.id} className="leading-relaxed">
              <RichText richText={listItemRichText(item)} />
              {item.children && item.children.length > 0 && (
                <NotionBlocks blocks={item.children} />
              )}
            </li>
          ))}
        </ListTag>,
      );
    } else {
      elements.push(<Fragment key={block.id}>{renderBlock(block)}</Fragment>);
      i++;
    }
  }

  return <>{elements}</>;
}

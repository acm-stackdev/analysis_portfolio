import { collectPaginatedAPI, isFullBlock } from "@notionhq/client";
import type { Client, BlockObjectResponse } from "@notionhq/client";

export type NotionBlockNode = BlockObjectResponse & {
  children?: NotionBlockNode[];
};

// Generous for a hand-authored case-study page (heading > paragraph > nested
// list is 2-3 levels deep); caps worst-case API-call fan-out if someone nests
// toggles/lists unusually deep.
const MAX_DEPTH = 4;

/**
 * Recursively fetches a Notion page's body as a block tree, paginating each
 * level (a screenshot-heavy page can easily exceed the 100-block page size)
 * and attaching a block's children (if any) under `.children`.
 */
export async function getPageBlocks(
  notion: Client,
  blockId: string,
  depth = 0,
): Promise<NotionBlockNode[]> {
  const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
    block_id: blockId,
  });

  const fullBlocks = blocks.filter(isFullBlock);

  if (depth >= MAX_DEPTH) return fullBlocks;

  return Promise.all(
    fullBlocks.map(async (block): Promise<NotionBlockNode> => {
      if (!block.has_children) return block;
      const children = await getPageBlocks(notion, block.id, depth + 1);
      return { ...block, children };
    }),
  );
}

"use server";

import { Client, isFullDatabase, isFullPage } from "@notionhq/client";
import {
  getTitleText,
  getRichText,
  getFileUrl,
  getMultiSelectTags,
} from "@/lib/notion";
import { getPageBlocks, type NotionBlockNode } from "@/lib/notion-blocks";
import { slugify } from "@/lib/utils";

const notion = new Client({ auth: process.env.NOTION_SECRET });

export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage: string | null;
  tags: string[];
}

export interface ProjectDetail extends ProjectSummary {
  blocks: NotionBlockNode[];
}

async function getProjectsDataSourceId(): Promise<string | null> {
  if (!process.env.NOTION_DATABASE_PROJECTS_ID) return null;
  const db = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_PROJECTS_ID,
  });
  if (!isFullDatabase(db) || !db.data_sources?.[0]?.id) return null;
  return db.data_sources[0].id;
}

export async function getProjectsList(): Promise<ProjectSummary[]> {
  try {
    const dataSourceId = await getProjectsDataSourceId();
    if (!dataSourceId) return [];

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    return response.results.filter(isFullPage).map((page) => ({
      id: page.id,
      // Normalized here so a Notion "Slug" typed as "Strategy Dashboard"
      // (spaces, mixed case) still produces a working URL.
      slug: slugify(getRichText(page.properties.Slug)),
      title: getTitleText(page.properties.Title),
      summary: getRichText(page.properties.Summary),
      coverImage: getFileUrl(page.properties["Cover Image"]),
      tags: getMultiSelectTags(page.properties.Tags),
    }));
  } catch (error) {
    console.error("Failed to fetch Notion projects:", error);
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  try {
    const dataSourceId = await getProjectsDataSourceId();
    if (!dataSourceId) return null;

    // Notion's API can only filter by an exact raw-string match, which can't
    // express "equal once both sides are slugified" — so we filter server-side
    // by Status only, then match the requested slug in-memory against each
    // row's normalized Slug. This is also why a row's raw "Slug" value doesn't
    // need to already be url-safe (see slugify() in getProjectsList above).
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Status", select: { equals: "Published" } },
    });

    const page = response.results
      .filter(isFullPage)
      .find((p) => slugify(getRichText(p.properties.Slug)) === slug);
    if (!page) return null;

    const blocks = await getPageBlocks(notion, page.id);

    return {
      id: page.id,
      slug,
      title: getTitleText(page.properties.Title),
      summary: getRichText(page.properties.Summary),
      coverImage: getFileUrl(page.properties["Cover Image"]),
      tags: getMultiSelectTags(page.properties.Tags),
      blocks,
    };
  } catch (error) {
    console.error(`Failed to fetch Notion project "${slug}":`, error);
    return null;
  }
}

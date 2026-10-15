"use server";

import { Client, isFullDatabase, isFullPage, isFullBlock } from "@notionhq/client";
import type { BulletedListItemBlockObjectResponse } from "@notionhq/client";
import { getTitleText, getRichText, getDateStart } from "@/lib/notion";

const notion = new Client({ auth: process.env.NOTION_SECRET });

function formatDate(dateString?: string | null) {
  if (!dateString) return "Present";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function isBulletedListItem(
  block: { type: string },
): block is BulletedListItemBlockObjectResponse {
  return block.type === "bulleted_list_item";
}

export async function getExperienceData() {
  try {
    // 1. Retrieve the Database to find its underlying Data Source ID
    const db = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_EXP_ID!,
    });

    if (!isFullDatabase(db) || !db.data_sources?.[0]?.id) {
      console.error("Could not extract data source ID from database.");
      return [];
    }

    const dataSourceId = db.data_sources[0].id;

    // 2. Query the Data Source (The New Way)
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      sorts: [{ property: "Start Date", direction: "descending" }],
    });

    // 3. Map over the rows (Identical to before)
    const careerData = await Promise.all(
      response.results.filter(isFullPage).map(async (page) => {
        const company =
          getTitleText(page.properties.Company) || "Unknown Company";
        const title =
          getRichText(page.properties["Job Title"]) || "Unknown Title";
        const description = getRichText(page.properties.Description);

        const startDate = getDateStart(page.properties["Start Date"]);
        const endDate = getDateStart(page.properties["End Date"]);
        const period = `${formatDate(startDate)} - ${formatDate(endDate)}`;

        const blocksResponse = await notion.blocks.children.list({
          block_id: page.id,
        });
        const details = blocksResponse.results
          .filter(isFullBlock)
          .filter(isBulletedListItem)
          .map((block) =>
            block.bulleted_list_item.rich_text
              .map((t) => t.plain_text)
              .join(""),
          );

        return {
          id: page.id,
          company,
          period,
          title,
          description,
          details,
        };
      }),
    );

    return careerData;
  } catch (error) {
    console.error("Failed to fetch Notion experience:", error);
    return [];
  }
}

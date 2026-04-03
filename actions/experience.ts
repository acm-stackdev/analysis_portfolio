"use server";

import { Client, isFullDatabase } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_SECRET });

function formatDate(dateString?: string | null) {
  if (!dateString) return "Present";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
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
      response.results.map(async (page: any) => {
        const company =
          page.properties.Company?.title?.[0]?.plain_text || "Unknown Company";
        const title =
          page.properties["Job Title"]?.rich_text?.[0]?.plain_text ||
          "Unknown Title";
        const description =
          page.properties.Description?.rich_text?.[0]?.plain_text || "";

        const startDate = page.properties["Start Date"]?.date?.start;
        const endDate = page.properties["End Date"]?.date?.start;
        const period = `${formatDate(startDate)} - ${formatDate(endDate)}`;

        const blocksResponse = await notion.blocks.children.list({
          block_id: page.id,
        });
        const details = blocksResponse.results
          .filter((block: any) => block.type === "bulleted_list_item")
          .map((block: any) =>
            block.bulleted_list_item.rich_text
              .map((t: any) => t.plain_text)
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

"use server";

import { Client } from "@notionhq/client";
import { contactSchema } from "@/schemas";
import z from "zod";

const notion = new Client({ auth: process.env.NOTION_SECRET });

function chunkText(text: string, maxLength: number = 2000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.substring(i, i + maxLength));
  }
  return chunks;
}

export const sendContactMessage = async (
  values: z.infer<typeof contactSchema>,
) => {
  // 1. Validate the data again on the server for security
  const validatedFields = contactSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, subject, message } = validatedFields.data;

  const messageChunks = chunkText(message);

  const messageBlocks = messageChunks.map((chunk) => ({
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [{ type: "text", text: { content: chunk } }],
    },
  }));

  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        "Email Address": { email: email },
        Subject: { rich_text: [{ text: { content: subject } }] },
      },
      children: [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [
              { type: "text", text: { content: "Message from " + name } },
            ],
          },
        },
        // @ts-ignore - Notion types can be finicky with mapped blocks
        ...messageBlocks,
      ],
    });

    return { success: "Message sent to Notion!" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to send message." };
  }
};

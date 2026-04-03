import { Client, isFullDatabase } from "@notionhq/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResumeNavbar } from "../components/resume-navbar";

const notion = new Client({ auth: process.env.NOTION_SECRET });

// CRITICAL: Forces Vercel to fetch a fresh AWS link every time so the PDF never expires
export const dynamic = "force-dynamic";

async function getCvUrl() {
  try {
    const db = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ASSETS_ID!,
    });

    if (!isFullDatabase(db) || !db.data_sources?.[0]?.id) return null;

    const response = await notion.dataSources.query({
      data_source_id: db.data_sources[0].id,
      filter: { property: "Name", title: { equals: "Main CV" } },
    });

    const page = response.results[0] as any;
    return page?.properties?.Documents?.files?.[0]?.file?.url || null;
  } catch (error) {
    console.error("Error fetching CV:", error);
    return null;
  }
}

export default async function ResumePage() {
  // Fetch the URL securely on the server before the page loads
  const cvUrl = await getCvUrl();

  if (!cvUrl) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">CV Not Found</h1>
        <p className="text-muted-foreground">Please upload the CV to Notion.</p>
        <Link href="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background pt-20">
      <ResumeNavbar cvUrl={cvUrl} />

      {/* 3. The Embedded PDF Preview */}
      <div className="flex-1 w-full h-full bg-muted/30">
        <iframe
          src={`${cvUrl}#toolbar=0`}
          className="w-full h-full border-none"
          title="CV Preview"
        />
      </div>
    </div>
  );
}

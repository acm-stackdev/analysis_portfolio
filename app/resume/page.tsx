import { Client, isFullDatabase } from "@notionhq/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResumeNavbar } from "../components/resume-navbar";
import { ResumeViewer } from "../components/resume-viewer-wrapper";

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
        <p className="text-muted-foreground">
          Something went wrong. Please try again later.
        </p>
        <Link href="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <div className="h-18 shrink-0 flex items-center border-b px-4">
        <ResumeNavbar cvUrl={cvUrl} />
      </div>

      <div className="flex-1 min-h-0 w-full bg-muted/30">
        <ResumeViewer fileUrl={cvUrl} />
      </div>
    </div>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Notion's file storage host for uploaded images (e.g. project
        // screenshots dragged into a Notion page body). Signed URLs expire
        // after ~1hr, but ISR on the pages that use them refreshes well
        // within that window — see app/projects/[slug]/page.tsx.
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
    ],
    // Next's default is just [75]; dashboard/analysis screenshots have small
    // text and chart detail that gets mushy at that quality, so project
    // images opt into 90/100 explicitly (see quality= props on their
    // next/image usages) — passing an unlisted value throws a config error.
    qualities: [75, 90, 100],
  },
};

export default nextConfig;

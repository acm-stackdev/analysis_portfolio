"use client";

import dynamic from "next/dynamic";

// Prevents SSR — pdfjs-viewer-element is a browser-only web component
export const ResumeViewer = dynamic(
  () => import("./resume-viewer").then((m) => m.ResumeViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm animate-pulse">
        Loading viewer...
      </div>
    ),
  },
);

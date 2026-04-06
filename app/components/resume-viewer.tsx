"use client";

import React, { useEffect, useRef, useState } from "react";
import "pdfjs-viewer-element";

// Tell TypeScript this custom HTML tag exists
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "pdfjs-viewer-element": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          src?: string;
          "search-bar"?: string;
          "viewer-css-theme"?: string;
        };
      }
    }
  }
}

export const ResumeViewer = ({ fileUrl }: { fileUrl: string }) => {
  const viewerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initViewer = async () => {
      try {
        // Dynamically import the web component
        // await import("pdfjs-viewer-element");

        if (typeof window !== "undefined" && "customElements" in window) {
          await customElements.whenDefined("pdfjs-viewer-element");

          if (isMounted) {
            setIsLoaded(true);

            // Wait for next tick to ensure ref is attached and upgraded
            setTimeout(() => {
              if (
                viewerRef.current &&
                typeof viewerRef.current.injectViewerStyles === "function"
              ) {
                viewerRef.current.injectViewerStyles(`
                  /* Hide scrollbar for Chrome, Safari and Opera */
                  #viewerContainer::-webkit-scrollbar {
                    display: none;
                  }
                  
                  /* Hide scrollbar for IE, Edge and Firefox */
                  #viewerContainer {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `);
              }
            }, 0);
          }
        }
      } catch (err) {
        console.error("Failed to load PDF viewer:", err);
      }
    };

    initViewer();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full h-full rounded-md overflow-hidden shadow-lg border border-border/40 bg-background/50 flex flex-col">
      {!isLoaded && (
        <div className="flex-1 flex items-center justify-center text-muted-foreground animate-pulse">
          Initializing PDF Viewer...
        </div>
      )}
      <pdfjs-viewer-element
        ref={viewerRef}
        src={fileUrl}
        search-bar="true"
        viewer-css-theme="AUTOMATIC"
        style={{
          width: "100%",
          height: "100%",
          display: isLoaded ? "block" : "none",
          border: "none",
        }}
      ></pdfjs-viewer-element>
    </div>
  );
};

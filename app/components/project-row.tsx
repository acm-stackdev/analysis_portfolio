"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { ProjectSummary } from "@/actions/projects";

export const ProjectRow = ({ project }: { project: ProjectSummary }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border overflow-hidden bg-card hover:border-primary/50 transition-colors"
      >
        {/* Thumbnail: full-width on top for mobile, ~1/2 width on the left from
         * sm: up. `sm:items-center` on the row (not the default stretch) keeps
         * this wrapper hugging the image's own height instead of being
         * stretched to match the (usually taller) text column, which was
         * leaving empty muted space above/below the photo. No fixed aspect
         * ratio / object-cover here on purpose — Notion doesn't give us image
         * dimensions, and cropping a wide dashboard screenshot into a square
         * box cuts off real content. width=0/height=0 + width:100%/height:auto
         * is next/image's pattern for "show the full image at its own ratio". */}
        <div className="w-full sm:w-1/2 shrink-0 bg-muted flex items-center justify-center">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              width={0}
              height={0}
              sizes="(min-width: 640px) 50vw, 100vw"
              quality={90}
              style={{ width: "100%", height: "auto" }}
              className="block group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center text-muted-foreground text-sm">
              No cover image
            </div>
          )}
        </div>

        <div className="flex-1 p-4 sm:py-4 sm:pr-5 sm:pl-0 space-y-2 min-w-0">
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {project.summary}
            </p>
          )}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

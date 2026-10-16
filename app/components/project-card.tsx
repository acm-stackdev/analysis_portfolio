"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { ProjectSummary } from "@/actions/projects";

export const ProjectCard = ({ project }: { project: ProjectSummary }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full rounded-xl border border-border overflow-hidden bg-card hover:border-primary/50 transition-colors"
      >
        <div className="relative w-full aspect-video bg-muted">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
              quality={90}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No cover image
            </div>
          )}
        </div>
        <div className="p-5 space-y-3">
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

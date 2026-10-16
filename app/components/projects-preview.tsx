"use client";

import Link from "next/link";
import { RoughNotation } from "react-rough-notation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ProjectRow } from "./project-row";
import type { ProjectSummary } from "@/actions/projects";

const MAX_PREVIEW = 3;

export const ProjectsPreview = ({ projects }: { projects: ProjectSummary[] }) => {
  const hasMore = projects.length > MAX_PREVIEW;
  const preview = projects.slice(0, MAX_PREVIEW);

  return (
    <section
      id="projects"
      className="w-full min-h-[95vh] bg-background-thin custom-grid py-10 md:py-10"
    >
      <div className="text-2xl font-bold text-center pb-5">
        <RoughNotation
          type="underline"
          show={true}
          animationDuration={1500}
          animationDelay={500}
        >
          Projects
        </RoughNotation>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-20 lg:px-24 pt-5">
        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            Projects coming soon.
          </p>
        ) : (
          <>
            <motion.div layout className="flex flex-col gap-4">
              <AnimatePresence initial={false} mode="popLayout">
                {preview.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>

            {hasMore && (
              <motion.div layout className="flex justify-center mt-8">
                <Button
                  asChild
                  variant="outline"
                  className="group border-primary/50 hover:border-primary text-primary font-semibold transition-all duration-300"
                >
                  <Link href="/projects">
                    See More Projects{" "}
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

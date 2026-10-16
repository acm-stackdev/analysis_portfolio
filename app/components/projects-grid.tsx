"use client";

import { RoughNotation } from "react-rough-notation";
import { motion, AnimatePresence } from "motion/react";
import { ProjectCard } from "./project-card";
import type { ProjectSummary } from "@/actions/projects";

export const ProjectsGrid = ({ projects }: { projects: ProjectSummary[] }) => {
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

      <div className="max-w-6xl mx-auto px-6 md:px-20 lg:px-24 pt-5">
        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            Projects coming soon.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

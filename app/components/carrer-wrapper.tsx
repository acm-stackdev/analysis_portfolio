"use client";

import { RoughNotation } from "react-rough-notation";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TechStack } from "./tech-stack";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CareerJob {
  id: string;
  company: string;
  period: string;
  title: string;
  description: string;
  details: string[];
}

export const CareerWrapper = ({
  careerData = [],
}: {
  careerData: CareerJob[];
}) => {
  const [showAll, setShowAll] = useState(false);

  const initialItems = 3;
  const hasMore = careerData.length > initialItems;
  const visibleData = showAll ? careerData : careerData.slice(0, initialItems);

  const toggleShowAll = () => {
    if (showAll) {
      // Scroll to the career section top when collapsing
      const element = document.getElementById("career");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      // Delay the state change slightly to allow scroll to start, or just let layout handle it
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  return (
    <section
      id="career"
      className="w-full min-h-[95vh] custom-grid py-10 md:py-10"
    >
      <div className="text-2xl font-bold text-center pb-5">
        <RoughNotation
          type="underline"
          show={true}
          animationDuration={1500}
          animationDelay={500}
        >
          Professional Journey
        </RoughNotation>
      </div>

      <div className="max-w-5xl mx-auto pt-5 pb-16 md:pb-0">
        <motion.div layout className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-3 md:left-6 top-0 bottom-0 w-0.5 bg-border"></div>

          <motion.div layout className="flex flex-col space-y-8">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleData.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
                  className="relative pl-10 md:pl-16"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-[13px] top-1.5 shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-background"></div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-4 items-start border border-transparent hover:border-border p-4 rounded-xl transition-colors">
                    {/* Left: Job Title & Period */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {job.period}
                      </p>
                      <h3 className="text-lg font-bold mt-1">{job.title}</h3>
                      <p className="text-primary font-medium">{job.company}</p>
                    </div>

                    {/* Middle: Brief Description */}
                    <div className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {job.description}
                    </div>

                    {/* Right: Action Button */}
                    <div className="flex justify-start lg:justify-end">
                      <Dialog>
                        {/* Desktop View */}
                        <div className="hidden md:block">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  aria-label="View full details"
                                  className="rounded-full"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent className="font-semibold">
                              <p>View full details</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        {/* Mobile View*/}
                        <div className="md:hidden w-full">
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full text-xs h-8"
                              aria-label="More details"
                            >
                              More details
                            </Button>
                          </DialogTrigger>
                        </div>
                        <DialogContent className="min-w-[90vw] md:min-w-5xl border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.3)] bg-background/95 backdrop-blur-md">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">
                              {job.title}
                            </DialogTitle>
                            <DialogDescription className="text-primary font-semibold">
                              {job.company} | {job.period}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 max-h-[50vh] overflow-y-auto no-scrollbar">
                            <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                              {job.details.map((detail, index) => (
                                <li key={index} className="leading-relaxed">
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {hasMore && (
            <motion.div
              layout
              className="flex justify-center mt-12 pl-10 md:pl-16"
            >
              <Button
                variant="outline"
                onClick={toggleShowAll}
                className="group border-primary/50 hover:border-primary text-primary font-semibold transition-all duration-300"
              >
                {showAll ? (
                  <>
                    Show Less{" "}
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                  </>
                ) : (
                  <>
                    View More Experience{" "}
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
      <motion.div layout>
        <TechStack />
      </motion.div>
    </section>
  );
};

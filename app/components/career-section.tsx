"use client";
import { RoughNotation } from "react-rough-notation";
import { ArrowRight } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TechStack } from "./tech-stack";

interface CareerJob {
  id: number;
  company: string;
  period: string;
  title: string;
  description: string;
  details: string[];
}

export const CareerSection = () => {
  const [careerData, setCareerData] = useState<CareerJob[]>([]);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const response = await fetch("/career-data.json");
        const data = await response.json();
        setCareerData(data);
      } catch (error) {
        console.error("Error fetching career data:", error);
      }
    };

    fetchCareerData();
  }, []);

  return (
    <section
      id="career"
      className="w-full min-h-[95vh] custom-grid py-20 md:py-20"
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

      <div className="max-w-5xl mx-auto pb-16 md:pb-0">
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-3 md:left-6 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="flex flex-col space-y-8">
            {careerData.map((job) => (
              <div key={job.id} className="relative pl-10 md:pl-16">
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
                                className="rounded-full"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
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
                          >
                            More details
                          </Button>
                        </DialogTrigger>
                      </div>
                      <DialogContent className="min-w-[90vw] md:min-w-5xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            {job.title}
                          </DialogTitle>
                          <div className="text-primary font-semibold">
                            {job.company} | {job.period}
                          </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <TechStack />
    </section>
  );
};

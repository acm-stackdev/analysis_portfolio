"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoughNotation } from "react-rough-notation";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface ResumeNavbarProps {
  cvUrl: string;
}

export const ResumeNavbar = ({ cvUrl }: ResumeNavbarProps) => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 backdrop-blur-md select-none border-b border-border/40">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* Left Section (1/3) */}
        <div className="flex-1 flex items-center">
          <Link href="/">
            <Button variant="ghost" className="hidden md:flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Center Logo Section */}
        <div className="shrink">
          <RoughNotation
            type="underline"
            show={true}
            animationDuration={1000}
            animationDelay={500}
          >
            <div className="flex items-center">
              <Link
                className="text-2xl font-semibold hover:text-primary transition-colors duration-200"
                aria-label="Home"
                href="/"
              >
                JohnTin
              </Link>
            </div>
          </RoughNotation>
        </div>

        {/* Right Section (1/3) */}
        <div className="flex-1 flex items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

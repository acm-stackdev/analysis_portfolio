"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { RoughNotation } from "react-rough-notation";
import { Download, ArrowLeft } from "lucide-react";

interface ResumeNavbarProps {
  cvUrl: string;
}

export const ResumeNavbar = ({ cvUrl }: ResumeNavbarProps) => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 backdrop-blur-md select-none border-b border-border/40">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <RoughNotation
          type="underline"
          show={true}
          animationDuration={1000}
          animationDelay={500}
        >
          <div className="flex items-center space-x-0.5">
            <Link
              className="text-2xl font-semibold hover:text-primary transition-colors duration-200"
              aria-label="Home"
              href="/"
            >
              JohnTin
            </Link>
          </div>
        </RoughNotation>

        <div className="flex items-center space-x-2">
          {/* <Link href="/">
            <Button variant="link" size="sm" className="hidden md:flex ">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
            <Button
              variant="link"
              size="icon"
              className="md:hidden"
              aria-label="Back to Portfolio"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link> */}

          <a href={cvUrl} target="_blank" rel="noopener noreferrer">
            <Button className="hidden md:flex">
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
            <Button className="md:hidden" aria-label="Download as PDF">
              <Download className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

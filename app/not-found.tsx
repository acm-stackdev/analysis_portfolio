"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { RoughNotation } from "react-rough-notation";
import { NotFoundLottie } from "./components/not-found-lottie";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full px-4 overflow-hidden">
      {/* Background Decorative Text (Optional, matches your HomeSection style) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[20rem] font-bold rotate-12">404</h1>
      </div>

      <div className="z-10 flex flex-col items-center text-center space-y-6">
        <div className="w-64 h-64 md:w-80 md:h-80">
          <NotFoundLottie />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            <RoughNotation
              type="box"
              show={true}
              strokeWidth={2}
              animationDuration={1200}
              padding={10}
            >
              Lost in Data?
            </RoughNotation>
          </h1>
          <p className="text-muted-foreground my-6 text-lg md:text-xl max-w-[400px]">
            The page you are looking for has been moved or doesn't exist in our
            database.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          aria-label="Back to Home"
          className="rounded-full px-8 gap-2 font-semibold transition-transform hover:scale-105 active:scale-95"
        >
          <Link href="/">
            <Home size={18} />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { RoughNotation } from "react-rough-notation";
import { useState } from "react";

export const Navbar = () => {
  const [navItems] = useState([
    { name: "About", href: "#about" },
    { name: "Career", href: "#career" },
    { name: "Contact", href: "#contact" },
  ]);

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 backdrop-blur select-none">
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
              href="/"
            >
              JohnTin
            </Link>
            <span className="text-primary text-2xl h-auto">.dev</span>
          </div>
        </RoughNotation>
        <div className="flex items-center">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="link"
              className="hidden md:block text-md text-foreground hover:text-primary"
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

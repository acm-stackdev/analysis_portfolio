"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { RoughNotation } from "react-rough-notation";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [navItems] = useState([
    { name: "About", href: "#about", id: "about" },
    { name: "Career", href: "#career", id: "career" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }, // Adjust based on section height
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("");
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

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
              href="/"
              onClick={scrollToTop}
            >
              JohnTin
            </Link>
            <span className="text-primary text-2xl h-auto">.dev</span>
          </div>
        </RoughNotation>

        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Button
                key={item.name}
                variant="link"
                asChild
                className={`hidden md:inline-flex text-md transition-all duration-300 ${
                  isActive
                    ? "text-primary underline"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {/* 3. Using handleScroll for the click event */}
                <Link
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                >
                  {item.name}
                </Link>
              </Button>
            );
          })}
          <div className="pl-2 border-l ml-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

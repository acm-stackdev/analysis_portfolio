"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { RoughNotation } from "react-rough-notation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("");
  const [navItems] = useState([
    { name: "About", href: "#about", id: "about" },
    { name: "Career", href: "#career", id: "career" },
    { name: "Contact", href: "#contact", id: "contact" },
    // { name: "Blog", href: "/blog", id: "blog" },
  ]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

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
      { threshold: 0.6 },
    );

    navItems.forEach((item) => {
      if (item.href.startsWith("#")) {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [navItems, isHome]);

  const scrollToTop = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveSection("");
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    if (href.startsWith("#") && isHome) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 backdrop-blur-md select-none border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-24 py-4 flex items-center justify-between">
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
              onClick={scrollToTop}
            >
              JohnTin
            </Link>
          </div>
        </RoughNotation>

        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            // For anchor links not on the home page, prepend /
            const href =
              item.href.startsWith("#") && !isHome
                ? `/${item.href}`
                : item.href;

            return (
              <Button
                key={item.name}
                variant="link"
                aria-label={item.name}
                asChild
                className={`hidden md:inline-flex text-md transition-all duration-300 ${
                  isActive
                    ? "text-primary underline"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                <Link
                  href={href}
                  aria-label={item.name}
                  onClick={(e) => handleClick(e, item.href)}
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

"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "contact", label: "Contact" },
];

export const SideNav = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
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

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed z-50 
      hidden md:flex 
      md:left-8 md:top-1/2 md:-translate-y-1/2 md:flex-col md:space-y-6"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            aria-label={section.label}
            className="group flex items-center focus:outline-none"
          >
            {/* The Dash */}
            <div
              className={`transition-all duration-500 rounded-full 
              ${
                isActive
                  ? "bg-foreground shadow-[0_0_12px_rgba(0,0,0,0.2)] dark:bg-white dark:shadow-[0_0_12px_rgba(255,255,255,0.9)] w-12"
                  : "bg-muted-foreground/40 group-hover:bg-muted-foreground/70 dark:bg-muted-foreground/30 dark:group-hover:bg-muted-foreground/60 w-6"
              }
              h-[2px]`}
            />

            {/* Label */}
            <span
              className={`ml-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 font-semibold
              ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

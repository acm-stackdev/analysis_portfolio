"use client";

import Link from "next/link";
import {
  Home,
  User,
  Briefcase,
  MoreHorizontal,
  Code2,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "../hooks/useIsMobile";
import { useState, useEffect } from "react";

export const Footer = () => {
  const mobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { name: "Home", href: "/", id: "home", icon: Home },
    { name: "About", href: "#about", id: "about", icon: User },
    { name: "Career", href: "#career", id: "career", icon: Briefcase },
  ];

  const moreItems = [
    { name: "Projects", href: "#projects", id: "projects", icon: Code2 },
    { name: "Blog", href: "/Blog", id: "blog", icon: BookOpen },
    { name: "Contact", href: "#contact", id: "contact", icon: Mail },
  ];

  const socialItems = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/johntin97/",
      icon: Linkedin,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/+447824583996",
      icon: MessageCircle,
    },
    { name: "Email", href: "mailto:johntin97@outlook.com", icon: Mail },
  ];

  // Logic to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    [...navItems, ...moreItems].forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {mobile ? (
        <footer className="fixed w-full bottom-4 z-50 px-4">
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl h-16 flex items-center justify-around px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
                    isActive
                      ? "text-primary scale-110"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-tighter ${isActive ? "opacity-100" : "opacity-70"}`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* "More" Trigger */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col items-center justify-center space-y-1 outline-none text-muted-foreground">
                <MoreHorizontal size={20} />
                <span className="text-[10px] font-medium uppercase tracking-tighter">
                  More
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="top"
                className="w-44 mb-4 rounded-xl p-2 bg-transparent backdrop-blur-lg"
              >
                {moreItems.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isSubActive = activeSection === subItem.id;
                  return (
                    <DropdownMenuItem key={subItem.name} asChild>
                      <Link
                        href={subItem.href}
                        aria-label={subItem.name}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                          isSubActive ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <SubIcon size={18} />
                        <span className="font-medium">{subItem.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </footer>
      ) : (
        /* Desktop Social Sidebar */
        <footer className="py-14 fixed bottom-0 right-10 flex flex-row items-center justify-center z-40">
          <div className="container mx-auto px-4 text-center space-y-6">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <Tooltip key={item.name} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      target="_blank"
                      aria-label={item.name}
                      className="block text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="font-semibold">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
            {/* Visual Decorative element */}
            <div className="flex flex-col items-center justify-center gap-4 opacity-40">
              <div className="w-px h-12 bg-foreground/20"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

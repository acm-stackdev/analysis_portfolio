"use client";

import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaHome,
  FaUser,
  FaFolder,
  FaBlog,
} from "react-icons/fa";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useIsMobile } from "../hooks/useIsMobile";
import { useState } from "react";

export const Footer = () => {
  const mobile = useIsMobile();

  const [navItems] = useState([
    { name: "Home", href: "/", icon: FaHome, marginClass: "mx-2.5" },
    { name: "About", href: "#about", icon: FaUser, marginClass: "mx-2.5" },
    { name: "Career", href: "#career", icon: FaFolder, marginClass: "mx-3.5" },
    { name: "Blog", href: "/Blog", icon: FaBlog, marginClass: "mx-2.5" },
  ]);

  const [socialItems] = useState([
    { name: "GitHub", href: "https://github.com", icon: FaGithub },
    { name: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
    {
      name: "WhatsApp",
      href: "https://wa.me/your-phone-number",
      icon: FaWhatsapp,
    },
    { name: "Facebook", href: "https://facebook.com", icon: FaFacebook },
  ]);
  return (
    <>
      {mobile ? (
        <footer className="fixed w-full bottom-0 flex flex-row items-center justify-centerbackdrop-blur-sm">
          <div className="h-15 w-[90%] border border-border m-4 rounded-lg flex items-center justify-between space-x-3">
            <div className="flex mt-3 flex-row w-full items-center justify-around">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}>
                    <Icon className={`scale-150 ${item.marginClass}`} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </footer>
      ) : (
        <footer className="scale-130 py-8 fixed bottom-0 right-10 flex flex-row items-center justify-center">
          <div className="container mx-auto px-4 text-center space-y-5">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <p className="opacity-70 hover:scale-110 transition-transform hover:opacity-100">
                      <Link href={item.href} target="_blank">
                        <Icon />
                      </Link>
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="w-2 h-2 block rounded-full bg-gray-400"></span>
              <span className="w-2 h-2 block rotate-45 bg-primary"></span>
              <span className="w-2 h-2 block rounded-full bg-gray-400"></span>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

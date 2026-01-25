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

export const Footer = () => {
  const mobile = useIsMobile();
  return (
    <>
      {mobile ? (
        <footer className="fixed w-full bottom-0 flex flex-row items-center justify-center bg-transparent backdrop-blur-sm">
          <div className="h-15 w-[90%] border border-border m-4 rounded-lg flex items-center justify-between space-x-3">
            <div className="flex mt-3 flex-row w-full items-center justify-around">
              <Link href="/">
                <FaHome className="scale-150 mx-2.5" />
                <span className="text-sm">Home</span>
              </Link>
              <Link href="#about">
                <FaUser className="scale-150 mx-2.5" />
                <span className="text-sm">About</span>
              </Link>
              <Link href="#projects">
                <FaFolder className="scale-150 mx-3.5" />
                <span className="text-sm">Projects</span>
              </Link>
              <Link href="/Blog">
                <FaBlog className="scale-150 mx-2.5" />
                <span className="text-sm">Blog</span>
              </Link>
            </div>
          </div>
        </footer>
      ) : (
        <footer className="scale-130 py-8 fixed bottom-0 right-52 flex flex-row items-center justify-center">
          <div className="container mx-auto px-4 text-center space-y-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="opacity-70 hover:scale-110 transition-transform hover:opacity-100">
                  <Link href="https://github.com" target="_blank">
                    <FaGithub />
                  </Link>
                </p>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="opacity-70 hover:scale-110 transition-transform hover:opacity-100">
                  <Link href="https://linkedin.com" target="_blank">
                    <FaLinkedin />
                  </Link>
                </p>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="opacity-70 hover:scale-110 transition-transform hover:opacity-100">
                  <Link href="https://wa.me/your-phone-number" target="_blank">
                    <FaWhatsapp />
                  </Link>
                </p>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>WhatsApp</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="opacity-70 hover:scale-110 transition-transform hover:opacity-100">
                  <Link href="https://facebook.com" target="_blank">
                    <FaFacebook />
                  </Link>
                </p>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Facebook</p>
              </TooltipContent>
            </Tooltip>
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

"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="opacity-100 hover:opacity-80 pl-3"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 hover:text-primary hover:rotate-180 transition-transform duration-300" />
      ) : (
        <Moon className="h-6 w-6 hover:text-primary hover:rotate-180 transition-transform duration-300" />
      )}
    </button>
  );
}

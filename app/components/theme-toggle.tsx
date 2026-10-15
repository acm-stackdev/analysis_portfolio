"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Both icons render server-side; next-themes' blocking inline script sets
  // the `dark` class on <html> before paint, so the right one shows
  // immediately via CSS — no "mounted" state/effect, and no flash of the
  // wrong icon while hydrating.
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="opacity-100 hover:opacity-80 pl-3"
    >
      <Sun className="hidden dark:block h-6 w-6 hover:text-primary hover:rotate-180 transition-transform duration-300" />
      <Moon className="block dark:hidden h-6 w-6 hover:text-primary hover:rotate-180 transition-transform duration-300" />
    </button>
  );
}

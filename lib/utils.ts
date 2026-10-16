import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Normalizes free-typed text into a URL-safe slug (lowercase, hyphenated).
 * Used so a Notion "Slug" property typed as "Strategy Dashboard" still
 * resolves to a working /projects/strategy-dashboard link. */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

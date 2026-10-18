# Analysis Portfolio

A modern, animated personal portfolio website built with Next.js, TypeScript, and
Tailwind CSS — content for Career, Contact, Resume, and Projects is all managed
through Notion, no redeploy needed to update it. Features smooth scroll animations,
responsive design, a PDF resume viewer, and an interactive contact form.

## Features

- **Notion-backed content** – Career history, the contact-form inbox, the resume
  PDF, and the Projects showcase all read from (or write to) Notion databases
- **Projects showcase** – A capped preview on the home page with a "See More"
  link to a full `/projects` gallery; each project gets its own shareable page at
  `/projects/[slug]`, rendered from rich Notion page content (headings,
  paragraphs, screenshots)
- **PDF Resume Viewer** – `/resume` renders your CV directly from Notion with an
  in-browser PDF viewer
- **Smooth Scroll Navigation** – Snap-based scrolling between sections with
  keyboard and navigation support
- **Responsive Design** – Fully responsive layout that works on all devices
- **Dark Mode Support** – Theme switching capability with next-themes
- **Interactive Contact Form** – Validated form with React Hook Form and Zod,
  submissions saved straight to a Notion database
- **Career Timeline** – Animated career history section with a "View More" expand
- **Side Navigation** – Fixed side navigation for quick section access

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **CMS:** [Notion API](https://developers.notion.com/) via `@notionhq/client`
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) + [Motion](https://motion.dev/)
- **PDF Viewer:** [pdfjs-viewer-element](https://www.npmjs.com/package/pdfjs-viewer-element)
- **Icons:** [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## Getting Started

```bash
npm install
cp .env.example .env   # then fill in your Notion values — see NOTION_SETUP.md
npm run dev
```

The site degrades gracefully (empty states, not crashes) if a Notion env var is
missing, but nothing will show real content until `.env` is filled in. **See
[`NOTION_SETUP.md`](./NOTION_SETUP.md) for the full, step-by-step Notion setup** —
one-time integration setup, then one database per section below.

### Notion databases at a glance

| Section | Env var | What it needs |
|---|---|---|
| Career / Experience | `NOTION_DATABASE_EXP_ID` | Rows with company/title/dates; bullet details in each row's page body |
| Contact form | `NOTION_DATABASE_ID` | Empty database — the site writes submissions here, you don't add rows |
| Resume (CV) | `NOTION_DATABASE_ASSETS_ID` | One row named exactly "Main CV" with the PDF attached |
| Projects | `NOTION_DATABASE_PROJECTS_ID` | One row per project; the write-up (headings/screenshots) lives in each row's page body |

All four share one `NOTION_SECRET` (the integration token).

## Project Structure

```
app/
├── components/              # React components
│   ├── home-section.tsx            # Hero/landing section
│   ├── about-section.tsx           # About me section
│   ├── career-section.tsx          # Career data fetch (server)
│   ├── carrer-wrapper.tsx          # Career timeline UI + "View More"
│   ├── projects-section.tsx        # Projects preview data fetch (server)
│   ├── projects-preview.tsx        # Home page: capped row list + "See More"
│   ├── projects-grid.tsx           # Full /projects page: 3-up card grid
│   ├── project-row.tsx             # Home preview row card
│   ├── project-card.tsx            # Full-grid card
│   ├── notion-blocks.tsx           # Renders a Notion page body (headings, images, lists, ...)
│   ├── contact-section.tsx         # Contact form
│   ├── navbar.tsx / side-nav.tsx / footer.tsx
│   ├── resume-navbar.tsx / resume-viewer*.tsx
│   └── theme-provider.tsx / theme-toggle.tsx
├── projects/
│   ├── page.tsx              # Full projects gallery
│   └── [slug]/page.tsx       # One project's full write-up
├── resume/page.tsx           # PDF resume viewer, reads the CV from Notion
├── hooks/                    # Custom React hooks
├── globals.css
├── layout.tsx
└── page.tsx                  # Home page (About/Career/Projects/Contact sections)
actions/                      # Server actions — all Notion reads/writes
│   ├── experience.ts, contact.ts, projects.ts
components/ui/                # shadcn/ui primitives
lib/
│   ├── notion.ts              # Typed Notion property readers
│   ├── notion-blocks.ts       # Recursive Notion page-body block fetcher
│   └── utils.ts
public/                        # Static assets
```

## Customization

1. **Content** – Everything content-related (Career, Contact destination,
   Resume, Projects) is managed in Notion — see `NOTION_SETUP.md`. Only
   hardcoded copy (hero text, About Me bio, social links) lives in the section
   components directly (`home-section.tsx`, `about-section.tsx`, `footer.tsx`).
2. **Theme Colors** – Modify the CSS variables in `app/globals.css`
3. **Animations** – Adjust GSAP/Motion animations in each section component

## Inspiration and Credit

Here are some of the inspirations and credits for this project:

- [SetNaing](https://satnaing.dev/)

## License

MIT License – feel free to use this template for your own portfolio.

# Notion Setup Guide

This site reads (and in one case, writes) all of its content from Notion. This
guide walks through setting up each database it needs, in Notion's UI, step by
step. Do this once per environment (your laptop locally, and again for whatever
values you put into Vercel's environment variables for production).

## Part 1 — One-time: the integration

Everything below shares a single Notion **integration** — think of it as the API
key that lets this code read/write your Notion workspace.

1. If you don't already have one: go to **notion.so/my-integrations** → **New
   integration** → give it a name (e.g. "Portfolio") → Submit.
2. Copy its **Internal Integration Secret** — this is your `NOTION_SECRET`.
   Keep it out of git (`.env` is already gitignored).
3. That's it for setup — you'll come back to this integration's *name* every
   time you create a new database below, to share that database with it.

## Part 2 — Per-section databases

Each database below is a normal Notion database (a table). Two things to always
remember:

- **Properties = the table columns.** Short structured fields (a title, a
  select, a number). Shown in grid view.
- **Page body = what you see when you click into a row.** This is a full Notion
  page — type headings, paragraphs, drag in screenshots. This is where richer
  content (Career bullet points, Project write-ups) actually lives; it's a
  separate thing from the properties.

For every database below, after creating it:

1. Open the database → **"•••"** (or **"Connections"** / **"Share"**, wording
   varies by Notion version) → search for your integration's name → connect it.
   **This step is the most commonly missed one** — a database that isn't shared
   with the integration comes back from the API as "not found," even with a
   correct ID.
2. Copy the database's link, take the 32-character ID out of the URL (the part
   right before `?v=`), and put it in `.env`.

---

### Career / Experience — `NOTION_DATABASE_EXP_ID`

Read by `actions/experience.ts`. Properties:

| Property | Type |
|---|---|
| `Company` | Title |
| `Job Title` | Rich text |
| `Description` | Rich text |
| `Start Date` | Date |
| `End Date` | Date (leave empty for your current role — shows as "Present") |

For each row, click into it and add your bullet points as a normal bulleted
list in the page body — those are what show up in the "View full details" popup
on the site.

### Contact form — `NOTION_DATABASE_ID`

Written to by `actions/contact.ts` — **you don't add rows yourself**, the
website creates one every time someone submits the contact form. You only need
to create the database with these properties so the site has somewhere to write:

| Property | Type |
|---|---|
| `Name` | Title |
| `Email Address` | Email |
| `Subject` | Rich text |

The message body itself is written into each submission's page body
automatically.

### Resume (CV) — `NOTION_DATABASE_ASSETS_ID`

Read by `app/resume/page.tsx`. Create one row:

| Property | Type | Value |
|---|---|---|
| `Name` | Title | Must be exactly `Main CV` |
| `Documents` | Files & media | Upload your CV PDF here |

### Projects — `NOTION_DATABASE_PROJECTS_ID`

Read by `actions/projects.ts`. Properties:

| Property | Type | Notes |
|---|---|---|
| `Title` | Title | Project name |
| `Slug` | Rich text | URL segment — typos/spaces/capitals are fine, the site normalizes it automatically |
| `Summary` | Rich text | 1–2 sentence blurb for the card/row preview |
| `Cover Image` | Files & media | Thumbnail shown on the home preview and the full grid |
| `Tags` | Multi-select | Tech stack chips |
| `Order` | Number | Controls sort order — lower shows first |
| `Status` | Select, with options `Draft` and `Published` | Only `Published` rows ever appear on the site |

For each project, click into the row and write the actual case study in the
page body — headings, paragraphs, and drag in screenshots directly. Supported
right now: headings, paragraphs, bulleted/numbered lists, images with captions,
quotes, dividers, and callouts. Tables/toggles/embeds/videos aren't rendered yet
if you use them.

## Troubleshooting

- **A section is empty on the live site:** almost always a missing env var or a
  database that isn't shared with the integration yet (Part 2, step 1 above) —
  check those before suspecting the code.
- **"object_not_found" error:** the database exists but isn't shared with your
  integration. Share it (see above) and try again.
- **A project 404s:** check its `Status` is `Published`, not `Draft`.

# Analysis Portfolio

A modern, animated personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth scroll animations, responsive design, and an interactive contact form.

## Features

- **Smooth Scroll Navigation** – Snap-based scrolling between sections with keyboard and navigation support
- **Responsive Design** – Fully responsive layout that works on all devices
- **Dark Mode Support** – Theme switching capability with next-themes
- **Interactive Contact Form** – Validated form with React Hook Form and Zod
- **Career Timeline** – Animated career history section
- **Side Navigation** – Fixed side navigation for quick section access

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) + [Motion](https://motion.dev/)
- **Icons:** [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## Project Structure

```
app/
├── components/         # React components
│   ├── home-section.tsx      # Hero/landing section
│   ├── about-section.tsx     # About me section
│   ├── career-section.tsx    # Career timeline
│   ├── contact-section.tsx   # Contact form
│   ├── navbar.tsx            # Top navigation
│   ├── side-nav.tsx          # Fixed side navigation
│   └── footer.tsx            # Footer component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Home page
components/             # shadcn/ui components
public/                 # Static assets
```

## Customization

1. **Personal Information** – Update content in the section components (`home-section.tsx`, `about-section.tsx`, etc.)
2. **Theme Colors** – Modify `app/globals.css` and `tailwind.config.ts`
3. **Animations** – Adjust GSAP animations in each section component
4. **Contact Form** – Configure form handling in `contact-section.tsx`

#Inspiration and Credit

Here are some of the inspirations and credits for this project:

- [SetNaing](https://satnaing.dev/)

## License

MIT License – feel free to use this template for your own portfolio.

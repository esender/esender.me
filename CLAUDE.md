# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Astro, featuring blog posts and work experience sections. The site uses TypeScript, Tailwind CSS, and Astro's content collections for managing structured content.

## Commands

**Development:**
```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

**Note:** This project uses `npm` as the package manager. Node >= 20.17.0 required.

**Linting & Formatting (Biome):**
```bash
npm run lint      # Lint with Biome
npm run lint:fix  # Lint and auto-fix
npm run format    # Format with Biome
npm run check     # Lint + format combined (auto-fix)
```

## Architecture

### Content Collections

The site uses Astro Content Collections with Zod schemas for type-safe content:

- **`posts`** (`src/content/posts/`): Blog posts with frontmatter
  - Schema: `title`, `category` (photography|development), `published` (default: false), `date`, `description`
  - In dev mode, all posts are shown. In production, only `published: true` posts appear
  - Stored as Markdown files (`.md`)

- **`work-experience`** (`src/content/work-experience/`): Company data
  - Schema: `title`, `start_date`, `end_date` (optional), `position`, `stack` (array), `description` (optional, array of strings), `points` (optional), `order`
  - Stored as YAML files (`.yaml` or `.yml`)
  - Sorted by `order` field (descending)

### Path Aliases

Import paths use these aliases (configured in `tsconfig.json`):
```ts
import Layout from "@layouts/Layout.astro";
import PostCard from "@components/posts/PostCard.astro";
```

### Page Structure

- **`src/pages/index.astro`**: Homepage
- **`src/pages/about.astro`**: About page with work experience timeline
- **`src/pages/posts/[...page].astro`**: Blog listing with pagination (10 posts per page)
- **`src/pages/posts/[...slug].astro`**: Individual blog post pages
- **`src/pages/rss.xml.ts`**: RSS feed endpoint
- **`src/pages/404.astro`**: Custom 404 page

### Styling

- **Tailwind CSS** with custom base styles in `src/layouts/base.css`
- **Fonts**: Manrope Variable (display/headlines) + IBM Plex Mono (labels/metadata)
- **Design System**: See `DESIGN_SYSTEM.md` for the full design system (colors, typography, elevation, spacing, component rules)
- Responsive breakpoints: mobile-first with `sm:`, `md:`, `lg:` prefixes
- Warm neutral palette with sage accent, dark mode via `prefers-color-scheme`
- Utility classes: `.glass`, `.ghost-border`, `.grain`, `.accent-line`, `.label-md`, `.label-sm`, `.text-display-lg`, `.text-headline-lg`

### Component Organization

- **Layouts** (`src/layouts/`): Page structure components (Layout, Content, Header, Footer, Navigation)
- **Components** (`src/components/`): Reusable UI components
  - `posts/`: Blog-related components
  - `about/`: About page components

## Content Schema Reference

When adding blog posts, include frontmatter:
```yaml
---
title: "Post Title"
category: "development"  # or "photography"
date: 2023-06-06
description: "Brief description"
published: true  # omit or set to false for drafts
---
```

When adding work experience, use YAML format:
```yaml
title: Company Name
start_date: 2023-01-01
end_date: 2024-01-01  # optional
position: Job Title
stack:
  - React
  - TypeScript
order: 7  # higher numbers appear first
```

## Build Output

- Production builds go to `./dist/`
- Static assets go in `./public/` (copied to dist root on build)

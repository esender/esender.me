# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Astro, featuring blog posts and work experience sections. The site uses TypeScript, Tailwind CSS, and Astro's content collections for managing structured content.

## Commands

**Development:**
```bash
yarn dev          # Start dev server at localhost:3000
yarn build        # Build production site to ./dist/
yarn preview      # Preview production build locally
```

**Note:** This project uses `yarn` as the package manager (not npm).

## Architecture

### Content Collections

The site uses Astro Content Collections with Zod schemas for type-safe content:

- **`posts`** (`src/content/posts/`): Blog posts with frontmatter
  - Schema: `title`, `category` (photography|development), `published` (default: false), `date`, `description`
  - In dev mode, all posts are shown. In production, only `published: true` posts appear
  - Stored as Markdown files (`.md`)

- **`work-experience`** (`src/content/work-experience/`): Company data
  - Schema: `title`, `start_date`, `end_date` (optional), `position`, `stack` (array), `description` (optional), `points` (optional), `order`
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

### Styling

- **Tailwind CSS** with custom base styles in `src/layouts/base.css`
- **Font**: Inter Variable (loaded via `@fontsource-variable/inter`)
- Responsive breakpoints: mobile-first with `sm:`, `md:`, `lg:` prefixes
- Custom link styles with underlines and color transitions

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
- Experimental assets feature is enabled in `astro.config.mjs`

# Site Improvements Design

Date: 2026-02-15
Branch: feat/quiet-precision-redesign

## Overview

A batch of polish improvements to esender.me: 404 page, pagination styling, social links, stack separator fix, font self-hosting, icon cleanup, OG/meta tags, RSS feed, and dark mode.

## 1. Font Self-Hosting

Replace Google Fonts CDN with self-hosted fonts via @fontsource packages.

- Install `@fontsource-variable/outfit` and `@fontsource/jetbrains-mono`
- Import in `src/layouts/base.css`
- Remove Google Fonts `<link>` tags from `Layout.astro`
- Font declarations in `@theme` unchanged (reference font names, not sources)

Files: `package.json`, `src/layouts/base.css`, `src/layouts/Layout.astro`

## 2. Social Links + Icon Usage

Add GitHub, LinkedIn, and Email links. Keep `astro-icon` dependency (despite Astro 5 mismatch — accepted risk).

### Dependencies
- Install `@iconify-json/simple-icons` (GitHub, LinkedIn brand icons)
- Install `@iconify-json/lucide` (mail icon)

### New Component: `SocialLinks.astro`
- Props: `class?`, `size?` (default "w-5")
- Links: GitHub profile, LinkedIn profile, email (mailto:)
- Icons: `simple-icons:github`, `simple-icons:linkedin`, `lucide:mail`
- Styling: `text-warm-400 hover:text-warm-600`, `no-animation` on links
- Layout: `flex row, gap-4, items-center`

### Update `Icon.astro`
- Verify/fix API usage with current astro-icon version

### Placement
- Homepage: in the "Currently" section area
- Footer: icons row centered above copyright line

Files: `package.json`, `src/components/SocialLinks.astro`, `src/components/Icon.astro`, `src/pages/index.astro`, `src/layouts/Footer.astro`

## 3. Stack Separator Fix

Audit all work-experience YAML files. Ensure each technology is its own array item so `stack.join(" · ")` produces consistent separators. No component code changes needed.

Files: `src/content/work-experience/*.yaml`

## 4. Blog Pagination Styling

Restyle pagination controls as subtle pill buttons:
- `border border-warm-200 rounded-full px-4 py-1.5`
- `text-warm-500 hover:text-warm-700 hover:border-warm-300`
- `no-animation` class, `transition-colors duration-200`
- Mono font, `text-sm`
- Add page indicator: "Page X of Y" in `text-warm-400`

File: `src/pages/posts/[...page].astro`

## 5. 404 Page

New file: `src/pages/404.astro`

- Uses `Layout` + `Content` wrappers
- MicroLabel: "404"
- Heading: "This page wandered off"
- Paragraph: "The page you're looking for doesn't exist or has been moved."
- Link: "Head back home" → /
- Centered layout, generous vertical spacing
- Slightly playful tone, clean aesthetic

## 6. OG/Meta Tags

New component: `src/components/SEO.astro`

### Props
```ts
interface Props {
  title: string;
  description?: string;  // defaults to site-wide description
  image?: string;         // defaults to /og-image.png
  type?: string;          // defaults to "website"
}
```

### Tags Generated
- `<meta name="description">`
- `<meta property="og:title|description|image|type|url">`
- `<meta name="twitter:card|title|description|image">`
- `<link rel="canonical">`

### Integration
- Used inside `Layout.astro` `<head>`
- Layout passes `title` + optional `description` to SEO component
- Placeholder OG image path: `/og-image.png` (user provides later)

Files: `src/components/SEO.astro`, `src/layouts/Layout.astro`

## 7. RSS Feed

Use `@astrojs/rss` official package.

New file: `src/pages/rss.xml.ts`
- Exports `GET` function generating RSS XML
- Published posts only, full content
- Feed metadata: site title, description, URL

Integration:
- `<link rel="alternate" type="application/rss+xml">` in Layout.astro `<head>`
- Optional RSS link in footer

Dependency: `@astrojs/rss`

## 8. Dark Mode

CSS-only via `@media (prefers-color-scheme: dark)`. No toggle, no JS.

### Dark Palette (override warm-* custom properties)
```
Background:  ~#1a1a1a (warm-900 equivalent)
Surface:     ~#2d2926 (warm-800 equivalent)
Borders:     ~#3d3b37 (warm-700 equivalent)
Muted text:  ~#737068 (warm-500)
Body text:   ~#e8e4df (warm-200 equivalent)
Headings:    ~#faf9f7 (warm-50 equivalent)
Accent:      sage stays, possibly lighter for contrast
```

### Implementation
- Add `@media (prefers-color-scheme: dark)` in `base.css` overriding `--color-warm-*` variables
- Tailwind 4 CSS custom properties auto-adapt all warm-* utility classes
- Adjust grain overlay opacity for dark
- Accent line unchanged

File: `src/layouts/base.css`

## Implementation Order

1. Font self-hosting (foundational, no dependencies)
2. Stack separator fix (data-only, quick)
3. SEO/OG tags (Layout.astro changes needed before others)
4. 404 page (standalone)
5. Pagination styling (standalone)
6. Social links + icons (depends on icon packs, touches footer+homepage)
7. RSS feed (depends on @astrojs/rss, references SEO metadata)
8. Dark mode (last — affects all visual elements, easier to verify when everything else is in place)

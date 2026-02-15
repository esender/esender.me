# Site Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 404 page, pagination styling, social links, stack separator fix, font self-hosting, OG/meta tags, RSS feed, and dark mode to esender.me.

**Architecture:** Each task is a standalone commit touching minimal files. Font self-hosting and SEO are foundational (Layout.astro changes), so they go first. Dark mode is last since it overlays all visual elements. The `site` URL must be configured in `astro.config.mjs` before SEO/RSS tasks.

**Tech Stack:** Astro 5, Tailwind CSS 4, astro-icon 1.x, @fontsource, @astrojs/rss, @iconify-json icon packs

---

### Task 1: Font Self-Hosting

**Files:**
- Modify: `src/layouts/base.css:1` (add imports at top)
- Modify: `src/layouts/Layout.astro:22-27` (remove Google Fonts links)

**Step 1: Install font packages**

Run: `yarn add @fontsource-variable/outfit @fontsource/jetbrains-mono`

**Step 2: Add font imports to base.css**

At the very top of `src/layouts/base.css`, before `@import "tailwindcss";`, add:

```css
@import "@fontsource-variable/outfit";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";
```

**Step 3: Remove Google Fonts links from Layout.astro**

In `src/layouts/Layout.astro`, remove these 3 lines (lines 22-27):

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
```

**Step 4: Verify fonts load correctly**

Run: `yarn dev`
Open http://localhost:4321 and verify Outfit and JetBrains Mono render correctly. Check browser DevTools Network tab — no requests to fonts.googleapis.com.

**Step 5: Commit**

```bash
git add package.json yarn.lock src/layouts/base.css src/layouts/Layout.astro
git commit -m "feat: self-host fonts via @fontsource, remove Google Fonts CDN"
```

---

### Task 2: Stack Separator Fix

**Files:**
- Modify: `src/content/work-experience/taktile.yaml`
- Modify: `src/content/work-experience/pitch.yaml`
- Modify: `src/content/work-experience/earnest.yml`
- Modify: `src/content/work-experience/student-loan-hero.yaml`
- Modify: `src/content/work-experience/runtime.yaml`
- Modify: `src/content/work-experience/racoons-group.yaml`
- Modify: `src/content/work-experience/freelance.yaml`

All 7 files have the same issue: stack is a single-item array with comma-separated values. Split each into individual array items.

**Step 1: Fix all YAML files**

For each file, change the `stack` field from single-item comma-separated to individual items. Examples:

`taktile.yaml` — change:
```yaml
stack:
  - React, TypeScript
```
to:
```yaml
stack:
  - React
  - TypeScript
```

`earnest.yml` — change:
```yaml
stack:
  - JavaScript, Preact, Webpack, Optimizely
```
to:
```yaml
stack:
  - JavaScript
  - Preact
  - Webpack
  - Optimizely
```

Apply the same pattern to all 7 files. Each technology gets its own `- item` line.

**Step 2: Verify**

Run: `yarn dev`
Check http://localhost:4321/about/ — each tech should now be separated by ` · ` (middot) with no commas. Example: "React · TypeScript" not "React, TypeScript".

**Step 3: Commit**

```bash
git add src/content/work-experience/
git commit -m "fix: split stack items into individual array entries for consistent separators"
```

---

### Task 3: Configure site URL + SEO/OG Tags

**Files:**
- Modify: `astro.config.mjs` (add site URL)
- Create: `src/components/SEO.astro`
- Modify: `src/layouts/Layout.astro` (add SEO component, update Props)

**Step 1: Add site URL to Astro config**

In `astro.config.mjs`, add the `site` property:

```js
export default defineConfig({
  site: "https://esender.me",
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 2: Create SEO component**

Create `src/components/SEO.astro`:

```astro
---
export interface Props {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}

const SITE_DESCRIPTION = "Marat Abdulin — software engineer in Berlin. Building interfaces, chasing trails, capturing life through a lens.";

const {
  title,
  description = SITE_DESCRIPTION,
  image = "/og-image.png",
  type = "website",
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const imageURL = new URL(image, Astro.site);
---

<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageURL} />
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalURL} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={imageURL} />
```

**Step 3: Integrate SEO into Layout.astro**

In `src/layouts/Layout.astro`:

1. Add import at top of frontmatter:
```ts
import SEO from "@components/SEO.astro";
```

2. Update Props interface:
```ts
export interface Props {
  title: string;
  description?: string;
}
```

3. Destructure description:
```ts
const { title, description } = Astro.props;
```

4. In `<head>`, replace the bare `<title>{title}</title>` with:
```html
    <SEO title={title} description={description} />
    <title>{title}</title>
```

Place the `<SEO>` line just before `<title>`.

**Step 4: Verify**

Run: `yarn build`
Check `dist/index.html` — should contain `<meta property="og:title"`, `<meta name="description"`, `<link rel="canonical"` tags.

**Step 5: Commit**

```bash
git add astro.config.mjs src/components/SEO.astro src/layouts/Layout.astro
git commit -m "feat: add SEO/OG meta tags component and site URL config"
```

---

### Task 4: 404 Page

**Files:**
- Create: `src/pages/404.astro`

**Step 1: Create the 404 page**

Create `src/pages/404.astro`:

```astro
---
import Layout from "@layouts/Layout.astro";
import Content from "@layouts/Content.astro";
import MicroLabel from "@components/MicroLabel.astro";
---

<Layout title="Page not found">
  <Content class="md:mt-4 text-center py-16">
    <MicroLabel>404</MicroLabel>
    <h2 class="mb-4">This page wandered off</h2>
    <p class="text-warm-500 mb-8">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <a href="/" class="no-animation border border-warm-200 rounded-full px-5 py-2 text-sm font-mono text-warm-500 hover:text-warm-700 hover:border-warm-300 transition-colors duration-200 no-underline">
      Head back home
    </a>
  </Content>
</Layout>
```

**Step 2: Verify**

Run: `yarn dev`
Navigate to http://localhost:4321/nonexistent-page — should show the custom 404 with "This page wandered off".

**Step 3: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add custom 404 page with playful tone"
```

---

### Task 5: Blog Pagination Styling

**Files:**
- Modify: `src/pages/posts/[...page].astro:41-46`

**Step 1: Restyle pagination controls**

In `src/pages/posts/[...page].astro`, replace the pagination block (lines 41-46):

```html
    {(page.url.next || page.url.prev) && (
      <div class="flex justify-between mt-8 font-mono text-sm text-warm-500">
        {page.url.prev ? <a href={page.url.prev}>&larr; Prev</a> : <span />}
        {page.url.next && <a href={page.url.next}>Next &rarr;</a>}
      </div>
    )}
```

with:

```html
    {(page.url.next || page.url.prev) && (
      <div class="flex items-center justify-between mt-8 font-mono text-sm">
        {page.url.prev ? (
          <a href={page.url.prev} class="no-animation no-underline border border-warm-200 rounded-full px-4 py-1.5 text-warm-500 hover:text-warm-700 hover:border-warm-300 transition-colors duration-200">&larr; Prev</a>
        ) : <span />}
        <span class="text-warm-400 text-xs">Page {page.currentPage} of {page.lastPage}</span>
        {page.url.next ? (
          <a href={page.url.next} class="no-animation no-underline border border-warm-200 rounded-full px-4 py-1.5 text-warm-500 hover:text-warm-700 hover:border-warm-300 transition-colors duration-200">Next &rarr;</a>
        ) : <span />}
      </div>
    )}
```

**Step 2: Verify**

Run: `yarn dev`
Check http://localhost:4321/posts/ — pagination should show pill-styled buttons with "Page X of Y" centered. Note: you may need more than 10 posts to see pagination. Verify the styling looks correct even with just one page.

**Step 3: Commit**

```bash
git add src/pages/posts/[...page].astro
git commit -m "feat: restyle blog pagination with pill buttons and page indicator"
```

---

### Task 6: Social Links + Icons

**Files:**
- Modify: `astro.config.mjs` (add icon integration)
- Modify: `src/components/Icon.astro` (fix v1 API)
- Create: `src/components/SocialLinks.astro`
- Modify: `src/pages/index.astro` (add social links to homepage)
- Modify: `src/layouts/Footer.astro` (add social links)

**Step 1: Install icon packs and configure astro-icon integration**

Run: `yarn add @iconify-json/simple-icons @iconify-json/lucide`

Then update `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  site: "https://esender.me",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 2: Fix Icon.astro for v1 API**

Replace the entire content of `src/components/Icon.astro` with:

```astro
---
import { Icon as AstroIcon } from "astro-icon/components";

export interface Props {
  name: string;
  class?: string;
  size?: string;
}

const { name, class: className, size = "1.25em" } = Astro.props;
---

<AstroIcon name={name} size={size} class={className} />
```

astro-icon v1 uses `name="pack:icon"` format (e.g., `simple-icons:github`). The old `pack` prop is gone.

**Step 3: Create SocialLinks component**

Create `src/components/SocialLinks.astro`:

```astro
---
import Icon from "@components/Icon.astro";

export interface Props {
  class?: string;
}

const { class: className } = Astro.props;

const links = [
  { name: "simple-icons:github", href: "https://github.com/esender", label: "GitHub" },
  { name: "simple-icons:linkedin", href: "https://linkedin.com/in/marat-abdulin", label: "LinkedIn" },
  { name: "lucide:mail", href: "mailto:hello@esender.me", label: "Email" },
];
---

<div class:list={["flex items-center gap-4", className]}>
  {links.map(({ name, href, label }) => (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      class="no-animation no-underline text-warm-400 hover:text-warm-600 transition-colors duration-200"
      aria-label={label}
    >
      <Icon name={name} size="1.25em" />
    </a>
  ))}
</div>
```

> **Note for implementer:** The `href` values (GitHub username, LinkedIn slug, email) are placeholders. The user should verify/update these to their actual URLs before deploying.

**Step 4: Add SocialLinks to homepage**

In `src/pages/index.astro`, add import in frontmatter:

```ts
import SocialLinks from "@components/SocialLinks.astro";
```

Then add `<SocialLinks class="mt-4" />` after the last `<p>` inside the "Currently" section (after line 26, before `</Content>`):

```html
    <SocialLinks class="mt-4" />
  </Content>
```

**Step 5: Add SocialLinks to footer**

Replace `src/layouts/Footer.astro` with:

```astro
---
import SocialLinks from "@components/SocialLinks.astro";
---

<footer class="text-center text-warm-400 pb-2 pt-6 border-t border-warm-200 text-xs font-mono tracking-wide">
  <SocialLinks class="justify-center mb-3" />
  Marat Abdulin &copy; 2023. Powered by <a
    href="https://astro.build"
    target="_blank">Astro</a
  >
</footer>
```

**Step 6: Verify**

Run: `yarn dev`
1. Homepage: social icons should appear below "Currently" section
2. Footer (all pages): social icons centered above copyright
3. Icons render as SVGs, hover turns them from warm-400 to warm-600
4. Links open in new tabs (except mailto)

**Step 7: Commit**

```bash
git add astro.config.mjs src/components/Icon.astro src/components/SocialLinks.astro src/pages/index.astro src/layouts/Footer.astro package.json yarn.lock
git commit -m "feat: add social links (GitHub, LinkedIn, Email) to homepage and footer"
```

---

### Task 7: RSS Feed

**Files:**
- Create: `src/pages/rss.xml.ts`
- Modify: `src/layouts/Layout.astro` (add RSS link tag)

**Step 1: Install @astrojs/rss**

Run: `yarn add @astrojs/rss`

**Step 2: Create RSS endpoint**

Create `src/pages/rss.xml.ts`:

```ts
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => data.published);

  posts.sort((a, b) => +b.data.date - +a.data.date);

  return rss({
    title: "Marat Abdulin",
    description: "Software engineer in Berlin. Writing about development and photography.",
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
  });
}
```

Note: Full content requires `@astrojs/mdx` or manual rendering. For now, include `description` as the item content. Full post body can be added later if needed.

**Step 3: Add RSS discovery link to Layout.astro**

In `src/layouts/Layout.astro`, inside `<head>`, add after the `<SEO>` line:

```html
    <link rel="alternate" type="application/rss+xml" title="Marat Abdulin" href="/rss.xml" />
```

**Step 4: Verify**

Run: `yarn build && yarn preview`
Open http://localhost:4321/rss.xml — should return valid XML with RSS feed structure.

**Step 5: Commit**

```bash
git add src/pages/rss.xml.ts src/layouts/Layout.astro package.json yarn.lock
git commit -m "feat: add RSS feed with @astrojs/rss"
```

---

### Task 8: Dark Mode

**Files:**
- Modify: `src/layouts/base.css` (add dark mode media query with custom property overrides)

This is the most design-sensitive task. The approach: override `--color-warm-*` and `--color-accent-*` CSS custom properties inside a `prefers-color-scheme: dark` media query. Since Tailwind 4 maps all `warm-*` utilities to these properties, everything adapts automatically.

**Step 1: Add dark mode overrides to base.css**

At the end of `src/layouts/base.css` (after the `.accent-line::after` block), add:

```css
/* Dark mode — override warm palette via system preference */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-warm-50: #1a1a1a;
    --color-warm-100: #222020;
    --color-warm-200: #3d3b37;
    --color-warm-300: #4a4743;
    --color-warm-400: #7a766e;
    --color-warm-500: #a39e94;
    --color-warm-600: #c4bfb6;
    --color-warm-700: #d4cec6;
    --color-warm-800: #e8e4df;
    --color-warm-900: #faf9f7;

    --color-accent: #8fa382;
    --color-accent-hover: #a3b396;
    --color-accent-light: #6e8062;
    --color-accent-muted: #4a5844;
  }

  .grain::before {
    opacity: 0.02;
  }
}
```

> **Design rationale:** The warm scale is inverted — `warm-50` becomes the darkest (background), `warm-900` becomes the lightest (headings). Accent colors shift slightly lighter for contrast on dark backgrounds. Grain opacity drops slightly so noise isn't harsh on dark.

> **Important for implementer:** This is a starting point. After applying, visually verify every page in dark mode. The accent colors especially may need tuning — the sage green should feel natural against both light and dark backgrounds. Pay attention to:
> - Link underline colors (accent-light/accent-muted are used for decoration)
> - Timeline dot visibility on about page
> - PostCard hover state (bg-warm-100 becomes a dark surface)
> - Border dividers (warm-200) should be subtle but visible

**Step 2: Verify in browser**

Run: `yarn dev`

1. Set system to dark mode (macOS: System Settings → Appearance → Dark)
2. Check all pages: homepage, about, blog listing, 404
3. Verify:
   - Background is dark (#1a1a1a)
   - Text is light (#e8e4df body, #faf9f7 headings)
   - Borders are subtle but visible
   - Accent sage line at top still looks good
   - Links are readable with proper hover states
   - Grain overlay isn't too prominent
4. Toggle back to light mode — verify everything still works

**Step 3: Commit**

```bash
git add src/layouts/base.css
git commit -m "feat: add dark mode via prefers-color-scheme media query"
```

---

### Task 9: Final Verification

**Step 1: Full build check**

Run: `yarn build`

Verify no build errors. Check `dist/` output:
- `dist/index.html` has OG tags, RSS link, self-hosted font CSS
- `dist/404.html` exists
- `dist/rss.xml` exists and is valid XML
- No references to `fonts.googleapis.com` in any output file

**Step 2: Visual verification**

Run: `yarn preview`

Check every page in both light and dark mode:
- Homepage (social links, layout)
- About (timeline, stack separators)
- Blog listing (pagination styling)
- 404 page
- Individual post page

**Step 3: Commit any fixes if needed**

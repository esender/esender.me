# Design System: High-End Editorial

## 1. Overview & Creative North Star

The creative north star is **The Architectural Gallery**.

We move beyond clinical Nordic minimalism into a space that feels curated, lived-in, and intentional. The digital screen is treated as a physical editorial layout — high-end architecture monographs and independent fashion journals.

Instead of a standard grid, we use **intentional asymmetry** and **breathable white space**. Elements feel "placed" rather than "slotted," with overlapping imagery and drastic scale contrast between display typography and metadata.

## 2. Colors

A sophisticated range of architectural neutrals. See `src/layouts/base.css` for all token values (light + dark mode).

### Palette Roles

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| `primary` / accent sage | `#506354` | `#a8b5a1` | Intentional accents, links, CTAs |
| `secondary` / sand | `#6b6357` | `#a3a19a` | Warm secondary tone |
| `tertiary` / clay | `#66645d` | `#a3a19a` | Muted supporting tone |
| `on-surface` | `#383831` | `#e6e2db` | All body text (never use `#000`) |
| `on-surface-variant` | `#65655c` | `#babab0` | Secondary text, captions |

### Rules

- **No-Line Rule:** No `1px solid` borders for sectioning. Define boundaries through background shifts between surface tiers.
- **Surface Hierarchy:** Treat UI as stacked sheets of fine paper:
  - Main Canvas: `surface` (`#fffcf7` / `#1a1a17`)
  - Embedded Modules: `surface-container` (`#f6f4ec` / `#1f1f1c`)
  - Primary Focus Cards: `surface-container-lowest` (`#ffffff` / `#141411`)
- **Glass & Gradient:** Floating nav/modals use semi-transparent `surface` with `backdrop-blur(12px)`. Use `.glass` utility class. Soft gradients from `primary` → `primary-container` on hero backgrounds.
- **Never use `#000000`.** Use `on-background` (`#383831` / `#e6e2db`) for all text.

## 3. Typography

Interplay between geometric humanism of **Manrope** and technical precision of **IBM Plex Mono**.

| Scale | Font | Size | Weight | Tracking | Class |
|-------|------|------|--------|----------|-------|
| Display LG | Manrope | 3.5rem | 800 | -0.03em | `.text-display-lg` |
| Headline LG | Manrope | 2rem | 700 | -0.02em | `.text-headline-lg` |
| H1–H6 | Manrope | standard scale | bold | -0.02em | native elements |
| Label MD | IBM Plex Mono | 0.8125rem | — | 0.1em | `.label-md` |
| Label SM | IBM Plex Mono | 0.6875rem | — | 0.1em | `.label-sm` |

### Rules

- Headlines use Manrope with tight negative tracking for a premium "ink-on-paper" feel.
- All metadata (dates, captions, tags, categories) use IBM Plex Mono labels with wide letter-spacing.
- Mix font families intentionally: Manrope headline + IBM Plex Mono date/category.

## 4. Elevation & Depth

No traditional drop shadows. Use **Tonal Layering**.

- **Layering Principle:** Depth = color shift. A card in `surface-container-lowest` on a `surface-container` background creates natural elevation without shadows.
- **Ambient Shadows:** For floating states only. `0px 12px 32px` in `on-surface` at 6% opacity. Use `--shadow-ambient` token.
- **Ghost Border:** When a border is needed for accessibility: `outline-variant` at 15% opacity. Use `.ghost-border` utility class. Never use opaque borders.
- **Glassmorphism:** `surface-bright` at 80% opacity + `blur(12px)`. Use `.glass` utility class.

## 5. Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-section` | 5.5rem | Between major page sections |
| `--spacing-section-lg` | 7rem | Between top-level sections on spacious layouts |
| Standard Tailwind scale | — | All other spacing |

**Rule:** When in doubt, increase spacing by one token. Generous white space is core to the editorial feel.

## 6. Components

### Buttons

- **Primary:** Solid `primary` bg, `on-primary` text, no border, `rounded-md`.
- **Secondary:** `secondary-container` background.
- **Tertiary (Ghost):** No background, Manrope bold, 1px `primary` underline offset 4px.

### Cards & Lists

- **Forbid dividers.** No line separators. Use spacing or background shifts.
- **Editorial spacing:** `spacing-section` or `spacing-section-lg` between major sections.

### Input Fields

- Minimalist: no enclosing box. Single 1px `outline-variant` bottom border at 30% opacity.
- Focus: bottom border transitions to 100% `primary`. Labels in IBM Plex Mono.

### Signature: The Curator Hero

Asymmetrical composition: `rounded-lg` image offset by a headline overlapping the image edge. Breaks the grid for a high-end editorial feel.

## 7. Visual Effects

- **Grain Texture:** Subtle film grain overlay via `.grain` class (3% opacity light, 2% dark).
- **Accent Line:** Fixed 2px sage line at viewport top via `.accent-line` class.

## 8. Do's and Don'ts

### Do

- Use extreme vertical white space. If in doubt, increase spacing.
- Mix Manrope headlines with IBM Plex Mono metadata.
- Use `surface-dim` and `surface-bright` to create "rooms" within the layout.
- Support dark mode — all tokens have dark equivalents.

### Don't

- Use `#000000`. Always use `on-background` tokens.
- Use drop shadows on cards. Rely on surface tier color shifts.
- Use dividers. Increase spacing instead of adding lines.
- Center everything. Use asymmetric alignment — some elements far-left, others at ~60% grid line.
- Use 100% opaque borders. Use ghost borders or background shifts.

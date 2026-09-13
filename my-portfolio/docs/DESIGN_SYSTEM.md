# Design System Documentation

This document describes the **current implemented design system** of the
robotics engineering portfolio. It is a record of what exists — not a
proposal for what should exist.

Source: `src/styles/global.css`, `src/components/*.astro`, `src/layouts/Layout.astro`

---

## Color System (6-Token Architecture)

### Primary Palette
| Token | Hex | Role | Contrast on `--color-paper` |
|-------|-----|------|-----------------------------|
| `--color-ink` | `#141822` | Headings, nav brand, primary text, dark fills | 14.5:1 (AAA) |
| `--color-gold` | `#B8924A` | Interactive elements ONLY (links, active buttons, circuit traces) | 3.5:1 (AA Large) |
| `--color-gold-hi` | `#E4C87A` | Hover/charged states only, pulse glows — never static | 1.8:1 (Decor/Glow) |
| `--color-paper` | `#F7F5F0` | Warm off-white base canvas | Base |
| `--color-body` | `#3A3F4A` | Body copy, secondary reading text | 8.1:1 (AAA) |
| `--color-muted` | `#6B7280` | Captions, metadata, eyebrows, tags, timestamps | 4.8:1 (AA) |

### Canvas & Surfaces
| Token | Value | Role |
|-------|-------|------|
| `--bg-primary` | `var(--color-paper)` (`#F7F5F0`) | Primary viewport background |
| `--bg-secondary` | `#F3F0EA` | Secondary surface backdrop |
| `--bg-tertiary` | `#EEEAE3` | Tertiary surface backdrop |
| `--surface` | `#FFFFFF` | Solid cards, containers, elevation |
| `--surface-elevated` | `#F0EDE5` | Elevated card fill, hover layers |
| `--surface-dim` | `#F5F2EC` | Inset wells, recessed sections |

### Borders & Separators
| Token | Value | Role |
|-------|-------|------|
| `--border` | `rgba(20, 24, 34, 0.10)` | Card and section borders |
| `--border-subtle` | `rgba(20, 24, 34, 0.05)` | Hairline dividers |
| `--border-strong` | `rgba(20, 24, 34, 0.18)` | Prominent boundaries |

### Gold Usage Rules
1. **Interactive Elements Only**: Gold (`--color-gold`) is strictly reserved for actionable or reactive items — text links, active tab/dot indicators, button hover states, and interactive circuit traces.
2. **Never for Static Decoration**: Eyebrows, static badges, pill tags, section lines, corner brackets, and non-interactive text use `--color-muted` or neutral ink borders.
3. **`--color-gold-hi`**: Used solely for cursor-proximity charged states, hot edge glows, and pulse heads in the interactive canvas. Never used as a static color.

---

## Typography

### Font Stacks
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display',
             'SF Pro Text', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Scale (CSS Custom Properties)
| Token | Value | Px (at 16px base) |
|-------|-------|-------------------|
| `--text-2xs` | `0.6875rem` | 11px |
| `--text-xs` | `0.75rem` | 12px |
| `--text-sm` | `0.875rem` | 14px |
| `--text-base` | `1rem` | 16px |
| `--text-lg` | `1.125rem` | 18px |
| `--text-xl` | `1.375rem` | 22px |
| `--text-2xl` | `1.75rem` | 28px |
| `--text-3xl` | `2.25rem` | 36px |
| `--text-4xl` | `3rem` | 48px |
| `--text-5xl` | `4rem` | 64px |
| `--text-display` | `clamp(3.75rem, 8vw, 7.5rem)` | Fluid display |

### Hierarchy Implementation

| Level | Selector | Size | Weight | Line-Height | Tracking |
|-------|----------|------|--------|-------------|----------|
| Display | `.hero-name` | `clamp(4.5rem, 9vw, 8.5rem)` | 700 | 1.02 | -0.03em |
| H1 | `h1` | `--text-display` | 700 | 1.05 | -0.025em |
| H2 | `h2`, `.section-title` | `clamp(2rem, 4.5vw, 3.5rem)` | 700 | 1.12 | -0.02em |
| H3 | `h3` | `--text-2xl` | 700 | 1.2 | -0.015em |
| H4 | `.card-title`, `.evidence-title` | `clamp(1.3rem, 2vw, 1.65rem)` | 700 | 1.25 | -0.015em |
| Lead | `.section-lead` | `--text-lg` | 400 | 1.6 | 0 |
| Body | `p` | `--text-base` | 400 | 1.65 | 0 |
| Small | `.card-summary` | `--text-xs` | 400 | 1.65 | 0 |
| Metadata | `.section-eyebrow`, `.card-domain` | `--text-xs` | 600 | 1.6 | +0.06em (uppercase) |
| Micro | `.visual-index`, `.skill-index` | `--text-2xs` | 600 | 1.4 | 0 |

### Mono Usage
- Technical specifications
- Code snippets
- Data values
- File paths
- Coordinates
- Version numbers

---

## Spacing System

### Base Scale
| Token | Value |
|-------|-------|
| `--space-1` | 0.25rem (4px) |
| `--space-2` | 0.5rem (8px) |
| `--space-3` | 0.75rem (12px) |
| `--space-4` | 1rem (16px) |
| `--space-5` | 1.25rem (20px) |
| `--space-6` | 1.5rem (24px) |
| `--space-8` | 2rem (32px) |
| `--space-10` | 2.5rem (40px) |
| `--space-12` | 3rem (48px) |
| `--space-16` | 4rem (64px) |
| `--space-20` | 5rem (80px) |
| `--space-24` | 6rem (96px) |
| `--space-32` | 8rem (128px) |

### Section Padding
```css
--section-pad: clamp(6rem, 11vh, 9.5rem);
--nav-height: 64px;
--max-width: 1280px;
--content-max: 780px;
```

### Container
```css
.container {
  width: min(100% - 48px, var(--max-width));
  margin-inline: auto;
}
```
Mobile: `min(100% - 32px, var(--max-width))`

---

## Motion System

### Easing
| Token | Value | Use Case |
|-------|-------|----------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, reveals |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Physical feel, interactions |

### Durations
| Token | Value | Use Case |
|-------|-------|----------|
| `--dur-fast` | 150ms | Hover, focus, micro-feedback |
| `--dur-norm` | 240ms | State transitions, card hover |
| `--dur-slow` | 450ms | Section entrances, major transitions |

### Scroll Reveal (IntersectionObserver)
```javascript
threshold: 0.08
rootMargin: '0px 0px -40px 0px'
```
Classes: `.reveal`, `.reveal-left`, `.stagger-children`

Stagger delays: 0, 70, 140, 210, 280, 350ms

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal, .reveal-left, .stagger-children > * {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  section {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## Layout System

### Grid Patterns

**Hero**: `grid-template-columns: 1.2fr 0.8fr` (desktop), stacked (mobile)

**Projects**: `grid-template-columns: repeat(2, 1fr)` (desktop), 1fr (mobile)

**Skills**: `grid-template-columns: 0.82fr 1.18fr` (desktop), stacked (mobile)

**About**: `grid-template-columns: 1fr 1.15fr` (desktop), stacked (mobile)

**Contact**: `grid-template-columns: 1.15fr 0.85fr` (desktop), stacked (mobile)

### Section Structure
```css
.section {
  padding: var(--section-pad) 0;
  position: relative;
  border-top: 1px solid var(--border-subtle);
}
```

### Section Header Pattern
```html
<div class="section-header reveal">
  <span class="section-eyebrow">Category</span>
  <h2 class="section-title">Title<br/><span class="accent">Emphasis</span></h2>
  <p class="section-lead">Description...</p>
</div>
```

---

## Component Patterns

### Buttons
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 500;
  padding: 11px 22px;
  border-radius: var(--r-pill);
  box-shadow: var(--shadow-resting);
  transition: all var(--dur-norm) var(--ease-out);
}
```

| Variant | Background | Border | Text | Hover |
|---------|------------|--------|------|-------|
| Primary | `--text-primary` | Transparent | `--bg` | Darker, elevate |
| Secondary | `--surface` | `--border` | `--text-primary` | Border stronger, elevate |
| Glass | `--material-glass` | `--glass-border` | `--text-primary` | Heavier glass, elevate |
| Cyan | `--cyan-dark` | Transparent | White | Darker cyan, cyan glow |

### Tags / Pills
```css
.tag {
  display: inline-flex;
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.05);
  padding: 4px 12px;
  border-radius: var(--r-pill);
}
```
Cyan variant: `.tag-cyan` uses `--cyan-subtle` bg, `--cyan-dark` text

### Cards
```css
.card-apple {
  background: var(--surface);
  border-radius: var(--r-card);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-resting);
  transition: transform var(--dur-norm) var(--ease-out),
              box-shadow var(--dur-norm) var(--ease-out),
              border-color var(--dur-norm) var(--ease-out);
}
.card-apple:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  border-color: var(--border);
}
```

### Shadows (Elevation)
| Token | Value |
|-------|-------|
| `--shadow-resting` | `0 2px 10px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.03)` |
| `--shadow-hover` | `0 12px 32px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)` |
| `--shadow-active` | `0 4px 14px rgba(0,0,0,0.05)` |
| `--shadow-elevated` | `0 20px 48px -10px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.03)` |

### Radii
| Token | Value |
|-------|-------|
| `--r-xs` | 4px |
| `--r-sm` | 8px |
| `--r-md` | 12px |
| `--r-card` | 20px |
| `--r-card-lg` | 24px |
| `--r-pill` | 9999px |

---

## SpatialField (Site-Wide)

### Canvas
```css
#spatialFieldCanvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}
```

### Particles
| Config | Desktop | Mobile |
|--------|---------|--------|
| Count | 320 | 120 |
| Distribution | Spherical/cylindrical field | Same |
| Cyan accent ratio | 18% | 18% |
| Base radius (cyan) | 1.8px | 1.8px |
| Base radius (normal) | 1.1px | 1.1px |

### Physics
| Parameter | Value |
|-----------|-------|
| Spring | 0.035 |
| Damping | 0.87 |
| Focal Length | 400 |
| Mesh Connect Distance | 65px (desktop only) |

### Cursor Repulsion
| Parameter | Desktop | Mobile |
|-----------|---------|--------|
| Radius | 180px | 100px |
| Force | 5.5 | 3.0 |
| Grid Influence | Yes | No |

### Section Morph Targets

| Section | Scroll Range | Center X | Center Y | Spread X | Spread Y | Z-Scale | Grid Intensity |
|---------|--------------|----------|----------|----------|----------|---------|----------------|
| Hero | 0–0.18 | 62%→50% | 42%→48% | 48%→42% | 38%→42% | 280→340 | 0.3→0.7 |
| Work | 0.18–0.45 | 50% | 48%→42% | 52%→60% | 44%→36% | 340→280 | 0.7→1.0 |
| Skills | 0.45–0.70 | 50%→52% | 50% | 60%→42% | 36%→46% | 280→240 | 1.0 |
| About | 0.70–0.88 | 50% | 50%→54% | 42%→46% | 46%→44% | 240→270 | 1.0→0.2 |
| Contact | 0.88–1.0 | 50% | 54% | 46% | 44% | 270 | 0.15→0 |

### Grid System
- Spacing: 50px (desktop) / 60px (mobile)
- Lines: Pre-allocated vertical + horizontal
- Alpha: Smoothly interpolated per section
- Cursor response: Displacement + spring-back (desktop only)
- Center crosshair: Hero only, subtle

### Performance
- `requestAnimationFrame` loop
- Passive scroll/mousemove/resize listeners
- Reduced motion: Loop exits, static frame
- Mobile: Lower particle count, no mesh lines, no grid cursor response

---

## Responsive Breakpoints

| Breakpoint | Media Query | Key Changes |
|------------|-------------|-------------|
| Mobile | `@media (max-width: 640px)` | Stack all grids, compress hero type, smaller video |
| Tablet | `@media (max-width: 768px)` | Container padding 32px, section padding clamp |
| Small Desktop | `@media (max-width: 960px)` | Projects grid → 1 column |
| Medium Desktop | `@media (max-width: 1024px)` | Hero/About/Contact/Skills grids → stacked |
| Nav | `@media (max-width: 860px)` | Hamburger drawer |

### Touch Targets
- Minimum 44×44px (all interactive elements)
- Mobile nav drawer links: 3xl type, generous padding
- No hover-only functionality

---

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 2px;
  border-radius: var(--r-xs);
}
```
Applied to: buttons, links, nav items, icon buttons, tabs, form inputs

### Semantic HTML
- `<header>`/`<nav>`/`<main>`/`<section>`/`<footer>`
- Heading hierarchy: h1 → h2 → h3 (no skips)
- `<button>` for actions, `<a>` for navigation
- `<article>` for project cards
- `role="tablist"`/`tab`/`tabpanel` for Skills
- `aria-hidden="true"` on SpatialField canvas
- `aria-label` on icon-only buttons
- `aria-expanded`/`aria-controls` on mobile nav

### Reduced Motion
- CSS: All animations/transitions disabled
- JS: SpatialField RAF loop exits
- IntersectionObserver: Immediately adds `.is-visible`

### Contrast (Verified)
- Primary text on bg: 17:1
- Secondary text on bg: 7.2:1
- Muted text on bg: 4.8:1
- Cyan-dark on bg: 5.59:1
- Cyan on surface: 3.2:1 (large only)

---

## Interaction Principles

### States (All Interactive Elements)
| State | Visual |
|-------|--------|
| Default | Clear affordance |
| Hover | Elevate + color shift |
| Focus | Cyan ring (2px, 2px offset) |
| Active | Pressed depth |
| Disabled | 40% opacity, not focusable |

### Transitions
- `transform` + `opacity` only
- Duration: `--dur-norm` (240ms) standard
- Easing: `--ease-out` standard

### Navigation
- Sticky header (64px)
- Scroll shadow after 30px
- Scroll spy highlights active section
- Mobile: Full-screen drawer, focus trap, ESC closes

---

## Current Pages & Sections

| Page | Sections |
|------|----------|
| `/` (index) | Hero → Work → Skills → About → Contact |
| `/projects/[id]` | Dynamic project detail (not fully implemented) |
| `/skills/[id]` | Dynamic skill evidence (not fully implemented) |

### Implemented Components
- `Navigation.astro` — Sticky nav, scroll spy, mobile drawer
- `Hero.astro` — Monumental type, 1:1 video card
- `SpatialField.astro` — Site-wide particle field + grid
- `ProjectIndex.astro` — 2-col project cards with SVG diagrams
- `SkillsEvidence.astro` — Tabbed evidence inspector
- `About.astro` — Bio + timeline
- `Contact.astro` — Email + verified links
- `Footer.astro` — Minimal signature
- `Layout.astro` — Scroll progress, section progress CSS props, smooth scroll

---

## Build & Performance

### Build Output
- Static (`output: 'static'`)
- 12 pages generated
- Build time: ~1.7s
- Zero client-side JS by default

### Hydration
Only inline scripts for:
- Scroll progress bar
- IntersectionObserver reveals
- Smooth anchor scroll
- Section progress CSS custom properties
- SpatialField canvas
- Skills tab switching
- Email copy
- Mobile nav toggle

### Estimated Weights
| Asset | Size (gzipped) |
|-------|----------------|
| HTML | ~15kB |
| CSS | ~12kB |
| JS (inline) | ~8kB |
| Fonts (Inter + JB Mono, subset) | ~45kB |
| **Total (no images)** | **~80kB** |

---

## Anti-Patterns in Current System

| Pattern | Location | Note |
|---------|----------|------|
| Duplicate keyframes | `global.css` + component styles | `fadeUp` defined twice |
| Mixed animation approach | CSS + JS | SpatialField uses JS RAF, rest CSS |
| Unused CSS variables | `global.css` | `--ease-spring` defined, rarely used |
| Inconsistent section header | Some use `.section-lead`, others `.section-desc` | Standardize |
| Video placeholder | Hero | Requires `/public/video/introduction.mp4` |

---

## Version
Documented as of: 2026-09-05
Astro: v7.2.0
Build: Static
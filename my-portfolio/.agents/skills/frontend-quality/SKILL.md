# Frontend Quality Skill

## Purpose

Understand Astro's strengths. Prefer native platform over frameworks.
Every dependency must justify its existence.

---

## Technology Preferences

### Prefer
- **Astro Components** (`.astro`) — zero-JS by default, island hydration
- **Semantic HTML** — browser native, accessible, SEO
- **CSS Custom Properties** — theming, responsive, no runtime
- **CSS Animations/Transitions** — GPU accelerated, declarative
- **SVG** — scalable, styleable, accessible, small
- **Canvas** — only when pixel manipulation / high particle counts needed
- **Native Browser APIs**:
  - `IntersectionObserver` (scroll reveal)
  - `requestAnimationFrame` (canvas loops)
  - `matchMedia` (reduced motion, dark mode)
  - `navigator.clipboard` (copy)
  - `history.pushState` (smooth scroll)
  - `fetch` (if needed)

### Avoid Unless Justified
- React/Vue/Svelte components (hydration cost)
- Animation libraries (GSAP, Anime.js, Framer Motion)
- UI component libraries
- State management libraries
- CSS-in-JS
- Utility CSS frameworks (Tailwind) — conflicts with custom properties
- Icon libraries (use inline SVG)
- Date libraries (native `Intl` / `Date`)
- Lodash/underscore (native array/object methods)

---

## Dependency Justification Framework

Before adding ANY package, answer:

1. **What problem does it solve?**
2. **Can CSS/HTML/JS native solve it?**
3. **Bundle cost?** (gzipped kB)
4. **Maintenance burden?** (updates, breaking changes)
5. **Performance impact?** (runtime, hydration)
6. **Accessibility?** (does it help or hurt?)
7. **Alternative lighter solution?**

If not justified → DON'T ADD.

---

## Astro-Specific Patterns

### Component Structure
```
src/components/
  ComponentName.astro    # Logic + template + styles co-located
```

### Scripts
- Frontmatter: server-side logic (data fetching, computation)
- `<script>`: client-side only (interactivity)
- `<script is:inline>`: inline in head (rare)

### Styles
- `<style>` — scoped by default
- `<style is:global>` — design tokens, reset
- CSS custom properties for theming

### Hydration Directives (use sparingly)
- `client:load` — immediate
- `client:visible` — when in viewport
- `client:idle` — after main thread free
- `client:media` — at breakpoint
- Prefer NO directive (static)

---

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Type all props interfaces
- No `any` (use `unknown` or proper types)
- JSDoc for complex logic

### CSS
- Custom properties for all design tokens
- No magic numbers (use tokens)
- Mobile-first media queries
- Logical properties (inline/block)
- Container queries where appropriate

### JavaScript
- ES modules
- `const` by default
- Arrow functions for callbacks
- Optional chaining / nullish coalescing
- No `var`

### HTML
- Semantic elements
- Proper heading hierarchy
- Alt text on images
- Labels on inputs
- ARIA only when necessary

---

## Asset Strategy

### Images
- WebP/AVIF via Astro Image (if needed)
- Responsive: `srcset`, `sizes`
- Lazy loading (`loading="lazy"`)
- Blur placeholder or dominant color
- Aspect ratio reserved (no layout shift)

### Fonts
- System font stack first (no CLS)
- Inter / JetBrains Mono via Google Fonts (preconnect)
- `font-display: swap`
- Preload critical fonts

### Video
- MP4 (H.264) for compatibility
- WebM for modern (smaller)
- `preload="metadata"`
- `playsinline` `muted` `loop` for hero
- Poster image

---

## Build & Deploy

- Static output (`output: 'static'`)
- No server runtime needed
- Edge deploy (Vercel, Netlify, Cloudflare)
- Compression (gzip/brotli) handled by platform
- Cache headers for static assets

---

## Performance Budget

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID / INP | < 200ms |
| CLS | < 0.1 |
| JS (gzipped) | < 50kB |
| CSS (gzipped) | < 20kB |
| Fonts | < 100kB |
| Total page weight | < 500kB |

---

## Anti-Patterns

- Hydrating entire page
- Framework for one component
- Tailwind + custom properties (conflict)
- Large animation lib for simple transitions
- Client-side routing (MPA is fine)
- Unnecessary state management
- Runtime CSS-in-JS
- Icon fonts
- Polyfills for modern browsers
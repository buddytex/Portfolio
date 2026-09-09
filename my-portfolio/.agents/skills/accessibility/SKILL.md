# Accessibility Skill

## Purpose

Ensure the portfolio is usable by everyone. Accessibility is not a
checklist — it's built into interaction design, motion, content, and
code from the start.

---

## Semantic HTML

- `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`
- Heading hierarchy: h1 → h2 → h3 (no skips)
- `<button>` for actions, `<a>` for navigation
- `<label>` for every input
- `<figure>`/`<figcaption>` for images with captions
- `<dl>`/`<dt>`/`<dd>` for definition lists (specs)
- `<time>` for dates
- `<code>`/`<pre>` for technical content

---

## Keyboard Navigation

- **Tab order** = visual order (no tabindex > 0)
- **Focus visible** on ALL interactive elements
- **Skip link** to main content
- **Focus trap** in modals/drawers
- **ESC** closes modals/drawers
- **Arrow keys** for tabbed interfaces
- **Enter/Space** activates buttons
- No keyboard traps

### Focus Styles
```css
:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 2px;
  border-radius: var(--r-xs);
}
```
Never remove focus rings.

---

## Contrast (WCAG AA Minimum)

| Element | Ratio |
|---------|-------|
| Body text | 4.5:1 |
| Large text (18px+) | 3:1 |
| UI components | 3:1 |
| Graphics | 3:1 |

Current palette verified:
- `--text-primary` on `--bg`: 17:1 ✓
- `--text-secondary` on `--bg`: 7.2:1 ✓
- `--text-muted` on `--bg`: 4.8:1 ✓
- `--cyan-dark` on `--bg`: 5.59:1 ✓
- `--cyan` on `--surface`: 3.2:1 (large only)

---

## Reduced Motion

**Mandatory support**:

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

JavaScript:
```javascript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  // Cancel RAF loops, show end states
}
```

Test: System Settings → Accessibility → Reduce Motion

---

## Screen Readers

- Meaningful alt text for all images
- `aria-hidden="true"` for decorative elements (SpatialField canvas)
- `aria-label` for icon-only buttons
- `aria-expanded`/`aria-controls` for drawers
- `role="tablist"`/`role="tab"`/`role="tabpanel"` for Skills
- Live regions for dynamic content (`aria-live="polite"`)
- No redundant link text ("Click here", "Read more")

---

## Touch Targets

- Minimum 44×44px
- Adequate spacing between targets
- No hover-only functionality

---

## Content Structure

- Clear heading hierarchy
- Descriptive link text
- Form labels always visible
- Error messages specific and linked
- Language declared (`lang="en"`)
- No content only in color

---

## ARIA Usage

**Use native HTML first**. ARIA only when HTML insufficient.

Valid uses:
- `aria-hidden` on SpatialField canvas
- `aria-label` on icon buttons
- `aria-expanded` on nav toggle
- `role="tablist"` for Skills tabs
- `aria-live` on evidence panel

Invalid:
- `role="button"` on `<div>`
- `aria-label` duplicating visible text
- ARIA replacing semantic HTML

---

## Testing

Automated:
- `axe-core` / Lighthouse
- `npx @astrojs/check` (includes a11y hints)

Manual:
- Tab through entire site
- Screen reader (NVDA/VoiceOver)
- Zoom 200% (WCAG 1.4.4)
- Reduced motion enabled
- High contrast mode
- No mouse (keyboard only)
- Touch only (mobile)

---

## Current Implementation Gaps to Monitor

- [ ] Skip link implementation
- [ ] Focus trap in mobile drawer
- [ ] Alt text for all project images
- [ ] Video captions/transcript when video added
- [ ] Color-blind safe palette verification
- [ ] Focus order in Skills tab panel
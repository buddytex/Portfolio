# Typography Skill

## Purpose

Treat typography as structural design. Evaluate font hierarchy, scale,
line-height, tracking, measure, weight, contrast, responsive scaling,
heading rhythm, and paragraph density.

Typography must support the information hierarchy — not just look large.

---

## Current System (Documented from Implementation)

### Typefaces
- **Sans**: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', system-ui, sans-serif`
- **Mono**: `'JetBrains Mono', monospace`

### Scale (CSS Custom Properties)
```
--text-2xs:    0.6875rem  (11px)
--text-xs:     0.75rem    (12px)
--text-sm:     0.875rem   (14px)
--text-base:   1rem       (16px)
--text-lg:     1.125rem   (18px)
--text-xl:     1.375rem   (22px)
--text-2xl:    1.75rem    (28px)
--text-3xl:    2.25rem    (36px)
--text-4xl:    3rem       (48px)
--text-5xl:    4rem       (64px)
--text-display: clamp(3.75rem, 8vw, 7.5rem)
```

### Weights
- 300 (light) — rare, large display only
- 400 (regular) — body
- 500 (medium) — emphasis, labels
- 600 (semibold) — subheadings, UI elements
- 700 (bold) — headings, strong emphasis
- 800/900 — display only

### Line Heights
- Display: 1.02–1.05
- Headings: 1.1–1.2
- Body: 1.6–1.65
- UI/Metadata: 1.4–1.5

### Tracking
- Display: -0.025em to -0.03em
- Headings: -0.015em to -0.02em
- Body: 0
- UI/Metadata: +0.02em to +0.06em (uppercase)
- Mono: 0

---

## Hierarchy Levels

| Level | Size | Weight | Line-Height | Use Case |
|-------|------|--------|-------------|----------|
| Display | clamp(4.5rem, 9vw, 8.5rem) | 700 | 1.02 | Hero name |
| H1 | clamp(3rem, 6vw, 5rem) | 700 | 1.05 | Page titles |
| H2 | clamp(2rem, 4.5vw, 3.5rem) | 700 | 1.12 | Section titles |
| H3 | 1.75rem (--text-2xl) | 700 | 1.2 | Subsection |
| H4 | 1.375rem (--text-xl) | 600 | 1.3 | Card titles |
| Body | 1rem (--text-base) | 400 | 1.65 | Paragraphs |
| Lead | 1.125rem (--text-lg) | 400 | 1.6 | Intro paragraphs |
| Small | 0.875rem (--text-sm) | 400 | 1.5 | Secondary text |
| Metadata | 0.75rem (--text-xs) | 500 | 1.4 | Labels, tags |
| Micro | 0.6875rem (--text-2xs) | 500 | 1.3 | Timestamps, captions |

---

## Responsive Scaling

- Use `clamp(min, preferred, max)` for fluid scaling
- Minimum readable: 16px body on mobile
- Maximum measure: 65-75ch for body text
- Heading scale compresses on mobile (less dramatic)

---

## Evaluation Checklist

### Scale
- [ ] Clear distinction between levels
- [ ] No two levels too similar
- [ ] Scale serves hierarchy, not ego

### Rhythm
- [ ] Vertical rhythm consistent
- [ ] Headings have space above/below
- [ ] Paragraphs don't merge

### Measure
- [ ] Body text 45-75ch
- [ ] Narrow columns for metadata
- [ ] No full-width paragraphs on desktop

### Contrast
- [ ] Weight contrast between levels
- [ ] Color contrast WCAG AA
- [ ] Size contrast meaningful

### Readability
- [ ] Line-height appropriate for measure
- [ ] Tracking not too tight/loose
- [ ] Mono for technical specs, code, data

### Responsiveness
- [ ] Mobile: base 16px, comfortable measure
- [ ] Tablet: intermediate scaling
- [ ] Desktop: full scale, generous whitespace

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Oversized display for fashion | Size to content importance |
| Too many font sizes | Consolidate to scale |
| Tight line-height on body | 1.6+ for reading |
| Loose tracking on body | 0 or slightly negative |
| All-caps body text | Never |
| Mono for body | Sans for reading |
| Inconsistent heading spacing | Systematize margins |

---

## Technical Labels

Use mono (`--font-mono`) for:
- Version numbers
- Specifications
- Code snippets
- Data values
- Coordinates
- Technical tags
- File paths

Use sans for:
- All reading text
- UI labels
- Navigation
- Button text
- Headings

---

## Font Loading

- System fonts first (no layout shift)
- Inter as fallback (Google Fonts, preconnect)
- JetBrains Mono for mono (preconnect)
- `font-display: swap`
- Subset if self-hosting
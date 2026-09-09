# Agent Skills Reference

This directory contains the design intelligence system for the robotics
engineering portfolio. Each skill encapsulates a domain of expertise that
future agents should consult when making design decisions.

---

## Skill Index

### Core Authority

| Skill | Purpose | When to Consult |
|-------|---------|-----------------|
| **design-director** | Senior design authority — decides what/why/how/what to remove | Every design decision, especially new features or major changes |
| **taste** | Ruthless visual quality filter — rejects technically-correct-but-weak work | Before presenting any visual output; continuous self-check |
| **design-critique** | Mandatory 18-step critique process | Before AND after every significant implementation |

### Visual Design

| Skill | Purpose | When to Consult |
|-------|---------|-----------------|
| **visual-art-direction** | Composition, palette, materiality, atmosphere, coherence | Any visual system change: color, typography, imagery, layout |
| **typography** | Type as structure: hierarchy, scale, rhythm, measure | Text changes, new text elements, responsive type |
| **robotics-visual-language** | Robotics concepts as visual language without clichés | Any robotics-themed visual element |
| **spatial-design** | SpatialField behavior, physics, morph targets, grid | Any SpatialField modification |

### Interaction & Motion

| Skill | Purpose | When to Consult |
|-------|---------|-----------------|
| **interaction-design** | Affordance, feedback, states, keyboard, touch | New interactive elements, state changes, navigation |
| **motion-design** | Purposeful animation: easing, timing, continuity, reduced-motion | Any new animation, transition, scroll effect |

### Engineering Quality

| Skill | Purpose | When to Consult |
|-------|---------|-----------------|
| **frontend-quality** | Astro-native, semantic HTML, minimal dependencies | Technology choices, component architecture, new packages |
| **performance** | Frame budget, CPU/GPU, memory, mobile, hydration | SpatialField changes, animation additions, asset strategy |
| **accessibility** | Semantic HTML, keyboard, contrast, reduced-motion, ARIA | Every interactive element, motion, content structure |
| **responsive-design** | Mobile-first composition, touch targets, breakpoints | Layout changes, new components, breakpoint decisions |

### Content & Strategy

| Skill | Purpose | When to Consult |
|-------|---------|-----------------|
| **portfolio-storytelling** | Engineering narrative: problem → evidence → lessons | Project pages, case studies, homepage structure |
| **evidence-driven-design** | Skills as evidence collections, not tags | Skills section, project evidence, new capabilities |

---

## Skill Hierarchy (Conflict Resolution)

```
┌─────────────────────────────────────┐
│        DESIGN DIRECTOR              │  ← Final authority
├─────────────────────────────────────┤
│  TASTE  │  DESIGN CRITIQUE          │  ← Veto power on quality
├─────────┼───────────────────────────┤
│ ACCESSIBILITY  │  PERFORMANCE       │  ← Non-negotiable floors
├────────────────┼────────────────────┤
│ FRONTEND QUALITY                   │  ← Architecture guardrails
├─────────────────────────────────────┤
│ VISUAL ART DIRECTION               │  ← Visual system owner
├─────────────────────────────────────┤
│ TYPOGRAPHY  │  SPATIAL DESIGN       │  ← Domain specialists
│ ROBOTICS VISUAL LANGUAGE            │
├─────────────────────────────────────┤
│ INTERACTION DESIGN  │  MOTION DESIGN│  ← Behavior specialists
├─────────────────────────────────────┤
│ RESPONSIVE DESIGN                   │  ← Cross-cutting
├─────────────────────────────────────┤
│ PORTFOLIO STORYTELLING              │  ← Content strategy
│ EVIDENCE-DRIVEN DESIGN              │  ← Evidence standards
└─────────────────────────────────────┘
```

**Rule**: When skills conflict, higher in hierarchy wins. Floors (accessibility, performance) are absolute.

---

## How to Use Skills

### For a New Feature Request

1. **Design Director** — What/Why/How/What to remove
2. **Taste** — Is this visually necessary? Does it feel generic?
3. **Portfolio Storytelling** — Does it serve the narrative?
4. **Evidence-Driven Design** — Can it be evidenced?
5. **Interaction Design** — How does it behave?
6. **Motion Design** — Does it need motion? What kind?
7. **Visual Art Direction** — How does it fit the visual system?
8. **Typography** — Text treatment?
9. **Robotics Visual Language** — Robotics concept integrity?
10. **Spatial Design** — SpatialField impact?
11. **Responsive Design** — Mobile composition?
12. **Accessibility** — Semantic, keyboard, contrast, reduced-motion?
13. **Frontend Quality** — Native solution? Dependency justified?
14. **Performance** — Budget impact?
15. **Design Critique** — Full 18-step process

### For a Bug Fix / Small Change

1. **Design Critique** — Quick pass (steps 1-4, 14-16)
2. **Relevant domain skill** — Check consistency

### For Code Review

1. **Design Critique** — Full process on the change
2. **Frontend Quality** — Astro patterns, dependencies
3. **Performance** — No regressions
4. **Accessibility** — No regressions

---

## Existing Skills (Retained)

| Skill | Status | Notes |
|-------|--------|-------|
| `animation` | Retained | Subsumed by motion-design + interaction-design |
| `web-design` | Retained | Subsumed by design-director + visual-art-direction + portfolio-storytelling |

These existing skills contain valuable principles but are superseded by the more granular new skills. Consult them for historical context.

---

## Anti-Generic Design Rule (Global)

**Never automatically use:**
- Glassmorphism
- Gradients
- Glowing borders
- Rounded cards
- Floating blobs
- Giant centered headings
- Excessive pills
- Fake dashboards
- Excessive particles
- Random 3D models
- Excessive shadows

**Only when they have a clear design reason documented in the decision.**

---

## Design Decision Framework (Global)

```
USER GOAL
    ↓
INFORMATION ARCHITECTURE
    ↓
HIERARCHY
    ↓
VISUAL FORM
    ↓
INTERACTION
    ↓
MOTION
    ↓
TECHNICAL IMPLEMENTATION
    ↓
ACCESSIBILITY
    ↓
PERFORMANCE
```

If a feature doesn't survive this funnel → recommend removing/simplifying.

---

## Quick Reference: Current Implementation Tokens

### Colors (from `global.css`)
```css
--bg: #F8F8F5
--bg-pure: #FAFAF8
--surface: #FFFFFF
--surface-dim: #F3F3F0
--text-primary: #111110
--text-body: #1F1F1D
--text-secondary: #4B4B47
--text-muted: #6B7280
--text-dim: #9CA3AF
--cyan: #0EA5E9
--cyan-dark: #0369A1
--border: #E2E2DE
--border-subtle: #EAEAE6
--border-strong: #C8C8C3
```

### Spacing
```css
--space-1: 0.25rem  --space-8: 2rem
--space-2: 0.5rem   --space-10: 2.5rem
--space-3: 0.75rem  --space-12: 3rem
--space-4: 1rem     --space-16: 4rem
--space-5: 1.25rem  --space-20: 5rem
--space-6: 1.5rem   --section-pad: clamp(6rem, 11vh, 9.5rem)
```

### Motion
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)
--dur-fast: 150ms
--dur-norm: 240ms
--dur-slow: 450ms
```

### Radii
```css
--r-xs: 4px
--r-sm: 8px
--r-md: 12px
--r-card: 20px
--r-card-lg: 24px
--r-pill: 9999px
```

### Shadows
```css
--shadow-resting: 0 2px 10px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.03)
--shadow-hover: 0 12px 32px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)
--shadow-elevated: 0 20px 48px -10px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.03)
```

---

## File Locations

```
.agents/skills/
├── design-director/
├── taste/
├── interaction-design/
├── motion-design/
├── visual-art-direction/
├── typography/
├── spatial-design/
├── responsive-design/
├── accessibility/
├── frontend-quality/
├── performance/
├── robotics-visual-language/
├── portfolio-storytelling/
├── evidence-driven-design/
├── design-critique/
├── animation/          (existing)
└── web-design/         (existing)
```

---

## Maintenance

- Update skills when design system evolves
- Add new skills for new domains
- Remove deprecated skills
- Keep this README current
- Run Design Critique on skill changes
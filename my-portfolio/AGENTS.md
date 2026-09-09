## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design Intelligence System

This project includes a comprehensive agent skill system in `.agents/skills/`.
Consult the relevant skill before making design decisions.

### Skill Index

| Skill | Purpose | Consult When |
|-------|---------|--------------|
| `design-director` | Senior design authority — what/why/how/what to remove | Every design decision |
| `taste` | Ruthless visual quality filter | Before presenting visual output |
| `design-critique` | Mandatory 18-step critique process | Before AND after implementation |
| `visual-art-direction` | Composition, palette, atmosphere, coherence | Visual system changes |
| `typography` | Type hierarchy, scale, rhythm, measure | Text changes |
| `robotics-visual-language` | Robotics concepts as visual language | Robotics-themed elements |
| `spatial-design` | SpatialField behavior, physics, morph targets | SpatialField modifications |
| `interaction-design` | Affordance, feedback, states, keyboard, touch | New interactive elements |
| `motion-design` | Purposeful animation, easing, reduced-motion | New animations/transitions |
| `responsive-design` | Mobile-first composition, breakpoints | Layout changes |
| `accessibility` | Semantic HTML, keyboard, contrast, reduced-motion | Every interactive element |
| `frontend-quality` | Astro-native, semantic HTML, minimal dependencies | Technology choices |
| `performance` | Frame budget, CPU/GPU, mobile, hydration | Animation/asset changes |
| `portfolio-storytelling` | Engineering narrative: problem→evidence→lessons | Project pages, case studies |
| `evidence-driven-design` | Skills as evidence collections, not tags | Skills section, evidence |

### Skill Hierarchy (Conflict Resolution)

```
DESIGN DIRECTOR (final authority)
├── TASTE + DESIGN CRITIQUE (veto on quality)
├── ACCESSIBILITY + PERFORMANCE (non-negotiable floors)
├── FRONTEND QUALITY (architecture guardrails)
├── VISUAL ART DIRECTION (visual system owner)
├── TYPOGRAPHY + SPATIAL DESIGN + ROBOTICS VISUAL LANGUAGE (domain)
├── INTERACTION DESIGN + MOTION DESIGN (behavior)
├── RESPONSIVE DESIGN (cross-cutting)
└── PORTFOLIO STORYTELLING + EVIDENCE-DRIVEN DESIGN (content)
```

### Anti-Generic Design Rule

Never automatically use: glassmorphism, gradients, glowing borders, rounded cards,
floating blobs, giant centered headings, excessive pills, fake dashboards,
excessive particles, random 3D models, excessive shadows.

Only when they have a clear design reason.

### Design Decision Framework

```
USER GOAL → INFORMATION ARCHITECTURE → HIERARCHY → VISUAL FORM
→ INTERACTION → MOTION → TECHNICAL IMPLEMENTATION → ACCESSIBILITY → PERFORMANCE
```

If a feature doesn't survive this funnel → recommend removing/simplifying.

---

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

### Internal References

- Design System: `docs/DESIGN_SYSTEM.md`
- Skills Reference: `.agents/skills/README.md`
- Portfolio Audit: `.agents/plans/portfolio-audit.md`
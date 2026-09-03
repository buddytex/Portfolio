# Recommended Tech Stack — Robotics Engineering Portfolio

| Layer | Technology | Why |
| --- | --- | --- |
| **Framework** | **Astro 7** | Fast static portfolio, excellent page performance |
| **Language** | **TypeScript** | Type safety and maintainability |
| **UI** | **Astro Components** | Keep most of the site lightweight |
| **Styling** | **CSS / CSS Modules** | Precise control over the visual system |
| **Animation** | **GSAP** | Complex timeline, scroll, hover and entrance animations |
| **Scroll animation** | **GSAP ScrollTrigger** | Scroll-driven project presentations |
| **Smooth scrolling** | **Lenis** | Premium-feeling scrolling |
| **3D** | **Three.js** | Only where 3D genuinely improves the robotics presentation |
| **3D integration** | **@react-three/fiber** *(optional)* | Use only if the 3D section becomes complex |
| **Icons** | **Lucide** | Clean, consistent SVG icons |
| **Fonts** | **Inter + Space Grotesk** | Technical/modern visual language |
| **Images** | Astro assets pipeline | Optimized static images |
| **Diagrams** | **SVG** | Ideal for LiDAR, ROS, sensor and architecture visuals |
| **Interaction** | **Vanilla TypeScript** | Avoid unnecessary frontend framework overhead |
| **Content** | **Astro content collections** | Projects/research can become structured data |
| **Validation** | **Zod** | Validate project/content schemas |
| **Package manager** | **npm** | Keep the existing project simple |
| **Version control** | **Git + GitHub** | Already established |
| **Deployment** | **GitHub Pages** | Free static hosting |
| **CI/CD** | **GitHub Actions** | Automatic build/deployment |
| **Local AI coding** | **Ollama + Qwen2.5-Coder 7B** | Local coding assistance |
| **AI agent orchestration** | **Antigravity / Claude / Gemini** | Use whichever agent is available for implementation |

---

## The Important Part: Don't Install Everything

We do not turn the portfolio into a giant React/Next.js/Three.js application.

The ideal architecture is:

```text
                    PORTFOLIO
                        │
                 ┌──────┴──────┐
                 │    Astro    │
                 └──────┬──────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
        Astro          CSS        TypeScript
      Components
          │             │             │
          └─────────────┼─────────────┘
                        │
                    Animation
                        │
                 GSAP + ScrollTrigger
                        │
                 ┌──────┴──────┐
                 │             │
               Lenis        SVG/Canvas
                 │             │
                 └──────┬──────┘
                        │
                   Optional 3D
                        │
                    Three.js
```

---

## Specific Portfolio Animation & Architecture Guidelines

Make **GSAP the primary animation engine** (or high-performance vanilla JS/SVG/Canvas where appropriate):

Use it for:
* Hero entrance sequence
* Navigation transitions
* Project-card reveals
* Text splitting/reveals
* Horizontal project galleries
* Scroll-linked animations
* LiDAR visualization
* Robot movement
* Skill visualization
* Hover interactions
* Page transitions
* Micro-interactions

Then use **Three.js only for one or two flagship experiences**, rather than making the entire website 3D.

For example:
* **Hero:** 2D/SVG/Canvas robotic visualization
* **Projects:** GSAP/Scroll-driven storytelling
* **LiDAR project:** animated point cloud/SVG/Canvas
* **ROS project:** animated system architecture
* **Flagship project:** interactive 3D robot

This will look significantly more professional than throwing Three.js everywhere.

---

## Suggested `package.json` Direction

Eventually expect something roughly like:

```json
{
  "dependencies": {
    "astro": "^7.2.0",
    "gsap": "^3.0.0",
    "lenis": "^1.0.0",
    "lucide-astro": "^0.0.0"
  }
}
```

And **only if we actually need it**:

```json
{
  "dependencies": {
    "three": "^0.0.0"
  }
}
```

Do **not** add React yet. If a future 3D component genuinely benefits from React Three Fiber, then add React at that point.

---

## Core Constraint

> **Do not introduce a framework or dependency unless there is a concrete requirement for it. Prefer Astro + TypeScript + CSS + GSAP + SVG. Keep the site static, fast, accessible, responsive, and deployable to GitHub Pages. Use Three.js only for a clearly justified interactive 3D experience.**

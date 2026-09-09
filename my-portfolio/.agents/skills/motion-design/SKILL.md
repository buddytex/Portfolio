# Motion Design Skill

## Purpose

Design motion with purpose. Every animation must answer: WHY is this
moving? WHAT relationship does it communicate? WHAT should the user
understand?

---

## Mandatory Questions

Before adding ANY motion:

1. **Why is this moving?**
2. **What relationship does the movement communicate?**
3. **What should the user understand from it?**
4. **Does it enhance the static design or rescue bad design?**

If no clear answer → REMOVE.

---

## Valid Purposes

- Entrance/exit (viewport)
- Hierarchy establishment
- System state communication
- Information connection
- Interaction feedback
- Robotics data representation
- State transitions
- Spatial orientation
- Progressive disclosure

---

## Invalid Purposes

- "It looks cool"
- "Other portfolios have it"
- "The library makes it easy"
- Filling empty space
- Distracting from weak content
- Demonstrating technical capability

---

## Motion Vocabulary

### Continuity
- Elements transform rather than appear/disappear
- Shared axis, color, shape between states
- Exit and entrance choreographed together

### Transformation
- Morphing between states
- Scale, position, opacity, shape
- Not replacement

### Interpolation
- Smooth value changes
- Not hard cuts
- Respects physics

### Easing
| Use Case | Easing |
|----------|--------|
| Entrance | ease-out (cubic-bezier(0.16, 1, 0.3, 1)) |
| Exit | ease-in |
| State change | ease-in-out |
| Physical feel | custom spring (0.175, 0.885, 0.32, 1.275) |
| Robotics/precise | sharper, less bounce |

### Velocity & Inertia
- Consistent velocity across related elements
- Mass affects acceleration
- Spring-back feels physical

### Spatial Relationships
- Elements move in relation to each other
- Parent/child coordination
- Z-depth preserved

### Progressive Disclosure
- Reveal on demand
- Not time-gated
- User-controlled pace

---

## Timing Guidelines

| Type | Duration |
|------|----------|
| Micro-feedback (hover, focus) | 100-200ms |
| State transitions | 200-400ms |
| Section entrance | 400-600ms |
| Page/major transition | 500-800ms |
| Scroll-linked | Continuous, frame-rate tied |

**Rule**: Content usable immediately. Animation enhances, doesn't gate.

---

## Scroll Animation

Valid uses:
- Project storytelling
- Technical diagrams
- Progressive reveals
- Timeline progression
- System architecture
- Spatial field morphing

Invalid:
- Every element on scroll
- Parallax for decoration
- Reveals that delay reading
- Animations that fight scroll

---

## Staggering

Use when establishing relationships:
- Sequential system components
- Related metadata
- Navigation items

Avoid:
- Large delays (>100ms/item)
- Staggering unrelated elements
- Making page feel slow

---

## Robotics Visualization Motion

May represent:
- LiDAR sweep
- Trajectory playback
- Sensor fusion
- State machine transitions
- Coordinate frame transforms
- Path planning

Must NOT:
- Imply capabilities the project lacks
- Fabricate sensor data
- Fake performance metrics
- Unlabeled illustrative data

---

## Performance Requirements

Animate only:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (sparingly)

Avoid animating:
- `width`, `height`
- `top`, `left`, `bottom`, `right`
- `box-shadow` (expensive)
- `border-radius` (layout)
- Any layout-triggering property

Use:
- `requestAnimationFrame` for canvas
- `will-change` sparingly
- Passive event listeners
- `IntersectionObserver` for scroll

---

## Reduced Motion

**ALWAYS SUPPORT**:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

JavaScript:
```javascript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  // Disable JS animations, show end state immediately
}
```

Test with: System Settings → Accessibility → Reduce Motion

---

## Anti-Patterns

- Constant floating/idle animation
- Random particle systems
- Excessive parallax
- Bouncing/elastic everywhere
- Unnecessary reveal animations
- Slow animations (>800ms) without user control
- Animation on every element
- Motion that causes nausea
- Animations that block interaction
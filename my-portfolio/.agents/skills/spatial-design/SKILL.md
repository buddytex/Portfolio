# Spatial Design Skill

## Purpose

Specifically for the existing SpatialField — the site-wide point cloud
perception field. Understand it as a visual identity element integrated
into the entire website, not a dashboard or decorative box.

---

## Current Implementation (Reference)

- **Canvas**: Fixed position, full viewport, z-index 0, pointer-events none
- **Particles**: 320 desktop / 120 mobile
- **Physics**: Spring-damper (SPRING=0.035, DAMP=0.87)
- **Cursor**: Repulsion radius 180px desktop, force 5.5
- **Grid**: 50px spacing, cursor-responsive displacement + spring-back
- **Mesh**: Connection lines between nearby points (65px threshold)
- **Morph Targets**: 5 sections with distinct spatial configurations
- **Reduced Motion**: Animation pauses, static fallback

---

## Core Concept

The cursor represents an object interacting with a spatial perception field.

### Valid Responses
- Local displacement (repulsion)
- Attraction (if conceptually justified)
- Depth deformation (z-axis)
- Velocity response (faster cursor = stronger field)
- Spring-back to equilibrium
- Grid line displacement

### Invalid Representations
- Fake LiDAR scan lines rotating
- Scanning UI sweeps
- Telemetry readouts
- Coordinate displays
- "Sensor data" overlays
- Dashboard panels
- Fake HUD elements

---

## Section Morph Targets

| Section | Scroll Range | Spatial Behavior |
|---------|--------------|------------------|
| Hero | 0–0.18 | Cloud frames name + video right, subtle grid |
| Work | 0.18–0.45 | Fans laterally, grid intensifies |
| Skills | 0.45–0.70 | Condenses to matrix, grid peaks |
| About | 0.70–0.88 | Softens, grid recedes |
| Contact | 0.88–1.0 | Ambient constellation, minimal grid |

---

## Grid Behavior

The coordinate grid is spatial, not decorative:
- Lines displaced by cursor (repulsion)
- Spring-back to grid positions
- Intensity tied to section
- Subtle center crosshair in Hero only
- Fades completely in Contact

---

## Particle Behavior

- Organic drift (sin/cos wave per particle)
- Depth layering (alpha by z-position)
- Cyan accent particles (18%) for highlights
- Perspective projection (focal length 400)
- Mesh lines between spatial neighbors

---

## Performance Constraints

- 60fps desktop, 30fps+ mobile
- Particle count scales with viewport
- `requestAnimationFrame` only
- Passive scroll listeners
- No layout thrashing
- Canvas cleared/redrawn each frame
- Reduced motion: static frame

---

## Integration Rules

1. **Never in a container** — Full viewport, behind content
2. **Never obstructs content** — Low alpha, pointer-events none
3. **Respects content hierarchy** — Morph targets serve section purpose
4. **Continuous across sections** — No hard resets
5. **Cursor influence global** — Works everywhere, not just Hero

---

## Evolution Guidelines

When modifying SpatialField:

1. Preserve physics integrity (spring-damper)
2. Maintain section morph continuity
3. Keep cursor response physical
4. Grid stays spatial, not decorative
5. Performance budget: <5ms/frame desktop
6. Test reduced motion
7. Test mobile (lower particle count)

---

## Anti-Patterns

- Turning it into a "LiDAR visualizer" with fake data
- Adding scan lines that serve no purpose
- Making it a background for a card/dashboard
- Fake coordinate readouts
- Particle count that kills mobile performance
- Hard cuts between sections
- Cursor response that feels "gamey"
- Color shifts that imply state changes that don't exist
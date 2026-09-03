# Animation Skill

## Purpose

Create purposeful, performant, accessible animation for the robotics
engineering portfolio.

Animation should strengthen storytelling, hierarchy, and interaction.
It must never exist merely because an effect looks impressive.

---

## 1. Animation Hierarchy

Prefer animation in this order:

1. CSS transitions
2. CSS keyframes
3. Web Animations API
4. Small custom JavaScript
5. Anime.js / GSAP when complexity justifies it
6. WebGL / Three.js only when the visual result genuinely requires it

Do not introduce a library for an effect that CSS can handle.

---

## 2. Animation Principles

Every animation should have:

- purpose
- trigger
- duration
- easing
- appropriate visual weight

Ask:

> What does this animation communicate?

Valid answers include:

- entering the viewport
- establishing hierarchy
- showing system state
- connecting two pieces of information
- showing interaction
- representing robotics data
- transitioning between states

If there is no clear answer, remove the animation.

---

## 3. Timing

Use short animations for interface feedback.

Use longer animations only for:

- page transitions
- major hero sequences
- storytelling
- large spatial transformations

Avoid making users wait for content.

Content should normally become usable immediately.

---

## 4. Easing

Use easing deliberately.

Prefer:

- ease-out for entrances
- ease-in for exits
- ease-in-out for state changes
- custom easing when it improves the physical feeling

Avoid excessive elastic or bouncing effects.

Robotics-oriented interfaces should generally feel precise rather
than playful.

---

## 5. Scroll Animation

Scroll animation can be used for:

- project storytelling
- technical diagrams
- progressive reveals
- timeline progression
- system architecture
- LiDAR visualization
- telemetry
- image transitions

Avoid attaching scroll animation to every element.

A page should still make sense when animations are disabled.

---

## 6. Staggering

Use staggered animation when it establishes relationships between
elements.

Good examples:

- project metadata
- navigation items
- technical specifications
- sequential system components

Avoid large stagger delays that make the page feel slow.

---

## 7. Robotics Visualization

Animation may represent real engineering concepts such as:

- LiDAR rays
- robot trajectories
- coordinate frames
- sensor measurements
- navigation paths
- SLAM maps
- perception bounding boxes
- telemetry
- state machines

The visualization must not imply technical behavior that the actual
project does not have.

Never fabricate sensor data or performance results.

If data is illustrative, label it as illustrative.

---

## 8. Microinteractions

Useful microinteractions include:

- button state transitions
- link indicators
- navigation feedback
- image hover states
- cursor interactions
- project-card transitions
- expandable technical information

Keep them subtle.

Microinteractions should not compete with primary content.

---

## 9. Performance

Animation should remain performant.

Prefer animating:

- transform
- opacity

Be careful with:

- width
- height
- top
- left
- box-shadow
- filters

Avoid unnecessary layout thrashing.

Use:

```javascript
requestAnimationFrame

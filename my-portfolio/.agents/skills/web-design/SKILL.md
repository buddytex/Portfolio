# Web Design Skill

## Purpose

Design and evaluate high-quality portfolio websites with a strong visual
identity, clear information hierarchy, excellent interaction design, and
professional implementation.

This skill is specifically intended for a robotics engineer portfolio.

The goal is not to make the website merely "look cool."

The goal is to communicate engineering ability through visual design,
interaction, technical storytelling, and polished execution.

---

## 1. Design Before Implementation

Never immediately modify the website when given a vague design request.

First:

1. Inspect the existing project.
2. Understand the current structure.
3. Identify the purpose of each page and section.
4. Identify existing reusable components.
5. Identify existing visual patterns.
6. Determine what should be preserved.
7. Determine what should be redesigned.
8. Form a coherent design direction.
9. Only then implement.

Do not redesign unrelated parts of the application without justification.

---

## 2. Visual Identity

The portfolio should communicate:

- Robotics engineering
- Autonomous systems
- Technical depth
- Research orientation
- Hardware/software integration
- Precision
- Curiosity
- Experimental engineering

The visual language should feel technical and modern without becoming
a stereotypical "AI futuristic website."

Avoid relying on:

- Generic purple/blue gradients
- Excessive glassmorphism
- Generic glowing cards
- Excessive rounded containers
- Stock imagery
- Artificial-looking 3D elements
- Random particles
- Decorative animations with no purpose

Visual effects must support the identity and content.

---

## 3. Information Hierarchy

Every page must have a clear hierarchy.

A visitor should quickly understand:

1. Who I am
2. What I specialize in
3. What I have built
4. How technically capable I am
5. What kind of engineering/research work interests me
6. How to contact me

Use typography, spacing, composition, scale, contrast, and motion to
communicate hierarchy.

Do not make every element visually dominant.

---

## 4. Portfolio Storytelling

Projects should be presented as engineering case studies rather than
simple project cards.

Where appropriate, communicate:

- Problem
- Objective
- System architecture
- Hardware
- Software
- Algorithms
- Engineering decisions
- Challenges
- Results
- Demonstrations
- Lessons learned

Prefer evidence over claims.

For example:

Weak:

> Advanced autonomous robot.

Strong:

> Differential-drive mobile robot using ROS 2, LiDAR-based perception,
> autonomous navigation, and real-time anomaly detection.

Never invent technical specifications, metrics, achievements, or results.

---

## 5. Layout

Layouts should have intentional composition.

Consider:

- asymmetric layouts
- large visual anchors
- strong whitespace
- technical diagrams
- project imagery
- code/telemetry-inspired elements
- responsive grids
- horizontal scrolling where appropriate
- full-screen sections when justified

Do not force every section into identical cards.

Repetition should create consistency, not monotony.

---

## 6. Typography

Typography should establish a clear hierarchy.

Use a limited number of typefaces.

Define deliberate levels for:

- Display headings
- Section headings
- Body text
- Metadata
- Technical labels
- Navigation
- Buttons

Avoid excessive font-size variation.

Typography must remain readable on mobile.

---

## 7. Color

Create a deliberate color system.

Define:

- background
- foreground
- secondary text
- borders
- accent
- interactive states
- status/information colors

Color should communicate hierarchy and state.

Do not use many unrelated accent colors.

---

## 8. Animation

Animation should communicate structure, state, or interaction.

Good candidates include:

- page transitions
- section reveals
- scroll-based storytelling
- SVG path animation
- technical diagrams
- LiDAR visualization
- telemetry-style animations
- project image transitions
- magnetic interactions
- subtle cursor interactions
- controlled parallax
- progressive content reveals

Avoid:

- animation on every element
- excessive bouncing
- distracting infinite loops
- animations that delay content
- motion that makes navigation difficult

Animation should never be necessary to understand the content.

---

## 9. Interaction

Interactive elements must provide feedback.

Buttons, links, navigation, project cards, images, and controls should
communicate:

- hover
- focus
- active
- loading
- disabled
- selected

Do not create interactions merely because they are technically possible.

Every interaction should have a reason.

---

## 10. Responsive Design

Design mobile behavior intentionally.

Do not simply shrink the desktop layout.

Consider:

- content priority
- navigation
- touch targets
- typography
- animation complexity
- image sizes
- horizontal overflow
- interaction alternatives

Test at:

- mobile
- tablet
- laptop
- large desktop

---

## 11. Accessibility

Maintain:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- meaningful alt text
- accessible links and buttons
- reduced-motion support

Animations must respect:

```css
prefers-reduced-motion

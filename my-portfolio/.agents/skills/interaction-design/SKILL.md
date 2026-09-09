# Interaction Design Skill

## Purpose

Design interactions that communicate affordance, cause, effect, feedback,
continuity, and hierarchy. Every interaction must be deliberate.

---

## Core Principles

### Affordance
- Interactive elements must look interactive
- Non-interactive elements must not look interactive
- Visual cues: shape, color, depth, motion, cursor

### Cause & Effect
- User action → immediate, visible response
- The relationship must be obvious
- No mystery interactions

### Feedback
- Hover: "I can interact with this"
- Focus: "I am here" (keyboard)
- Active: "I am being acted upon"
- Loading: "Work is happening"
- Success/Error: "Result"

### Continuity
- State changes should transition, not jump
- Related elements should move together
- Spatial relationships preserved

### Hierarchy
- Primary actions visually dominant
- Secondary actions subordinate
- Destructive actions distinct

---

## Interaction States

### Buttons / CTAs
| State | Requirement |
|-------|-------------|
| Default | Clear affordance, readable label |
| Hover | Elevation, color shift, cursor change |
| Focus | Visible ring (2px, cyan, 2px offset) |
| Active | Pressed depth, immediate |
| Loading | Spinner, disabled, label "Loading…" |
| Disabled | 40% opacity, not-focusable |

### Links
| State | Requirement |
|-------|-------------|
| Default | Underline or color distinction |
| Hover | Color shift, underline if not default |
| Focus | Visible ring |
| Active | Color shift |
| Visited | Distinct color |

### Navigation
- Current page indicated (not just hover)
- Keyboard navigable
- Mobile drawer: trap focus, ESC to close

### Cards
- Hover: subtle elevation, border color shift
- Focus: ring on container
- Click: navigate or expand
- No "card flip" gimmicks

### Forms
- Label always visible
- Error: inline, specific, color + icon
- Success: subtle confirmation
- Autocomplete supported

### Images / Media
- Hover: subtle scale or overlay
- Click: expand/lightbox if justified
- Loading: skeleton or blur-up

---

## Keyboard Interaction

- Tab order = visual order
- Focus visible ALWAYS
- Skip links for main content
- Arrow keys for tabbed interfaces
- ESC closes modals/drawers
- Enter/Space activates

---

## Touch Interaction

- Minimum 44×44px touch targets
- No hover-only functionality
- Active states on touch
- Swipe for carousels if used
- No double-tap requirements

---

## Principles from Modern Interaction Design

### Restraint
- Fewer, better interactions
- No interaction theater

### Timing
- 100-200ms for micro-feedback
- 200-400ms for state transitions
- 400-600ms for major transitions

### Continuity
- Elements don't teleport
- Shared axis transitions
- Exit/entrance choreography

### Spatial Consistency
- Interactions follow spatial logic
- A card expands from its position
- A drawer slides from its edge

### Interruption
- User can interrupt animations
- No forced waits
- Immediate response to new input

### Responsiveness
- 100ms budget for feedback
- Optimistic UI where possible
- Perceived performance > actual

### Physicality
- Mass, velocity, easing feel real
- Not floaty, not mechanical
- Spring-damper for natural feel

---

## Anti-Patterns

- Hover effects on mobile
- Focus rings removed
- Links that don't look like links
- Buttons that don't look like buttons
- Interactions that delay navigation
- Surprise behaviors
- "Delightful" animations that annoy on repeat
- Custom cursors that break OS behavior
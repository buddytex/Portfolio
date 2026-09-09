# Responsive Design Skill

## Purpose

Treat mobile as a first-class design problem. Never simply shrink desktop.
Evaluate composition, hierarchy, touch targets, typography, spacing,
animation, point-cloud density, performance, navigation, and interaction
at every breakpoint.

---

## Breakpoints (from implementation)

| Breakpoint | Range | Focus |
|------------|-------|-------|
| Mobile | < 640px | Single column, touch-first |
| Tablet | 640–1024px | Transitional, 2-col where appropriate |
| Desktop | 1024–1440px | Full layout, hover states |
| Large | > 1440px | Max-width constrained, generous space |

---

## Composition Changes

### Hero
- **Desktop**: 2-column (1.2fr / 0.8fr), name left, video right
- **Tablet**: Stacked, video below name, full width
- **Mobile**: Stacked, video 320px max height, name compressed

### Project Index
- **Desktop**: 2-column grid
- **Tablet/Mobile**: 1-column, full width cards

### Skills Evidence
- **Desktop**: 2-column (0.82fr / 1.18fr), sticky evidence panel
- **Tablet/Mobile**: Stacked, panel static

### About
- **Desktop**: 2-column (1fr / 1.15fr), sticky bio
- **Tablet/Mobile**: Stacked, bio static

### Contact
- **Desktop**: 2-column (1.15fr / 0.85fr)
- **Tablet/Mobile**: Stacked

### Navigation
- **Desktop**: Horizontal links + actions
- **Mobile**: Hamburger → full-screen drawer

---

## Touch Targets

- Minimum 44×44px (Apple HIG) / 48×48px (Material)
- All interactive elements
- No hover-only functionality
- Active states visible on touch

---

## Typography

- Base: 16px minimum on mobile
- Scale compresses: display less dramatic
- Measure: 90% viewport width max
- Line-height maintained

---

## Spacing

- Section padding: `clamp(3rem, 6vh, 5rem)` mobile
- Container: `min(100% - 32px, 1280px)` mobile
- Generous but not wasteful

---

## Animation

- Reduce particle count (120 vs 320)
- Disable mesh lines on mobile
- Simplify hover → active/tap
- Shorter durations where appropriate
- Respect `prefers-reduced-motion`

---

## SpatialField

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| Particles | 320 | 120 |
| Grid spacing | 50px | 60px |
| Mesh lines | Yes (65px) | No |
| Cursor repulsion | 180px / 5.5 | 100px / 3.0 |
| Grid cursor response | Yes | No (performance) |

---

## Navigation

- Desktop: Persistent, scroll shadow
- Mobile: Drawer, trap focus, ESC closes
- Touch-friendly link sizes in drawer
- Logo always accessible

---

## Images / Media

- Responsive images (srcset, sizes)
- Hero video: max-height constrained
- Project cards: aspect-ratio maintained
- No horizontal overflow

---

## Testing Checklist

- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 12/13/14)
- [ ] 430px (iPhone 14 Pro Max)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro / laptop)
- [ ] 1440px (desktop)
- [ ] 1920px (large desktop)
- [ ] Landscape mobile
- [ ] Touch interaction
- [ ] Keyboard navigation
- [ ] Screen reader
- [ ] Reduced motion
- [ ] Slow 3G throttle

---

## Anti-Patterns

- Horizontal scroll on mobile
- Text < 16px
- Touch targets < 44px
- Hover-only interactions
- Desktop layout squished
- Same particle count mobile
- Fixed positioning breaking viewport
- Navigation unusable on touch
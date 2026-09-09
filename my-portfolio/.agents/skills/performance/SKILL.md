# Performance Skill

## Purpose

The portfolio contains a persistent spatial visual system (SpatialField).
Evaluate and maintain: animation frame rate, CPU/GPU usage, memory,
mobile performance, event listener efficiency, resize handling, scroll
handling, canvas/SVG complexity, particle count, layout thrashing,
unnecessary hydration.

---

## Current Performance Profile

### SpatialField
- **Desktop**: 320 particles, 60fps target, ~3-4ms/frame
- **Mobile**: 120 particles, 30fps+ target, ~5-6ms/frame
- **Canvas**: Full viewport, cleared/redrawn each frame
- **RAF loop**: Continuous when not reduced-motion
- **Event listeners**: scroll (passive), mousemove (passive), resize (passive)

### Page Weight (Estimated)
- HTML: ~15kB
- CSS: ~12kB (gzipped)
- JS: ~8kB (gzipped, mostly inline)
- Fonts: ~45kB (Inter + JetBrains Mono, subsetted)
- Total: < 100kB before images

### Hydration
- Zero client-side JS by default
- Only inline scripts for:
  - Scroll progress bar
  - IntersectionObserver reveals
  - Smooth scroll anchors
  - Section progress CSS props
  - SpatialField (canvas)
  - Skills tab switching
  - Email copy
  - Mobile nav toggle

---

## Optimization Strategies

### Animation Frame Rate
- Animate only `transform` and `opacity`
- `will-change` only on actively animating elements
- `requestAnimationFrame` for canvas (not `setInterval`)
- Batch DOM reads/writes
- Avoid forced synchronous layout

### CPU/GPU Usage
- Particle count scales with viewport
- Mesh lines: desktop only, nearest neighbors only
- Grid lines: simple stroke, no gradients
- Reduced motion: RAF loop exits

### Memory
- Particle array pre-allocated, reused
- No object creation in RAF loop
- Grid lines pre-allocated
- Event listeners: passive, removed on cleanup (if SPA)

### Event Listener Efficiency
```javascript
// Good: passive, batched
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('mousemove', onMouseMove, { passive: true });

// Debounce resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resize, 150);
}, { passive: true });
```

### Scroll Handling
- Passive listeners
- Throttled via RAF or `IntersectionObserver`
- CSS `scroll-behavior: smooth` for anchor links
- Scroll progress bar: transform only

### Canvas Complexity
- `clearRect` full canvas each frame
- Batch draw calls (single path for particles)
- Mesh lines: early exit on distance
- `ctx.save()`/`restore()` minimal

### Particle Count
- Desktop: 320 (tunable)
- Mobile: 120 (auto-detected via viewport)
- Reduced motion: 0 (static frame)

### Layout Thrashing
- Never read layout after write in same frame
- Use `transform` not `top/left`
- CSS custom properties for scroll-driven values
- Batch style updates

### Hydration
- Zero hydration by default
- Only interactive islands hydrated
- No framework runtime

---

## Measurement

### DevTools
- Performance tab: record scroll, interaction
- Rendering: "Paint flashing", "Layer borders"
- Memory: heap snapshots
- Network: throttling (Slow 3G)

### Metrics to Track
- FPS during scroll
- Frame time (target < 16.67ms)
- Long tasks (>50ms)
- Layout shift (CLS)
- LCP / INP

### Mobile Testing
- iOS Safari: Web Inspector
- Chrome DevTools device toolbar
- Real device (thermal throttling)

---

## Performance Budget

| Metric | Target | Warning |
|--------|--------|---------|
| Frame time (desktop) | < 10ms | > 16ms |
| Frame time (mobile) | < 20ms | > 33ms |
| JS main thread | < 100ms | > 200ms |
| LCP | < 2.5s | > 4s |
| INP | < 200ms | > 500ms |
| CLS | < 0.1 | > 0.25 |
| Total JS (gz) | < 50kB | > 80kB |

---

## Optimization Checklist

- [ ] `requestAnimationFrame` for all animation loops
- [ ] Passive event listeners
- [ ] `IntersectionObserver` for scroll reveals
- [ ] CSS `transform`/`opacity` only for animation
- [ ] Particle count responsive
- [ ] Mesh lines desktop-only
- [ ] Reduced motion: static fallback
- [ ] No layout thrashing
- [ ] Fonts preloaded, `font-display: swap`
- [ ] Images lazy-loaded, responsive
- [ ] Video `preload="metadata"`
- [ ] Zero unnecessary hydration
- [ ] Minified HTML/CSS/JS in production

---

## Anti-Patterns

- `setInterval` for animation
- Animating `width`/`height`/`top`/`left`
- `box-shadow` animation
- Creating objects in RAF loop
- Synchronous layout reads in scroll handler
- Non-passive scroll listeners
- Hydrating static content
- Large animation libraries
- Unthrottled resize handlers
- Memory leaks in event listeners
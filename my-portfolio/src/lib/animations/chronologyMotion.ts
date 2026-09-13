// ============================================================
// ENGINEERING CHRONOLOGY MOTION CONTROLLER
// Anime.js v4 Progressive Line Drawing & Node Activation
// Staggered sequence across 2026 → 2023 milestones
// ============================================================

import { animate, createDrawable, isReducedMotion } from '../motion';

export function initChronologyMotion(container: HTMLElement | null): (() => void) | null {
  if (!container || typeof window === 'undefined') return null;

  const milestones = container.querySelectorAll<HTMLElement>('.timeline-milestone');
  const spineGlow = container.querySelector<HTMLElement>('#timelineSpineGlow');
  const spineSvgPath = container.querySelector<SVGPathElement>('#chronologySpineSvgPath');

  if (isReducedMotion()) {
    milestones.forEach((m) => {
      m.classList.add('is-revealed');
      m.style.opacity = '1';
      m.style.transform = 'none';
    });
    if (spineGlow) spineGlow.style.transform = 'scaleY(1)';
    return null;
  }

  let hasTriggered = false;

  function runChronologySequence() {
    if (hasTriggered) return;
    hasTriggered = true;

    // 1. Draw the vertical engineering spine
    if (spineSvgPath) {
      try {
        const drawable = createDrawable(spineSvgPath, 0, 0);
        animate(drawable, {
          draw: '0 1',
          duration: 1200,
          ease: 'outExpo',
        });
      } catch {
        if (spineGlow) {
          animate(spineGlow, {
            scaleY: [0, 1],
            duration: 1100,
            ease: 'outExpo',
          });
        }
      }
    } else if (spineGlow) {
      animate(spineGlow, {
        scaleY: [0, 1],
        duration: 1100,
        ease: 'outExpo',
      });
    }

    // 2. Sequentially reveal milestone nodes with opacity-only fade (§2 spec: 180ms, 40ms stagger, no translate)
    milestones.forEach((m, idx) => {
      m.classList.add('is-revealed');
      const marker = m.querySelector<HTMLElement>('.milestone-marker');
      const card = m.querySelector<HTMLElement>('.milestone-card');

      const delay = idx * 40;

      if (marker) {
        animate(marker, {
          opacity: [0, 1],
          duration: 180,
          delay,
          ease: 'outExpo',
        });
      }

      if (card) {
        animate(card, {
          opacity: [0, 1],
          duration: 180,
          delay,
          ease: 'outExpo',
        });
      }
    });
  }

  // Generous IntersectionObserver with safety fallback
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0.01) {
        runChronologySequence();
        observer.disconnect();
      }
    });
  }, {
    threshold: [0, 0.02, 0.1],
    rootMargin: '120px 0px 80px 0px',
  });

  observer.observe(container);

  // Safety fallback after 1.5s in case layout is already scrolled
  const fallbackTimer = setTimeout(() => {
    if (!hasTriggered) {
      runChronologySequence();
    }
  }, 1500);

  return () => {
    observer.disconnect();
    clearTimeout(fallbackTimer);
  };
}

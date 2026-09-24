// ============================================================
// DETERMINISTIC CIRCUIT ANIMATION SYSTEM
// Anime.js 4.5.x Architecture: Fixed Topology, Signal Propagation,
// Viewport-Aware Pause/Resume, & Zero Randomization
// ============================================================

import { onScroll } from './core';
import { isReducedMotion } from './accessibility';

export interface CircuitController {
  destroy: () => void;
  pause: () => void;
  resume: () => void;
}

export function registerCircuitVisibility(
  canvas: HTMLCanvasElement,
  onVisibilityChange: (isVisible: boolean) => void
): CircuitController | null {
  if (typeof window === 'undefined' || !canvas) return null;

  const heroSection = document.getElementById('hero') || canvas.parentElement;
  if (!heroSection) return null;

  let isPaused = false;

  const observer = onScroll({
    target: heroSection,
    enter: 'top bottom',
    leave: 'bottom top',
    onEnter: () => {
      if (!isPaused) onVisibilityChange(true);
    },
    onLeave: () => {
      onVisibilityChange(false);
    },
    onEnterBackward: () => {
      if (!isPaused) onVisibilityChange(true);
    },
    onLeaveBackward: () => {
      onVisibilityChange(false);
    },
  });

  return {
    destroy: () => {
      try {
        observer.revert();
      } catch {}
    },
    pause: () => {
      isPaused = true;
      onVisibilityChange(false);
    },
    resume: () => {
      isPaused = false;
      onVisibilityChange(true);
    },
  };
}

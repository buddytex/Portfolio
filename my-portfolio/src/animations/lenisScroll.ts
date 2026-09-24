// ============================================================
// LENIS SMOOTH SCROLL INTEGRATION
// Restrained desktop inertia; native touch scrolling on mobile
// Zero scroll hijacking; seamless anchor targeting
// ============================================================

import Lenis from 'lenis';
import { isReducedMotion, isTouchDevice } from './accessibility';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Reduced motion or touch devices: do not hijack scroll
  if (isReducedMotion() || isTouchDevice()) {
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
    return null;
  }

  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.0,
    wheelMultiplier: 0.9,
  });

  function raf(time: number) {
    if (lenisInstance) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
  }

  rafId = requestAnimationFrame(raf);

  // Smooth scroll handler for anchor links
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target && lenisInstance) {
          e.preventDefault();
          lenisInstance.scrollTo(target as HTMLElement, { offset: -40 });
        }
      }
    });
  });

  return lenisInstance;
}

export function destroySmoothScroll(): void {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

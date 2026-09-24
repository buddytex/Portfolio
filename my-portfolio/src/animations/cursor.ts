// ============================================================
// PRECISION ENGINEERING CUSTOM CURSOR & MAGNETIC CTAs
// Anime.js 4.5.x createAnimatable() Driven Micro-Interactions
// Restrained desktop-only interaction indicator: 5px dot + 28px ring
// Bypassed on touch devices and reduced-motion preference
// ============================================================

import { createAnimatable, animate } from './core';
import { isReducedMotion, isTouchDevice, isDesktop } from './accessibility';

export function initCustomCursor(): (() => void) | null {
  if (typeof window === 'undefined') return null;

  // Disabled on mobile, touch, or reduced motion
  if (isReducedMotion() || isTouchDevice() || !isDesktop()) {
    return null;
  }

  // Create cursor container if not present
  let cursor = document.getElementById('portfolioCursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = 'portfolioCursor';
    cursor.className = 'portfolio-cursor';
    cursor.innerHTML = `
      <div class="cursor-dot" id="cursorDot"></div>
      <div class="cursor-ring" id="cursorRing"></div>
    `;
    document.body.appendChild(cursor);
  }

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return null;

  const cursorState = {
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
  };

  const ringAnimatable = createAnimatable(cursorState, {
    ringX: 0,
    ringY: 0,
    duration: 160,
    ease: 'outQuad',
    onUpdate: () => {
      ring.style.transform = `translate3d(${cursorState.ringX - 14}px, ${cursorState.ringY - 14}px, 0)`;
    },
  });

  let mouseActive = false;

  const onMouseMove = (e: MouseEvent) => {
    cursorState.x = e.clientX;
    cursorState.y = e.clientY;

    if (!mouseActive) {
      mouseActive = true;
      cursor!.style.opacity = '1';
    }

    dot.style.transform = `translate3d(${cursorState.x - 2.5}px, ${cursorState.y - 2.5}px, 0)`;
    ringAnimatable.ringX(cursorState.x);
    ringAnimatable.ringY(cursorState.y);
  };

  const onMouseLeave = () => {
    mouseActive = false;
    cursor!.style.opacity = '0';
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);

  // Expand ring on interactive targets
  const interactiveSelector = 'a, button, [role="button"], .img-expandable, .skill-bubble, .project-card';
  const onTargetEnter = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest(interactiveSelector);
    if (target) {
      ring.classList.add('is-hovered');
    }
  };

  const onTargetLeave = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest(interactiveSelector);
    if (target) {
      ring.classList.remove('is-hovered');
    }
  };

  document.addEventListener('mouseover', onTargetEnter, { passive: true });
  document.addEventListener('mouseout', onTargetLeave, { passive: true });

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('mouseover', onTargetEnter);
    document.removeEventListener('mouseout', onTargetLeave);
    if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
  };
}

/**
 * Controlled 4–6px magnetic pull on key CTAs with Anime.js
 */
export function initMagneticButtons(selector: string = '.btn-hero-pill, .hud-cta, .btn-magnetic'): void {
  if (typeof window === 'undefined' || isReducedMotion() || isTouchDevice()) return;

  const buttons = document.querySelectorAll<HTMLElement>(selector);

  buttons.forEach((btn) => {
    if (btn.dataset.magneticBound) return;
    btn.dataset.magneticBound = 'true';

    const magState = { x: 0, y: 0 };
    const magAnim = createAnimatable(magState, {
      x: 0,
      y: 0,
      duration: 220,
      ease: 'outQuad',
      onUpdate: () => {
        btn.style.transform = `translate3d(${magState.x.toFixed(2)}px, ${magState.y.toFixed(2)}px, 0)`;
      },
    });

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      // Clamped max 5px
      const pullX = (relX / (rect.width / 2)) * 5;
      const pullY = (relY / (rect.height / 2)) * 4;

      magAnim.x(pullX);
      magAnim.y(pullY);
    });

    btn.addEventListener('mouseleave', () => {
      magAnim.x(0);
      magAnim.y(0);
    });
  });
}

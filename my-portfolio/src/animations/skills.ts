// ============================================================
// SKILLS BUBBLE MAP & STAGGER SYSTEM
// Anime.js 4.5.x Architecture: Center-Out Stagger,
// Restrained Spring Elevation, & Clean Replay on Return
// ============================================================

import {
  animate,
  onScroll,
  stagger,
  resetElementStyles,
  MOTION_TOKENS,
} from './core';
import { isReducedMotion } from './accessibility';

export function initSkillsAnimation(container: HTMLElement = document.getElementById('skills')!): (() => void) | null {
  if (typeof window === 'undefined' || !container) return null;

  const bubbles = container.querySelectorAll<HTMLButtonElement>('.skill-bubble');
  const domainClusters = container.querySelectorAll<HTMLElement>('.domain-cluster');
  if (!bubbles.length) return null;

  if (isReducedMotion()) {
    bubbles.forEach((b) => {
      b.style.opacity = '1';
      b.style.transform = 'none';
    });
    domainClusters.forEach((c) => c.classList.add('cluster-visible'));
    return null;
  }

  // Initial hidden state for bubbles
  bubbles.forEach((b) => {
    b.style.opacity = '0';
    b.style.transform = 'scale(0.90) translateY(12px)';
  });

  let animInstance: any = null;

  function playCenterOutStagger() {
    if (animInstance) animInstance.revert();

    // 1. Reveal domain clusters
    domainClusters.forEach((c) => c.classList.add('cluster-visible'));

    // 2. Center-out radial stagger with Anime.js v4
    animInstance = animate(bubbles, {
      opacity: [0, 1],
      scale: [0.90, 1],
      translateY: [12, 0],
      duration: 380,
      delay: stagger(24, { from: 'center' }),
      ease: MOTION_TOKENS.easing.technical,
      onComplete: () => {
        bubbles.forEach((b) => {
          b.style.opacity = '1';
          b.style.transform = 'none';
        });
      },
    });
  }

  // 3. Subtle restrained micro-interactions on hover
  const hoverCleanups: Array<() => void> = [];

  bubbles.forEach((bubble) => {
    let hoverAnim: any = null;

    const onEnter = () => {
      if (hoverAnim) hoverAnim.revert();
      hoverAnim = animate(bubble, {
        scale: 1.04,
        duration: 180,
        ease: 'outQuad',
      });
    };

    const onLeave = () => {
      if (hoverAnim) hoverAnim.revert();
      hoverAnim = animate(bubble, {
        scale: 1.0,
        duration: 200,
        ease: 'outQuad',
        onComplete: () => {
          bubble.style.transform = 'none';
        },
      });
    };

    bubble.addEventListener('mouseenter', onEnter);
    bubble.addEventListener('mouseleave', onLeave);

    hoverCleanups.push(() => {
      bubble.removeEventListener('mouseenter', onEnter);
      bubble.removeEventListener('mouseleave', onLeave);
      if (hoverAnim) hoverAnim.revert();
    });
  });

  // 4. Scroll trigger with replay-on-return
  const observer = onScroll({
    target: container,
    enter: 'top 80%',
    leave: 'bottom 15%',
    onEnter: () => {
      playCenterOutStagger();
    },
    onEnterBackward: () => {
      playCenterOutStagger();
    },
  });

  return () => {
    try {
      observer.revert();
    } catch {}
    if (animInstance) animInstance.revert();
    hoverCleanups.forEach((fn) => fn());
    bubbles.forEach((b) => resetElementStyles(b));
  };
}

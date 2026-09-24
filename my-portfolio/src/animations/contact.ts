// ============================================================
// CONTACT & FEEDBACK MICRO-INTERACTIONS
// Anime.js 4.5.x Architecture: Restrained Copy-Feedback & Card Entrance
// ============================================================

import { animate, MOTION_TOKENS } from './core';
import { isReducedMotion } from './accessibility';

export function animateCopyFeedback(button: HTMLElement, textElement: HTMLElement | null): void {
  if (typeof window === 'undefined' || !button) return;

  if (isReducedMotion()) {
    if (textElement) textElement.textContent = 'Copied to Clipboard ✓';
    setTimeout(() => {
      if (textElement) textElement.textContent = 'Copy Address';
    }, 2000);
    return;
  }

  // Subtle button physical click compression
  animate(button, {
    scale: [1, 0.95, 1],
    duration: 220,
    ease: 'outQuad',
  });

  if (textElement) {
    animate(textElement, {
      opacity: [1, 0, 1],
      duration: 260,
      ease: 'outQuad',
      onUpdate: (anim: any) => {
        if (anim.progress >= 0.5 && textElement.textContent !== 'Copied to Clipboard ✓') {
          textElement.textContent = 'Copied to Clipboard ✓';
          textElement.style.color = 'var(--accent-primary)';
        }
      },
      onComplete: () => {
        setTimeout(() => {
          animate(textElement, {
            opacity: [1, 0, 1],
            duration: 260,
            ease: 'outQuad',
            onUpdate: (anim: any) => {
              if (anim.progress >= 0.5 && textElement.textContent !== 'Copy Address') {
                textElement.textContent = 'Copy Address';
                textElement.style.color = '';
              }
            },
          });
        }, 2200);
      },
    });
  }
}

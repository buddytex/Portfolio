// ============================================================
// TYPOGRAPHY ANIMATION SYSTEM
// Anime.js 4.5.x splitText() integration with accessibility
// ============================================================

import { animate, splitText, stagger, resetElementStyles, MOTION_TOKENS } from './core';
import { isReducedMotion } from './accessibility';

export interface SplitTextOptions {
  by?: 'chars' | 'words' | 'lines';
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  ease?: string;
  yOffset?: number;
}

export interface SplitTextController {
  play: () => void;
  revert: () => void;
}

/**
 * Animates typography with Anime.js v4 splitText().
 * Preserves accessibility by leaving semantic text intact or setting aria-hidden on split tokens.
 */
export function animateTextReveal(
  target: HTMLElement | string,
  options: SplitTextOptions = {}
): SplitTextController | null {
  if (typeof window === 'undefined') return null;

  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return null;

  if (isReducedMotion()) {
    element.style.opacity = '1';
    element.style.transform = 'none';
    return {
      play: () => {},
      revert: () => {},
    };
  }

  const {
    by = 'words',
    duration = MOTION_TOKENS.duration.fast,
    delay = 0,
    staggerDelay = MOTION_TOKENS.stagger.tight,
    ease = MOTION_TOKENS.easing.technical,
    yOffset = 14,
  } = options;

  let splitter: any = null;
  let animInstance: any = null;

  try {
    const splitConfig: any = { accessible: true };
    if (by === 'chars') splitConfig.chars = true;
    else if (by === 'lines') splitConfig.lines = true;
    else splitConfig.words = true;

    splitter = splitText(element, splitConfig);
    const targets = by === 'chars' ? splitter.chars : by === 'lines' ? splitter.lines : splitter.words;

    if (targets && targets.length > 0) {
      // Set initial state
      targets.forEach((t: HTMLElement) => {
        t.style.opacity = '0';
        t.style.transform = `translateY(${yOffset}px)`;
      });

      animInstance = animate(targets, {
        opacity: [0, 1],
        translateY: [yOffset, 0],
        duration,
        delay: stagger(staggerDelay, { start: delay }),
        ease,
      });
    }
  } catch (err) {
    // Graceful fallback to simple element reveal
    element.style.opacity = '1';
  }

  return {
    play: () => {
      if (animInstance) animInstance.restart();
    },
    revert: () => {
      if (animInstance) animInstance.revert();
      if (splitter && typeof splitter.revert === 'function') splitter.revert();
      resetElementStyles(element);
    },
  };
}

// ============================================================
// MOTION CORE — Centralized Anime.js v4 Integration Layer
// Single source of truth for motion orchestration
// ============================================================

import {
  animate,
  createTimeline,
  createAnimatable,
  createScope,
  createDrawable,
  createMotionPath,
  onScroll,
  stagger,
  spring,
  svg,
  utils,
  engine,
} from 'animejs';

import { MOTION_TOKENS, isReducedMotion } from './tokens';

export {
  animate,
  createTimeline,
  createAnimatable,
  createScope,
  createDrawable,
  createMotionPath,
  onScroll,
  stagger,
  spring,
  svg,
  utils,
  engine,
  MOTION_TOKENS,
  isReducedMotion,
};

/**
 * Creates an isolated component animation scope that can be reverted cleanly on unmount.
 */
export function createComponentScope(rootElement?: HTMLElement) {
  return createScope({ root: rootElement });
}

/**
 * Typing animation for text content.
 * Uses Anime.js v4 text animation.
 */
export function animateTyping(element: HTMLElement, text: string, options: {
  duration?: number;
  delay?: number;
  ease?: string;
  onComplete?: () => void;
} = {}): Promise<void> {
  const { duration = 1000, delay = 0, ease = 'outExpo', onComplete } = options;
  
  // Set initial state
  element.textContent = '';
  element.style.opacity = '1';
  
  return new Promise<void>(resolve => {
    animate(element, {
      text: [text],
      duration,
      delay,
      ease,
      onComplete: () => {
        onComplete?.();
        resolve();
      },
    });
  });
}

/**
 * Section enter animation - fades in and slides up
 */
export function animateSectionEnter(element: HTMLElement, options: {
  delay?: number;
  duration?: number;
  ease?: string;
} = {}) {
  const { delay = 0, duration = 600, ease = 'outExpo' } = options;
  
  return animate(element, {
    opacity: [0, 1],
    translateY: [30, 0],
    duration,
    delay,
    ease,
  });
}

/**
 * Section exit animation - fades out and slides down
 */
export function animateSectionExit(element: HTMLElement, options: {
  duration?: number;
  ease?: string;
} = {}) {
  const { duration = 400, ease = 'inExpo' } = options;
  
  return animate(element, {
    opacity: [1, 0],
    translateY: [0, 20],
    duration,
    ease,
  });
}

/**
 * Section title animation - scales and fades
 */
export function animateSectionTitle(element: HTMLElement, options: {
  delay?: number;
  duration?: number;
  ease?: string;
  direction?: 'enter' | 'exit';
} = {}) {
  const { delay = 0, duration = 500, ease = 'outExpo', direction = 'enter' } = options;
  
  if (direction === 'enter') {
    return animate(element, {
      opacity: [0, 1],
      scale: [0.95, 1],
      translateY: [10, 0],
      duration,
      delay,
      ease,
    });
  } else {
    return animate(element, {
      opacity: [1, 0],
      scale: [1, 0.95],
      translateY: [0, -10],
      duration,
      ease,
    });
  }
}

/**
 * Animate a section header with coordinated animation
 */
export async function animateSectionHeader(headerElement: HTMLElement, options: {
  delay?: number;
  duration?: number;
  ease?: string;
} = {}): Promise<void> {
  const { delay = 0, duration = 600, ease = 'outExpo' } = options;
  
  const eyebrow = headerElement.querySelector('.section-eyebrow') as HTMLElement | null;
  const title = headerElement.querySelector('.section-title') as HTMLElement | null;
  const lead = headerElement.querySelector('.section-lead') as HTMLElement | null;
  
  const animations: Promise<void>[] = [];
  
  if (eyebrow) {
    animations.push(new Promise<void>(resolve => {
      animate(eyebrow, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration,
        delay,
        ease: 'outExpo',
        onComplete: () => resolve(),
      });
    }));
  }
  
  if (title) {
    animations.push(new Promise<void>(resolve => {
      animate(title, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration,
        delay: delay + 100,
        ease,
        onComplete: () => resolve(),
      });
    }));
  }
  
  if (lead) {
    animations.push(new Promise<void>(resolve => {
      animate(lead, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration,
        delay: delay + 200,
        ease,
        onComplete: () => resolve(),
      });
    }));
  }
  
  await Promise.all(animations);
}

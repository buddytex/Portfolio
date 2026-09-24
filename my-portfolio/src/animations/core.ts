// ============================================================
// ANIME.JS 4.5.x CORE ENGINE & MOTION TOKENS
// Single Source of Truth for Portfolio Motion Architecture
// ============================================================

import {
  animate,
  createTimeline,
  createScope,
  createAnimatable,
  onScroll,
  ScrollObserver,
  stagger,
  splitText,
  createDrawable,
  createMotionPath,
  createLayout,
  cleanInlineStyles,
  engine,
  utils,
  eases,
  spring,
} from 'animejs';

export {
  animate,
  createTimeline,
  createScope,
  createAnimatable,
  onScroll,
  ScrollObserver,
  stagger,
  splitText,
  createDrawable,
  createMotionPath,
  createLayout,
  cleanInlineStyles,
  engine,
  utils,
  eases,
  spring,
};

/**
 * Resets inline motion styles on a DOM element to prevent layout corruption.
 */
export function resetElementStyles(element: HTMLElement | null | undefined): void {
  if (!element) return;
  element.style.opacity = '';
  element.style.transform = '';
}

// ------------------------------------------------------------
// ENGINEERING MOTION TOKENS
// Critically damped physics, restrained durations, zero floatiness
// ------------------------------------------------------------
export const MOTION_TOKENS = {
  duration: {
    micro: 180,       // Hover, active, status pips, button clicks
    fast: 280,        // Tag reveals, small icon shifts, badge fades
    normal: 420,      // Card elevations, content reveals, tab transitions
    section: 650,     // Section titles, major domain reveals
    hero: 950,        // Monumental hero title, initial scene settling
  },
  easing: {
    technical: 'outExpo',       // Crisp, confident engineering entrance
    smooth: 'outQuad',          // Gentle settling
    inOut: 'inOutQuad',         // Continuous layout transitions
    springMicro: 'spring(1, 90, 12, 0)', // Restrained physical interaction
  },
  stagger: {
    tight: 30,        // Character reveals, skill bubbles
    card: 65,         // Projects grid, role items
    domain: 90,       // Major cluster sections
  },
} as const;

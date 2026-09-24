// ============================================================
// SCROLL OBSERVATION & REVEAL SYSTEM
// Anime.js 4.5.x onScroll / ScrollObserver Architecture
// Replaces raw IntersectionObservers & GSAP ScrollTrigger
// Guarantees Reversible State: No elements stuck in opacity: 0
// ============================================================

import {
  animate,
  onScroll,
  resetElementStyles,
  cleanInlineStyles,
  MOTION_TOKENS,
} from './core';
import { isReducedMotion } from './accessibility';

export interface SectionWaypoint {
  id: string;
  label: string;
  code: string;
  selector: string;
}

export const WAYPOINTS: SectionWaypoint[] = [
  { id: 'hero',       label: 'Hero',       code: '01 // HERO', selector: '#hero' },
  { id: 'roles',      label: 'Roles',      code: '02 // ROLES', selector: '#roles' },
  { id: 'work',       label: 'Projects',   code: '03 // PROJ', selector: '#work' },
  { id: 'skills',     label: 'Skills',     code: '04 // SKL',  selector: '#skills' },
  { id: 'hardware',   label: 'PCB Lab',    code: '05 // PCB',  selector: '#hardware' },
  { id: 'contact',    label: 'Contact',    code: '06 // CON',  selector: '#contact' },
];

export interface ScrollRevealOptions {
  distance?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  replay?: boolean;
}

// Active observer registry for clean Astro lifecycle teardown
const activeObservers: Array<{ revert: () => void }> = [];

export function clearScrollObservers() {
  activeObservers.forEach((obs) => {
    try {
      obs.revert();
    } catch {
      // ignore
    }
  });
  activeObservers.length = 0;
}

/**
 * Universal scroll reveal for a target element using Anime.js v4 onScroll.
 */
export function registerScrollReveal(
  target: HTMLElement,
  options: ScrollRevealOptions = {}
): { revert: () => void } | null {
  if (typeof window === 'undefined' || !target) return null;

  if (isReducedMotion()) {
    target.style.opacity = '1';
    target.style.transform = 'none';
    return null;
  }

  const {
    distance = 20,
    duration = MOTION_TOKENS.duration.normal,
    delay = 0,
    ease = MOTION_TOKENS.easing.technical,
    replay = true,
  } = options;

  // Set initial visible state to hidden
  target.style.opacity = '0';
  target.style.transform = `translateY(${distance}px)`;

  let anim: any = null;

  function playEntrance() {
    if (anim) anim.revert();
    anim = animate(target, {
      opacity: [0, 1],
      translateY: [distance, 0],
      duration,
      delay,
      ease,
      onComplete: () => {
        // Ensure clean layout without stuck inline styles
        target.style.opacity = '1';
        target.style.transform = 'none';
      },
    });
  }

  const observer = onScroll({
    target,
    enter: 'top 88%',
    leave: 'bottom 10%',
    onEnter: () => {
      playEntrance();
    },
    onEnterBackward: () => {
      if (replay) {
        playEntrance();
      } else {
        target.style.opacity = '1';
        target.style.transform = 'none';
      }
    },
  });

  const entry = {
    revert: () => {
      try {
        observer.revert();
      } catch {}
      if (anim) {
        try {
          cleanInlineStyles(anim);
        } catch {
          anim.revert();
        }
      }
      resetElementStyles(target);
    },
  };

  activeObservers.push(entry);
  return entry;
}

/**
 * Initializes universal section reveals across the page.
 */
export function initScrollRevealSystem(): () => void {
  if (typeof window === 'undefined') return () => {};

  clearScrollObservers();

  if (isReducedMotion()) {
    document.querySelectorAll<HTMLElement>('.reveal, .reveal-item, .section-header').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return () => {};
  }

  const revealElements = document.querySelectorAll<HTMLElement>('.reveal, .reveal-item, .section-header');
  revealElements.forEach((el) => {
    registerScrollReveal(el, {
      distance: el.classList.contains('reveal-lg') ? 28 : 18,
      duration: MOTION_TOKENS.duration.normal,
      replay: true,
    });
  });

  return clearScrollObservers;
}

/**
 * Persistent Datum Spine scroll waypoint tracker.
 * Synchronizes navigation pips, active states, and top progress bar.
 */
export function initScrollTracker(
  onSectionChange?: (activeId: string, progress: number) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const nodes = document.querySelectorAll<HTMLElement>('.datum-node');
  const spineFill = document.getElementById('datumSpineFill');
  const scrollBar = document.getElementById('scrollBar');

  let activeSectionId = 'hero';
  let ticking = false;

  function update() {
    ticking = false;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - viewportHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Top scroll bar
    if (scrollBar) {
      scrollBar.style.transform = `scaleX(${progress})`;
    }

    // Spine fill track
    if (spineFill) {
      spineFill.style.transform = `scaleY(${progress})`;
    }

    // Find active section
    let currentId = 'hero';
    for (const wp of WAYPOINTS) {
      const el = document.querySelector<HTMLElement>(wp.selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportHeight * 0.45 && rect.bottom >= viewportHeight * 0.15) {
          currentId = wp.id;
        }
      }
    }

    if (currentId !== activeSectionId) {
      activeSectionId = currentId;
      nodes.forEach((node) => {
        const sec = node.dataset.section;
        if (sec === activeSectionId) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });
      if (onSectionChange) onSectionChange(activeSectionId, progress);
    }
  }

  function onScrollEvent() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScrollEvent, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScrollEvent);
  };
}

// ============================================================
// MOTION ORCHESTRATOR — Sequential Choreography & Entrances
// Built with Anime.js v4 · Designed for editorial clarity
// ============================================================

import { animate, createTimeline, stagger, isReducedMotion } from './core';

/**
 * Executes a calm, editorial hero entrance sequence.
 * Order:
 * 1. Spatial field settles quietly
 * 2. Eyebrow badge reveals
 * 3. Monumental name lines stagger upwards
 * 4. Integrated portrait emerges with restrained optical depth
 * 5. Credential badge and supporting statement appear
 * 6. Action buttons become interactive
 */
export function initHeroEntrance(container: HTMLElement = document.body) {
  if (isReducedMotion()) {
    // Instant appearance for reduced motion
    const elements = container.querySelectorAll<HTMLElement>('.hero-orchestrated');
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return null;
  }

  // Prevent replay if user scrolls away and returns to the hero (§1 spec)
  if (container.dataset.heroEntered === 'true') {
    return null;
  }
  container.dataset.heroEntered = 'true';

  const circuitCanvas = document.getElementById('circuitBoardCanvas');
  const eyebrow = container.querySelector('#heroEyebrow');
  const nameLines = container.querySelectorAll<HTMLElement>('.hero-name-line');
  const disciplines = container.querySelector('#heroDisciplines');
  const statement = container.querySelector('#heroStatement');
  const actions = container.querySelector('#heroActions');
  const portrait = container.querySelector('#heroPortrait');
  const scrollIndicator = container.querySelector<HTMLElement>('.hero-scroll-indicator');

  const tl = createTimeline({
    defaults: {
      ease: 'outExpo',
      duration: 450,
    }
  });

  // 1. Circuit background reveals first (~0-200ms)
  if (circuitCanvas) {
    tl.add(circuitCanvas, {
      opacity: [0, 1],
      duration: 300,
      ease: 'outExpo',
    }, 0);
  }

  // 2. Eyebrow badge reveals (~100ms)
  if (eyebrow) {
    tl.add(eyebrow, {
      opacity: [0, 1],
      duration: 350,
      ease: 'outExpo',
    }, 80);
  }

  // 3. Name typography reveals per-word: ~120ms stagger per word, opacity [0, 1]
  if (nameLines.length > 0) {
    tl.add(nameLines, {
      opacity: [0, 1],
      duration: 450,
      delay: stagger(120),
      ease: 'outExpo',
    }, 160);
  }

  // 4. Disciplines row
  if (disciplines) {
    tl.add(disciplines, {
      opacity: [0, 1],
      duration: 350,
      ease: 'outExpo',
    }, 400);
  }

  // 5. Integrated portrait fades and scales in from 0.98 -> 1 (§1 spec)
  if (portrait) {
    tl.add(portrait, {
      opacity: [0, 1],
      scale: [0.98, 1],
      duration: 500,
      ease: 'outExpo',
    }, 420);
  }

  // 6. Statement & action buttons
  if (statement) {
    tl.add(statement, {
      opacity: [0, 1],
      duration: 400,
      ease: 'outExpo',
    }, 560);
  }

  if (actions) {
    tl.add(actions, {
      opacity: [0, 1],
      duration: 350,
      ease: 'outExpo',
    }, 660);
  }

  // 7. Scroll cue fades in last (~780ms-900ms)
  if (scrollIndicator) {
    tl.add(scrollIndicator, {
      opacity: [0, 0.4],
      duration: 350,
      ease: 'outExpo',
    }, 780);
  }

  return tl;
}

/**
 * Lightweight scroll reveal observer using IntersectionObserver.
 * Smoothly cascades entry of cards, headers, and evidence blocks.
 */
export function initScrollReveal() {
  if (typeof window === 'undefined') return;

  const reduced = isReducedMotion();
  const elements = document.querySelectorAll<HTMLElement>('.reveal, .reveal-item');
  const staggerContainers = document.querySelectorAll<HTMLElement>('.stagger-children');

  if (reduced) {
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    staggerContainers.forEach(container => {
      container.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement;
        if (target.classList.contains('stagger-children')) {
          target.classList.add('is-visible');
        } else {
          animate(target, {
            opacity: [0, 1],
            y: [ target.classList.contains('reveal-lg') ? 28 : 16, 0 ],
            duration: 650,
            ease: 'outExpo',
          });
        }
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  elements.forEach(el => observer.observe(el));
  staggerContainers.forEach(container => observer.observe(container));
}

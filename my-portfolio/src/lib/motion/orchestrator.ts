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
    // Zero motion override for accessibility
    const elements = container.querySelectorAll<HTMLElement>('.hero-orchestrated');
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return null;
  }

  const eyebrow = container.querySelector('#heroEyebrow');
  const nameLines = container.querySelectorAll('.hero-name-line');
  const statement = container.querySelector('#heroStatement');
  const credentials = container.querySelector('#heroCredential');
  const actions = container.querySelector('#heroActions');
  const portrait = container.querySelector('#heroPortrait');

  const tl = createTimeline({
    defaults: {
      ease: 'outExpo',
      duration: 700,
    }
  });

  if (eyebrow) {
    tl.add(eyebrow, {
      opacity: [0, 1],
      y: [10, 0],
      duration: 500,
    }, 100);
  }

  if (nameLines.length > 0) {
    tl.add(nameLines, {
      opacity: [0, 1],
      y: [24, 0],
      duration: 750,
      delay: stagger(80),
    }, 200);
  }

  if (portrait) {
    tl.add(portrait, {
      opacity: [0, 1],
      scale: [0.97, 1],
      y: [12, 0],
      duration: 850,
    }, 320);
  }

  if (statement) {
    tl.add(statement, {
      opacity: [0, 1],
      y: [14, 0],
      duration: 650,
    }, 420);
  }

  if (credentials) {
    tl.add(credentials, {
      opacity: [0, 1],
      y: [12, 0],
      duration: 600,
    }, 540);
  }

  if (actions) {
    tl.add(actions, {
      opacity: [0, 1],
      y: [10, 0],
      duration: 550,
    }, 640);
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

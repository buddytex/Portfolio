// ============================================================
// PROJECTS ANIMATION CONTROLLER
// Anime.js 4.5.x Architecture: Staggered Card Entrance,
// Image Parallax Scale, and Case Study Visual Stage
// ============================================================

import {
  animate,
  createTimeline,
  onScroll,
  stagger,
  resetElementStyles,
  cleanInlineStyles,
  MOTION_TOKENS,
} from './core';
import { isReducedMotion } from './accessibility';

export function initProjectCardsAnimation(container: HTMLElement = document.getElementById('work')!): (() => void) | null {
  if (typeof window === 'undefined' || !container) return null;

  const cards = container.querySelectorAll<HTMLElement>('.project-card');
  if (!cards.length) return null;

  if (isReducedMotion()) {
    cards.forEach((c) => {
      c.classList.add('is-revealed');
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
    return null;
  }

  let animInstance: any = null;
  let hasRevealed = false;

  function playCardsReveal() {
    if (hasRevealed) {
      cards.forEach((c) => {
        c.classList.add('is-revealed');
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      return;
    }
    hasRevealed = true;
    if (animInstance) animInstance.revert();
    animInstance = animate(cards, {
      opacity: [0, 1],
      translateY: [22, 0],
      duration: MOTION_TOKENS.duration.normal,
      delay: stagger(MOTION_TOKENS.stagger.card),
      ease: MOTION_TOKENS.easing.technical,
      onComplete: () => {
        cards.forEach((c) => {
          c.classList.add('is-revealed');
          c.style.opacity = '1';
          c.style.transform = 'none';
        });
      },
    });
  }

  // Check initial viewport bounds
  const rect = container.getBoundingClientRect();
  const initiallyInView = rect.top < window.innerHeight * 0.90 && rect.bottom > 0;

  if (initiallyInView) {
    playCardsReveal();
  } else {
    cards.forEach((c) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(22px)';
    });
  }

  // Native IntersectionObserver to ensure cards reveal during all scroll modes
  let io: IntersectionObserver | null = null;
  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        playCardsReveal();
      }
    }, { rootMargin: '60px 0px', threshold: 0.05 });
    io.observe(container);
  }

  const observer = onScroll({
    target: container,
    enter: 'top 82%',
    leave: 'bottom 12%',
    onEnter: () => {
      playCardsReveal();
    },
    onEnterBackward: () => {
      playCardsReveal();
    },
  });

  return () => {
    if (io) {
      try { io.disconnect(); } catch {}
      io = null;
    }
    try {
      observer.revert();
    } catch {}
    if (animInstance) {
      try {
        cleanInlineStyles(animInstance);
      } catch {
        animInstance.revert();
      }
    }
    cards.forEach((c) => resetElementStyles(c));
  };
}

/**
 * Case Study Detail Page Entrance Choreography
 */
export function initProjectDetailAnimation(): (() => void) | null {
  if (typeof window === 'undefined') return null;

  if (isReducedMotion()) return null;

  const heroVisual = document.querySelector<HTMLElement>('.project-hero-visual');
  const heroImg = document.querySelector<HTMLElement>('.project-hero-img');
  const title = document.querySelector<HTMLElement>('.project-title');
  const subtitle = document.querySelector<HTMLElement>('.project-subtitle');
  const attributes = document.querySelector<HTMLElement>('.project-attributes');
  const sections = document.querySelectorAll<HTMLElement>('.case-section, .dossier-wrap, .project-nav-footer');

  const tl = createTimeline({
    autoplay: true,
  });

  if (title) {
    tl.add(title, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 450,
      ease: MOTION_TOKENS.easing.technical,
    }, 50);
  }

  if (subtitle) {
    tl.add(subtitle, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 380,
      ease: 'outQuad',
    }, 120);
  }

  if (attributes) {
    tl.add(attributes, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 380,
      ease: 'outQuad',
    }, 180);
  }

  if (heroVisual) {
    tl.add(heroVisual, {
      opacity: [0.3, 1],
      duration: 500,
      ease: 'outQuad',
    }, 100);
  }

  if (heroImg) {
    tl.add(heroImg, {
      scale: [1.03, 1],
      duration: 650,
      ease: MOTION_TOKENS.easing.technical,
    }, 100);
  }

  // Scroll reveals for dossier blocks: Viewport-aware with guaranteed fallback
  const observers: any[] = [];
  const ioList: IntersectionObserver[] = [];

  sections.forEach((sec) => {
    // If element is already in viewport or near top on load, ensure it is immediately visible
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      sec.style.opacity = '1';
      sec.style.transform = 'none';
      return;
    }

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      animate(sec, {
        opacity: [0.2, 1],
        translateY: [16, 0],
        duration: MOTION_TOKENS.duration.fast,
        ease: MOTION_TOKENS.easing.technical,
        onComplete: () => {
          sec.style.opacity = '1';
          sec.style.transform = 'none';
        },
      });
    };

    // If below fold, set initial soft state (never fully invisible)
    sec.style.opacity = '0.2';
    sec.style.transform = 'translateY(16px)';

    // Robust native IntersectionObserver trigger
    if (typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          reveal();
          io.disconnect();
        }
      }, { rootMargin: '150px 0px 150px 0px', threshold: 0 });
      io.observe(sec);
      ioList.push(io);
    } else {
      reveal();
    }
  });

  // Safety fallback: after 300ms, guarantee all sections are 100% visible regardless of scroll state
  const safetyTimer = setTimeout(() => {
    sections.forEach((sec) => {
      sec.style.opacity = '1';
      sec.style.transform = 'none';
    });
  }, 300);

  return () => {
    clearTimeout(safetyTimer);
    tl.revert();
    ioList.forEach((io) => {
      try { io.disconnect(); } catch {}
    });
    observers.forEach((obs) => {
      try {
        obs.revert();
      } catch {}
    });
    sections.forEach((sec) => {
      sec.style.opacity = '';
      sec.style.transform = '';
    });
  };
}

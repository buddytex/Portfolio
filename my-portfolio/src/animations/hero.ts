// ============================================================
// HERO ANIMATION CONTROLLER
// Anime.js 4.5.x Architecture: Entrance Choreography, Pointer Parallax,
// 3D Ambient Control, and Permanent Fix for Scroll Disappearance
// ============================================================

import {
  animate,
  createTimeline,
  createAnimatable,
  onScroll,
  stagger,
  cleanInlineStyles,
  resetElementStyles,
  MOTION_TOKENS,
} from './core';
import { isReducedMotion, isMobile, isTouchDevice } from './accessibility';

export interface HeroController {
  destroy: () => void;
  replay: () => void;
}

export function initHeroAnimation(heroElement: HTMLElement = document.getElementById('hero')!): HeroController | null {
  if (typeof window === 'undefined' || !heroElement) return null;

  const reduced = isReducedMotion();
  const mobile = isMobile();

  // DOM Elements
  const circuitCanvas = document.getElementById('circuitBoardCanvas');
  const canvas3d = document.getElementById('hero3dCanvas');
  const eyebrow = heroElement.querySelector<HTMLElement>('#heroEyebrow');
  const nameLines = heroElement.querySelectorAll<HTMLElement>('.hero-name-line');
  const disciplines = heroElement.querySelector<HTMLElement>('#heroDisciplines');
  const actions = heroElement.querySelector<HTMLElement>('#heroActions');
  const portraitWrap = heroElement.querySelector<HTMLElement>('#portraitComposition');
  const portraitImg = heroElement.querySelector<HTMLElement>('#heroPortraitImg');
  const hudBadge = heroElement.querySelector<HTMLElement>('.hero-hud-badge');
  const hudPanel = heroElement.querySelector<HTMLElement>('.hero-hud-panel');
  const heroLeft = heroElement.querySelector<HTMLElement>('#heroLeft');

  // If reduced motion, immediately establish full visibility
  if (reduced) {
    [circuitCanvas, canvas3d, eyebrow, disciplines, actions, portraitWrap, portraitImg, hudBadge, hudPanel, heroLeft].forEach((el) => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    nameLines.forEach((l) => {
      l.style.opacity = '1';
      l.style.transform = 'none';
    });
    return null;
  }

  // ------------------------------------------------------------
  // 1. INITIAL RESTING STATE PREPARATION
  // ------------------------------------------------------------
  if (circuitCanvas) circuitCanvas.style.opacity = '0';
  if (canvas3d) canvas3d.style.opacity = '0';
  if (eyebrow) {
    eyebrow.style.opacity = '0';
    eyebrow.style.transform = 'translateY(14px)';
  }
  nameLines.forEach((line) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(22px)';
  });
  if (disciplines) {
    disciplines.style.opacity = '0';
    disciplines.style.transform = 'translateY(12px)';
  }
  if (actions) {
    actions.style.opacity = '0';
    actions.style.transform = 'translateY(14px)';
  }
  if (portraitImg) {
    portraitImg.style.opacity = '0';
    portraitImg.style.transform = 'scale(0.97) translateY(24px)';
  }
  if (hudBadge) {
    hudBadge.style.opacity = '0';
    hudBadge.style.transform = 'scale(0.95)';
  }
  if (hudPanel) {
    hudPanel.style.opacity = '0';
    hudPanel.style.transform = 'scale(0.95)';
  }

  // ------------------------------------------------------------
  // 2. ENTRANCE TIMELINE (createTimeline)
  // ------------------------------------------------------------
  const entranceTl = createTimeline({
    autoplay: true,
  });

  // 0ms: Circuit canvas background settles into view
  if (circuitCanvas) {
    entranceTl.add(circuitCanvas, {
      opacity: [0, 1],
      duration: 650,
      ease: 'outQuad',
    }, 0);
  }

  // 80ms: 3D canvas reveals behind portrait
  if (canvas3d) {
    entranceTl.add(canvas3d, {
      opacity: [0, 1],
      duration: 800,
      ease: 'outQuad',
    }, 80);
  }

  // 180ms: Technical eyebrow badge reveals
  if (eyebrow) {
    entranceTl.add(eyebrow, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 380,
      ease: MOTION_TOKENS.easing.technical,
    }, 180);
  }

  // 240ms: Portrait emerges with restrained depth
  if (portraitImg) {
    entranceTl.add(portraitImg, {
      opacity: [0, 1],
      scale: [0.97, 1],
      translateY: [24, 0],
      duration: 850,
      ease: 'outExpo',
    }, 240);
  }

  // 350ms: Monumental editorial name lines
  if (nameLines.length > 0) {
    entranceTl.add(nameLines, {
      opacity: [0, 1],
      translateY: [22, 0],
      duration: 520,
      delay: stagger(70),
      ease: MOTION_TOKENS.easing.technical,
    }, 350);
  }

  // 520ms: Supporting disciplines
  if (disciplines) {
    entranceTl.add(disciplines, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 400,
      ease: MOTION_TOKENS.easing.technical,
    }, 520);
  }

  // 620ms: HUD annotations
  if (hudBadge) {
    entranceTl.add(hudBadge, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 450,
      ease: 'outExpo',
    }, 620);
  }
  if (hudPanel) {
    entranceTl.add(hudPanel, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 450,
      ease: 'outExpo',
    }, 680);
  }

  // 750ms: Action buttons
  if (actions) {
    entranceTl.add(actions, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 400,
      ease: 'outQuad',
    }, 750);
  }

  // ------------------------------------------------------------
  // 3. EFFICIENT POINTER PARALLAX VIA createAnimatable()
  // No new Anime.js animation created on mousemove!
  // Clamped restrained physics: 4.5px portrait, 10px 3D, 2px circuit
  // ------------------------------------------------------------
  let mouseListener: ((e: MouseEvent) => void) | null = null;
  let leaveListener: (() => void) | null = null;

  if (!mobile && !isTouchDevice() && portraitImg) {
    const parallaxState = {
      portraitX: 0,
      portraitY: 0,
    };

    const animatableParallax = createAnimatable(parallaxState, {
      portraitX: 0,
      portraitY: 0,
      duration: 350,
      ease: 'outQuad',
      onUpdate: () => {
        if (portraitImg) {
          portraitImg.style.transform = `translate3d(${parallaxState.portraitX.toFixed(2)}px, ${parallaxState.portraitY.toFixed(2)}px, 0)`;
        }
      },
    });

    mouseListener = (e: MouseEvent) => {
      const cx = window.innerWidth * 0.5;
      const cy = window.innerHeight * 0.5;
      const normX = (e.clientX - cx) / cx;
      const normY = (e.clientY - cy) / cy;

      // Clamped subtle depth
      const targetPortraitX = normX * 4.5;
      const targetPortraitY = normY * 3.5;

      animatableParallax.portraitX(targetPortraitX);
      animatableParallax.portraitY(targetPortraitY);
    };

    leaveListener = () => {
      animatableParallax.portraitX(0);
      animatableParallax.portraitY(0);
    };

    window.addEventListener('mousemove', mouseListener, { passive: true });
    window.addEventListener('mouseleave', leaveListener);
  }

  // ------------------------------------------------------------
  // 4. BULLETPROOF SCROLL LIFECYCLE (THE CRITICAL FIX)
  // Guarantees elements NEVER permanently disappear when scrolling down,
  // and smoothly restore full visibility when returning!
  // ------------------------------------------------------------
  const scrollObserver = onScroll({
    target: heroElement,
    enter: 'top top',
    leave: 'bottom top',
    onLeave: () => {
      // Gentle dim when out of hero viewport, NEVER set opacity to 0
      if (circuitCanvas) circuitCanvas.style.opacity = '0.35';
      if (portraitImg) portraitImg.style.opacity = '0.45';
      if (canvas3d) canvas3d.style.opacity = '0.35';
      if (heroLeft) heroLeft.style.opacity = '0.45';
    },
    onEnterBackward: () => {
      // FULL RESTORATION when visitor returns to hero from below
      if (circuitCanvas) {
        animate(circuitCanvas, { opacity: 1, duration: 400, ease: 'outQuad' });
      }
      if (canvas3d) {
        animate(canvas3d, { opacity: 1, duration: 400, ease: 'outQuad' });
      }
      if (portraitImg) {
        animate(portraitImg, { opacity: 1, duration: 400, ease: 'outQuad' });
      }
      if (heroLeft) {
        animate(heroLeft, { opacity: 1, duration: 400, ease: 'outQuad' });
      }
      // Re-accentuate name
      if (nameLines.length > 0) {
        animate(nameLines, {
          opacity: [0.6, 1],
          duration: 380,
          delay: stagger(40),
          ease: 'outExpo',
        });
      }
    },
  });

  return {
    destroy: () => {
      try {
        scrollObserver.revert();
      } catch {}
      try {
        cleanInlineStyles(entranceTl);
      } catch {}
      if (mouseListener) window.removeEventListener('mousemove', mouseListener);
      if (leaveListener) window.removeEventListener('mouseleave', leaveListener);

      // Clean inline styles to prevent DOM pollution
      [circuitCanvas, canvas3d, eyebrow, disciplines, actions, portraitImg, hudBadge, hudPanel, heroLeft].forEach((el) => {
        resetElementStyles(el);
      });
      nameLines.forEach((l) => resetElementStyles(l));
    },
    replay: () => {
      entranceTl.restart();
    },
  };
}

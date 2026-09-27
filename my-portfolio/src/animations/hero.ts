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

export interface HeroAnimationOptions {
  skipEntrance?: boolean;
}

export function initHeroAnimation(
  heroElement: HTMLElement = document.getElementById('hero')!,
  options?: HeroAnimationOptions
): HeroController | null {
  if (typeof window === 'undefined' || !heroElement) return null;

  const reduced = isReducedMotion();
  const mobile = isMobile();
  const skipEntrance = options?.skipEntrance || false;

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

  // If reduced motion or skipEntrance, immediately establish full visibility
  if (reduced || skipEntrance) {
    [circuitCanvas, eyebrow, disciplines, actions, portraitWrap, portraitImg, hudBadge, hudPanel, heroLeft].forEach((el) => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = '';
      }
    });
    if (canvas3d) {
      canvas3d.style.opacity = '1';
      canvas3d.style.transform = 'translate(-50%, -50%)';
    }
    nameLines.forEach((l) => {
      l.style.opacity = '1';
      l.style.transform = '';
    });
    if (reduced) return null;
  }

  // ------------------------------------------------------------
  // 1. INITIAL RESTING STATE PREPARATION (Only when not skipping entrance)
  // ------------------------------------------------------------
  if (!skipEntrance) {
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
  }

  // ------------------------------------------------------------
  // 2. ENTRANCE TIMELINE (createTimeline)
  // Only created when not skipping entrance (intro handles its own entrance)
  // ------------------------------------------------------------
  let entranceTl: any = null;
  if (!skipEntrance) {
    entranceTl = createTimeline({
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
  }

  // ------------------------------------------------------------
  // 3. EFFICIENT POINTER PARALLAX VIA createAnimatable()
  // No new Anime.js animation created on mousemove!
  // Clamped restrained physics: 4.5px portrait, 10px 3D, 2px circuit
  // ------------------------------------------------------------
  const parallaxState = {
    portraitX: 0,
    portraitY: 0,
  };

  let mouseListener: ((e: MouseEvent) => void) | null = null;
  let leaveListener: (() => void) | null = null;

  if (!mobile && !isTouchDevice() && portraitImg) {
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
  // 4. SUBTLE SCROLL PARALLAX & SIGNAL ACCELERATION (rAF driven)
  // Parallax hierarchy: Circuit (largest) > 3D objects > Portrait > Text (minimal)
  // Pulses accelerate slightly with scroll progress; never drops opacity to 0
  // ------------------------------------------------------------
  let scrollTicking = false;
  let scrollListener: (() => void) | null = null;

  if (typeof window !== 'undefined') {
    const updateScrollParallax = () => {
      scrollTicking = false;
      const scrollY = window.scrollY;
      const heroHeight = heroElement.offsetHeight || window.innerHeight;

      if (scrollY > heroHeight * 1.1) {
        (window as any).__HERO_CIRCUIT_SPEED_BOOST__ = 1.0;
        return;
      }

      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

      // Subtle pulse acceleration during scroll (1.0 -> 1.5x)
      (window as any).__HERO_CIRCUIT_SPEED_BOOST__ = 1.0 + progress * 0.5;

      // Circuit Canvas Parallax (shift Y down, subtle scale, smooth fade down to 0.40)
      if (circuitCanvas) {
        const cY = progress * 38;
        const cScale = 1 - progress * 0.015;
        const cOpacity = 1 - progress * 0.60;
        circuitCanvas.style.transform = `translate3d(0, ${cY.toFixed(1)}px, 0) scale(${cScale.toFixed(3)})`;
        circuitCanvas.style.opacity = `${cOpacity.toFixed(2)}`;
      }

      // 3D Canvas Parallax (responsive percentage centering + subtle Y shift)
      if (canvas3d) {
        const d3Y = progress * 24;
        const d3Opacity = 1 - progress * 0.50;
        canvas3d.style.transform = `translate3d(-50%, calc(-50% + ${d3Y.toFixed(1)}px), 0)`;
        canvas3d.style.opacity = `${d3Opacity.toFixed(2)}`;
      }

      // Portrait Parallax (very small movement)
      if (portraitImg) {
        const pY = progress * 14;
        const pOpacity = 1 - progress * 0.45;
        portraitImg.style.transform = `translate3d(${parallaxState.portraitX.toFixed(2)}px, ${(parallaxState.portraitY + pY).toFixed(2)}px, 0)`;
        portraitImg.style.opacity = `${pOpacity.toFixed(2)}`;
      }

      // Left Content (minimal movement)
      if (heroLeft) {
        const lY = progress * 8;
        const lOpacity = 1 - progress * 0.35;
        heroLeft.style.transform = `translate3d(0, ${lY.toFixed(1)}px, 0)`;
        heroLeft.style.opacity = `${lOpacity.toFixed(2)}`;
      }
    };

    scrollListener = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(updateScrollParallax);
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
  }

  // ------------------------------------------------------------
  // 5. BULLETPROOF SCROLL LIFECYCLE (THE CRITICAL FIX)
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
      if (typeof window !== 'undefined') {
        (window as any).__HERO_CIRCUIT_SPEED_BOOST__ = 1.0;
      }
      if (circuitCanvas) {
        animate(circuitCanvas, { opacity: 1, translateY: 0, scale: 1, duration: 400, ease: 'outQuad' });
      }
      if (canvas3d) {
        animate(canvas3d, { opacity: 1, duration: 400, ease: 'outQuad' });
      }
      if (portraitImg) {
        animate(portraitImg, { opacity: 1, translateY: 0, duration: 400, ease: 'outQuad' });
      }
      if (heroLeft) {
        animate(heroLeft, { opacity: 1, translateY: 0, duration: 400, ease: 'outQuad' });
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
      if (entranceTl) {
        try {
          cleanInlineStyles(entranceTl);
        } catch {}
      }
      if (mouseListener) window.removeEventListener('mousemove', mouseListener);
      if (leaveListener) window.removeEventListener('mouseleave', leaveListener);
      if (scrollListener) window.removeEventListener('scroll', scrollListener);

      // Clean inline styles to prevent DOM pollution
      [circuitCanvas, eyebrow, disciplines, actions, portraitImg, hudBadge, hudPanel, heroLeft].forEach((el) => {
        resetElementStyles(el);
      });
      if (canvas3d) {
        canvas3d.style.opacity = '';
        canvas3d.style.transform = 'translate(-50%, -50%)';
      }
      nameLines.forEach((l) => resetElementStyles(l));
    },
    replay: () => {
      if (entranceTl) {
        entranceTl.restart();
      }
    },
  };
}

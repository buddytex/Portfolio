// ============================================================
// PORTRAIT MOTION & OPTICAL DEPTH
// Anime.js v4 Driven Hero Entrance, Restrained Parallax & Damped Pointer Depth
// ============================================================

import { animate, isReducedMotion } from '../motion';

export interface PortraitMotionController {
  destroy: () => void;
}

export function initPortraitMotion(container: HTMLElement = document.body): PortraitMotionController | null {
  if (typeof window === 'undefined') return null;

  const portraitWrap = container.querySelector<HTMLElement>('#portraitComposition');
  const portraitImg = container.querySelector<HTMLElement>('#heroPortraitImg');
  const atmosphere = container.querySelector<HTMLElement>('.portrait-atmosphere');
  const circuitHalo = container.querySelector<HTMLElement>('.portrait-circuit-halo');
  const circuitSvg = container.querySelector<HTMLElement>('.portrait-circuit-svg');

  if (!portraitWrap) return null;

  const isReduced = isReducedMotion();
  const isMobile = window.innerWidth < 768;

  // ------------------------------------------------------------
  // 1. ANIME.JS INITIAL LOAD ENTRANCE
  // ------------------------------------------------------------
  if (isReduced) {
    portraitWrap.style.opacity = '1';
    portraitWrap.style.transform = 'none';
    if (circuitHalo) circuitHalo.style.opacity = '1';
  } else {
    // Initial hidden state
    portraitWrap.style.opacity = '0';
    portraitWrap.style.transform = 'translate3d(0, 24px, 0) scale(0.97)';

    // Animate with Anime.js v4 outExpo
    animate(portraitWrap, {
      opacity: [0, 1],
      translateY: [24, 0],
      scale: [0.97, 1],
      duration: 950,
      delay: 350,
      ease: 'outExpo',
    });

    if (atmosphere) {
      animate(atmosphere, {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 1200,
        delay: 200,
        ease: 'outExpo',
      });
    }

    if (circuitHalo) {
      animate(circuitHalo, {
        opacity: [0, 1],
        scale: [1.05, 1],
        duration: 1200,
        delay: 450,
        ease: 'outExpo',
      });
    }

    if (circuitSvg) {
      animate(circuitSvg, {
        opacity: [0, 1],
        duration: 1100,
        delay: 500,
        ease: 'outExpo',
      });
    }
  }

  // ------------------------------------------------------------
  // 2. SCROLL PARALLAX (Subtle 20–30px Optical Depth)
  // ------------------------------------------------------------
  let scrollTicking = false;
  function handleScrollParallax() {
    scrollTicking = false;
    if (isReduced || isMobile || !portraitWrap) return;

    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    if (scrollY <= heroHeight * 1.3) {
      // Moves 25px slower than foreground content, with tiny 0.4° tilt
      const progress = scrollY / heroHeight;
      const parallaxY = progress * 32;
      const subtleTilt = progress * 0.4;
      const subtleScale = 1 - progress * 0.02;

      portraitWrap.style.transform = `translate3d(0, ${parallaxY.toFixed(1)}px, 0) scale(${subtleScale.toFixed(3)}) rotate(${subtleTilt.toFixed(2)}deg)`;
    }
  }

  function onScroll() {
    if (!scrollTicking && !isReduced && !isMobile) {
      scrollTicking = true;
      requestAnimationFrame(handleScrollParallax);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ------------------------------------------------------------
  // 3. RESTRAINED POINTER SHIFT (Desktop only, max 5px)
  // ------------------------------------------------------------
  let pointerTicking = false;
  let targetX = 0;
  let targetY = 0;

  function onMouseMove(e: MouseEvent) {
    if (isReduced || isMobile || !portraitImg) return;

    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.5;

    // Sub-6px displacement with subtle halo offset
    targetX = ((e.clientX - cx) / cx) * 5;
    targetY = ((e.clientY - cy) / cy) * 4;

    if (!pointerTicking) {
      pointerTicking = true;
      requestAnimationFrame(() => {
        if (portraitImg) {
          portraitImg.style.transform = `translate3d(${targetX.toFixed(2)}px, ${targetY.toFixed(2)}px, 0)`;
        }
        if (atmosphere) {
          atmosphere.style.transform = `translate3d(${(-targetX * 0.3).toFixed(2)}px, ${(-targetY * 0.3).toFixed(2)}px, 0)`;
        }
        pointerTicking = false;
      });
    }
  }

  function onMouseLeave() {
    if (portraitImg) portraitImg.style.transform = 'translate3d(0, 0, 0)';
    if (atmosphere) atmosphere.style.transform = 'translate3d(0, 0, 0)';
  }

  if (!isReduced && !isMobile) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
  }

  return {
    destroy: () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    },
  };
}
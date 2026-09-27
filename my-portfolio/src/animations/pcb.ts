// ============================================================
// PCB 3D SECTION & THREE.JS INTEGRATION
// Anime.js 4.5.x Architecture: Controlled Settling,
// Board Transition Choreography, & Restrained Examination Motion
// ============================================================

import {
  animate,
  onScroll,
  resetElementStyles,
  MOTION_TOKENS,
} from './core';
import { isReducedMotion } from './accessibility';

export interface PCBAnimationController {
  destroy: () => void;
  transitionBoard: (fromEl: HTMLElement, toEl: HTMLElement, onDone?: () => void) => void;
}

export function initPCBShowcaseAnimation(
  container: HTMLElement = document.getElementById('pcbShowcase')!
): PCBAnimationController | null {
  if (typeof window === 'undefined' || !container) return null;

  const headerBar = container.querySelector<HTMLElement>('.pcb-header-bar');
  const stageGrid = container.querySelector<HTMLElement>('.pcb-stage-grid');

  if (isReducedMotion()) {
    if (headerBar) headerBar.style.opacity = '1';
    if (stageGrid) stageGrid.style.opacity = '1';
    return {
      destroy: () => {},
      transitionBoard: (from, to, cb) => {
        from.hidden = true;
        from.classList.remove('active');
        to.hidden = false;
        to.classList.add('active');
        if (cb) cb();
      },
    };
  }

  // 1. Entrance reveal
  let observer: any = null;
  let io: IntersectionObserver | null = null;
  let hasRevealed = false;

  function revealPCB() {
    if (hasRevealed) {
      if (headerBar) {
        headerBar.style.opacity = '1';
        headerBar.style.transform = 'none';
      }
      if (stageGrid) {
        stageGrid.style.opacity = '1';
        stageGrid.style.transform = 'none';
      }
      return;
    }
    hasRevealed = true;
    if (headerBar) {
      animate(headerBar, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 380,
        ease: MOTION_TOKENS.easing.technical,
      });
    }
    if (stageGrid) {
      animate(stageGrid, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 520,
        delay: 100,
        ease: MOTION_TOKENS.easing.technical,
        onComplete: () => {
          if (headerBar) {
            headerBar.style.opacity = '1';
            headerBar.style.transform = 'none';
          }
          if (stageGrid) {
            stageGrid.style.opacity = '1';
            stageGrid.style.transform = 'none';
          }
        },
      });
    }
  }

  if (headerBar && stageGrid) {
    const rect = container.getBoundingClientRect();
    const initiallyInView = rect.top < window.innerHeight * 0.90 && rect.bottom > 0;

    if (initiallyInView) {
      revealPCB();
    } else {
      headerBar.style.opacity = '0';
      headerBar.style.transform = 'translateY(16px)';
      stageGrid.style.opacity = '0';
      stageGrid.style.transform = 'translateY(24px)';
    }

    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          revealPCB();
        }
      }, { rootMargin: '60px 0px', threshold: 0.05 });
      io.observe(container);
    }

    observer = onScroll({
      target: container,
      enter: 'top 82%',
      onEnter: () => {
        revealPCB();
      },
      onEnterBackward: () => {
        revealPCB();
      },
    });
  }

  return {
    destroy: () => {
      if (io) {
        try { io.disconnect(); } catch {}
        io = null;
      }
      if (observer) {
        try {
          observer.revert();
        } catch {}
      }
      if (headerBar) resetElementStyles(headerBar);
      if (stageGrid) resetElementStyles(stageGrid);
    },

    // Smooth board switching: fade-out old telemetry card -> fade-in new
    transitionBoard: (fromEl, toEl, onDone) => {
      animate(fromEl, {
        opacity: [1, 0],
        translateY: [0, -8],
        duration: 180,
        ease: 'outQuad',
        onComplete: () => {
          fromEl.hidden = true;
          fromEl.classList.remove('active');
          resetElementStyles(fromEl);

          toEl.hidden = false;
          toEl.classList.add('active');
          toEl.style.opacity = '0';
          toEl.style.transform = 'translateY(8px)';

          animate(toEl, {
            opacity: [0, 1],
            translateY: [8, 0],
            duration: 250,
            ease: MOTION_TOKENS.easing.technical,
            onComplete: () => {
              toEl.style.opacity = '1';
              toEl.style.transform = 'none';
              if (onDone) onDone();
            },
          });
        },
      });
    },
  };
}

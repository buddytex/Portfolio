// ============================================================
// ROLES ACCORDION & LAYOUT TRANSITION SYSTEM
// Anime.js 4.5.x createLayout() FLIP Integration
// Smooth continuous transformation without abrupt layout popping
// ============================================================

import {
  animate,
  createLayout,
  onScroll,
  stagger,
  resetElementStyles,
  MOTION_TOKENS,
} from './core';
import { isReducedMotion } from './accessibility';

export function initRolesAccordion(rolesContainer: HTMLElement = document.getElementById('roles')!): (() => void) | null {
  if (typeof window === 'undefined' || !rolesContainer) return null;

  const accordionRoot = rolesContainer.querySelector<HTMLElement>('.roles-accordion') || rolesContainer;
  const items = rolesContainer.querySelectorAll<HTMLElement>('.role-item, .role-row-item');
  if (!items.length) return null;

  let layoutEngine: any = null;
  if (!isReducedMotion()) {
    try {
      layoutEngine = createLayout(accordionRoot, {
        duration: MOTION_TOKENS.duration.normal,
        ease: MOTION_TOKENS.easing.technical,
      });
    } catch {
      // Graceful fallback
    }
  }

  function handleRoleClick(clickedItem: HTMLElement, btn: HTMLElement) {
    const isCurrentlyExpanded = clickedItem.classList.contains('is-expanded');

    // 1. Snapshot layout state before DOM mutation
    if (layoutEngine) {
      layoutEngine.record();
    }

    // 2. Accordion rule: close other roles
    items.forEach((item) => {
      if (item !== clickedItem && item.classList.contains('is-expanded')) {
        item.classList.remove('is-expanded');
        const otherBtn = item.querySelector<HTMLElement>('.role-row-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // 3. Toggle clicked item
    if (isCurrentlyExpanded) {
      clickedItem.classList.remove('is-expanded');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      clickedItem.classList.add('is-expanded');
      btn.setAttribute('aria-expanded', 'true');
    }

    // 4. Animate the continuous layout transformation
    if (layoutEngine) {
      layoutEngine.animate({
        duration: MOTION_TOKENS.duration.normal,
        ease: MOTION_TOKENS.easing.technical,
      });
    }

    // 5. Smoothly reveal expanded body content
    if (!isCurrentlyExpanded && !isReducedMotion()) {
      const body = clickedItem.querySelector<HTMLElement>('.role-expanded-body');
      if (body) {
        animate(body, {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 320,
          delay: 80,
          ease: 'outQuad',
        });
      }
    }
  }

  // Bind click handlers
  items.forEach((item) => {
    const btn = item.querySelector<HTMLElement>('.role-row-btn');
    if (!btn) return;

    btn.onclick = (e) => {
      e.preventDefault();
      handleRoleClick(item, btn);
    };
  });

  // Entrance reveal for roles section
  const revealNodes = rolesContainer.querySelectorAll<HTMLElement>('.scroll-reveal-node');
  let observer: any = null;
  let io: IntersectionObserver | null = null;
  let animInstance: any = null;
  let hasRevealed = false;

  function revealRoles() {
    if (hasRevealed) {
      revealNodes.forEach((n) => {
        n.classList.add('is-revealed');
        n.style.opacity = '1';
        n.style.transform = 'none';
      });
      return;
    }
    hasRevealed = true;
    if (animInstance) animInstance.revert();
    animInstance = animate(revealNodes, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: MOTION_TOKENS.duration.normal,
      delay: stagger(80),
      ease: MOTION_TOKENS.easing.technical,
      onComplete: () => {
        revealNodes.forEach((n) => {
          n.classList.add('is-revealed');
          n.style.opacity = '1';
          n.style.transform = 'none';
        });
      },
    });
  }

  if (!isReducedMotion()) {
    const rect = rolesContainer.getBoundingClientRect();
    const initiallyInView = rect.top < window.innerHeight * 0.90 && rect.bottom > 0;

    if (initiallyInView) {
      revealRoles();
    } else {
      revealNodes.forEach((node) => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(20px)';
      });
    }

    // Native IntersectionObserver guarantees reveal even during fast or virtual scrolling
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          revealRoles();
        }
      }, { rootMargin: '60px 0px', threshold: 0.05 });
      io.observe(rolesContainer);
    }

    observer = onScroll({
      target: rolesContainer,
      enter: 'top 82%',
      leave: 'bottom 15%',
      onEnter: () => {
        revealRoles();
      },
      onEnterBackward: () => {
        revealRoles();
      },
    });
  } else {
    revealNodes.forEach((node) => {
      node.classList.add('is-revealed');
      node.style.opacity = '1';
      node.style.transform = 'none';
    });
  }

  return () => {
    if (io) {
      try { io.disconnect(); } catch {}
      io = null;
    }
    if (observer) {
      try {
        observer.revert();
      } catch {}
    }
    if (animInstance) {
      try { animInstance.revert(); } catch {}
    }
    if (layoutEngine && typeof layoutEngine.revert === 'function') {
      layoutEngine.revert();
    }
    revealNodes.forEach((n) => resetElementStyles(n));
  };
}

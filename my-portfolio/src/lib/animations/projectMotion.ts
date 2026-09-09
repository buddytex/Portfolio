// ============================================================
// PROJECT CARDS & ARCHIVE FILTER MOTION CONTROLLER
// Anime.js v4 Staggered Entrances & Restrained Precision Hover
// ============================================================

import { animate, stagger, isReducedMotion } from '../motion';

export function initProjectCardsEntrance(container: HTMLElement | null): (() => void) | null {
  if (!container || typeof window === 'undefined') return null;

  const cards = container.querySelectorAll<HTMLElement>('.project-card');
  if (cards.length === 0) return null;

  if (isReducedMotion()) {
    cards.forEach((c) => {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
    return null;
  }

  // Staggered card entrance on scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(cards, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 650,
          delay: stagger(90),
          ease: 'outExpo',
        });
        observer.disconnect();
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  observer.observe(container);

  return () => observer.disconnect();
}

/**
 * Filter transitions for the /projects archive page
 */
export function filterArchiveCards(
  gridContainer: HTMLElement,
  selectedCategory: string,
  onCountUpdate?: (visibleCount: number) => void
) {
  const cards = gridContainer.querySelectorAll<HTMLElement>('.archive-card');
  if (cards.length === 0) return;

  const isReduced = isReducedMotion();
  let visibleCount = 0;
  const cardsToAnimateIn: HTMLElement[] = [];

  cards.forEach((card) => {
    const cardCat = card.dataset.category || '';
    const matches = selectedCategory === 'all' || cardCat.includes(selectedCategory);

    if (matches) {
      visibleCount++;
      card.style.display = 'flex';
      if (!isReduced) {
        cardsToAnimateIn.push(card);
      } else {
        card.style.opacity = '1';
        card.style.transform = 'none';
      }
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });

  if (!isReduced && cardsToAnimateIn.length > 0) {
    animate(cardsToAnimateIn, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 450,
      delay: stagger(60),
      ease: 'outExpo',
    });
  }

  if (onCountUpdate) {
    onCountUpdate(visibleCount);
  }
}

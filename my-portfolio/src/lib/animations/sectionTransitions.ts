// ============================================================
// SECTION TRANSITIONS — Sticky Headers & Scroll Continuity
// Uses Anime.js v4 for coordinated section transitions
// ============================================================

import { isReducedMotion } from '../motion';

interface SectionTransitionConfig {
  selector: string;
  headerSelector: string;
  id: string;
}

export const SECTION_CONFIGS: SectionTransitionConfig[] = [
  { selector: '#hero', headerSelector: '.section-header', id: 'hero' },
  { selector: '#work', headerSelector: '.section-header', id: 'work' },
  { selector: '#hardware', headerSelector: '.section-header', id: 'hardware' },
  { selector: '#skills', headerSelector: '.section-header', id: 'skills' },
  { selector: '#about', headerSelector: '.section-header', id: 'about' },
  { selector: '#contact', headerSelector: '.section-header', id: 'contact' },
];

export function initSectionTransitions(): (() => void) | void {
  if (typeof window === 'undefined') return;

  const isReduced = isReducedMotion();
  if (isReduced) return;

  const headers = new Map<string, HTMLElement>();
  let activeSectionId = 'hero';

  // Initialize header references
  SECTION_CONFIGS.forEach(config => {
    const section = document.querySelector<HTMLElement>(config.selector);
    const header = section?.querySelector<HTMLElement>(config.headerSelector);
    if (section && header) {
      headers.set(config.id, header);
      header.classList.add('is-entering');
      // Mark hero as visible initially
      if (config.id === 'hero') {
        header.classList.add('is-visible');
        header.classList.remove('is-entering');
      }
    }
  });

  // IntersectionObserver for section visibility
  const observerOptions: IntersectionObserverInit = {
    rootMargin: '-20% 0px -20% 0px',
    threshold: [0, 0.1, 0.5, 1],
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      const header = headers.get(sectionId);
      if (!header) return;

      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        // Section is becoming visible
        if (activeSectionId !== sectionId) {
          // Previous section leaving
          const prevHeader = headers.get(activeSectionId);
          if (prevHeader && prevHeader !== header) {
            prevHeader.classList.add('is-leaving');
            prevHeader.classList.remove('is-visible');
            setTimeout(() => {
              prevHeader.classList.remove('is-leaving');
            }, 400);
          }

          // New section entering
          header.classList.add('is-entering');
          header.classList.remove('is-leaving');
          
          // Animate entrance
          setTimeout(() => {
            header.classList.add('is-visible');
            header.classList.remove('is-entering');
          }, 50);

          activeSectionId = sectionId;
        }
      } else if (!entry.isIntersecting) {
        // Section is leaving
        if (activeSectionId === sectionId) {
          header.classList.add('is-leaving');
          header.classList.remove('is-visible');
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  SECTION_CONFIGS.forEach(config => {
    const section = document.querySelector(config.selector);
    if (section) observer.observe(section);
  });

  // Mark hero as visible initially
  const heroHeader = headers.get('hero');
  if (heroHeader) {
    heroHeader.classList.add('is-visible');
    heroHeader.classList.remove('is-entering');
  }

  // Scroll-based progress for finer transitions
  let ticking = false;
  function handleScrollProgress() {
    ticking = false;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    SECTION_CONFIGS.forEach(config => {
      const section = document.querySelector<HTMLElement>(config.selector);
      const header = headers.get(config.id);
      if (!section || !header) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Calculate how far into the section we are
      const progress = (scrollY + viewportHeight * 0.3 - sectionTop) / sectionHeight;
      
      if (progress > 0 && progress < 1) {
        // Section is in view - subtle parallax for header
        const parallaxY = progress * 20;
        header.style.transform = `translateY(${parallaxY}px)`;
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(handleScrollProgress);
    }
  }, { passive: true });

  // Cleanup function
  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', handleScrollProgress);
  };
}

export function destroySectionTransitions(): void {
  // The observer will be garbage collected
}
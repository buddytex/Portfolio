// ============================================================
// SCROLL ANIMATIONS SYSTEM — Section Transformation Engine
// Driven by Anime.js v4 onScroll & ScrollObserver
// Transforms the engineering field continuously across sections
// ============================================================

import { onScroll } from '../motion';
import type { EngineeringFieldController } from './engineeringField';

export interface SectionObserverConfig {
  id: string;
  selector: string;
  label: string;
}

export const SECTIONS: SectionObserverConfig[] = [
  { id: 'hero',     selector: '#hero',     label: 'ORIGIN' },
  { id: 'work',     selector: '#work',     label: 'PROJECTS' },
  { id: 'hardware', selector: '#hardware', label: 'HARDWARE' },
  { id: 'skills',   selector: '#skills',   label: 'EVIDENCE' },
  { id: 'about',    selector: '#about',    label: 'CHRONOLOGY' },
  { id: 'contact',  selector: '#contact',  label: 'DISPATCH' },
];

export function initScrollSystem(fieldController: EngineeringFieldController | null) {
  if (typeof window === 'undefined') return;

  const spineProgress = document.getElementById('datumSpineFill');
  const waypointNodes = document.querySelectorAll<HTMLElement>('.datum-node');
  const topBar = document.getElementById('scrollBar');

  let activeSectionId = 'hero';

  // Update visual markers
  function updateMarkers(activeId: string, globalProgress: number) {
    if (activeSectionId !== activeId) {
      activeSectionId = activeId;

      waypointNodes.forEach(node => {
        const targetId = node.dataset.section;
        const isActive = targetId === activeId;
        node.classList.toggle('active', isActive);
        node.setAttribute('aria-current', isActive ? 'step' : 'false');
      });

      // Transform engineering field state
      fieldController?.setSection(activeId, globalProgress);
    }

    if (spineProgress) {
      spineProgress.style.transform = `scaleY(${globalProgress.toFixed(3)})`;
    }

    if (topBar) {
      topBar.style.transform = `scaleX(${globalProgress.toFixed(3)})`;
    }
  }

  // Bind Anime.js v4 onScroll observer if supported, with fallback
  try {
    SECTIONS.forEach(({ id, selector }) => {
      const el = document.querySelector<HTMLElement>(selector);
      if (!el) return;

      onScroll({
        target: el,
        enter: 'top 60%',
        leave: 'bottom 40%',
        onEnterForward: () => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
          updateMarkers(id, progress);
        },
        onEnterBackward: () => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
          updateMarkers(id, progress);
        },
      });
    });
  } catch {
    // Standard event listener fallback for browsers without full scroll timeline support
  }

  // Continuous listener to ensure smooth datum spine interpolation
  let ticking = false;
  function handleScroll() {
    ticking = false;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

    const viewportMiddle = scrollY + window.innerHeight * 0.45;
    let currentId = 'hero';

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const sec = document.querySelector<HTMLElement>(SECTIONS[i].selector);
      if (sec && viewportMiddle >= sec.offsetTop - 80) {
        currentId = SECTIONS[i].id;
        break;
      }
    }

    updateMarkers(currentId, progress);
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(handleScroll);
    }
  }, { passive: true });

  // Initial pass
  handleScroll();
}

// ============================================================
// SCROLL TRACKER & PERSISTENT ANCHOR SYNCHRONIZER
// Continuous environment tracking across sections
// ============================================================

export interface SectionWaypoint {
  id: string;
  label: string;
  code: string;
  selector: string;
}

export const WAYPOINTS: SectionWaypoint[] = [
  { id: 'hero',    label: 'Origin',      code: '00 // ORG', selector: '#hero' },
  { id: 'work',    label: 'Projects',    code: '01 // SYS', selector: '#work' },
  { id: 'skills',  label: 'Competencies',code: '02 // EVD', selector: '#skills' },
  { id: 'about',   label: 'Chronology',  code: '03 // BIO', selector: '#about' },
  { id: 'contact', label: 'Dispatch',    code: '04 // COM', selector: '#contact' },
];

export function initScrollTracker(onSectionChange?: (activeId: string, progress: number) => void) {
  if (typeof window === 'undefined') return;

  const sectionElements = WAYPOINTS.map(w => ({
    ...w,
    element: document.querySelector(w.selector) as HTMLElement | null,
  }));

  const spineProgress = document.getElementById('datumSpineFill');
  const waypointNodes = document.querySelectorAll<HTMLElement>('.datum-node');

  let activeSectionId = 'hero';
  let ticking = false;

  function update() {
    ticking = false;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const globalProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

    // Update spine line fill
    if (spineProgress) {
      spineProgress.style.transform = `scaleY(${globalProgress})`;
    }

    // Determine active section using viewport center
    const viewportMiddle = scrollY + window.innerHeight * 0.45;
    let currentActive = WAYPOINTS[0].id;

    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const item = sectionElements[i];
      if (item.element) {
        const top = item.element.offsetTop;
        if (viewportMiddle >= top - 60) {
          currentActive = item.id;
          break;
        }
      }
    }

    if (currentActive !== activeSectionId) {
      activeSectionId = currentActive;

      // Update waypoint node highlights
      waypointNodes.forEach(node => {
        const targetId = node.dataset.section;
        const isActive = targetId === activeSectionId;
        node.classList.toggle('active', isActive);
        node.setAttribute('aria-current', isActive ? 'step' : 'false');
      });

      if (onSectionChange) {
        onSectionChange(activeSectionId, globalProgress);
      }
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

// ============================================================
// SECTION NAVIGATION CONTROLLER
// Full-screen discrete section navigation with Anime.js v4
// Wheel / Trackpad / Touch / Keyboard / Click navigation
// ============================================================

import { animate, isReducedMotion } from './motion';

interface SectionInfo {
  id: string;
  element: HTMLElement;
  label: string;
  tag: string;
}

interface NavOptions {
  sections: SectionInfo[];
  duration: number;
  ease: string;
  wheelThreshold: number;
  touchThreshold: number;
  lockDuration: number;
  reducedMotionDuration: number;
}

export class SectionNavigator {
  private sections: SectionInfo[] = [];
  private currentIndex = 0;
  private isTransitioning = false;
  private wheelAccumulator = 0;
  private touchStartY = 0;
  private touchStartTime = 0;
  private lastWheelTime = 0;
  private options: NavOptions;
  private datumNodes: NodeListOf<HTMLAnchorElement> | null = null;
  private cleanup: (() => void)[] = [];

  constructor(options: Partial<NavOptions> = {}) {
    this.options = {
      sections: [],
      duration: 480,
      ease: 'outExpo',
      wheelThreshold: 45,
      touchThreshold: 50,
      lockDuration: 480,
      reducedMotionDuration: 0,
      ...options,
    };
  }

  init(sections: SectionInfo[]) {
    this.sections = sections;
    this.datumNodes = document.querySelectorAll('.datum-node');
    this.bindEvents();
    this.updateIndicator();
    
    // Set initial section based on hash or default to hero
    const hash = window.location.hash.slice(1);
    if (hash) {
      const idx = this.sections.findIndex(s => s.id === hash);
      if (idx !== -1) {
        this.currentIndex = idx;
        this.scrollToSection(idx, false);
      }
    }
  }

  private bindEvents() {
    // Wheel navigation (mouse + trackpad)
    this.cleanup.push(this.addWheelListener());

    // Touch navigation
    this.cleanup.push(this.addTouchListener());

    // Keyboard navigation
    this.cleanup.push(this.addKeyboardListener());

    // Click navigation (datum spine, nav links, etc.)
    this.cleanup.push(this.addClickListener());

    // Handle hash changes
    window.addEventListener('hashchange', () => this.onHashChange());

    // Resize handler
    window.addEventListener('resize', () => this.onResize());
  }

  private addWheelListener() {
    let pendingDirection: 'up' | 'down' | null = null;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;

    const handler = (e: WheelEvent) => {
      if (this.isTransitioning) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      const direction = deltaY > 0 ? 'down' : 'up';
      
      // Accumulate wheel delta to distinguish gestures from noise
      this.wheelAccumulator += Math.abs(deltaY);
      this.lastWheelTime = Date.now();

      // Track consistent direction
      if (pendingDirection && pendingDirection !== direction) {
        this.wheelAccumulator = Math.abs(deltaY);
      }
      pendingDirection = direction;

      // Clear any pending timer
      if (wheelTimer) clearTimeout(wheelTimer);

      // Wait for gesture to complete (no wheel events for 100ms)
      wheelTimer = setTimeout(() => {
        if (this.wheelAccumulator >= this.options.wheelThreshold) {
          this.navigate(pendingDirection!);
        }
        this.wheelAccumulator = 0;
        pendingDirection = null;
      }, 100);

      e.preventDefault();
    };

    window.addEventListener('wheel', handler, { passive: false });
    return () => {
      window.removeEventListener('wheel', handler);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }

  private addTouchListener() {
    const handlerStart = (e: TouchEvent) => {
      if (this.isTransitioning) return;
      this.touchStartY = e.touches[0].clientY;
      this.touchStartTime = Date.now();
    };

    const handlerEnd = (e: TouchEvent) => {
      if (this.isTransitioning) return;
      const touch = e.changedTouches[0];
      const deltaY = this.touchStartY - touch.clientY;
      const deltaTime = Date.now() - this.touchStartTime;
      const velocity = Math.abs(deltaY) / deltaTime;

      if (Math.abs(deltaY) >= this.options.touchThreshold && velocity > 0.3) {
        const direction = deltaY > 0 ? 'up' : 'down';
        this.navigate(direction);
      }
    };

    window.addEventListener('touchstart', handlerStart, { passive: true });
    window.addEventListener('touchend', handlerEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handlerStart);
      window.removeEventListener('touchend', handlerEnd);
    };
  }

  private addKeyboardListener() {
    const handler = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (this.isTransitioning) {
        e.preventDefault();
        return;
      }

      const nextKeys = ['ArrowDown', 'ArrowRight', 'PageDown', 'Space'];
      const prevKeys = ['ArrowUp', 'ArrowLeft', 'PageUp'];
      const homeKeys = ['Home'];
      const endKeys = ['End'];

      if (nextKeys.includes(e.key)) {
        e.preventDefault();
        this.navigate('down');
      } else if (prevKeys.includes(e.key)) {
        e.preventDefault();
        this.navigate('up');
      } else if (homeKeys.includes(e.key)) {
        e.preventDefault();
        this.goToSection(0);
      } else if (endKeys.includes(e.key)) {
        e.preventDefault();
        this.goToSection(this.sections.length - 1);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }

  private addClickListener() {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement;
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;
      const hashIdx = href.indexOf('#');
      if (hashIdx === -1) return;
      const targetId = href.substring(hashIdx + 1);

      const targetSection = this.sections.find(s => s.id === targetId);
      if (targetSection) {
        e.preventDefault();
        const idx = this.sections.indexOf(targetSection);
        this.goToSection(idx);
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }

  private onHashChange() {
    if (this.isTransitioning) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const idx = this.sections.findIndex(s => s.id === hash);
    if (idx !== -1 && idx !== this.currentIndex) {
      this.goToSection(idx, false);
    }
  }

  private onResize() {
    // Re-position to current section on resize
    if (!this.isTransitioning) {
      this.scrollToSection(this.currentIndex, false);
    }
  }

  navigate(direction: 'up' | 'down') {
    const newIndex = direction === 'down' 
      ? Math.min(this.currentIndex + 1, this.sections.length - 1)
      : Math.max(this.currentIndex - 1, 0);

    if (newIndex !== this.currentIndex) {
      this.goToSection(newIndex);
    }
  }

  async goToSection(index: number, updateHash = true) {
    if (this.isTransitioning || index === this.currentIndex) return;
    if (index < 0 || index >= this.sections.length) return;

    this.isTransitioning = true;
    const previousIndex = this.currentIndex;
    this.currentIndex = index;

    const section = this.sections[index];
    
    // Update URL hash
    if (updateHash) {
      history.pushState(null, '', `#${section.id}`);
    }

    // Animate transition
    await this.animateTransition(previousIndex, index);

    // Update indicator
    this.updateIndicator();

    // Focus management for accessibility
    section.element.setAttribute('tabindex', '-1');
    section.element.focus({ preventScroll: true });

    // Unlock after lock duration
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.options.lockDuration);
  }

  private async animateTransition(fromIndex: number, toIndex: number): Promise<void> {
    const reduced = isReducedMotion();
    const duration = reduced ? this.options.reducedMotionDuration : this.options.duration;

    const fromSection = this.sections[fromIndex];
    const toSection = this.sections[toIndex];
    const direction = toIndex > fromIndex ? 'down' : 'up';

    if (reduced) {
      // Instant transition for reduced motion
      if (fromSection) {
        fromSection.element.style.opacity = '0';
        fromSection.element.style.pointerEvents = 'none';
      }
      toSection.element.style.opacity = '1';
      toSection.element.style.pointerEvents = 'auto';
      this.scrollToSection(toIndex, false);
      return;
    }

    // Fade out current, fade in target with slight slide
    const translateAmount = direction === 'down' ? 24 : -24;

    const fadeOutPromise = new Promise<void>(resolve => {
      if (!fromSection) {
        resolve();
        return;
      }
      animate(fromSection.element, {
        opacity: [1, 0],
        translateY: [0, -translateAmount],
        duration: duration * 0.45,
        ease: 'inExpo',
        onComplete: () => {
          fromSection.element.style.pointerEvents = 'none';
          resolve();
        },
      });
    });

    const fadeInPromise = new Promise<void>(resolve => {
      // Start target at offset position
      toSection.element.style.opacity = '0';
      toSection.element.style.transform = `translateY(${translateAmount}px)`;
      toSection.element.style.pointerEvents = 'auto';
      
      animate(toSection.element, {
        opacity: [0, 1],
        translateY: [translateAmount, 0],
        duration: duration,
        delay: duration * 0.15,
        ease: this.options.ease,
        onComplete: () => resolve(),
      });
    });

    await Promise.all([fadeOutPromise, fadeInPromise]);

    this.scrollToSection(toIndex, false);
  }

  scrollToSection(index: number, smooth = true) {
    const section = this.sections[index];
    if (!section) return;

    section.element.scrollIntoView({ 
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start',
    });
  }

  private updateIndicator() {
    if (!this.datumNodes) return;
    
    this.datumNodes.forEach((node, idx) => {
      const isActive = idx === this.currentIndex;
      node.classList.toggle('active', isActive);
      node.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    // Update spine fill
    const spineFill = document.getElementById('datumSpineFill');
    if (spineFill && this.sections.length > 1) {
      const progress = this.currentIndex / (this.sections.length - 1);
      spineFill.style.transform = `scaleY(${progress})`;
    }
  }

  destroy() {
    this.cleanup.forEach(fn => fn());
    this.cleanup = [];
  }
}

// Auto-initialize on DOM ready
export function initSectionNavigator() {
  const sections: SectionInfo[] = [];
  const sectionElements = document.querySelectorAll('section[id]');
  
  sectionElements.forEach(el => {
    const section = el as HTMLElement;
    const id = section.id;
    const label = section.getAttribute('aria-label') || id;
    // Extract tag from existing datum node
    const datumNode = document.querySelector(`.datum-node[data-section="${id}"]`);
    const tag = datumNode?.querySelector('.datum-tag')?.textContent || '';
    const labelText = datumNode?.querySelector('.datum-label')?.textContent || label;
    
    sections.push({
      id,
      element: section,
      label: labelText,
      tag,
    });
  });

  if (sections.length === 0) return null;

  const navigator = new SectionNavigator({
    duration: 480,
    ease: 'outExpo',
    wheelThreshold: 45,
    touchThreshold: 50,
    lockDuration: 480,
    reducedMotionDuration: 0,
  });

  navigator.init(sections);
  return navigator;
}
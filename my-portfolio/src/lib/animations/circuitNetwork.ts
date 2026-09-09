// ============================================================
// CIRCUIT NETWORK ANIMATION ENGINE
// Anime.js v4 Driven SVG Circuit Traces & Traveling Signal Pulses
// Progressive trace drawing via createDrawable()
// Precise path traversal via createMotionPath()
// ============================================================

import {
  animate,
  createDrawable,
  createMotionPath,
  isReducedMotion
} from '../motion';
import { CIRCUIT_ROUTES, type CircuitRoute } from '../../data/circuitRoutes';

export interface CircuitNetworkInstance {
  setIntensity: (intensity: number) => void;
  setPulseSpeed: (speedMultiplier: number) => void;
  setActiveSection: (section: string) => void;
  pause: () => void;
  resume: () => void;
  destroy: () => void;
}

export function initCircuitNetwork(svgElement: SVGSVGElement): CircuitNetworkInstance {
  const isReduced = isReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Track all running anime instances for clean teardown
  const runningAnimations: any[] = [];
  let isPaused = false;
  let currentIntensity = 0.4;
  let currentSpeedMultiplier = 1.0;
  let currentSection = 'hero';

  // Map of node elements for arrival flash triggers
  const nodeElements = new Map<string, SVGCircleElement>();
  svgElement.querySelectorAll<SVGCircleElement>('.circuit-via-pad, .circuit-node-dot').forEach((el) => {
    const id = el.dataset.nodeId;
    if (id) nodeElements.set(id, el);
  });

  // Map of trace path elements
  const traceElements = new Map<string, SVGPathElement>();
  svgElement.querySelectorAll<SVGPathElement>('.circuit-trace-path').forEach((el) => {
    const id = el.dataset.routeId;
    if (id) traceElements.set(id, el);
  });

  // Group for active pulse elements
  const pulseGroup = svgElement.querySelector<SVGGElement>('#pulseGroup');

  /**
   * Flash a connection node when a signal packet arrives
   */
  function flashNode(nodeId: string) {
    if (isReduced || isPaused) return;
    const nodeEl = nodeElements.get(nodeId);
    if (!nodeEl) return;

    try {
      const anim = animate(nodeEl, {
        r: [nodeEl.classList.contains('circuit-via-pad') ? 3 : 2, 5, 2.5],
        opacity: [0.5, 1, 0.5],
        duration: 400,
        ease: 'outQuad',
      });
      runningAnimations.push(anim);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Spawns a single traveling electrical pulse along a deterministic SVG path
   */
  function launchPulse(route: CircuitRoute) {
    if (isReduced || isPaused || !pulseGroup) return;

    const pathEl = traceElements.get(route.id);
    if (!pathEl) return;

    // Create pulse SVG group: cyan core + subtle halo
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'signal-pulse-group');
    g.setAttribute('opacity', (0.85 * currentIntensity).toFixed(2));

    const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    halo.setAttribute('r', '5');
    halo.setAttribute('fill', '#0EA5E9');
    halo.setAttribute('opacity', '0.22');

    const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    core.setAttribute('r', '2.2');
    core.setAttribute('fill', '#38BDF8');

    g.appendChild(halo);
    g.appendChild(core);
    pulseGroup.appendChild(g);

    try {
      // Anime.js v4 createMotionPath computes path progress functions
      const motion = createMotionPath(pathEl);
      const duration = Math.max(1200, Math.round(route.pulseSpeed / currentSpeedMultiplier));

      const anim = animate(g, {
        translateX: motion.translateX,
        translateY: motion.translateY,
        duration,
        ease: 'linear',
        onComplete: () => {
          // Remove DOM element
          g.remove();
          // Trigger node arrival reaction
          flashNode(route.endNode);
          // Chain next pulse after realistic pause
          if (!isPaused && !isReduced) {
            const baseDelay = isMobile ? 2200 : 1000;
            const nextDelay = baseDelay + Math.random() * (isMobile ? 3000 : 2500);
            const timer = setTimeout(() => {
              // Favor routes related to current active section
              const candidateRoutes = CIRCUIT_ROUTES.filter(
                r => r.section === currentSection || r.priority === 1
              );
              const nextRoute = candidateRoutes[Math.floor(Math.random() * candidateRoutes.length)] || route;
              launchPulse(nextRoute);
            }, nextDelay);
            runningAnimations.push({ pause: () => clearTimeout(timer), cancel: () => clearTimeout(timer) });
          }
        },
      });

      runningAnimations.push(anim);
    } catch {
      g.remove();
    }
  }

  /**
   * Initialize progressive drawing of circuit traces via Anime.js createDrawable()
   */
  function initProgressiveTraces() {
    if (isReduced) {
      // Instant reveal for reduced motion
      traceElements.forEach((pathEl) => {
        pathEl.style.opacity = '0.2';
      });
      return;
    }

    let delayCounter = 150;
    traceElements.forEach((pathEl, routeId) => {
      const route = CIRCUIT_ROUTES.find(r => r.id === routeId);
      const delay = route ? route.pulseDelay : delayCounter;
      delayCounter += 120;

      try {
        // Anime.js v4 createDrawable creates proxy with 'draw' attribute
        const drawables = createDrawable(pathEl, 0, 0);
        const anim = animate(drawables, {
          draw: '0 1',
          duration: 1800,
          delay: Math.min(delay, 2000),
          ease: 'outExpo',
          onComplete: () => {
            // Once trace is drawn, schedule its first traveling pulse if priority route
            if (route && (route.priority === 1 || Math.random() > 0.4)) {
              setTimeout(() => launchPulse(route), 300 + Math.random() * 1000);
            }
          }
        });
        runningAnimations.push(anim);
      } catch {
        pathEl.style.opacity = '0.2';
        if (route && route.priority === 1) {
          setTimeout(() => launchPulse(route), 500);
        }
      }
    });
  }

  // Kick off initial trace drawing
  initProgressiveTraces();

  return {
    setIntensity: (intensity: number) => {
      currentIntensity = intensity;
      pulseGroup?.setAttribute('opacity', Math.min(1, intensity * 1.5).toString());
    },
    setPulseSpeed: (speedMultiplier: number) => {
      currentSpeedMultiplier = Math.max(0.5, Math.min(3, speedMultiplier));
    },
    setActiveSection: (section: string) => {
      currentSection = section;
      // Gently adjust trace visibility per section
      traceElements.forEach((pathEl, routeId) => {
        const route = CIRCUIT_ROUTES.find(r => r.id === routeId);
        if (!route) return;
        const isActive = route.section === section;
        const targetOpacity = isActive ? 0.35 : 0.12;
        pathEl.style.transition = 'opacity 0.8s ease';
        pathEl.style.opacity = targetOpacity.toString();
      });
    },
    pause: () => {
      isPaused = true;
      runningAnimations.forEach(anim => {
        if (anim && typeof anim.pause === 'function') anim.pause();
      });
    },
    resume: () => {
      isPaused = false;
      runningAnimations.forEach(anim => {
        if (anim && typeof anim.play === 'function') anim.play();
      });
    },
    destroy: () => {
      isPaused = true;
      runningAnimations.forEach(anim => {
        if (anim) {
          if (typeof anim.cancel === 'function') anim.cancel();
          else if (typeof anim.pause === 'function') anim.pause();
        }
      });
      runningAnimations.length = 0;
      if (pulseGroup) pulseGroup.innerHTML = '';
    },
  };
}

// ============================================================
// HERO CIRCUIT FIELD — Maximalist Multi-Layer Engineering Signal Network
// Anime.js v4: createMotionPath for pulses, createDrawable for trace drawing
// Shared state object for scroll-driven transitions
// ============================================================

import {
  animate,
  createMotionPath,
  createDrawable,
  isReducedMotion
} from '../motion';

export interface HeroCircuitState {
  scrollProgress: number;
  intensity: number;
  pulseSpeed: number;
  cursorX: number;
  cursorY: number;
  cursorActive: boolean;
}

export const heroCircuitState: HeroCircuitState = {
  scrollProgress: 0,
  intensity: 1,
  pulseSpeed: 1,
  cursorX: 0.5,
  cursorY: 0.5,
  cursorActive: false,
};

export interface HeroCircuitController {
  setScrollProgress: (progress: number) => void;
  setCursorPosition: (x: number, y: number, active: boolean) => void;
  destroy: () => void;
}

interface TraceLayer {
  elements: SVGPathElement[];
  baseOpacity: number;
}

interface NodeLayer {
  elements: SVGCircleElement[];
  baseOpacity: number;
  baseRadius: number;
}

export async function initHeroCircuitField(container: HTMLElement): Promise<HeroCircuitController | null> {
  if (typeof window === 'undefined') return null;

  const isReduced = isReducedMotion();
  const isMobile = window.innerWidth < 768;

  // Create the SVG field
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'circuit-field-svg');
  svg.setAttribute('viewBox', '0 0 1920 1080');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.setAttribute('fill', 'none');
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.position = 'absolute';
  svg.style.inset = '0';
  container.appendChild(svg);

  // Generate maximalist circuit geometry
  const { traces, nodes } = generateCircuitGeometry(isMobile);
  
  // Build SVG layers
  const traceLayers: TraceLayer[] = [];
  const nodeLayers: NodeLayer[] = [];

  // LAYER 1: Major traces (thick, deliberate paths)
  const majorGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  majorGroup.classList.add('trace-major-layer');
  const majorTraces: SVGPathElement[] = [];
  traces.major.forEach((pathData) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('class', 'trace-path trace-major');
    path.setAttribute('stroke', 'var(--circuit-trace-major)');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('fill', 'none');
    path.setAttribute('vector-effect', 'non-scaling-stroke');
    path.style.opacity = '0';
    path.style.transition = 'opacity 1.2s ease, stroke 0.4s ease';
    majorGroup.appendChild(path);
    majorTraces.push(path);
  });
  svg.appendChild(majorGroup);
  traceLayers.push({ elements: majorTraces, baseOpacity: 0.5 });

  // LAYER 2: Secondary traces (thinner, denser)
  if (!isMobile) {
    const secondaryGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    secondaryGroup.classList.add('trace-secondary-layer');
    const secondaryTraces: SVGPathElement[] = [];
    traces.secondary.forEach((pathData) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('class', 'trace-path trace-secondary');
      path.setAttribute('stroke', 'var(--circuit-trace-secondary)');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('fill', 'none');
      path.setAttribute('vector-effect', 'non-scaling-stroke');
      path.style.opacity = '0';
      path.style.transition = 'opacity 1s ease, stroke 0.4s ease';
      secondaryGroup.appendChild(path);
      secondaryTraces.push(path);
    });
    svg.appendChild(secondaryGroup);
    traceLayers.push({ elements: secondaryTraces, baseOpacity: 0.3 });
  }

  // LAYER 3: Micro geometry (tiny nodes, junctions)
  const microGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  microGroup.classList.add('trace-micro-layer');
  const microTraces: SVGPathElement[] = [];
  traces.micro.forEach((pathData) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('class', 'trace-path trace-micro');
    path.setAttribute('stroke', 'var(--circuit-trace-micro)');
    path.setAttribute('stroke-width', '0.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('fill', 'none');
    path.setAttribute('vector-effect', 'non-scaling-stroke');
    path.style.opacity = '0';
    path.style.transition = 'opacity 0.8s ease';
    microGroup.appendChild(path);
    microTraces.push(path);
  });
  svg.appendChild(microGroup);
  traceLayers.push({ elements: microTraces, baseOpacity: 0.15 });

  // LAYER 4: Nodes - Primary (larger junctions)
  const primaryNodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  primaryNodeGroup.classList.add('node-primary-layer');
  const primaryNodes: SVGCircleElement[] = [];
  nodes.primary.forEach((node) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x.toString());
    circle.setAttribute('cy', node.y.toString());
    circle.setAttribute('r', '3.5');
    circle.setAttribute('class', 'node-point node-primary');
    circle.setAttribute('fill', 'var(--circuit-node-primary)');
    circle.style.opacity = '0';
    circle.style.transition = 'opacity 0.6s ease, r 0.3s ease, fill 0.3s ease';
    primaryNodeGroup.appendChild(circle);
    primaryNodes.push(circle);
  });
  svg.appendChild(primaryNodeGroup);
  nodeLayers.push({ elements: primaryNodes, baseOpacity: 0.8, baseRadius: 3.5 });

  // LAYER 5: Nodes - Secondary
  if (!isMobile) {
    const secondaryNodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    secondaryNodeGroup.classList.add('node-secondary-layer');
    const secondaryNodes: SVGCircleElement[] = [];
    nodes.secondary.forEach((node) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', '2');
      circle.setAttribute('class', 'node-point node-secondary');
      circle.setAttribute('fill', 'var(--circuit-node-secondary)');
      circle.style.opacity = '0';
      circle.style.transition = 'opacity 0.5s ease, r 0.3s ease';
      secondaryNodeGroup.appendChild(circle);
      secondaryNodes.push(circle);
    });
    svg.appendChild(secondaryNodeGroup);
    nodeLayers.push({ elements: secondaryNodes, baseOpacity: 0.5, baseRadius: 2 });
  }

  // LAYER 6: Nodes - Micro
  if (!isMobile) {
    const microNodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    microNodeGroup.classList.add('node-micro-layer');
    const microNodes: SVGCircleElement[] = [];
    nodes.micro.forEach((node) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', '1');
      circle.setAttribute('class', 'node-point node-micro');
      circle.setAttribute('fill', 'var(--circuit-node-secondary)');
      circle.style.opacity = '0';
      circle.style.transition = 'opacity 0.4s ease';
      microNodeGroup.appendChild(circle);
      microNodes.push(circle);
    });
    svg.appendChild(microNodeGroup);
    nodeLayers.push({ elements: microNodes, baseOpacity: 0.3, baseRadius: 1 });
  }

  // Pulse group
  const pulseGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  pulseGroup.classList.add('pulse-group');
  svg.appendChild(pulseGroup);

  // Animation state
  let isPaused = false;
  let currentIntensity = 1;
  let currentSpeedMultiplier = 1;
  let rafId: number | null = null;
  let pulseTimers: ReturnType<typeof setTimeout>[] = [];
  let drawAnimations: any[] = [];

  // Progressive drawing of traces using createDrawable
  async function initProgressiveDrawing() {
    if (isReduced) {
      traceLayers.forEach(layer => {
        layer.elements.forEach(el => {
          el.style.opacity = (layer.baseOpacity * 0.8).toString();
        });
      });
      nodeLayers.forEach(layer => {
        layer.elements.forEach(el => {
          el.style.opacity = (layer.baseOpacity * 0.8).toString();
        });
      });
      return;
    }

    // Staggered drawing of all trace layers
    const allTraces = traceLayers.flatMap(l => l.elements);
    const delayStep = 80;
    let delayCounter = 200;

    for (const pathEl of allTraces) {
      try {
        const drawables = createDrawable(pathEl, 0, 0);
        const anim = animate(drawables, {
          draw: '0 1',
          duration: 1800,
          delay: Math.min(delayCounter, 3000),
          ease: 'outExpo',
        });
        drawAnimations.push(anim);
        delayCounter += delayStep;
      } catch {
        pathEl.style.opacity = '0.15';
      }
    }

    // Fade in nodes after traces start
    setTimeout(() => {
      nodeLayers.forEach(layer => {
        layer.elements.forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = (layer.baseOpacity * heroCircuitState.intensity).toString();
          }, i * 30);
        });
      });
    }, 600);

    // Start pulse system after initial draw
    setTimeout(() => {
      if (!isPaused && !isReduced) {
        startPulseSystem();
      }
    }, 2000);
  }

  // Pulse system using createMotionPath
  function startPulseSystem() {
    const activeRoutes = [...traces.major, ...(isMobile ? [] : traces.secondary)];
    
    function launchPulse() {
      if (isPaused || isReduced) return;
      
      const route = activeRoutes[Math.floor(Math.random() * activeRoutes.length)];
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', route);
      pathEl.style.display = 'none';
      svg.appendChild(pathEl);

      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      pulse.classList.add('signal-pulse');
      
      const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      halo.setAttribute('r', '5');
      halo.setAttribute('class', 'pulse-halo');
      
      const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      core.setAttribute('r', '2.2');
      core.setAttribute('class', 'pulse-core');
      
      pulse.appendChild(halo);
      pulse.appendChild(core);
      pulseGroup.appendChild(pulse);

      try {
        const motion = createMotionPath(pathEl);
        const duration = Math.max(2000, Math.round(3500 / currentSpeedMultiplier * currentIntensity));

        const anim = animate(pulse, {
          translateX: motion.translateX,
          translateY: motion.translateY,
          duration,
          ease: 'linear',
          onComplete: () => {
            pulse.remove();
            pathEl.remove();
            // Flash nearby nodes
            flashNearbyNodes(route);
            // Schedule next pulse
            if (!isPaused && !isReduced) {
              const baseDelay = isMobile ? 3000 : 1800;
              const nextDelay = baseDelay + Math.random() * (isMobile ? 4000 : 3000);
              const timer = setTimeout(launchPulse, nextDelay);
              pulseTimers.push(timer);
            }
          },
        });
        drawAnimations.push(anim);
      } catch {
        pulse.remove();
        pathEl.remove();
      }
    }

    // Launch initial pulses
    const initialPulses = isMobile ? 1 : 3;
    for (let i = 0; i < initialPulses; i++) {
      const timer = setTimeout(launchPulse, 500 + i * 800);
      pulseTimers.push(timer);
    }
  }

  function flashNearbyNodes(_routePath: string) {
    // Simple proximity flash - in a real implementation, compute actual distance
    nodeLayers.forEach(layer => {
      layer.elements.forEach(node => {
        if (Math.random() > 0.85) {
          animate(node, {
            r: [layer.baseRadius, layer.baseRadius * 2.5, layer.baseRadius],
            opacity: [layer.baseOpacity, 1, layer.baseOpacity],
            duration: 300,
            ease: 'outQuad',
          });
        }
      });
    });
  }

  // Apply state to visual layers
  function applyState() {
    const progress = heroCircuitState.scrollProgress;
    const intensity = heroCircuitState.intensity;

    // Scroll-based fade out transition
    if (progress > 0.08) {
      const fadeProgress = Math.min(1, (progress - 0.08) / 0.35);
      
      // Secondary traces fade first
      traceLayers.slice(1).forEach(layer => {
        layer.elements.forEach(el => {
          el.style.opacity = (layer.baseOpacity * intensity * (1 - fadeProgress * 1.5)).toString();
        });
      });

      // Micro traces fade
      if (traceLayers[2]) {
        traceLayers[2].elements.forEach(el => {
          el.style.opacity = (traceLayers[2].baseOpacity * intensity * (1 - fadeProgress * 2)).toString();
        });
      }

      // Micro nodes fade
      nodeLayers.slice(1).forEach(layer => {
        layer.elements.forEach(el => {
          el.style.opacity = (layer.baseOpacity * intensity * (1 - fadeProgress * 1.8)).toString();
        });
      });

      // Pulse intensity reduces
      pulseGroup.style.opacity = (intensity * (1 - fadeProgress)).toString();

      // Major traces persist longer
      traceLayers[0].elements.forEach(el => {
        el.style.opacity = (traceLayers[0].baseOpacity * intensity * (1 - fadeProgress * 0.3)).toString();
      });

      // Primary nodes persist
      nodeLayers[0].elements.forEach(el => {
        el.style.opacity = (nodeLayers[0].baseOpacity * intensity * (1 - fadeProgress * 0.2)).toString();
      });

      // Add transition classes for CSS coordination
      if (fadeProgress > 0.1 && !svg.classList.contains('hero-circuit-fading')) {
        svg.classList.add('hero-circuit-fading');
      }
      if (fadeProgress > 0.85 && !svg.classList.contains('hero-circuit-gone')) {
        svg.classList.add('hero-circuit-gone');
      }
    } else {
      // Hero active state
      traceLayers.forEach(layer => {
        layer.elements.forEach(el => {
          el.style.opacity = (layer.baseOpacity * intensity).toString();
        });
      });
      nodeLayers.forEach(layer => {
        layer.elements.forEach(el => {
          el.style.opacity = (layer.baseOpacity * intensity).toString();
        });
      });
      pulseGroup.style.opacity = intensity.toString();
      svg.classList.remove('hero-circuit-fading', 'hero-circuit-gone');
    }

    // Cursor interaction - subtle node attraction
    if (heroCircuitState.cursorActive && !isReduced) {
      const cursorX = heroCircuitState.cursorX * 1920;
      const cursorY = heroCircuitState.cursorY * 1080;
      const influenceRadius = 200;

      nodeLayers.forEach(layer => {
        layer.elements.forEach(node => {
          const nx = parseFloat(node.getAttribute('cx') || '0');
          const ny = parseFloat(node.getAttribute('cy') || '0');
          const dx = cursorX - nx;
          const dy = cursorY - ny;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < influenceRadius) {
            const influence = 1 - dist / influenceRadius;
            const targetR = layer.baseRadius * (1 + influence * 0.4);
            const targetOpacity = Math.min(1, layer.baseOpacity * (1 + influence * 0.8));
            
            node.style.transition = 'r 0.15s ease-out, opacity 0.15s ease-out';
            node.setAttribute('r', targetR.toFixed(2));
            node.style.opacity = targetOpacity.toString();
            
            // Subtle trace glow near cursor (placeholder for future path proximity)
            // traceLayers[0].elements.forEach(_trace => {
            //   Would need path length calculation for precise proximity
            // });
          } else {
            node.style.transition = 'r 0.3s ease-out, opacity 0.3s ease-out';
            node.setAttribute('r', layer.baseRadius.toString());
            node.style.opacity = (layer.baseOpacity * intensity).toString();
          }
        });
      });
    }
  }

  // Throttled apply for cursor
  let lastApply = 0;
  function throttledApply() {
    const now = performance.now();
    if (now - lastApply > 16) {
      lastApply = now;
      applyState();
    }
    if (!isPaused) {
      rafId = requestAnimationFrame(throttledApply);
    }
  }

  // Start the render loop
  applyState();
  if (!isReduced) {
    rafId = requestAnimationFrame(throttledApply);
  }
  await initProgressiveDrawing();

  return {
    setScrollProgress: (progress: number) => {
      heroCircuitState.scrollProgress = Math.max(0, Math.min(1, progress));
    },
    setCursorPosition: (x: number, y: number, active: boolean) => {
      heroCircuitState.cursorX = Math.max(0, Math.min(1, x));
      heroCircuitState.cursorY = Math.max(0, Math.min(1, y));
      heroCircuitState.cursorActive = active;
    },
    destroy: () => {
      isPaused = true;
      if (rafId) cancelAnimationFrame(rafId);
      pulseTimers.forEach(t => clearTimeout(t));
      drawAnimations.forEach(a => {
        if (a && typeof a.cancel === 'function') a.cancel();
      });
      pulseGroup.innerHTML = '';
      svg.remove();
    },
  };
}

function generateCircuitGeometry(isMobile: boolean) {
  const traces = {
    major: [] as string[],
    secondary: [] as string[],
    micro: [] as string[],
  };
  const nodes = {
    primary: [] as { x: number; y: number }[],
    secondary: [] as { x: number; y: number }[],
    micro: [] as { x: number; y: number }[],
  };

  const width = 1920;
  const centerX = width / 2;
  // const centerY = 540; // height / 2; // Reserved for future use

  // Helper to add node
  function addNode(layer: 'primary' | 'secondary' | 'micro', x: number, y: number) {
    nodes[layer].push({ x, y });
  }

  // Helper for 90/45 degree routing
  function routePath(points: { x: number; y: number }[]): string {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      // 90 degree turns
      if (prev.x !== curr.x && prev.y !== curr.y) {
        // Add intermediate corner point
        const midX = curr.x;
        const midY = prev.y;
        d += ` L ${midX} ${midY} L ${curr.x} ${curr.y}`;
      } else {
        d += ` L ${curr.x} ${curr.y}`;
      }
    }
    return d;
  }

  // ===== MAJOR TRACES - Deliberate architectural routes =====
  
  // Top horizontal bus (left to right, above portrait area)
  traces.major.push(routePath([
    { x: 100, y: 140 },
    { x: 400, y: 140 },
    { x: 500, y: 200 },
    { x: 700, y: 200 },
  ]));
  addNode('primary', 100, 140);
  addNode('primary', 500, 200);
  addNode('primary', 700, 200);

  // Right vertical descent (frames portrait right side)
  traces.major.push(routePath([
    { x: 700, y: 200 },
    { x: 700, y: 450 },
    { x: 600, y: 500 },
    { x: 450, y: 500 },
  ]));
  addNode('primary', 700, 450);
  addNode('primary', 450, 500);

  // Bottom horizontal feed (leads toward projects)
  traces.major.push(routePath([
    { x: 450, y: 500 },
    { x: 200, y: 500 },
    { x: 150, y: 580 },
    { x: 100, y: 650 },
  ]));
  addNode('primary', 200, 500);
  addNode('primary', 100, 650);

  // Left vertical ascent
  traces.major.push(routePath([
    { x: 100, y: 650 },
    { x: 100, y: 400 },
    { x: 180, y: 350 },
    { x: 300, y: 350 },
  ]));
  addNode('primary', 100, 400);
  addNode('primary', 300, 350);

  // Central spine (vertical through center, behind portrait)
  traces.major.push(routePath([
    { x: centerX, y: 100 },
    { x: centerX, y: 300 },
    { x: centerX, y: 550 },
    { x: centerX, y: 850 },
  ]));
  addNode('primary', centerX, 100);
  addNode('primary', centerX, 300);
  addNode('primary', centerX, 550);
  addNode('primary', centerX, 850);

  // Right-side parallel bus
  traces.major.push(routePath([
    { x: 1400, y: 180 },
    { x: 1400, y: 400 },
    { x: 1300, y: 480 },
    { x: 1100, y: 480 },
  ]));
  addNode('primary', 1400, 180);
  addNode('primary', 1400, 400);
  addNode('primary', 1100, 480);

  // Diagonal connector (45 degree)
  traces.major.push(routePath([
    { x: 700, y: 200 },
    { x: 900, y: 320 },
    { x: 1100, y: 320 },
  ]));
  addNode('primary', 900, 320);

  // Lower cross connection
  traces.major.push(routePath([
    { x: 300, y: 350 },
    { x: 500, y: 350 },
    { x: 500, y: 450 },
    { x: 600, y: 500 },
  ]));
  addNode('primary', 500, 350);
  addNode('primary', 500, 450);

  // ===== SECONDARY TRACES - Supporting density =====
  if (!isMobile) {
    // Upper left mesh
    traces.secondary.push(routePath([
      { x: 180, y: 200 },
      { x: 280, y: 200 },
      { x: 280, y: 280 },
      { x: 220, y: 280 },
    ]));
    addNode('secondary', 180, 200);
    addNode('secondary', 280, 280);

    // Upper right mesh
    traces.secondary.push(routePath([
      { x: 1200, y: 180 },
      { x: 1320, y: 180 },
      { x: 1320, y: 260 },
      { x: 1250, y: 260 },
    ]));
    addNode('secondary', 1200, 180);
    addNode('secondary', 1320, 260);

    // Mid horizontal connectors
    traces.secondary.push(routePath([
      { x: 400, y: 300 },
      { x: 600, y: 300 },
    ]));
    traces.secondary.push(routePath([
      { x: 900, y: 380 },
      { x: 1100, y: 380 },
    ]));

    // Lower left fan
    traces.secondary.push(routePath([
      { x: 150, y: 520 },
      { x: 150, y: 620 },
      { x: 220, y: 620 },
    ]));
    addNode('secondary', 150, 520);
    addNode('secondary', 220, 620);

    // Lower right fan
    traces.secondary.push(routePath([
      { x: 1200, y: 520 },
      { x: 1200, y: 620 },
      { x: 1100, y: 620 },
    ]));
    addNode('secondary', 1200, 520);
    addNode('secondary', 1100, 620);

    // Small loops and branches
    traces.secondary.push(routePath([
      { x: 550, y: 250 },
      { x: 600, y: 250 },
      { x: 600, y: 280 },
      { x: 550, y: 280 },
      { x: 550, y: 250 },
    ]));
    addNode('secondary', 550, 250);
    addNode('secondary', 600, 280);

    traces.secondary.push(routePath([
      { x: 1000, y: 420 },
      { x: 1050, y: 420 },
      { x: 1050, y: 460 },
      { x: 1000, y: 460 },
      { x: 1000, y: 420 },
    ]));
    addNode('secondary', 1000, 420);
    addNode('secondary', 1050, 460);
  }

  // ===== MICRO GEOMETRY - Dense detail layer =====
  if (!isMobile) {
    // Grid of micro connection points
    for (let gx = 200; gx < 1720; gx += 180) {
      for (let gy = 200; gy < 900; gy += 160) {
        // Small square junctions
        traces.micro.push(routePath([
          { x: gx - 10, y: gy - 10 },
          { x: gx + 10, y: gy - 10 },
          { x: gx + 10, y: gy + 10 },
          { x: gx - 10, y: gy + 10 },
          { x: gx - 10, y: gy - 10 },
        ]));
        addNode('micro', gx, gy);
      }
    }

    // Micro connectors between major nodes
    traces.micro.push(routePath([{ x: 350, y: 220 }, { x: 350, y: 280 }]));
    traces.micro.push(routePath([{ x: 650, y: 320 }, { x: 650, y: 380 }]));
    traces.micro.push(routePath([{ x: 950, y: 280 }, { x: 950, y: 340 }]));
    traces.micro.push(routePath([{ x: 250, y: 400 }, { x: 250, y: 460 }]));
    traces.micro.push(routePath([{ x: 1150, y: 420 }, { x: 1150, y: 480 }]));
    traces.micro.push(routePath([{ x: 400, y: 520 }, { x: 400, y: 580 }]));
    traces.micro.push(routePath([{ x: 1200, y: 580 }, { x: 1200, y: 640 }]));

    // Tiny corner brackets
    traces.micro.push(routePath([{ x: 120, y: 160 }, { x: 160, y: 160 }]));
    traces.micro.push(routePath([{ x: 160, y: 160 }, { x: 160, y: 120 }]));
    traces.micro.push(routePath([{ x: 1760, y: 160 }, { x: 1800, y: 160 }]));
    traces.micro.push(routePath([{ x: 1760, y: 160 }, { x: 1760, y: 120 }]));
    traces.micro.push(routePath([{ x: 120, y: 960 }, { x: 160, y: 960 }]));
    traces.micro.push(routePath([{ x: 160, y: 960 }, { x: 160, y: 1000 }]));
    traces.micro.push(routePath([{ x: 1760, y: 960 }, { x: 1800, y: 960 }]));
    traces.micro.push(routePath([{ x: 1760, y: 960 }, { x: 1760, y: 1000 }]));
  }

  return { traces, nodes };
}
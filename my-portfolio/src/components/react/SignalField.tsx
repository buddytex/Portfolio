import { useEffect, useRef, useState } from 'react';
import { animate, createMotionPath, createDrawable, isReducedMotion } from '../../lib/motion';

interface TraceLayer {
  elements: SVGPathElement[];
  baseOpacity: number;
}

interface NodeLayer {
  elements: SVGCircleElement[];
  baseOpacity: number;
  baseRadius: number;
}

interface Point {
  x: number;
  y: number;
}

interface CircuitGeometry {
  traces: {
    major: string[];
    secondary: string[];
    micro: string[];
  };
  nodes: {
    primary: Point[];
    secondary: Point[];
    micro: Point[];
  };
}

export interface SignalFieldProps {
  className?: string;
}

export const SignalField: React.FC<SignalFieldProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsMobile(window.innerWidth < 768);
    setIsReduced(isReducedMotion());
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isReduced) return;
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const container = containerRef.current;
    
    // Generate circuit geometry
    const { traces, nodes } = generateCircuitGeometry(isMobile);
    
    // Track layers for animation
    const traceLayers: TraceLayer[] = [];
    const nodeLayers: NodeLayer[] = [];
    let isPaused = false;
    let rafId: number | null = null;
    let pulseTimers: ReturnType<typeof setTimeout>[] = [];
    let drawAnimations: any[] = [];
    
    // Create layers
    // LAYER 1: Major traces
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

    // LAYER 2: Secondary traces
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

    // LAYER 3: Micro traces
    if (!isMobile) {
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
    }

    // LAYER 4: Primary nodes
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

    // LAYER 5: Secondary nodes
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

    // LAYER 6: Micro nodes
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

    // Initialize progressive drawing
    initProgressiveDrawing();

    // Progressive drawing of traces
    async function initProgressiveDrawing() {
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
              el.style.opacity = (layer.baseOpacity).toString();
            }, i * 30);
          });
        });
      }, 600);

      // Start pulse system
      setTimeout(() => {
        if (!isPaused) startPulseSystem();
      }, 2000);
    }

    // Pulse system
    function startPulseSystem() {
      const activeRoutes = [...traces.major, ...(isMobile ? [] : traces.secondary)];
      
      function launchPulse() {
        if (isPaused) return;
        
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
          const duration = Math.max(2000, Math.round(3500));

          const anim = animate(pulse, {
            translateX: motion.translateX,
            translateY: motion.translateY,
            duration,
            ease: 'linear',
            onComplete: () => {
              pulse.remove();
              pathEl.remove();
              flashNearbyNodes(route);
              if (!isPaused) {
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

      const initialPulses = isMobile ? 1 : 3;
      for (let i = 0; i < initialPulses; i++) {
        const timer = setTimeout(launchPulse, 500 + i * 800);
        pulseTimers.push(timer);
      }
    }

    function flashNearbyNodes(_routePath: string) {
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

    // Apply state to visual layers (scroll-driven)
    function applyState() {
      // We'll use a simple scroll-based fade
      const scrollY = window.scrollY;
      const heroHeight = document.getElementById('hero')?.offsetHeight || window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / heroHeight));
      const intensity = 1;

      // Scroll-based fade out transition
      if (progress > 0.08) {
        const fadeProgress = Math.min(1, (progress - 0.08) / 0.35);
        
        traceLayers.slice(1).forEach(layer => {
          layer.elements.forEach(el => {
            el.style.opacity = (layer.baseOpacity * intensity * (1 - fadeProgress * 1.5)).toString();
          });
        });

        if (traceLayers[2]) {
          traceLayers[2].elements.forEach(el => {
            el.style.opacity = (traceLayers[2].baseOpacity * intensity * (1 - fadeProgress * 2)).toString();
          });
        }

nodeLayers.slice(1).forEach(layer => {
          layer.elements.forEach(el => {
            el.style.opacity = (layer.baseOpacity * intensity * (1 - fadeProgress * 1.8)).toString();
          });
        });

        const computedOpacity: string = (intensity * (1 - fadeProgress)).toString();
        pulseGroup.style.opacity = computedOpacity;

        traceLayers[0].elements.forEach(el => {
          el.style.opacity = (traceLayers[0].baseOpacity * intensity * (1 - fadeProgress * 0.3)).toString();
        });

        nodeLayers[0].elements.forEach(el => {
          el.style.opacity = (nodeLayers[0].baseOpacity * intensity * (1 - fadeProgress * 0.2)).toString();
        });
      } else {
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
      }
    }

    // Throttled apply for scroll
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

    applyState();
    rafId = requestAnimationFrame(throttledApply);

    // Cleanup
    return () => {
      isPaused = true;
      if (rafId) cancelAnimationFrame(rafId);
      pulseTimers.forEach(t => clearTimeout(t));
      drawAnimations.forEach(a => {
        if (a && typeof a.cancel === 'function') a.cancel();
      });
      pulseGroup.innerHTML = '';
    };
  }, [isMobile, isReduced]);

  return (
    <div 
      ref={containerRef} 
      className={`circuit-field-container ${className}`}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        className="circuit-field-svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="portalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--cyan-electric)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

function generateCircuitGeometry(isMobile: boolean): CircuitGeometry {
  const traces = {
    major: [] as string[],
    secondary: [] as string[],
    micro: [] as string[],
  };
  const nodes = {
    primary: [] as Point[],
    secondary: [] as Point[],
    micro: [] as Point[],
  };

  const width = 1920;
  const centerX = width / 2;

  function addNode(layer: 'primary' | 'secondary' | 'micro', x: number, y: number) {
    nodes[layer].push({ x, y });
  }

  function routePath(points: Point[]): string {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      if (prev.x !== curr.x && prev.y !== curr.y) {
        const midX = curr.x;
        const midY = prev.y;
        d += ` L ${midX} ${midY} L ${curr.x} ${curr.y}`;
      } else {
        d += ` L ${curr.x} ${curr.y}`;
      }
    }
    return d;
  }

  // ===== MAJOR TRACES =====
  traces.major.push(routePath([
    { x: 100, y: 140 },
    { x: 400, y: 140 },
    { x: 500, y: 200 },
    { x: 700, y: 200 },
  ]));
  addNode('primary', 100, 140);
  addNode('primary', 500, 200);
  addNode('primary', 700, 200);

  traces.major.push(routePath([
    { x: 700, y: 200 },
    { x: 700, y: 450 },
    { x: 600, y: 500 },
    { x: 450, y: 500 },
  ]));
  addNode('primary', 700, 450);
  addNode('primary', 450, 500);

  traces.major.push(routePath([
    { x: 450, y: 500 },
    { x: 200, y: 500 },
    { x: 150, y: 580 },
    { x: 100, y: 650 },
  ]));
  addNode('primary', 200, 500);
  addNode('primary', 100, 650);

  traces.major.push(routePath([
    { x: 100, y: 650 },
    { x: 100, y: 400 },
    { x: 180, y: 350 },
    { x: 300, y: 350 },
  ]));
  addNode('primary', 100, 400);
  addNode('primary', 300, 350);

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

  traces.major.push(routePath([
    { x: 1400, y: 180 },
    { x: 1400, y: 400 },
    { x: 1300, y: 480 },
    { x: 1100, y: 480 },
  ]));
  addNode('primary', 1400, 180);
  addNode('primary', 1400, 400);
  addNode('primary', 1100, 480);

  traces.major.push(routePath([
    { x: 700, y: 200 },
    { x: 900, y: 320 },
    { x: 1100, y: 320 },
  ]));
  addNode('primary', 900, 320);

  traces.major.push(routePath([
    { x: 300, y: 350 },
    { x: 500, y: 350 },
    { x: 500, y: 450 },
    { x: 600, y: 500 },
  ]));
  addNode('primary', 500, 350);
  addNode('primary', 500, 450);

  // ===== SECONDARY TRACES =====
  if (!isMobile) {
    traces.secondary.push(routePath([
      { x: 180, y: 200 },
      { x: 280, y: 200 },
      { x: 280, y: 280 },
      { x: 220, y: 280 },
    ]));
    addNode('secondary', 180, 200);
    addNode('secondary', 280, 280);

    traces.secondary.push(routePath([
      { x: 1200, y: 180 },
      { x: 1320, y: 180 },
      { x: 1320, y: 260 },
      { x: 1250, y: 260 },
    ]));
    addNode('secondary', 1200, 180);
    addNode('secondary', 1320, 260);

    traces.secondary.push(routePath([
      { x: 400, y: 300 },
      { x: 600, y: 300 },
    ]));
    traces.secondary.push(routePath([
      { x: 900, y: 380 },
      { x: 1100, y: 380 },
    ]));

    traces.secondary.push(routePath([
      { x: 150, y: 520 },
      { x: 150, y: 620 },
      { x: 220, y: 620 },
    ]));
    addNode('secondary', 150, 520);
    addNode('secondary', 220, 620);

    traces.secondary.push(routePath([
      { x: 1200, y: 520 },
      { x: 1200, y: 620 },
      { x: 1100, y: 620 },
    ]));
    addNode('secondary', 1200, 520);
    addNode('secondary', 1100, 620);

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

  // ===== MICRO GEOMETRY =====
  if (!isMobile) {
    for (let gx = 200; gx < 1720; gx += 180) {
      for (let gy = 200; gy < 900; gy += 160) {
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

    traces.micro.push(routePath([{ x: 350, y: 220 }, { x: 350, y: 280 }]));
    traces.micro.push(routePath([{ x: 650, y: 320 }, { x: 650, y: 380 }]));
    traces.micro.push(routePath([{ x: 950, y: 280 }, { x: 950, y: 340 }]));
    traces.micro.push(routePath([{ x: 250, y: 400 }, { x: 250, y: 460 }]));
    traces.micro.push(routePath([{ x: 1150, y: 420 }, { x: 1150, y: 480 }]));
    traces.micro.push(routePath([{ x: 400, y: 520 }, { x: 400, y: 580 }]));
    traces.micro.push(routePath([{ x: 1200, y: 580 }, { x: 1200, y: 640 }]));

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

export default SignalField;
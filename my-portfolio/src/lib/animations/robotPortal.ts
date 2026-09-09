// ============================================================
// ROBOT PORTAL INTRO — Cinematic Loading Transition
// Anime.js v4 Timeline: Fall → Bounce → Settle → Portal Reveal
// Uses CSS mask with custom properties for portal cutouts
// ============================================================

import { animate, isReducedMotion } from '../motion';

export async function initRobotPortalIntro(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  const isReduced = isReducedMotion();
  if (isReduced) return;
  
  const overlay = document.getElementById('robotPortalIntro') as HTMLElement | null;
  const portalOverlay = document.getElementById('portalOverlay') as HTMLElement | null;
  const robotFace = overlay?.querySelector('.robot-face') as HTMLElement | null;
  
  if (!overlay || !portalOverlay || !robotFace) return;
  
  // TypeScript narrowing - create non-null refs
  const portalEl = portalOverlay!;
  const faceEl = robotFace!;
  const overlayEl = overlay!;
  
  document.body.style.overflow = 'hidden';
  const mainContent = document.getElementById('mainContent') as HTMLElement | null;
  if (mainContent) mainContent.style.opacity = '0';
  
  // Initial viewport dimensions
  const vw0 = window.innerWidth;
  const vh0 = window.innerHeight;
  const centerX0 = vw0 / 2;
  const eyeOffsetX0 = vw0 * 0.12;
  const eyeY0 = vh0 * 0.425;
  const eyeRadius0 = Math.min(vw0, vh0) * 0.035;
  const mouthY0 = vh0 * 0.65;
  const mouthSize0 = Math.min(vw0, vh0) * 0.156;
  const mouthRadius0 = mouthSize0 * 0.12;
  
  function setMaskProps(
    centerX: number, eyeOffsetX: number, eyeY: number, eyeRadius: number,
    mouthX: number, mouthY: number, mouthSize: number, mouthRadius: number
  ): void {
    portalEl.style.setProperty('--left-eye-x', `${centerX - eyeOffsetX}px`);
    portalEl.style.setProperty('--left-eye-y', `${eyeY}px`);
    portalEl.style.setProperty('--right-eye-x', `${centerX + eyeOffsetX}px`);
    portalEl.style.setProperty('--right-eye-y', `${eyeY}px`);
    portalEl.style.setProperty('--eye-radius', `${eyeRadius}px`);
    portalEl.style.setProperty('--mouth-x', `${mouthX}px`);
    portalEl.style.setProperty('--mouth-y', `${mouthY}px`);
    portalEl.style.setProperty('--mouth-width', `${mouthSize}px`);
    portalEl.style.setProperty('--mouth-height', `${mouthSize}px`);
    portalEl.style.setProperty('--mouth-radius', `${mouthRadius}px`);
  }
  
  setMaskProps(centerX0, eyeOffsetX0, eyeY0, eyeRadius0, centerX0 - mouthSize0/2, mouthY0, mouthSize0, mouthRadius0);
  
  const resizeObserver = new ResizeObserver(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const centerX = vw / 2;
    const eyeOffsetX = vw * 0.12;
    const eyeY = vh * 0.425;
    const eyeRadius = Math.min(vw, vh) * 0.035;
    const mouthSize = Math.min(vw, vh) * 0.156;
    const mouthY = vh * 0.65;
    const mouthRadius = mouthSize * 0.12;
    setMaskProps(centerX, eyeOffsetX, eyeY, eyeRadius, centerX - mouthSize/2, mouthY, mouthSize, mouthRadius);
  });
  resizeObserver.observe(document.body);
  
  faceEl.style.transform = 'translate(-50%, -150vh) scale(1) rotate(0deg)';
  faceEl.style.opacity = '1';
  
  // ============================================================
  // PHASE 1: ROBOT FALL & LAND
  // ============================================================
  
  await animate(faceEl, {
    translateY: ['-150vh', '10vh'],
    rotate: ['-3deg', '0deg'],
    duration: 900,
    ease: 'inQuad',
  });
  
  await animate(faceEl, {
    translateY: ['10vh', '0'],
    scaleY: [1, 0.72],
    scaleX: [1, 1.18],
    duration: 140,
    ease: 'outQuad',
  });
  
  await animate(faceEl, {
    translateY: ['0', '-6vh'],
    scaleY: [0.72, 1.08],
    scaleX: [1.18, 0.92],
    duration: 180,
    ease: 'outQuad',
  });
  
  await animate(faceEl, {
    translateY: ['-6vh', '0'],
    scaleY: [1.08, 1],
    scaleX: [0.92, 1],
    rotate: [0, 0],
    duration: 300,
    ease: 'outElastic(1, 0.6)',
  });
  
  await animate(faceEl, {
    translateX: [0, -2, 2, -1, 1, 0],
    duration: 350,
    ease: 'outQuad',
  });
  
  // ============================================================
  // PHASE 2: IDLE - Subtle life
  // ============================================================
  
  const leftPupilEl = overlayEl.querySelector('.left-pupil') as SVGCircleElement | null;
  const rightPupilEl = overlayEl.querySelector('.right-pupil') as SVGCircleElement | null;
  
  if (leftPupilEl && rightPupilEl) {
    let idleTime = 0;
    const idleInterval = setInterval(() => {
      idleTime += 50;
      const lookX = Math.sin(idleTime * 0.001) * 6;
      const lookY = Math.cos(idleTime * 0.0008) * 4;
      
      leftPupilEl.setAttribute('cx', `${centerX0 - eyeOffsetX0 + lookX}`);
      leftPupilEl.setAttribute('cy', `${eyeY0 + lookY}`);
      rightPupilEl.setAttribute('cx', `${centerX0 + eyeOffsetX0 + lookX}`);
      rightPupilEl.setAttribute('cy', `${eyeY0 + lookY}`);
    }, 50);
    
    (window as any).__portalIdleInterval = idleInterval;
  }
  
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // ============================================================
  // PHASE 3: PORTAL TRANSITION - Camera enters mouth
  // ============================================================
  
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const centerX = vw / 2;
  const centerY = vh / 2;
  const mouthSize = Math.min(vw, vh) * 0.156;
  const mouthY = vh * 0.65;
  
  await animate(portalEl, {
    '--mouth-width': [`${mouthSize}px`, `${vw * 1.5}px`],
    '--mouth-height': [`${mouthSize}px`, `${vh * 1.5}px`],
    '--mouth-x': [`${centerX - mouthSize/2}px`, `${centerX - vw * 0.75}px`],
    '--mouth-y': [`${mouthY}px`, `${centerY - vh * 0.75}px`],
    '--mouth-radius': ['12px', '0px'],
    duration: 1100,
    ease: 'inExpo',
  });
  
  await animate(portalEl, {
    '--eye-radius': ['12px', '0px'],
    duration: 900,
    ease: 'inExpo',
  });
  
  const mainContentEl = document.getElementById('mainContent') as HTMLElement | null;
  if (mainContentEl) {
    await animate(mainContentEl, {
      opacity: [0, 1],
      scale: [0.3, 1],
      duration: 1100,
      ease: 'outExpo',
    });
  }
  
  await animate(overlayEl, {
    opacity: [1, 0],
    duration: 400,
    ease: 'inQuad',
  });
  
  const idleInterval = (window as any).__portalIdleInterval;
  if (idleInterval) clearInterval(idleInterval);
  
  overlayEl.remove();
  document.body.style.overflow = '';
  
  sessionStorage.setItem('robotPortalSeen', 'true');
  
  const mainContentFinal = document.getElementById('mainContent') as HTMLElement | null;
  if (mainContentFinal) {
    mainContentFinal.style.opacity = '1';
    mainContentFinal.style.transform = 'none';
  }
}

// CSS mask properties registration
if (typeof window !== 'undefined' && 'CSS' in window && 'registerProperty' in CSS) {
  ['--left-eye-x', '--left-eye-y', '--right-eye-x', '--right-eye-y', '--eye-radius', 
   '--mouth-x', '--mouth-y', '--mouth-width', '--mouth-height', '--mouth-radius']
    .forEach(prop => {
      try {
        CSS.registerProperty({
          name: prop,
          syntax: '<length>',
          inherits: false,
          initialValue: '0px',
        });
      } catch {
        // Already registered or not supported
      }
    });
}
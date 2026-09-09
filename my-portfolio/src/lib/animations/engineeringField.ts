// ============================================================
// ENGINEERING FIELD CONTROLLER — Centralized State Machine
// Anime.js v4 JS Object Animation Target: fieldState
// Maps continuous scroll & section state into SVG field parameters
// ============================================================

import { animate, isReducedMotion } from '../motion';
import { initCircuitNetwork, type CircuitNetworkInstance } from './circuitNetwork';

export interface EngineeringFieldState {
  progress: number;
  intensity: number;
  pulseSpeed: number;
  density: number;
  convergence: number;
  activeSection: string;
}

// Centralized reactive state object (Anime.js target)
export const fieldState: EngineeringFieldState = {
  progress: 0,
  intensity: 0.45,
  pulseSpeed: 1.0,
  density: 0.5,
  convergence: 0,
  activeSection: 'hero',
};

export interface EngineeringFieldController {
  setSection: (sectionId: string, globalProgress: number) => void;
  destroy: () => void;
}

export function initEngineeringField(container: HTMLElement): EngineeringFieldController | null {
  if (typeof window === 'undefined') return null;

  const svgElement = container.querySelector<SVGSVGElement>('#engineeringFieldSvg');
  if (!svgElement) return null;

  const isReduced = isReducedMotion();
  const networkInstance: CircuitNetworkInstance | null = isReduced
    ? null
    : initCircuitNetwork(svgElement);

  // Background overlay elements for density & grid mapping
  const coordinateGroup = svgElement.querySelector<SVGGElement>('#coordinateMarks');

  // Track active Anime.js state transitions
  let currentTransition: any = null;

  /**
   * Applies the JS object state to the DOM/SVG nodes
   */
  function applyState() {
    if (networkInstance) {
      networkInstance.setIntensity(fieldState.intensity);
      networkInstance.setPulseSpeed(fieldState.pulseSpeed);
      networkInstance.setActiveSection(fieldState.activeSection);
    }

    if (coordinateGroup) {
      coordinateGroup.style.opacity = (fieldState.density * 0.7).toFixed(2);
    }
  }

  /**
   * Smoothly transitions the fieldState object using Anime.js
   */
  function transitionState(targets: Partial<EngineeringFieldState>, duration = 800) {
    if (isReduced) {
      Object.assign(fieldState, targets);
      applyState();
      return;
    }

    if (currentTransition && typeof currentTransition.cancel === 'function') {
      currentTransition.cancel();
    }

    // Anime.js v4 animates plain JavaScript objects directly!
    currentTransition = animate(fieldState, {
      ...targets,
      duration,
      ease: 'outExpo',
      onUpdate: () => {
        applyState();
      },
    });
  }

  /**
   * Section-specific behavioral profile mapping:
   * Hero: field slowly settles, baseline intensity
   * Projects: directional structured paths, higher speed
   * Hardware & Skills: maximum interconnection, high density
   * About: calm, subdued signals, focused spine
   * Contact: high convergence towards bottom actions
   */
  function setSection(sectionId: string, globalProgress: number) {
    fieldState.progress = globalProgress;
    fieldState.activeSection = sectionId;

    switch (sectionId) {
      case 'hero':
        transitionState({
          intensity: 0.45,
          pulseSpeed: 1.0,
          density: 0.5,
          convergence: 0,
        }, 900);
        break;

      case 'work':
        transitionState({
          intensity: 0.55,
          pulseSpeed: 1.25,
          density: 0.65,
          convergence: 0.15,
        }, 800);
        break;

      case 'hardware':
      case 'skills':
        transitionState({
          intensity: 0.60,
          pulseSpeed: 1.15,
          density: 0.75,
          convergence: 0.25,
        }, 800);
        break;

      case 'about':
        transitionState({
          intensity: 0.30,
          pulseSpeed: 0.85,
          density: 0.40,
          convergence: 0.10,
        }, 1000);
        break;

      case 'contact':
        transitionState({
          intensity: 0.65,
          pulseSpeed: 1.30,
          density: 0.55,
          convergence: 0.85,
        }, 800);
        break;

      default:
        transitionState({ intensity: 0.45, pulseSpeed: 1.0, density: 0.5 }, 600);
        break;
    }
  }

  // Handle visibility changes to save CPU/GPU cycles
  function onVisibilityChange() {
    if (document.hidden) {
      networkInstance?.pause();
    } else {
      networkInstance?.resume();
    }
  }

  document.addEventListener('visibilitychange', onVisibilityChange);

  // Initial render pass
  applyState();

  return {
    setSection,
    destroy: () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (currentTransition && typeof currentTransition.cancel === 'function') {
        currentTransition.cancel();
      }
      networkInstance?.destroy();
    },
  };
}

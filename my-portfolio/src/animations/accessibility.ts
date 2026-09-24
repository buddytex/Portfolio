// ============================================================
// ACCESSIBILITY & RESPONSIVE MOTION CONFIGURATION
// Respects prefers-reduced-motion, pointer capability, & viewports
// ============================================================

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop(): boolean {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= 1024;
}

/**
 * Executes a callback only if motion is enabled, or executes fallback immediately.
 */
export function runWithMotionPreference<T>(action: () => T, fallback?: () => void): T | undefined {
  if (isReducedMotion()) {
    if (fallback) fallback();
    return undefined;
  }
  return action();
}

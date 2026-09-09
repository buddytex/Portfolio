// ============================================================
// MOTION TOKENS — Editorial & Precision Robotics Engineering
// Physics: Critically damped springs, restrained durations
// Philosophy: Purposeful, spatial, non-decorative, zero jank
// ============================================================

export const MOTION_TOKENS = {
  // Durations (ms)
  duration: {
    micro: 120,     // Hover, focus states
    fast: 220,      // Small element transitions, icon shifts
    base: 360,      // Content fade/slide, card expansion
    deliberate: 550,// Section shifts, drawer sliding
    entrance: 850,  // Stately hero / monumental entrances
  },

  // Easing Functions (Cubic Bezier arrays or CSS strings)
  ease: {
    // Apple / Editorial clean deceleration (fast start, gradual settle)
    outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    outCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
    // Subtle acceleration-deceleration for continuous layout shifts
    inOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
    // Engineering linear (for steady scanning / flow)
    linear: 'linear',
  },

  // Spring Presets for Anime.js createAnimatable / spring()
  spring: {
    // Physical cursor follower (tight, viscous, no bounce)
    viscous: {
      stiffness: 140,
      damping: 24,
      mass: 1,
    },
    // Gentle card elevation
    settle: {
      stiffness: 180,
      damping: 28,
      mass: 0.8,
    },
    // Subdued feedback
    firm: {
      stiffness: 240,
      damping: 32,
      mass: 0.6,
    },
  },

  // Stagger intervals (ms)
  stagger: {
    fast: 40,
    normal: 75,
    generous: 110,
  }
} as const;

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

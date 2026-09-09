import { useEffect, useRef, useState } from 'react';
import { animate, isReducedMotion } from '../../lib/motion';

export interface RobotPortalIntroProps {
  onComplete?: () => void;
}

export const RobotPortalIntro: React.FC<RobotPortalIntroProps> = ({ onComplete }) => {
  const robotRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<SVGRectElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);
  const [isReduced, setIsReduced] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = isReducedMotion();
    setIsReduced(reduced);

    const handleResize = () => {
      // Robot stays centered
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!robotRef.current || isReduced || hasCompleted) {
      if (isReduced || hasCompleted) {
        onComplete?.();
      }
      return;
    }

    const robot = robotRef.current;
    const mouth = mouthRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;

    // Initial state - robot starts above viewport
    robot.style.transform = 'translate(-50%, -150vh) scale(1) rotate(0deg)';
    robot.style.opacity = '1';

    // Animation sequence using Anime.js
    const runIntro = async () => {
      // 1. Fall from above
      await animate(robot, {
        translateY: ['-150vh', '10vh'],
        rotate: ['-3deg', '0deg'],
        duration: 900,
        ease: 'inQuad',
      });

      // 2. Impact - squash
      await animate(robot, {
        translateY: ['10vh', '0'],
        scaleY: [1, 0.72],
        scaleX: [1, 1.18],
        duration: 140,
        ease: 'outQuad',
      });

      // 3. Rebound
      await animate(robot, {
        translateY: ['0', '-6vh'],
        scaleY: [0.72, 1.08],
        scaleX: [1.18, 0.92],
        duration: 180,
        ease: 'outQuad',
      });

      // 4. Settle
      await animate(robot, {
        translateY: ['-6vh', '0'],
        scaleY: [1.08, 1],
        scaleX: [0.92, 1],
        rotate: [0, 0],
        duration: 300,
        ease: 'outElastic(1, 0.6)',
      });

      // 5. Tiny stabilization shake
      await animate(robot, {
        translateX: [0, -2, 2, -1, 1, 0],
        duration: 350,
        ease: 'outQuad',
      });

      // Brief pause before portal
      await new Promise(resolve => setTimeout(resolve, 600));

      // Subtle eye movement during idle
      let idleTime = 0;
      const idleInterval = setInterval(() => {
        idleTime += 50;
        const lookX = Math.sin(idleTime * 0.001) * 6;
        const lookY = Math.cos(idleTime * 0.0008) * 4;

        if (leftEye && rightEye) {
          leftEye.setAttribute('cx', `${96 + lookX}`);
          leftEye.setAttribute('cy', `${96 + lookY}`);
          rightEye.setAttribute('cx', `${224 + lookX}`);
          rightEye.setAttribute('cy', `${96 + lookY}`);
        }
      }, 50);

      // Wait for user interaction or auto-trigger after 8 seconds
      let portalTriggered = false;
      const triggerPortal = async () => {
        if (portalTriggered) return;
        portalTriggered = true;
        clearInterval(idleInterval);

        if (!mouth) return;

        // 1. Mouth portal stroke draws open (square)
        await animate(mouth, {
          strokeDasharray: ['0 80', '320 0'],
          strokeWidth: [2, 4],
          duration: 600,
          ease: 'outExpo',
        });

        // 2. Portal glow appears
        const portalGlow = document.querySelector('.portal-glow') as SVGRectElement | null;
        if (portalGlow) {
          await animate(portalGlow, {
            opacity: [0, 1],
            scale: [0.5, 1],
            transformOrigin: 'center',
            duration: 400,
            ease: 'outExpo',
          });
        }

        // 3. Portal depth appears
        const portalDepth = document.querySelector('.portal-depth') as SVGRectElement | null;
        if (portalDepth) {
          await animate(portalDepth, {
            opacity: [0, 1],
            scale: [0.3, 1],
            transformOrigin: 'center',
            duration: 300,
            ease: 'outExpo',
          });
        }

        // 4. Eyes look at portal (cross-eyed slightly)
        if (leftEye && rightEye) {
          await animate(leftEye, { cx: 100, cy: 96, duration: 200, ease: 'outQuad' });
          await animate(rightEye, { cx: 220, cy: 96, duration: 200, ease: 'outQuad' });
        }

        // 5. Portal expands to fill viewport - THE TRANSITION
        const robotPortal = document.getElementById('robotPortalIntro');
        if (robotPortal) {
          await animate(robotPortal, {
            scale: [1, 40],
            duration: 1000,
            ease: 'inExpo',
          });
        }

        // Fade out overlay
        const overlay = document.getElementById('robotPortalIntro');
        if (overlay) {
          await animate(overlay, {
            opacity: [1, 0],
            duration: 400,
            ease: 'inQuad',
          });
        }

        // Remove overlay
        const overlayEl = document.getElementById('robotPortalIntro');
        if (overlayEl) {
          overlayEl.style.display = 'none';
        }

        document.body.style.overflow = '';
        setHasCompleted(true);
        onComplete?.();
      };

      // Click/touch/keyboard to trigger portal
      const handleClick = () => triggerPortal();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerPortal();
        }
      };

      const robotPortalEl = document.getElementById('robotPortalIntro');
      robotPortalEl?.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleKeyDown);

      // Auto-trigger after 8 seconds of idle
      const autoTimer = setTimeout(triggerPortal, 8000);

      // Cleanup
      return () => {
        clearInterval(idleInterval);
        clearTimeout(autoTimer);
        robotPortalEl?.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeyDown);
      };
    };

    runIntro();

    return () => {
      // Cleanup handled by runIntro's return
    };
  }, [isReduced, hasCompleted, onComplete]);

  if (isReduced) {
    return null;
  }

  return (
    <div 
      id="robotPortalIntro" 
      className="robot-portal-intro" 
      aria-hidden="true"
      role="dialog"
      aria-label="Loading"
    >
      <div className="robot-portal" id="robotPortal">
        <svg className="robot-head" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* Head main shape - rounded square/rectangle */}
          <rect 
            className="head-shape" 
            x="10" y="10" 
            width="300" height="180" 
            rx="20" ry="20"
            fill="var(--portal-bg)" 
            stroke="var(--portal-fg)" 
            stroke-width="3"
            vector-effect="non-scaling-stroke"
          />
          
          {/* Left eye */}
          <g className="eye left-eye" transform="translate(100, 96)">
            <circle className="eye-pupil" ref={leftEyeRef} cx="0" cy="0" r="10" fill="var(--portal-fg)"/>
            <circle className="eye-glint" cx="-4" cy="-4" r="3" fill="var(--portal-highlight)" opacity="0.9"/>
          </g>
          
          {/* Right eye */}
          <g className="eye right-eye" transform="translate(224, 96)">
            <circle className="eye-pupil" ref={rightEyeRef} cx="0" cy="0" r="10" fill="var(--portal-fg)"/>
            <circle className="eye-glint" cx="-4" cy="-4" r="3" fill="var(--portal-highlight)" opacity="0.9"/>
          </g>
          
          {/* Square mouth/portal (closed initially - just outline) */}
          <rect 
            ref={mouthRef}
            className="mouth-portal" 
            x="110" y="130" 
            width="100" height="100" 
            rx="12" 
            fill="transparent" 
            stroke="var(--portal-fg)" 
            stroke-width="2"
            stroke-dasharray="0 80"
            vector-effect="non-scaling-stroke"
          />
          
          {/* Portal inner glow (hidden until open) */}
          <rect 
            className="portal-glow" 
            x="114" y="134" 
            width="92" height="92" 
            rx="10" 
            fill="url(#portalGradient)"
            opacity="0"
          />
          
          {/* Portal depth (the "throat") */}
          <rect 
            className="portal-depth" 
            x="118" y="138" 
            width="84" height="84" 
            rx="8" 
            fill="var(--bg-pure)"
            opacity="0"
          />
          
          <defs>
            <linearGradient id="portalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--cyan-electric)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default RobotPortalIntro;
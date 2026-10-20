import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { useWindow } from '@lib/context/window-context';
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react';

type SwipeContainerProps = {
  children: ReactNode;
};

const mobileRoutes = ['/home', '/trends', '/messages', '/bookmarks'];

/** Distance (px) the finger must travel before the gesture direction is locked. */
const DIRECTION_LOCK_DISTANCE = 12;

/** Horizontal distance (px) required on release to switch section. */
const SWIPE_DISTANCE_THRESHOLD = 90;

/** Horizontal velocity (px/ms) required on release to switch section. */
const SWIPE_VELOCITY_THRESHOLD = 0.35;

/** Resistance applied when there is no section to switch to in that direction. */
const EDGE_RESISTANCE = 0.06;

type GestureDirection = 'idle' | 'undecided' | 'horizontal' | 'vertical';

export function SwipeContainer({ children }: SwipeContainerProps): JSX.Element {
  const router = useRouter();
  const { asPath } = router;
  const { isMobile } = useWindow();

  const x = useMotionValue(0);

  // Kept in refs so the pointer handlers never depend on re-renders.
  const directionRef = useRef<GestureDirection>('idle');
  const startRef = useRef({ x: 0, y: 0 });
  const lastRef = useRef({ x: 0, time: 0 });
  const velocityRef = useRef(0);

  const currentIndex = mobileRoutes.indexOf(asPath);
  const canGoNext = currentIndex >= 0 && currentIndex < mobileRoutes.length - 1;
  const canGoPrevious = currentIndex > 0;

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ): void => {
    // One finger only.
    if (!event.isPrimary) return;

    // Never steal gestures from modals, text fields or elements that manage
    // their own horizontal swipe (for example the inbox contact rows).
    const target = event.target as HTMLElement | null;
    if (
      target?.closest(
        '[data-no-section-swipe], [role="dialog"], input, textarea, select'
      )
    )
      return;

    directionRef.current = 'undecided';
    startRef.current = { x: event.clientX, y: event.clientY };
    lastRef.current = { x: event.clientX, time: event.timeStamp };
    velocityRef.current = 0;
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ): void => {
    const direction = directionRef.current;
    if (direction !== 'undecided' && direction !== 'horizontal') return;

    const dx = event.clientX - startRef.current.x;
    const dy = event.clientY - startRef.current.y;

    if (direction === 'undecided') {
      if (Math.hypot(dx, dy) < DIRECTION_LOCK_DISTANCE) return;

      // The gesture only becomes a section swipe when the finger clearly
      // moved sideways. Anything mostly vertical is left to page scrolling.
      if (Math.abs(dx) <= Math.abs(dy)) {
        directionRef.current = 'vertical';
        return;
      }

      directionRef.current = 'horizontal';
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Pointer already released: nothing to capture.
      }
    }

    event.preventDefault();

    const time = event.timeStamp;
    const elapsed = time - lastRef.current.time;
    if (elapsed > 0)
      velocityRef.current = (event.clientX - lastRef.current.x) / elapsed;
    lastRef.current = { x: event.clientX, time };

    const allowed = dx < 0 ? canGoNext : canGoPrevious;
    x.set(allowed ? dx : dx * EDGE_RESISTANCE);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>): void => {
    if (directionRef.current !== 'horizontal') {
      directionRef.current = 'idle';
      return;
    }

    directionRef.current = 'idle';

    const dx = event.clientX - startRef.current.x;
    const velocity = velocityRef.current;
    velocityRef.current = 0;

    const goNext =
      canGoNext &&
      (dx < -SWIPE_DISTANCE_THRESHOLD || velocity < -SWIPE_VELOCITY_THRESHOLD);
    const goPrevious =
      canGoPrevious &&
      (dx > SWIPE_DISTANCE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD);

    if (!goNext && !goPrevious) {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
      return;
    }

    const direction = goNext ? 1 : -1;
    const distance = typeof window === 'undefined' ? 500 : window.innerWidth;

    animate(x, direction * -distance, {
      duration: 0.18,
      ease: 'easeOut',
      onComplete: () => {
        // Park the container on the opposite edge so the next section can
        // slide back in without a full page reload.
        x.set(direction * distance);
        void router.push(mobileRoutes[currentIndex + direction]);
      }
    });
  };

  const handlePointerCancel = (): void => {
    if (directionRef.current === 'horizontal')
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });

    directionRef.current = 'idle';
    velocityRef.current = 0;
  };

  // Whenever a section is mounted, slide it back to its resting position.
  useEffect(() => {
    animate(x, 0, { duration: 0.2, ease: 'easeOut' });
  }, [asPath, x]);

  if (!isMobile || !mobileRoutes.includes(asPath)) return <>{children}</>;

  return (
    <motion.div
      className='w-full'
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ x, touchAction: 'pan-y' }}
    >
      {children}
    </motion.div>
  );
}

import { useEffect, useRef } from 'react';
import { useMotionAllowed } from './MotionContext';

const FRICTION = 0.85;
const MAX_VELOCITY = 30;
const MIN_VELOCITY = 0.6;
const IDLE_DELAY_MS = 70;

/**
 * Inércia sutil de scroll: ao parar de girar a roda/trackpad, a página
 * continua deslizando de leve na mesma direção antes de assentar (decaimento
 * exponencial, ~300–450ms). Só reage a `wheel` — touch já tem momentum
 * nativo do SO, então é ignorado via `(pointer: coarse)`. Vira no-op quando
 * `enabled` é falso ou motion está desligado (flag global/prefers-reduced-motion).
 */
export function useScrollInertia(enabled: boolean) {
  const motionAllowed = useMotionAllowed();
  const velocityRef = useRef(0);
  const idleTimer = useRef<number | undefined>(undefined);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled || !motionAllowed) return;
    if (typeof window === 'undefined' || !window.matchMedia) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const stopDecay = () => {
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current);
      rafId.current = undefined;
      velocityRef.current = 0;
    };

    const decay = () => {
      velocityRef.current *= FRICTION;
      if (Math.abs(velocityRef.current) < MIN_VELOCITY) {
        stopDecay();
        return;
      }
      window.scrollBy(0, velocityRef.current);
      rafId.current = requestAnimationFrame(decay);
    };

    const onWheel = (event: WheelEvent) => {
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current);
      const delta = Math.max(
        -MAX_VELOCITY,
        Math.min(MAX_VELOCITY, event.deltaY),
      );
      velocityRef.current = delta;
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        rafId.current = requestAnimationFrame(decay);
      }, IDLE_DELAY_MS);
    };

    const cancelOnTakeover = () => {
      window.clearTimeout(idleTimer.current);
      stopDecay();
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', cancelOnTakeover, {
      passive: true,
    });
    window.addEventListener('mousedown', cancelOnTakeover, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', cancelOnTakeover);
      window.removeEventListener('mousedown', cancelOnTakeover);
      window.clearTimeout(idleTimer.current);
      stopDecay();
    };
  }, [enabled, motionAllowed]);
}

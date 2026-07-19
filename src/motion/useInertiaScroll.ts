import { useEffect } from 'react';
import { useMotionAllowed } from './MotionContext';

const EASE = 0.085;

/** Ativa `useInertiaScroll` a partir de dentro do `MotionProvider`. */
export function InertiaScroll() {
  useInertiaScroll();
  return null;
}

/**
 * Suaviza o scroll com mouse wheel (desktop) por interpolação em rAF,
 * dando uma leve sensação de inércia/arrasto em vez do salto abrupto do
 * scroll nativo. Toque e teclado seguem o comportamento nativo do
 * navegador (já têm momentum próprio) — um listener de `scroll` realinha o
 * alvo sempre que o movimento não veio da própria animação, evitando
 * conflito com scrollbar/teclado/touch.
 *
 * Vira no-op quando motion está desligado (settings.motionEnabled=false ou
 * prefers-reduced-motion).
 */
export function useInertiaScroll() {
  const motionAllowed = useMotionAllowed();

  useEffect(() => {
    if (!motionAllowed) return;
    if (typeof window === 'undefined') return;

    let current = window.scrollY;
    let target = window.scrollY;
    let rafId: number | null = null;
    let programmatic = false;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) {
        current = target;
      }

      programmatic = true;
      window.scrollTo(0, current);
      programmatic = false;

      rafId = current !== target ? requestAnimationFrame(tick) : null;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // deixa pinch-zoom nativo intacto
      event.preventDefault();
      target = Math.min(Math.max(target + event.deltaY, 0), maxScroll());
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onNativeScroll = () => {
      if (programmatic) return;
      current = window.scrollY;
      target = window.scrollY;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onNativeScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [motionAllowed]);
}

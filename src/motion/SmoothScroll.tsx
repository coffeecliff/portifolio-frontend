import { useEffect } from 'react';
import Lenis from 'lenis';
import { useMotionAllowed } from './MotionContext';

interface SmoothScrollProps {
  enabled: boolean;
}

/**
 * Smooth scroll contínuo (Lenis): a rolagem ganha um leve "peso"/lag ao
 * invés do salto seco do scroll nativo, e os links âncora (`href="#..."`)
 * passam a deslizar suavemente também. Não renderiza nada — só instancia o
 * Lenis, que continua atualizando `window.scrollY` normalmente (não usa
 * wrapper com transform), então IntersectionObserver/Reveal e o progresso do
 * Nav seguem funcionando sem alteração.
 *
 * Vira no-op quando `enabled` é falso ou motion está desligado (flag
 * global/prefers-reduced-motion): o scroll volta a ser 100% nativo.
 */
export function SmoothScroll({ enabled }: SmoothScrollProps) {
  const motionAllowed = useMotionAllowed();

  useEffect(() => {
    if (!enabled || !motionAllowed) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      syncTouch: false,
      anchors: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled, motionAllowed]);

  return null;
}

import { useCallback, useRef, type PointerEvent } from 'react';
import { useMotionAllowed } from './MotionContext';

/**
 * Liga `--mx`/`--my` (posição do ponteiro em %) no elemento — alimenta o
 * brilho specular que "segue o cursor" da variante `interactive` do Liquid
 * Glass (ver skill liquid-glass). Vira no-op quando motion está desligado
 * (settings.motionEnabled=false ou prefers-reduced-motion), deixando o vidro
 * estático nesses casos.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<T | null>(null);

  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  }, []);

  const onPointerLeave = useCallback(() => {
    ref.current?.style.removeProperty('--mx');
    ref.current?.style.removeProperty('--my');
  }, []);

  if (!motionAllowed) return { ref };
  return { ref, onPointerMove, onPointerLeave };
}

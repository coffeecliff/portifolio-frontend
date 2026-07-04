import { useEffect, useRef } from 'react';
import { useMotionAllowed } from './MotionContext';

/**
 * Progresso de scroll (0 → 1) de um wrapper alto, escrito como CSS custom
 * property `--p` num elemento-alvo (o "stage"). Serve para animações
 * scroll-linked dirigidas por `calc()` no CSS — sem `setState` por frame:
 * só uma escrita de estilo por rAF, nenhum re-render do React.
 *
 * O progresso vai a 0 quando o topo do wrapper encosta no topo da viewport e
 * chega a 1 quando o wrapper terminou de passar (altura excedente rolada).
 *
 * Degradação: se o movimento estiver desligado (flag global ou
 * prefers-reduced-motion) nada é anexado e `--p` fica em 0 — o chamador deve
 * renderizar a versão estática nesse caso. O listener de scroll só existe
 * enquanto a seção está próxima da viewport (IntersectionObserver).
 */
export function useScrollProgress<
  W extends HTMLElement = HTMLElement,
  S extends HTMLElement = HTMLElement,
>() {
  const motionAllowed = useMotionAllowed();
  const wrapperRef = useRef<W>(null);
  const stageRef = useRef<S>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage || !motionAllowed) return;

    let rafId = 0;
    let active = false;

    const measure = () => {
      rafId = 0;
      const rect = wrapper.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const raw = travel > 0 ? -rect.top / travel : 0;
      const p = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      stage.style.setProperty('--p', p.toFixed(4));
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(measure);
    };

    // Só escuta scroll quando a seção está por perto — economiza trabalho no
    // resto da página.
    const io = new IntersectionObserver(
      ([entry]) => {
        const near = entry?.isIntersecting ?? false;
        if (near && !active) {
          active = true;
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll);
          onScroll();
        } else if (!near && active) {
          active = false;
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      },
      { rootMargin: '40% 0px 40% 0px' },
    );
    io.observe(wrapper);
    measure();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [motionAllowed]);

  return { wrapperRef, stageRef };
}

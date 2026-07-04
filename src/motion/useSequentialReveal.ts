import { useEffect, useRef, useState } from 'react';
import { useMotionAllowed } from './MotionContext';

/**
 * Coreografia scroll-driven de uma seção "pinada" em três fases, a partir de um
 * wrapper alto com um stage `sticky`:
 *
 *  1. **Zoom in**  — a box cresce (scale) de card contido até preencher a tela.
 *  2. **Sequência de imagens** — com a box travada em tela cheia, o scroll
 *     vertical avança um índice discreto (`activeIndex`) entre `itemCount`
 *     imagens. Cada imagem entra com fade+slide da direita, fica fixa
 *     enquanto é a atual, e sai com fade+slide continuando para a esquerda
 *     assim que o scroll ultrapassa o limiar dela — a transição em si (não o
 *     scroll) é quem anima; aqui só decidimos QUAL imagem está ativa.
 *  3. **Zoom out** — terminada a sequência, a box encolhe de volta ao card e o
 *     scroll vertical normal do site é retomado.
 *
 * Escreve apenas a custom property `--zoom` no stage por rAF — sem `setState`
 * por frame. `activeIndex` só muda quando o limiar de imagem é cruzado.
 *
 * Degradação: se o movimento estiver desligado (flag global ou
 * prefers-reduced-motion), nada é anexado — o chamador renderiza a versão
 * estática. O listener de scroll só vive enquanto a seção está por perto.
 */

/** Fração da altura da viewport gasta em cada fase de zoom (in e out). */
const ZOOM_PHASE_VH = 0.9;

interface Layout {
  travel: number;
  zoomInPx: number;
  zoomOutPx: number;
  sequencePx: number;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function useSequentialReveal(itemCount: number) {
  const motionAllowed = useMotionAllowed();
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage || !motionAllowed || itemCount <= 0) return;

    let rafId = 0;
    let active = false;
    let layout: Layout | null = null;
    let lastActive = -1;

    const measure = (): Layout => {
      const innerH = window.innerHeight;
      const zoomInPx = innerH * ZOOM_PHASE_VH;
      const zoomOutPx = innerH * ZOOM_PHASE_VH;
      const travel = wrapper.offsetHeight - innerH;
      const sequencePx = Math.max(1, travel - zoomInPx - zoomOutPx);
      return { travel, zoomInPx, zoomOutPx, sequencePx };
    };

    const update = () => {
      rafId = 0;
      if (!layout) return;
      const { travel, zoomInPx, zoomOutPx, sequencePx } = layout;

      const scrolled = Math.min(
        Math.max(-wrapper.getBoundingClientRect().top, 0),
        travel,
      );

      let zoom: number;
      let sp: number;
      if (scrolled < zoomInPx) {
        zoom = clamp01(scrolled / zoomInPx);
        sp = 0;
      } else if (scrolled > zoomInPx + sequencePx) {
        zoom = clamp01(1 - (scrolled - zoomInPx - sequencePx) / zoomOutPx);
        sp = 1;
      } else {
        zoom = 1;
        sp = clamp01((scrolled - zoomInPx) / sequencePx);
      }

      stage.style.setProperty('--zoom', zoom.toFixed(4));

      const idx = Math.min(itemCount - 1, Math.floor(sp * itemCount));
      if (idx !== lastActive) {
        lastActive = idx;
        setActiveIndex(idx);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      layout = measure();
      onScroll();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const near = entry?.isIntersecting ?? false;
        if (near && !active) {
          active = true;
          layout = measure();
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onResize);
          onScroll();
        } else if (!near && active) {
          active = false;
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onResize);
        }
      },
      { rootMargin: '40% 0px 40% 0px' },
    );
    io.observe(wrapper);
    // Mede após o layout inicial assentar.
    rafId = requestAnimationFrame(() => {
      layout = measure();
      update();
    });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [motionAllowed, itemCount]);

  return { wrapperRef, stageRef, activeIndex };
}

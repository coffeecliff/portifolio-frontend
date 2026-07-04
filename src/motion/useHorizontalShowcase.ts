import { useEffect, useRef, useState } from 'react';
import { useMotionAllowed } from './MotionContext';

/**
 * Coreografia scroll-driven de uma seção "pinada" em três fases, a partir de um
 * wrapper alto com um stage `sticky`:
 *
 *  1. **Zoom in**  — a box cresce (scale) de card contido até preencher a tela.
 *  2. **Scroll horizontal** — com a box travada em tela cheia, o scroll vertical
 *     vira translação horizontal de um trilho (`track`) dentro de uma máscara
 *     (`media`). O texto da coluna esquerda é sincronizado com o grupo de
 *     imagens em foco (`activeIndex`).
 *  3. **Zoom out** — terminado o trilho, a box encolhe de volta ao card e o
 *     scroll vertical normal do site é retomado.
 *
 * Escreve apenas custom properties (`--zoom`, `--tx`) no stage por rAF — sem
 * `setState` por frame. `activeIndex` só muda quando o grupo em foco troca.
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
  horizontalPx: number;
  maxTx: number;
  mediaW: number;
  groups: { start: number; end: number }[];
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function useHorizontalShowcase(groupCount: number) {
  const motionAllowed = useMotionAllowed();
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const setGroupRef = (i: number) => (el: HTMLElement | null) => {
    groupRefs.current[i] = el;
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    const media = mediaRef.current;
    const track = trackRef.current;
    if (!wrapper || !stage || !media || !track || !motionAllowed) return;

    let rafId = 0;
    let active = false;
    let layout: Layout | null = null;
    let lastActive = -1;

    const measure = (): Layout => {
      const innerH = window.innerHeight;
      const zoomInPx = innerH * ZOOM_PHASE_VH;
      const zoomOutPx = innerH * ZOOM_PHASE_VH;
      const travel = wrapper.offsetHeight - innerH;
      const horizontalPx = Math.max(1, travel - zoomInPx - zoomOutPx);
      const mediaW = media.clientWidth;
      const maxTx = Math.max(0, track.scrollWidth - mediaW);
      const groups = groupRefs.current.map((el) => ({
        start: el ? el.offsetLeft : 0,
        end: el ? el.offsetLeft + el.offsetWidth : 0,
      }));
      return { travel, zoomInPx, zoomOutPx, horizontalPx, maxTx, mediaW, groups };
    };

    const update = () => {
      rafId = 0;
      if (!layout) return;
      const { travel, zoomInPx, zoomOutPx, horizontalPx, maxTx, mediaW, groups } =
        layout;

      const scrolled = Math.min(
        Math.max(-wrapper.getBoundingClientRect().top, 0),
        travel,
      );

      let zoom: number;
      let hp: number;
      if (scrolled < zoomInPx) {
        zoom = clamp01(scrolled / zoomInPx);
        hp = 0;
      } else if (scrolled > zoomInPx + horizontalPx) {
        zoom = clamp01(1 - (scrolled - zoomInPx - horizontalPx) / zoomOutPx);
        hp = 1;
      } else {
        zoom = 1;
        hp = clamp01((scrolled - zoomInPx) / horizontalPx);
      }

      const tx = hp * maxTx;
      stage.style.setProperty('--zoom', zoom.toFixed(4));
      stage.style.setProperty('--tx', `${tx.toFixed(2)}px`);

      // Grupo em foco: ponto de referência ~35% da máscara, em coord. do trilho.
      const anchor = tx + mediaW * 0.35;
      let idx = groups.length - 1;
      for (let i = 0; i < groups.length; i++) {
        if (anchor < groups[i].end) {
          idx = i;
          break;
        }
      }
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
  }, [motionAllowed, groupCount]);

  return { wrapperRef, stageRef, mediaRef, trackRef, setGroupRef, activeIndex };
}

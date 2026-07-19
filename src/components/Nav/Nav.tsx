import { useEffect, useRef, type PointerEvent } from 'react';
import { Button } from '@/design-system';
import { navLinks } from '@/data/navigation';
import { site } from '@/data/site';
import { useMotionAllowed } from '@/motion/MotionContext';
import { usePointerGlow } from '@/motion/usePointerGlow';
import styles from './Nav.module.css';

/** Distância de scroll (px) até o header terminar de se destacar do fundo. */
const SCROLL_THRESHOLD = 160;

/**
 * Barra de navegação que nasce integrada ao fundo do Hero (sem bordas, largura
 * cheia) e se destaca em um header flutuante de vidro conforme o usuário rola
 * a página — e volta a se integrar ao retornar ao topo. O progresso é escrito
 * direto no DOM via ref (fora do React) para não gerar re-render por frame.
 */
export function Nav() {
  const navRef = useRef<HTMLElement | null>(null);
  const motionAllowed = useMotionAllowed();
  const glow = usePointerGlow<HTMLElement>();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let ticking = false;

    const applyProgress = () => {
      ticking = false;
      const progress = Math.min(window.scrollY / SCROLL_THRESHOLD, 1);
      nav.style.setProperty('--nav-progress', progress.toString());
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyProgress);
    };

    applyProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setRefs = (node: HTMLElement | null) => {
    navRef.current = node;
    glow.ref.current = node;
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    glow.onPointerMove?.(event);
  };

  return (
    <nav
      ref={setRefs}
      onPointerMove={onPointerMove}
      onPointerLeave={glow.onPointerLeave}
      className={motionAllowed ? styles.nav : `${styles.nav} ${styles.noTransition}`}
    >
      {/* Vidro + anel de refração — elementos reais (não pseudo) que pintam
          antes de .inner, para que o backdrop-filter nunca capture o
          logo/links/CTA (ver feedback: refração só de fora da barra pra
          dentro, nunca do conteúdo interno). */}
      <span aria-hidden="true" className={styles.glass} />
      <span aria-hidden="true" className={styles.glassEdge} />
      <span aria-hidden="true" className={styles.glowLayer} />
      <div className={styles.inner}>
        <a href="#topo" className={styles.brand}>
          <span className={styles.mark}>{site.brandMark}</span>
          <span className={styles.brandName}>{site.brandName}</span>
        </a>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
          <Button href="#contato" size="sm" className={styles.cta}>
            Fale conosco
          </Button>
        </div>
      </div>
    </nav>
  );
}

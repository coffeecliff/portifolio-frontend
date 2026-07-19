import type { ElementType, ReactNode } from 'react';
import { usePointerGlow } from '@/motion/usePointerGlow';
import styles from './GradientBorderCard.module.css';

interface GradientBorderCardProps {
  /** Elemento HTML a renderizar (padrão: article). */
  as?: ElementType;
  /** Família de cor do glow/box-shadow no hover. */
  accent?: 'violet' | 'magenta' | 'cyan';
  className?: string;
  children: ReactNode;
}

/**
 * Card de vidro com borda em gradiente que aparece no hover — padrão visual
 * repetido nas grades de cards das seções (Services/Tech/About). Vidro
 * "regular" (blur + specular, sem lensing — ver GradientBorderCard.module.css)
 * com brilho specular que segue o ponteiro (variante interactive).
 */
export function GradientBorderCard({
  as: Component = 'article',
  accent = 'magenta',
  className,
  children,
}: GradientBorderCardProps) {
  const glow = usePointerGlow<HTMLElement>();
  const classes = [styles.card, styles[accent], className].filter(Boolean).join(' ');
  return (
    <Component
      className={classes}
      ref={glow.ref}
      onPointerMove={glow.onPointerMove}
      onPointerLeave={glow.onPointerLeave}
    >
      {/* Anel de borda — precisa pintar antes do conteúdo real para que seu
          backdrop-filter nunca capture os filhos do card. */}
      <span aria-hidden="true" className={styles.edge} />
      <span aria-hidden="true" className={styles.glow} />
      {children}
    </Component>
  );
}

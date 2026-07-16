import type { ElementType, ReactNode } from 'react';
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
 * repetido nas grades de cards das seções (Services/Tech/About).
 */
export function GradientBorderCard({
  as: Component = 'article',
  accent = 'magenta',
  className,
  children,
}: GradientBorderCardProps) {
  const classes = [styles.card, styles[accent], className].filter(Boolean).join(' ');
  return (
    <Component className={classes}>
      {/* Anel de refração da borda — precisa pintar antes do conteúdo real
          para que seu backdrop-filter nunca capture os filhos do card. */}
      <span aria-hidden="true" className={styles.edge} />
      {children}
    </Component>
  );
}

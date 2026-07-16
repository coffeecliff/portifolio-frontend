import type { ElementType, ReactNode } from 'react';
import styles from './GlassPanel.module.css';

interface GlassPanelProps {
  children: ReactNode;
  /** Variante visual: padrão (vidro neutro) ou destaque (tom de marca). */
  variant?: 'default' | 'brand';
  /** Tag HTML renderizada. Útil para semântica (section, footer, etc.). */
  as?: ElementType;
  className?: string;
}

/**
 * Superfície de vidro (glassmorphism) — bloco base de todas as seções.
 * Encapsula o padrão de blur + borda + sombra repetido no design original.
 */
export function GlassPanel({
  children,
  variant = 'default',
  as: Tag = 'div',
  className,
}: GlassPanelProps) {
  const classes = [styles.panel, styles[variant], className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes}>
      {/* Anel de refração da borda — precisa pintar antes do conteúdo real
          para que seu backdrop-filter nunca capture os filhos do painel. */}
      <span aria-hidden="true" className={styles.edge} />
      {children}
    </Tag>
  );
}

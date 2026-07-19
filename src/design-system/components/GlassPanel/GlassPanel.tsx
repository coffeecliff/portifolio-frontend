import type { ElementType, ReactNode } from 'react';
import { usePointerGlow } from '@/motion/usePointerGlow';
import styles from './GlassPanel.module.css';

interface GlassPanelProps {
  children: ReactNode;
  /**
   * Variante visual: `default`/`brand` são vidro "regular" (superfície-
   * assinatura, com lensing); `clear` é translúcida, para uso sobre mídia
   * rica (screenshots/imagens), sem refração de borda.
   */
  variant?: 'default' | 'brand' | 'clear';
  /** Liga o brilho specular que segue o ponteiro (variante `interactive`). */
  interactive?: boolean;
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
  interactive = false,
  as: Tag = 'div',
  className,
}: GlassPanelProps) {
  const glow = usePointerGlow<HTMLElement>();
  const classes = [
    styles.panel,
    styles[variant],
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag
      className={classes}
      ref={interactive ? glow.ref : undefined}
      onPointerMove={interactive ? glow.onPointerMove : undefined}
      onPointerLeave={interactive ? glow.onPointerLeave : undefined}
    >
      {/* Anel de refração da borda — precisa pintar antes do conteúdo real
          para que seu backdrop-filter nunca capture os filhos do painel. */}
      <span aria-hidden="true" className={styles.edge} />
      {interactive && <span aria-hidden="true" className={styles.glow} />}
      {children}
    </Tag>
  );
}

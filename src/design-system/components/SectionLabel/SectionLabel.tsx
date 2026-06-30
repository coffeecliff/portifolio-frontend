import type { ReactNode } from 'react';
import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  children: ReactNode;
  /** Cor do acento: ciano (padrão) ou magenta (usado em cards de projeto). */
  tone?: 'cyan' | 'magenta';
  className?: string;
}

/**
 * Rótulo monoespaçado em caixa alta usado como "olho" acima dos títulos.
 */
export function SectionLabel({
  children,
  tone = 'cyan',
  className,
}: SectionLabelProps) {
  const classes = [styles.label, styles[tone], className]
    .filter(Boolean)
    .join(' ');
  return <span className={classes}>{children}</span>;
}

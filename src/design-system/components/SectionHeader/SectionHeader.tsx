import type { ReactNode } from 'react';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'cyan' | 'magenta';
  className?: string;
  titleClassName?: string;
}

/** Cabeçalho padrão de seção — label + título + introdução opcional. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone,
  className,
  titleClassName,
}: SectionHeaderProps) {
  const titleClasses = [styles.title, titleClassName].filter(Boolean).join(' ');
  return (
    <div className={className}>
      <SectionLabel tone={tone} className={styles.label}>
        {eyebrow}
      </SectionLabel>
      <h2 className={titleClasses}>{title}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}

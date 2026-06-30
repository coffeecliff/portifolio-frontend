import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** primary = gradiente de marca; ghost = vidro translúcido. */
  variant?: 'primary' | 'ghost';
  /** Tamanho compacto (nav) ou padrão. */
  size?: 'sm' | 'md';
}

/**
 * Botão de ação renderizado como âncora (todas as CTAs do site são links).
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');
  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}

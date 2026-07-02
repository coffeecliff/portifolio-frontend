import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';
import { useMotionAllowed } from './MotionContext';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  /** Atraso em cascata (ms) para escalonar itens de uma grade. */
  delay?: number;
  /** Direção da entrada. */
  from?: 'up' | 'down' | 'none';
  as?: ElementType;
  className?: string;
}

/**
 * Envelope de entrada por scroll (fade + slide sutil), acionado por
 * IntersectionObserver e animado só com opacity/transform (GPU).
 *
 * Degradação: se o movimento estiver desligado (flag global ou
 * prefers-reduced-motion) ou o navegador não tiver IntersectionObserver, o
 * conteúdo aparece imediatamente — nunca fica invisível.
 */
export function Reveal({
  children,
  delay = 0,
  from = 'up',
  as: Tag = 'div',
  className,
}: RevealProps) {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!motionAllowed || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [motionAllowed]);

  const classes = [
    styles.reveal,
    motionAllowed ? styles[from] : '',
    visible ? styles.visible : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

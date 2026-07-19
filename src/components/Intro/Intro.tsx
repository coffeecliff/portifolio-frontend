import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import { useMotionAllowed } from '@/motion/MotionContext';
import styles from './Intro.module.css';

const TYPE_INTERVAL_MS = 110;
const HOLD_MS = 2000;
const ERASE_INTERVAL_MS = 70;
const EXIT_MS = 650;

type Phase = 'typing' | 'holding' | 'erasing' | 'exiting';

interface IntroProps {
  onDone: () => void;
}

/**
 * Tela de abertura de marca: digita o nome do site, segura, apaga da direita
 * para a esquerda e sai com fade + zoom, revelando a página. Se o movimento
 * estiver desligado (flag global ou prefers-reduced-motion), pula direto para
 * `onDone` sem renderizar nada — nunca trava o usuário atrás de um overlay.
 */
export function Intro({ onDone }: IntroProps) {
  const motionAllowed = useMotionAllowed();
  const name = site.brandName;
  const [phase, setPhase] = useState<Phase>('typing');
  const [count, setCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!motionAllowed) {
      onDone();
      return;
    }

    if (phase === 'typing') {
      if (count < name.length) {
        timerRef.current = setTimeout(() => setCount((c) => c + 1), TYPE_INTERVAL_MS);
      } else {
        timerRef.current = setTimeout(() => setPhase('holding'), 0);
      }
    } else if (phase === 'holding') {
      timerRef.current = setTimeout(() => setPhase('erasing'), HOLD_MS);
    } else if (phase === 'erasing') {
      if (count > 0) {
        timerRef.current = setTimeout(() => setCount((c) => c - 1), ERASE_INTERVAL_MS);
      } else {
        timerRef.current = setTimeout(() => setPhase('exiting'), 0);
      }
    } else if (phase === 'exiting') {
      timerRef.current = setTimeout(onDone, EXIT_MS);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [motionAllowed, phase, count, name, onDone]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!motionAllowed) return null;

  const visible = name.slice(0, count);

  return (
    <div
      className={`${styles.overlay} ${phase === 'exiting' ? styles.exiting : ''}`}
      aria-hidden="true"
    >
      <div className={styles.glow} />
      <span className={styles.name}>
        {visible}
        <span className={styles.caret} />
      </span>
    </div>
  );
}

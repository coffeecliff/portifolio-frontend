import { useEffect, useRef } from 'react';
import styles from './GlassCube.module.css';

interface GlassCubeProps {
  motionEnabled?: boolean;
}

/** Cubo 3D de vidro com rotação automática contínua ao redor do eixo Y. */
export function GlassCube({ motionEnabled = true }: GlassCubeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef(motionEnabled);
  motionRef.current = motionEnabled;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // 0.12 graus/frame a 60fps ≈ 7 graus/s ≈ 51s por volta completa
    const SPEED = 0.12;
    let angle = 0;
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!motionRef.current) return;
      angle += SPEED;
      wrap.style.transform = `rotateX(-18deg) rotateY(${angle}deg)`;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.glow} />
      <div className={styles.perspective}>
        <div ref={wrapRef} className={styles.wrap}>
          <div className={styles.inner}>
            <div className={`${styles.face} ${styles.front}`} />
            <div className={`${styles.face} ${styles.back}`} />
            <div className={`${styles.face} ${styles.right}`} />
            <div className={`${styles.face} ${styles.left}`} />
            <div className={`${styles.face} ${styles.top}`} />
            <div className={`${styles.face} ${styles.bottom}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

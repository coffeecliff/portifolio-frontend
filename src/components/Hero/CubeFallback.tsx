import styles from './CubeFallback.module.css';

/**
 * Fallback 2D do cubo de vidro — puro CSS, sem WebGL. Renderizado quando o
 * dispositivo não tem WebGL ou é fraco demais para a cena 3D. Mantém a mesma
 * linguagem visual (vidro + glow de marca) para o layout não perder impacto.
 */
export function CubeFallback({ motionEnabled = true }: { motionEnabled?: boolean }) {
  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.glow} />
      <div className={`${styles.cube} ${motionEnabled ? styles.animated : ''}`}>
        <span className={styles.face} />
        <span className={styles.shine} />
      </div>
    </div>
  );
}

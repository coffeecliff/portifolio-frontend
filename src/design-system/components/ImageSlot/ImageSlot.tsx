import styles from './ImageSlot.module.css';

interface ImageSlotProps {
  /** Texto exibido enquanto não há imagem real. */
  placeholder?: string;
  /** Altura do slot (qualquer unidade CSS). */
  height?: number | string;
  /** Cantos arredondados ou retos. */
  shape?: 'rounded' | 'rect';
  radius?: number;
  /** URL da imagem real; quando ausente, mostra o placeholder. */
  src?: string;
  alt?: string;
}

/**
 * Substituto React do web component <image-slot> do Claude Design.
 * Mostra um placeholder estilizado até receber uma imagem real via `src`.
 */
export function ImageSlot({
  placeholder = 'Imagem',
  height = 170,
  shape = 'rounded',
  radius = 14,
  src,
  alt = '',
}: ImageSlotProps) {
  const borderRadius = shape === 'rounded' ? radius : 0;

  if (src) {
    return (
      <img
        className={styles.image}
        src={src}
        alt={alt}
        style={{ height, borderRadius }}
      />
    );
  }

  return (
    <div className={styles.slot} style={{ height, borderRadius }}>
      <span className={styles.label}>{placeholder}</span>
    </div>
  );
}

import type { ReactNode } from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: ReactNode;
}

/** Chip de tecnologia usado nos cards de projeto. */
export function Tag({ children }: TagProps) {
  return <span className={styles.tag}>{children}</span>;
}

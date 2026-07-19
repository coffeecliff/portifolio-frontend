import { useScrollInertia } from './useScrollInertia';

interface ScrollInertiaProps {
  enabled: boolean;
}

/** Aciona `useScrollInertia` para a página inteira. Não renderiza nada. */
export function ScrollInertia({ enabled }: ScrollInertiaProps) {
  useScrollInertia(enabled);
  return null;
}

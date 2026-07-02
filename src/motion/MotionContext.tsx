import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

/**
 * Compartilha, para toda a árvore, se o movimento pode acontecer.
 * Fonte da verdade: `settings.motionEnabled` (topo do App) combinado com a
 * preferência do sistema `prefers-reduced-motion`. Componentes de animação
 * (ex.: Reveal) consomem `useMotionAllowed()` em vez de recalcular isso.
 */
const MotionContext = createContext<boolean>(true);

export function MotionProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <MotionContext.Provider value={enabled && !prefersReduced}>
      {children}
    </MotionContext.Provider>
  );
}

/** True quando animações devem rodar (flag global + preferência do sistema). */
export function useMotionAllowed(): boolean {
  return useContext(MotionContext);
}

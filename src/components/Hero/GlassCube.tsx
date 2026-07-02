import { lazy, Suspense } from 'react';
import { CubeFallback } from './CubeFallback';
import { useCanRender3D } from './useCanRender3D';
import styles from './GlassCube.module.css';

const GlassCubeScene = lazy(() => import('./GlassCubeScene'));

interface GlassCubeProps {
  motionEnabled?: boolean;
}

/**
 * Cubo 3D de vidro com degradação graciosa: só monta a cena WebGL (R3F) em
 * dispositivos capazes; caso contrário — ou enquanto a decisão de capacidade
 * está pendente, ou o chunk 3D carrega — mostra o fallback 2D em CSS.
 * Nunca deixa a área em branco.
 */
export function GlassCube({ motionEnabled = true }: GlassCubeProps) {
  const canRender3D = useCanRender3D();

  if (canRender3D !== true) {
    return <CubeFallback motionEnabled={motionEnabled} />;
  }

  return (
    <div className={styles.stage}>
      <div className={styles.glow} />
      <Suspense fallback={<CubeFallback motionEnabled={motionEnabled} />}>
        <GlassCubeScene motionEnabled={motionEnabled} />
      </Suspense>
    </div>
  );
}

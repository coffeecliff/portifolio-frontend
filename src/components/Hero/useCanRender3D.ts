import { useEffect, useState } from 'react';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

/**
 * Decide se vale renderizar a cena 3D (WebGL) ou cair no fallback 2D.
 * Critérios: suporte a WebGL + hardware minimamente capaz. Roda uma vez no
 * cliente; enquanto não decidiu, retorna `null` para evitar montar o Canvas
 * cedo demais (SSR-safe / sem flash).
 */
export function useCanRender3D(): boolean | null {
  const [canRender, setCanRender] = useState<boolean | null>(null);

  useEffect(() => {
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return (
          !!window.WebGLRenderingContext &&
          !!(
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl')
          )
        );
      } catch {
        return false;
      }
    })();

    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 4;
    const capableHardware = cores >= 4 && memory >= 4;

    setCanRender(hasWebGL && capableHardware);
  }, []);

  return canRender;
}

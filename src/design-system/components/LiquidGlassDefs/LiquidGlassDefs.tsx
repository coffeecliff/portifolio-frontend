/**
 * Defs SVG únicos do efeito "liquid glass" — precisam existir uma vez no DOM
 * para que `backdrop-filter: url(#…)` (ver tokens --lg-backdrop/--lg-edge-backdrop
 * em tokens.css) consiga referenciá-los. Filtros são estáticos (sem animação de
 * seed): Apple glass não pulsa, e isso evita custo de repaint por frame.
 */
export function LiquidGlassDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.01"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.5" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={40}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="liquid-glass-edge" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves={2}
            seed={11}
            result="edgeNoise"
          />
          <feGaussianBlur in="edgeNoise" stdDeviation="1" result="softEdgeNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softEdgeNoise"
            scale={95}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

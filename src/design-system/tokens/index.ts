/**
 * Espelho em JS dos tokens de cor — usado por componentes que desenham em
 * canvas / cálculos (Hero wave, cubo), onde não há acesso a var(--*) do CSS.
 * Mantenha sincronizado com styles/tokens.css.
 */
export const colors = {
  bg: '#000000',
  fg: '#ffffff',
  violet: '#8a2be2',
  magenta: '#ff00ff',
  magentaSoft: '#ff66ff',
  cyan: '#00ffff',
  purpleMedium: '#9370db',
  ink: '#08030f',
} as const;

export const fonts = {
  display: "'Space Grotesk', system-ui, sans-serif",
  body: "'Manrope', system-ui, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
} as const;

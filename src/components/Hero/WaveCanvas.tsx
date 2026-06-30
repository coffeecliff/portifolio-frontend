import { useEffect, useRef } from 'react';
import styles from './WaveCanvas.module.css';

interface WaveCanvasProps {
  /** Liga/desliga a animação (respeita prefers-reduced-motion). */
  motionEnabled?: boolean;
  /** Densidade de linhas da onda (12–120). */
  density?: number;
  /** * Deslocamento vertical da onda (ex: 100, -50, "10%", "20px"). 
   * Valores numéricos são tratados como pixels.
   */
  yOffset?: string | number;
}

/**
 * Onda interativa desenhada em canvas atrás do hero.
 * Porta da lógica `initWave` do protótipo original, encapsulada num hook.
 */
export function WaveCanvas({ 
  motionEnabled = true, 
  density = 24, 
  yOffset = 0 
}: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs para que o loop de animação leia sempre o valor atual das props.
  const motionRef = useRef(motionEnabled);
  const densityRef = useRef(density);
  const yOffsetRef = useRef(yOffset);
  
  motionRef.current = motionEnabled;
  densityRef.current = density;
  yOffsetRef.current = yOffset;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const mouse = { x: 0.62, y: 0.32, tx: 0.62, ty: 0.32 };
    let W = 0;
    let H = 0;
    let dpr = 1;
    let grads: CanvasGradient[] | null = null;
    let gradN = 0;
    let raf = 0;
    let last = 0;
    let t = 0;

    // Função auxiliar para calcular o valor do offset em pixels baseado no H atual
    const parseYOffset = (val: string | number, currentH: number): number => {
      if (typeof val === 'number') return val;
      if (val.endsWith('%')) {
        return (parseFloat(val) / 100) * currentH;
      }
      return parseFloat(val) || 0;
    };

    const buildGrads = (n: number) => {
      const arr: CanvasGradient[] = [];
      for (let i = 0; i < n; i++) {
        const depth = i / n;
        const hue = 266 + depth * 50;
        const g = ctx.createLinearGradient(0, 0, W, 0);
        g.addColorStop(0, `hsla(${hue + 4},96%,64%,0.9)`);
        g.addColorStop(0.5, `hsla(${hue + 24},99%,68%,1)`);
        g.addColorStop(1, 'hsla(190,99%,64%,0.6)');
        arr.push(g);
      }
      grads = arr;
      gradN = n;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grads = null; // força rebuild dos gradientes para a nova largura
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bump = (x: number, cx: number, w: number) => {
      const d = (x - cx) / (W * w);
      return Math.exp(-d * d);
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      // throttle ~30fps
      if (now - last < 10) return;
      last = now;

      const motion = motionRef.current && !reduceMotion;
      const currentYOffset = parseYOffset(yOffsetRef.current, H);

      // Ajusta a checagem de scroll para considerar o deslocamento da onda
      if (window.scrollY > (H * 0.95) + currentYOffset) return;

      const n = Math.max(12, Math.min(120, Math.round(densityRef.current || 24)));
      if (grads === null || gradN !== n) buildGrads(n);

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1.35;

      const cx1 = W * (0.46 + (mouse.x - 0.5) * 0.3) + Math.sin(t * 0.6) * W * 0.07;
      const cx2 = W * (0.74 + (mouse.x - 0.5) * 0.1);
      const amp = H * 0.24 * (0.9 + (1 - mouse.y) * 0.38);
      
      // Aplica o Y Offset diretamente na base do topo da onda
      const topY = (H * 0.32) + currentYOffset;
      const gap = (H * 0.25) / n;
      const step = W < 700 ? 16 : 11;

      for (let i = 0; i < n; i++) {
        const yb = topY + i * gap;
        const depth = i / n;
        ctx.strokeStyle = grads![i];
        ctx.globalAlpha = 0.2 + depth * 0.46;
        ctx.beginPath();
        for (let x = 0; x <= W; x += step) {
          const ridge =
            bump(x, cx1, 0.16) * amp + bump(x, cx2, 0.26) * amp * 0.5;
          const flow =
            Math.sin(x * 0.011 + t * 1.25 + i * 0.24) * (3 + ridge * 0.05 * depth);
          const y = yb - ridge * (0.45 + 0.55 * depth) + flow;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      if (motion) t += 0.006;
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
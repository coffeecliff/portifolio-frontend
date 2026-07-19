import { useEffect, useRef, useState } from 'react';
import { GlassPanel, SectionLabel } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { useMotionAllowed } from '@/motion/MotionContext';
import { processSteps } from '@/data/process';
import styles from './Process.module.css';

/** Duração de cada etapa em autoplay antes de avançar para a próxima. */
const AUTOPLAY_MS = 6000;

/**
 * "Como trabalhamos" — títulos das etapas à esquerda avançam sozinhos (ou por
 * clique), a linha central marca o progresso "tipo timestamp" de cada etapa,
 * e a descrição correspondente aparece à direita.
 *
 * O autoplay roda num único loop de `requestAnimationFrame` medindo tempo
 * real decorrido (delta entre frames), não um contador de "ticks": começa no
 * mount (assim que a página carrega) e nunca é pausado por
 * IntersectionObserver/scroll — a seção pode estar fora da tela que o
 * progresso continua contando corretamente, sem depender de re-renders (só
 * `active` muda de estado quando uma etapa vira a próxima). Pausa apenas no
 * hover (interação explícita do usuário) e respeita `useMotionAllowed` (sem
 * autoplay/animação quando reduzido).
 */
export function Process() {
  const motionAllowed = useMotionAllowed();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);

  const select = (index: number) => {
    setActive(index);
    setProgress(0);
    elapsedRef.current = 0;
  };

  useEffect(() => {
    if (!motionAllowed) return;
    let raf = 0;
    let lastTimestamp: number | null = null;

    const tick = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!pausedRef.current) {
        elapsedRef.current += delta;
      }

      if (elapsedRef.current >= AUTOPLAY_MS) {
        // Zera junto com a troca de etapa — nunca deixa a etapa nova herdar
        // o progresso 100% da anterior por um frame (o que gerava um "flash"
        // cheio antes de recomeçar do zero).
        elapsedRef.current = 0;
        setProgress(0);
        setActive((a) => (a + 1) % processSteps.length);
      } else {
        setProgress((elapsedRef.current / AUTOPLAY_MS) * 100);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [motionAllowed]);

  const current = processSteps[active];

  return (
    <section id="processo" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <SectionLabel className={styles.label}>Como trabalhamos</SectionLabel>
          <h2 className={styles.title}>Um processo claro, do briefing ao ar</h2>
          <p className={styles.hint}>
            Sem surpresas. Acompanhe cada etapa do nosso jeito de trabalhar.
          </p>
        </Reveal>

        <div
          className={styles.grid}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          <div className={styles.tiles}>
            {processSteps.map((step, index) => {
              const isActive = active === index;
              return (
                <Reveal key={step.step} delay={index * 60}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    className={[styles.tile, isActive && styles.tileActive]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => select(index)}
                  >
                    <span className={styles.tileStep}>{step.step}</span>
                    <span className={styles.tileTitle}>{step.title}</span>
                    <span className={styles.tileBar}>
                      <span
                        className={styles.tileBarFill}
                        style={{
                          width: `${isActive ? (motionAllowed ? progress : 100) : 0}%`,
                        }}
                      />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div className={styles.timeline} aria-hidden="true">
            {processSteps.map((step, index) => {
              const fill =
                index < active
                  ? 100
                  : index === active
                    ? motionAllowed
                      ? progress
                      : 100
                    : 0;
              return (
                <span key={step.step} className={styles.segment}>
                  <span className={styles.segmentFill} style={{ height: `${fill}%` }} />
                </span>
              );
            })}
          </div>

          <div className={styles.detail} aria-live="polite">
            <div
              key={current.step}
              className={
                motionAllowed
                  ? [styles.detailContent, styles.detailContentAnimated].join(' ')
                  : styles.detailContent
              }
            >
              <span className={styles.detailStep}>{current.step}</span>
              <h3 className={styles.detailTitle}>{current.title}</h3>
              <p className={styles.detailDesc}>{current.desc}</p>
              <p className={styles.detailBody}>{current.detail}</p>
            </div>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}

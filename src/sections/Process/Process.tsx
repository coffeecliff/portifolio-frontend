import { useEffect, useRef, useState } from 'react';
import { GlassPanel, SectionLabel } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { useMotionAllowed } from '@/motion/MotionContext';
import { processSteps } from '@/data/process';
import styles from './Process.module.css';

/** Duração de cada etapa em autoplay antes de avançar para a próxima. */
const AUTOPLAY_MS = 6000;
const TICK_MS = 40;

/**
 * "Como trabalhamos" — títulos das etapas à esquerda avançam sozinhos (ou por
 * clique), a linha central marca o progresso "tipo timestamp" de cada etapa,
 * e a descrição correspondente aparece à direita. Autoplay pausa no hover e
 * respeita `useMotionAllowed` (sem autoplay/animação quando reduzido).
 */
export function Process() {
  const motionAllowed = useMotionAllowed();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);

  const select = (index: number) => {
    setActive(index);
    setProgress(0);
  };

  useEffect(() => {
    if (!motionAllowed) return;
    const increment = (TICK_MS / AUTOPLAY_MS) * 100;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setProgress((current) => {
        if (current + increment >= 100) {
          setActive((a) => (a + 1) % processSteps.length);
          return 0;
        }
        return current + increment;
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [motionAllowed, active]);

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

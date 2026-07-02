import { useState } from 'react';
import { GlassPanel, SectionLabel } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { processSteps } from '@/data/process';
import styles from './Process.module.css';

/**
 * "Como trabalhamos" — etapas do serviço. Clicar num passo expande o detalhe;
 * clicar de novo recolhe. Antecipa objeções de prazo, clareza e suporte.
 */
export function Process() {
  const [active, setActive] = useState(0);

  const toggle = (index: number) =>
    setActive((current) => (current === index ? -1 : index));

  return (
    <section id="processo" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <SectionLabel className={styles.label}>Como trabalhamos</SectionLabel>
          <h2 className={styles.title}>Um processo claro, do briefing ao ar</h2>
          <p className={styles.hint}>
            Sem surpresas. Clique em cada etapa para ver o que acontece.
          </p>
        </Reveal>

        <div className={styles.track}>
          <div className={styles.line} />
          {processSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 80}>
              <button
                type="button"
                className={styles.item}
                onClick={() => toggle(index)}
                aria-expanded={active === index}
              >
                <span className={styles.dot} />
                <span className={styles.itemHead}>
                  <span className={styles.step}>{item.step}</span>
                  <span className={styles.itemTitle}>{item.title}</span>
                </span>
                <p className={styles.desc}>{item.desc}</p>
                {active === index && (
                  <span className={styles.detail}>{item.detail}</span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

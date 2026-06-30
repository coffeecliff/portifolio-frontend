import { useState } from 'react';
import { GlassPanel, SectionLabel } from '@/design-system';
import { milestones } from '@/data/milestones';
import styles from './Timeline.module.css';

/**
 * Linha do tempo interativa. Clicar num marco expande o detalhe;
 * clicar de novo recolhe. Substitui a lógica sc-for/sc-if do protótipo.
 */
export function Timeline() {
  const [active, setActive] = useState(milestones.length - 1);

  const toggle = (index: number) =>
    setActive((current) => (current === index ? -1 : index));

  return (
    <section id="trajetoria" className={styles.section}>
      <GlassPanel>
        <SectionLabel className={styles.label}>
          Linha do tempo / Our journey
        </SectionLabel>
        <h2 className={styles.title}>Da origem aos marcos atuais</h2>
        <p className={styles.hint}>Clique em um marco para ver os detalhes.</p>

        <div className={styles.track}>
          <div className={styles.line} />
          {milestones.map((milestone, index) => (
            <button
              key={milestone.year}
              type="button"
              className={styles.item}
              onClick={() => toggle(index)}
              aria-expanded={active === index}
            >
              <span className={styles.dot} />
              <span className={styles.itemHead}>
                <span className={styles.year}>{milestone.year}</span>
                <span className={styles.itemTitle}>{milestone.title}</span>
              </span>
              <p className={styles.desc}>{milestone.desc}</p>
              {active === index && (
                <span className={styles.detail}>{milestone.detail}</span>
              )}
            </button>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

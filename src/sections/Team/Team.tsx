import { GlassPanel, SectionLabel, ImageSlot } from '@/design-system';
import { teamAreas } from '@/data/team';
import styles from './Team.module.css';

/** Seção "Quem somos" — grade de áreas de atuação do coletivo. */
export function Team() {
  return (
    <section id="equipe" className={styles.section}>
      <GlassPanel>
        <SectionLabel className={styles.label}>
          Quem somos / The collective
        </SectionLabel>
        <h2 className={styles.title}>Um coletivo, várias especialidades</h2>
        <p className={styles.intro}>
          Somos uma equipe enxuta e multidisciplinar. Em vez de cargos isolados,
          operamos como um coletivo onde engenharia, design e estratégia se
          sobrepõem em cada entrega.
        </p>

        <div className={styles.grid}>
          {teamAreas.map((area) => (
            <article key={area.id} className={styles.card}>
              <ImageSlot placeholder="Foto / retrato" height={170} radius={14} />
              <SectionLabel className={styles.cardTag}>{area.tag}</SectionLabel>
              <h3 className={styles.cardTitle}>{area.title}</h3>
              <p className={styles.cardDesc}>{area.description}</p>
            </article>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

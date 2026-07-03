import { GlassPanel, SectionLabel } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { about } from '@/data/about';
import styles from './About.module.css';

/** Seção "Sobre" — posicionamento do estúdio e pilares de confiança. */
export function About() {
  return (
    <section id="sobre" className={styles.section}>
      <GlassPanel>
        <div className={styles.layout}>
          <Reveal className={styles.intro}>
            <SectionLabel className={styles.label}>{about.eyebrow}</SectionLabel>
            <h2 className={styles.title}>{about.title}</h2>
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div className={styles.pillars}>
            {about.pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 90} className={styles.pillarWrap}>
                <article className={styles.pillar}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDesc}>{pillar.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}

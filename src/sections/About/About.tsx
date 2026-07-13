import { GlassPanel, SectionHeader, GradientBorderCard } from '@/design-system';
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
            <SectionHeader eyebrow={about.eyebrow} title={about.title} />
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div className={styles.pillars}>
            {about.pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 90} className={styles.pillarWrap}>
                <GradientBorderCard accent="violet" className={styles.pillar}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDesc}>{pillar.description}</p>
                </GradientBorderCard>
              </Reveal>
            ))}
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}

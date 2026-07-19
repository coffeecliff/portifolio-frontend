import { GlassPanel, SectionHeader, GradientBorderCard } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { useMotionAllowed } from '@/motion/MotionContext';
import { about } from '@/data/about';
import styles from './About.module.css';

/**
 * Seção "Sobre" — pilares em pilha de tiles com scroll pin: cada tile ancora
 * (`position: sticky`) perto do topo e a próxima cobre a anterior conforme a
 * página rola, deixando uma borda empilhada visível (sem JS de scroll — só
 * `position: sticky` nativo, ver About.module.css). Some para uma lista
 * normal com espaçamento quando o movimento está desligado.
 */
export function About() {
  const motionAllowed = useMotionAllowed();
  const stackClass = [styles.stack, motionAllowed ? styles.stacked : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section id="sobre" className={styles.section}>
      <GlassPanel>
        <Reveal className={styles.intro}>
          <SectionHeader eyebrow={about.eyebrow} title={about.title} />
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className={stackClass}>
          {about.pillars.map((pillar, i) => (
            <Reveal key={pillar.id} delay={i * 90} className={styles.tileWrap}>
              <GradientBorderCard accent="violet" className={styles.tile}>
                <div className={styles.tileBody}>
                  <h3 className={styles.tileTitle}>{pillar.title}</h3>
                  <p className={styles.tileDesc}>{pillar.description}</p>
                </div>
                <div className={styles.tileMedia}>
                  {pillar.image ? (
                    <img className={styles.tileImg} src={pillar.image} alt={pillar.imageAlt} />
                  ) : (
                    <div className={styles.tilePlaceholder} aria-hidden="true" />
                  )}
                  <span aria-hidden="true" className={styles.tileFade} />
                </div>
              </GradientBorderCard>
            </Reveal>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

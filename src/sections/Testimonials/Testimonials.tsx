import { GlassPanel, SectionLabel } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { testimonials } from '@/data/testimonials';
import styles from './Testimonials.module.css';

/**
 * Seção "Depoimentos" — prova social. Só aparece quando há depoimento REAL
 * (regra anti-fake): com o array vazio, retorna `null` e não ocupa espaço.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <SectionLabel className={styles.label}>Quem já confiou</SectionLabel>
          <h2 className={styles.title}>O que dizem sobre o nosso trabalho</h2>
        </Reveal>

        <div className={styles.grid}>
          {testimonials.map((item, i) => (
            <Reveal key={item.id} delay={i * 90} className={styles.cardWrap}>
              <figure className={styles.card}>
                <blockquote className={styles.quote}>{item.quote}</blockquote>
                <figcaption className={styles.author}>
                  <span className={styles.name}>{item.author}</span>
                  <span className={styles.segment}>{item.segment}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

import { GlassPanel, SectionLabel } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { services } from '@/data/services';
import styles from './Services.module.css';

/** Seção "O que entregamos" — grade de serviços traduzidos em benefício. */
export function Services() {
  return (
    <section id="servicos" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <SectionLabel className={styles.label}>O que entregamos</SectionLabel>
          <h2 className={styles.title}>
            Sua solução digital completa, do design à entrega
          </h2>
          <p className={styles.intro}>
            Somos uma dupla enxuta e especializada em front-end. Atendemos
            qualquer segmento — varejo, saúde, serviços, tech, eventos — com o
            mesmo alto padrão de acabamento em cada projeto.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 90} className={styles.cardWrap}>
              <article className={styles.card}>
                <span className={styles.index}>{service.index}</span>
                <SectionLabel tone="magenta" className={styles.cardTag}>
                  {service.tag}
                </SectionLabel>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

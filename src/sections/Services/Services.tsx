import { GlassPanel, SectionHeader, SectionLabel, GradientBorderCard } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { services } from '@/data/services';
import styles from './Services.module.css';

/** Seção "O que entregamos" — grade de serviços traduzidos em benefício. */
export function Services() {
  return (
    <section id="servicos" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <SectionHeader
            eyebrow="O que entregamos"
            title="Sua solução digital completa, do design à entrega"
            intro="Somos uma equipe enxuta e especializada em front-end. Atendemos qualquer segmento: varejo, saúde, serviços, tech, eventos. Tudo com o mesmo alto padrão de acabamento em cada projeto."
          />
        </Reveal>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 90} className={styles.cardWrap}>
              <GradientBorderCard accent="magenta" className={styles.card}>
                <SectionLabel tone="magenta" className={styles.cardTag}>
                  {service.tag}
                </SectionLabel>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
              </GradientBorderCard>
            </Reveal>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

import { GlassPanel, SectionHeader, GradientBorderCard } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { techStack } from '@/data/stack';
import styles from './Tech.module.css';

/**
 * Seção "Tecnologias" — voltada ao cliente NÃO-técnico: cada ferramenta é
 * apresentada pelo resultado que gera no site (benefício), não por jargão.
 */
export function Tech() {
  return (
    <section id="tecnologias" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <SectionHeader
            eyebrow="Tecnologia a seu favor"
            title="Ferramentas de ponta, resultado que você sente"
            intro="Você não precisa entender de código. Precisa de um site rápido, bonito e que funciona. Estas são as tecnologias por trás disso, e o que cada uma entrega para a sua presença digital."
          />
        </Reveal>

        <div className={styles.grid}>
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <Reveal key={tech.name} delay={i * 70} className={styles.cardWrap}>
                <GradientBorderCard accent="cyan">
                  <span className={styles.icon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className={styles.name}>{tech.name}</h3>
                  <p className={styles.benefit}>{tech.benefit}</p>
                </GradientBorderCard>
              </Reveal>
            );
          })}
        </div>
      </GlassPanel>
    </section>
  );
}

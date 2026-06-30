import { GlassPanel, SectionLabel } from '@/design-system';
import { techStack } from '@/data/stack';
import styles from './TechStack.module.css';

/** Seção de tecnologias — grade de chips com ícone + nome. */
export function TechStack() {
  return (
    <section id="stack" className={styles.section}>
      <GlassPanel>
        <SectionLabel className={styles.label}>
          Ferramentas / Tech stack
        </SectionLabel>
        <h2 className={styles.title}>Stack moderno, escolhido a dedo</h2>
        <p className={styles.intro}>
          Tecnologias maduras e de ponta que priorizam segurança de tipo,
          performance e velocidade de entrega.
        </p>

        <div className={styles.grid}>
          {techStack.map((tech) => (
            <div key={tech.name} className={styles.item}>
              <span className={styles.icon}>{tech.icon}</span>
              <span className={styles.name}>{tech.name}</span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

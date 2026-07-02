import { GlassPanel, SectionLabel, ImageSlot, Tag, Button } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { projects } from '@/data/projects';
import styles from './Projects.module.css';

/**
 * Showcase por segmento — demonstra versatilidade (atendemos qualquer ramo).
 * ⚠️ Cards são exemplos ilustrativos enquanto o portfólio real está em
 * construção; imagens usam placeholder e não há métricas/clientes fabricados.
 */
export function Projects() {
  return (
    <section id="projetos" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <header className={styles.head}>
            <div>
              <SectionLabel className={styles.label}>
                Do varejo à saúde, de serviços a eventos
              </SectionLabel>
              <h2 className={styles.title}>
                O mesmo alto padrão para qualquer segmento
              </h2>
            </div>
            <span className={styles.count}>Portfólio em construção</span>
          </header>
        </Reveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 90}>
              <article className={styles.card}>
                <ImageSlot
                  placeholder="Projeto em breve"
                  height={230}
                  shape="rect"
                />
                <div className={styles.body}>
                  <SectionLabel tone="magenta" className={styles.segment}>
                    {project.segment}
                  </SectionLabel>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.footer}>
          <p className={styles.footerText}>
            Quer um resultado assim para o seu negócio?
          </p>
          <Button href="#contato">Peça seu orçamento</Button>
        </Reveal>
      </GlassPanel>
    </section>
  );
}

import { GlassPanel, SectionLabel, ImageSlot, Tag } from '@/design-system';
import { projects } from '@/data/projects';
import styles from './Projects.module.css';

/** Seção de trabalhos selecionados — grade de cards de projeto. */
export function Projects() {
  return (
    <section id="projetos" className={styles.section}>
      <GlassPanel>
        <header className={styles.head}>
          <div>
            <SectionLabel className={styles.label}>
              Projetos desenvolvidos / Selected work
            </SectionLabel>
            <h2 className={styles.title}>Trabalhos selecionados</h2>
          </div>
          <span className={styles.count}>
            {String(projects.length).padStart(2, '0')} projetos
          </span>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              <ImageSlot
                placeholder="Thumbnail do projeto"
                height={230}
                shape="rect"
              />
              <div className={styles.body}>
                <SectionLabel tone="magenta" className={styles.category}>
                  {project.category}
                </SectionLabel>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <a href="#projetos" className={styles.link}>
                  Ver caso →
                </a>
              </div>
            </article>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

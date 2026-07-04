import { useEffect, useState } from 'react';
import { GlassPanel, SectionLabel, ImageSlot, Tag, Button } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { useMotionAllowed } from '@/motion/MotionContext';
import { useSequentialReveal } from '@/motion/useSequentialReveal';
import { projects } from '@/data/projects';
import styles from './Projects.module.css';

/**
 * Showcase por segmento — demonstra versatilidade (atendemos qualquer ramo).
 * ⚠️ Cards/telas são exemplos ilustrativos enquanto o portfólio real está em
 * construção; imagens usam placeholder e não há métricas/clientes fabricados.
 *
 * Comportamento premium (`ShowcaseProjects`): a seção é pinada e passa por três
 * fases dirigidas por scroll — zoom in da box até tela cheia, uma sequência de
 * projetos (split-screen: texto fixo à esquerda + grade 2×2 das telas do
 * projeto em foco fixa à direita, que surge com fade+slide da direita,
 * permanece parada e sai continuando o movimento para a esquerda ao ceder
 * lugar ao próximo projeto) e zoom out de volta ao card. Um fadein/fadeout por
 * projeto (não por tela), o que deixa claro onde cada projeto começa e
 * termina. Com movimento desligado ou viewport estreita/baixa, cai para
 * `StaticProjects` (grade).
 */

const pad = (n: number) => String(n).padStart(2, '0');

function Header() {
  return (
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
  );
}

/* ============================ Versão estática ============================ */

function Grid() {
  return (
    <div className={styles.grid}>
      {projects.map((project, i) => (
        <Reveal key={project.id} delay={i * 90}>
          <article className={styles.card}>
            <ImageSlot placeholder="Projeto em breve" height={170} shape="rect" />
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
  );
}

function StaticFooter() {
  return (
    <Reveal className={styles.footer}>
      <p className={styles.footerText}>
        Quer um resultado assim para o seu negócio?
      </p>
      <Button href="#contato">Peça seu orçamento</Button>
    </Reveal>
  );
}

/** Versão estática (sem movimento / viewport pequena): grade de cards. */
function StaticProjects() {
  return (
    <section id="projetos" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <Header />
        </Reveal>
        <Grid />
        <StaticFooter />
      </GlassPanel>
    </section>
  );
}

/* ===================== Versão premium (scroll-driven) ==================== */

/** Coluna esquerda: texto do projeto em foco (cross-fade) + progresso + CTA. */
function TextColumn({ active }: { active: number }) {
  return (
    <div className={styles.textCol}>
      <SectionLabel className={styles.eyebrow}>Projetos por segmento</SectionLabel>

      <div className={styles.textStack}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`${styles.textItem} ${i === active ? styles.textActive : ''}`}
            aria-hidden={i !== active}
          >
            <SectionLabel tone="magenta" className={styles.itemSegment}>
              {project.segment}
            </SectionLabel>
            <h3 className={styles.itemTitle}>{project.title}</h3>
            <p className={styles.itemDesc}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.progress}>
        <span className={styles.counter}>
          {pad(active + 1)} <span className={styles.counterTotal}>/ {pad(projects.length)}</span>
        </span>
        <div className={styles.dots}>
          {projects.map((project, i) => (
            <span
              key={project.id}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      </div>

      <Button href="#contato" className={styles.textCta}>
        Peça seu orçamento
      </Button>
    </div>
  );
}

function ShowcaseProjects() {
  const { wrapperRef, stageRef, activeIndex } = useSequentialReveal(projects.length);

  // Altura do wrapper: fases de zoom (in+out) + espaço p/ a sequência de projetos.
  // Cada projeto agora é um único ciclo fadein/hold/fadeout (não mais um por
  // tela), então precisa de mais scroll por item do que os antigos 30vh/tela.
  const wrapperHeight = `${180 + projects.length * 80}vh`;

  return (
    <section
      id="projetos"
      className={styles.pinWrapper}
      ref={wrapperRef}
      style={{ height: wrapperHeight }}
    >
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.frame}>
          <div className={styles.split}>
            <TextColumn active={activeIndex} />

            <div className={styles.mediaCol}>
              {projects.map((project, i) => {
                const phase =
                  i === activeIndex
                    ? styles.shotActive
                    : i < activeIndex
                      ? styles.shotDone
                      : styles.shotPending;
                return (
                  <div key={project.id} className={`${styles.shotItem} ${phase}`}>
                    <div className={styles.shotGrid}>
                      {project.shots.map((shot) => (
                        <figure key={shot.id} className={styles.shotCell}>
                          <ImageSlot placeholder="Prévia em breve" height="100%" />
                          <figcaption className={styles.shotCaption}>
                            {shot.label}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== Seleção ================================== */

/**
 * A experiência pinada só roda onde o split-screen respira: telas largas
 * (≥1200px) e altas o bastante (≥760px). Fora disso, ou com movimento
 * desligado, cai para a grade estática. Reavalia em resize/rotação.
 */
const SHOWCASE_QUERY = '(min-width: 1200px) and (min-height: 760px)';

function useWideViewport() {
  const [wide, setWide] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(SHOWCASE_QUERY).matches
      : true,
  );
  useEffect(() => {
    const mq = window.matchMedia(SHOWCASE_QUERY);
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return wide;
}

export function Projects() {
  const motionAllowed = useMotionAllowed();
  const wide = useWideViewport();
  return motionAllowed && wide ? <ShowcaseProjects /> : <StaticProjects />;
}

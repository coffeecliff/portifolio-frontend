import { useEffect, useState } from 'react';
import { GlassPanel, SectionLabel, ImageSlot, Tag, Button } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { useMotionAllowed } from '@/motion/MotionContext';
import { useScrollProgress } from '@/motion/useScrollProgress';
import { projects } from '@/data/projects';
import styles from './Projects.module.css';

/**
 * Showcase por segmento — demonstra versatilidade (atendemos qualquer ramo).
 * ⚠️ Cards são exemplos ilustrativos enquanto o portfólio real está em
 * construção; imagens usam placeholder e não há métricas/clientes fabricados.
 *
 * Comportamento: quando o movimento está permitido, a box parte do formato
 * compacto (vidro) e, conforme o usuário rola, expande até preencher 100% da
 * viewport e transiciona o fundo de glassmorphism para sólido/imersivo — ver
 * `ExpandingProjects`. Com movimento desligado, cai para `StaticProjects`.
 */

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

function Grid() {
  return (
    <div className={styles.grid}>
      {projects.map((project, i) => (
        <Reveal key={project.id} delay={i * 90}>
          <article className={styles.card}>
            <ImageSlot
              placeholder="Projeto em breve"
              height="calc(140px + 34px * var(--p, 0))"
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
  );
}

function Footer() {
  return (
    <Reveal className={styles.footer}>
      <p className={styles.footerText}>
        Quer um resultado assim para o seu negócio?
      </p>
      <Button href="#contato">Peça seu orçamento</Button>
    </Reveal>
  );
}

/** Versão estática (sem movimento): a box glass original, como sempre foi. */
function StaticProjects() {
  return (
    <section id="projetos" className={styles.section}>
      <GlassPanel>
        <Reveal>
          <Header />
        </Reveal>
        <Grid />
        <Footer />
      </GlassPanel>
    </section>
  );
}

/**
 * Versão scroll-driven. `useScrollProgress` escreve `--p` (0→1) no stage; toda
 * a interpolação (tamanho da box, raio, blur, opacidade do fundo sólido,
 * padding/gap/tipografia dos cards) é feita via `calc()` no CSS a partir de
 * `--p` — sem re-render do React por frame.
 */
function ExpandingProjects() {
  const { wrapperRef, stageRef } = useScrollProgress<HTMLElement, HTMLDivElement>();

  return (
    <section id="projetos" className={styles.pinWrapper} ref={wrapperRef}>
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.box}>
          <div className={styles.boxInner}>
            <Header />
            <Grid />
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A expansão pinada só faz sentido onde a fileira de 4 cards cabe confortável
 * em 100vh: telas largas o bastante para os cards não quebrarem em muitas
 * linhas (≥1200px) e altas o bastante para header + cards + CTA caberem
 * (≥760px). Fora disso, cai para a versão estática (que não depende de altura).
 * Reavalia em resize/rotação.
 */
const EXPAND_QUERY = '(min-width: 1200px) and (min-height: 760px)';

function useWideViewport() {
  const [wide, setWide] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(EXPAND_QUERY).matches
      : true,
  );
  useEffect(() => {
    const mq = window.matchMedia(EXPAND_QUERY);
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
  return motionAllowed && wide ? <ExpandingProjects /> : <StaticProjects />;
}

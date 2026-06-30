import { Button, SectionLabel } from '@/design-system';
import { GlassCube } from './GlassCube';
import styles from './Hero.module.css';

interface HeroProps {
  motionEnabled?: boolean;
}

/** Seção de abertura: título, CTAs, cubo 3D e placas de vidro flutuantes. */
export function Hero({ motionEnabled = true }: HeroProps) {
  return (
    <header id="topo" className={styles.hero}>
      <div className={styles.titleBlock}>
        <SectionLabel className={styles.eyebrow}>
          Coletivo de tecnologia de elite
        </SectionLabel>
        <h1 className={styles.title}>
          Tech
          <br />
          Portfolio
        </h1>
        <p className={styles.lead}>
          Construímos produtos digitais de alta performance. Engenharia, design e
          produto — sob um só teto, em ritmo de estúdio.
        </p>
        <div className={styles.actions}>
          <Button href="#projetos">Ver projetos</Button>
          <Button href="#equipe" variant="ghost">
            Conhecer a equipe
          </Button>
        </div>
      </div>

      <div className={styles.cube}>
        <GlassCube motionEnabled={motionEnabled} />
      </div>

      <div className={styles.scrollHint}>SCROLL ↓</div>
    </header>
  );
}

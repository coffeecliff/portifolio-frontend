import { Fragment } from 'react';
import { Button, SectionLabel } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { site } from '@/data/site';
import { GlassCube } from './GlassCube';
import styles from './Hero.module.css';

interface HeroProps {
  motionEnabled?: boolean;
}

/** Seção de abertura: proposta de valor, CTAs e cubo 3D (com fallback 2D). */
export function Hero({ motionEnabled = true }: HeroProps) {
  const { eyebrow, titleLines, lead, primaryCta, secondaryCta, scrollHint } =
    site.hero;

  return (
    <header id="topo" className={styles.hero}>
      <div className={styles.titleBlock}>
        <Reveal delay={0}>
          <SectionLabel className={styles.eyebrow}>{eyebrow}</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h1 className={styles.title}>
            {titleLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className={styles.lead}>{lead}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className={styles.actions}>
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="ghost">
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </div>

      <div className={styles.cube}>
        <GlassCube motionEnabled={motionEnabled} />
      </div>

      <div className={styles.scrollHint}>{scrollHint} ↓</div>
    </header>
  );
}

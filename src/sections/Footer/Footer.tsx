import { GlassPanel, SectionLabel, Button } from '@/design-system';
import styles from './Footer.module.css';

const socialLinks = ['LinkedIn', 'GitHub', 'Dribbble', 'X / Twitter'];
const contactEmail = 'contato@equipetech.dev';

/** Rodapé com CTA de contato e links sociais. */
export function Footer() {
  return (
    <footer id="contato" className={styles.section}>
      <GlassPanel variant="brand" className={styles.panel}>
        <SectionLabel className={styles.label}>
          Vamos trabalhar juntos
        </SectionLabel>
        <h2 className={styles.title}>Vamos construir algo extraordinário</h2>
        <p className={styles.lead}>
          Tem um produto em mente? Conte o desafio e respondemos em até um dia útil.
        </p>
        <Button href={`mailto:${contactEmail}`} className={styles.cta}>
          {contactEmail}
        </Button>

        <nav className={styles.social}>
          {socialLinks.map((label) => (
            <a key={label} href="#contato" className={styles.socialLink}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.bottom}>
          <span className={styles.brand}>◈ EQUIPE TECH</span>
          <span>© 2026 · Construído com React · Tailwind · Vite · TypeScript</span>
        </div>
      </GlassPanel>
    </footer>
  );
}

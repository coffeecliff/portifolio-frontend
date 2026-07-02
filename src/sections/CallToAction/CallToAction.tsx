import { GlassPanel, Button, SectionLabel } from '@/design-system';
import { Reveal } from '@/motion/Reveal';
import { site } from '@/data/site';
import styles from './CallToAction.module.css';

/** Seção de conversão — o destino de todas as CTAs. */
export function CallToAction() {
  const { whatsapp, email } = site.contact;

  return (
    <section id="contato" className={styles.section}>
      <Reveal>
        <GlassPanel variant="brand" className={styles.panel}>
          <SectionLabel className={styles.label}>Vamos começar</SectionLabel>
          <h2 className={styles.title}>
            Vamos tirar o seu projeto do papel?
          </h2>
          <p className={styles.text}>
            Conte o que você precisa. Respondemos rápido com um plano e um
            orçamento — sem compromisso e sem enrolação.
          </p>
          <div className={styles.actions}>
            <Button href={whatsapp.href}>{whatsapp.label}</Button>
            <Button href={email.href} variant="ghost">
              Enviar e-mail
            </Button>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}

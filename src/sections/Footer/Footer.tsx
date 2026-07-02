import { techStack } from '@/data/stack';
import { navLinks } from '@/data/navigation';
import { site } from '@/data/site';
import styles from './Footer.module.css';

const contactLinks = [
  site.contact.whatsapp,
  site.contact.email,
  site.contact.instagram,
  site.contact.linkedin,
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.section}>
      <div className={styles.container}>
        {/* Chamada final para o contato */}
        <div className={styles.leftColumn}>
          <a href={site.contact.whatsapp.href} className={styles.ctaLink}>
            Vamos conversar <br /> sobre o seu site{' '}
            <span className={styles.arrow}>→</span>
          </a>
        </div>

        <div className={styles.rightGrid}>
          {/* Navegação interna */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>Navegação</span>
            <ul className={styles.list}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contato" className={styles.link}>
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Canais de contato */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>Canais</span>
            <ul className={styles.list}>
              {contactLinks.map((channel) => (
                <li key={channel.href}>
                  <a href={channel.href} className={styles.link}>
                    {channel.short ?? channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack — prova de capacidade técnica */}
          <div className={`${styles.column} ${styles.columnFullWidth}`}>
            <span className={styles.columnTitle}>Stack</span>
            <ul className={styles.stackRow}>
              {techStack.map((tech) => (
                <li key={tech.name} className={styles.stackItem} title={tech.name}>
                  {tech.icon && <tech.icon className={styles.stackIcon} />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.brand}>
          {site.brandMark} {site.brandName}
        </span>
        <span>© {currentYear} · Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

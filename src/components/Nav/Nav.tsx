import { Button } from '@/design-system';
import { navLinks } from '@/data/navigation';
import { site } from '@/data/site';
import styles from './Nav.module.css';

/** Barra de navegação flutuante com efeito de vidro. */
export function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#topo" className={styles.brand}>
        <span className={styles.mark}>{site.brandMark}</span>
        <span className={styles.brandName}>{site.brandName}</span>
      </a>
      <div className={styles.links}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
        <Button href="#contato" size="sm" className={styles.cta}>
          Fale conosco
        </Button>
      </div>
    </nav>
  );
}

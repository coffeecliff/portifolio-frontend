import { Button } from '@/design-system';
import { navLinks } from '@/data/navigation';
import styles from './Nav.module.css';

/** Barra de navegação flutuante com efeito de vidro. */
export function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#topo" className={styles.brand}>
        <span className={styles.mark}>◈</span>
        <span className={styles.brandName}>EQUIPE TECH</span>
      </a>
      <div className={styles.links}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
        <Button href="#contato" size="sm" className={styles.cta}>
          Vamos conversar
        </Button>
      </div>
    </nav>
  );
}

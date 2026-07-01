import { techStack } from '@/data/stack';
import styles from './Footer.module.css';

const socialLinks = ['WhatsApp', 'LinkedIn', 'Instagram', 'GitHub', 'Email'];
const workLinks = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE'];
const aboutLinks = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE'];
const trustLinks = ['Privacidade', 'Termos', 'Acessibilidade', 'Texturas · CC BY 4.0'];

export function Footer() {
  return (
    <footer id="contato" className={styles.section}>
      <div className={styles.container}>

        {/* Lado Esquerdo: Grande Chamada Visual baseada na referência */}
        <div className={styles.leftColumn}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
            Entre na conversa <br /> no LinkedIn <span className={styles.arrow}>→</span>
          </a>
        </div>

        {/* Lado Direito: As Colunas de Navegação */}
        <div className={styles.rightGrid}>

          {/* Coluna 1: Trabalho (Projetos) */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>TRABALHO</span>
            <ul className={styles.list}>
              {workLinks.map((link) => (
                <li key={link}><a href="#portfolio" className={styles.link}>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Sobre */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>SOBRE</span>
            <ul className={styles.list}>
              {aboutLinks.map((link) => (
                <li key={link}><a href="#sobre" className={styles.link}>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Canais Sociais */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>CANAIS</span>
            <ul className={styles.list}>
              {socialLinks.map((link) => (
                <li key={link}><a href="#contato" className={styles.link}>{link}</a></li>
              ))}
            </ul>
          </div>

          

          {/* Coluna 5: Trust (Políticas e Créditos) */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>TRUST</span>
            <ul className={styles.list}>
              {trustLinks.map((link) => (
                <li key={link}><a href="#privacidade" className={styles.link}>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Stack Utilizada (Agora transformada em Linha Horizontal) */}
          <div className={`${styles.column} ${styles.columnFullWidth}`}>
            <span className={styles.columnTitle}>STACK</span>
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

      {/* Identidade Final no fundo */}
      <div className={styles.bottom}>
        <span className={styles.brand}>◈ EQUIPE TECH</span>
        <span>© 2026 · Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
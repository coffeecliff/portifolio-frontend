import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { WaveCanvas } from './components/Hero/WaveCanvas';
import { Team } from './sections/Team/Team';
import { Projects } from './sections/Projects/Projects';
import { Timeline } from './sections/Timeline/Timeline';
import { Footer } from './sections/Footer/Footer';
import styles from './App.module.css';

/**
 * Configuração de interatividade — antes eram props do componente no Claude
 * Design. Centralizadas aqui para fácil ajuste (motion, cubo, densidade).
 */
const settings = {
  motionEnabled: true,
  waveDensity: 24,
};

export default function App() {
  return (
    <div className={styles.root}>
      
      {/* Glows ambientes fixos + onda interativa atrás de tudo */}
      <div className={styles.ambient} />
      <WaveCanvas
        motionEnabled={settings.motionEnabled}
        density={settings.waveDensity}
        yOffset="100px"
      />

      <Nav />

      <Hero motionEnabled={settings.motionEnabled} />
    
      <main className={styles.main}>
        <Team />
        <Projects />
        <Timeline />
        <Footer />
      </main>
    </div>
  );
}

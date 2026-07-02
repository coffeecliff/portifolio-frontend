import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { WaveCanvas } from './components/Hero/WaveCanvas';
import { Services } from './sections/Services/Services';
import { Projects } from './sections/Projects/Projects';
import { Process } from './sections/Process/Process';
import { CallToAction } from './sections/CallToAction/CallToAction';
import { Footer } from './sections/Footer/Footer';
import { MotionProvider } from './motion/MotionContext';
import styles from './App.module.css';

/**
 * Configuração de interatividade de nível de página.
 * `motionEnabled` liga/desliga animações (respeitado também via
 * prefers-reduced-motion no MotionProvider); `waveDensity` controla a onda.
 */
const settings = {
  motionEnabled: true,
  waveDensity: 24,
};

export default function App() {
  return (
    <MotionProvider enabled={settings.motionEnabled}>
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
          <Services />
          <Projects />
          <Process />
          <CallToAction />
          <Footer />
        </main>
      </div>
    </MotionProvider>
  );
}

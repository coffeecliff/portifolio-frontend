import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { WaveCanvas } from './components/Hero/WaveCanvas';
import { LiquidGlassDefs } from './design-system';
import { Services } from './sections/Services/Services';
import { Projects } from './sections/Projects/Projects';
import { About } from './sections/About/About';
import { Process } from './sections/Process/Process';
import { Tech } from './sections/Tech/Tech';
import { Testimonials } from './sections/Testimonials/Testimonials';
import { CallToAction } from './sections/CallToAction/CallToAction';
import { Footer } from './sections/Footer/Footer';
import { MotionProvider } from './motion/MotionContext';
import { SmoothScroll } from './motion/SmoothScroll';
import styles from './App.module.css';

/**
 * Configuração de interatividade de nível de página.
 * `motionEnabled` liga/desliga animações (respeitado também via
 * prefers-reduced-motion no MotionProvider); `waveDensity` controla a onda;
 * `smoothScroll` liga o scroll com inércia contínua (Lenis) na página.
 */
const settings = {
  motionEnabled: true,
  waveDensity: 24,
  smoothScroll: true,
};

export default function App() {
  return (
    <MotionProvider enabled={settings.motionEnabled}>
      <SmoothScroll enabled={settings.smoothScroll} />
      <div className={styles.root}>
        <LiquidGlassDefs />
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
          <About />
          <Process />
          <Tech />
          <Testimonials />
          <CallToAction />
          <Footer />
        </main>
      </div>
    </MotionProvider>
  );
}

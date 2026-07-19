import { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiVite,
  SiThreedotjs,
  SiNodedotjs,
  SiJavascript,
} from 'react-icons/si';

export interface TechItem {
  name: string;
  icon: IconType;
  /**
   * O que essa tecnologia entrega para o SITE DO CLIENTE, em linguagem simples
   * (framework FAB: recurso → benefício). Foco no resultado visual/percebido,
   * não em capacidade técnica — o público não é técnico.
   */
  benefit: string;
}

/**
 * Stack real usada pela equipe. Reforça credibilidade, mas comunicada pelo
 * RESULTADO que gera no site do cliente — não por jargão técnico. Só
 * ferramentas que de fato usamos; sem enfeite.
 */
export const techStack: TechItem[] = [
  {
    name: 'React',
    icon: SiReact,
    benefit: 'Páginas que respondem na hora ao clique, sem travar nem recarregar.',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    benefit: 'Menos bugs e um site estável, a base sólida por trás da entrega.',
  },
    {
    name: 'JavaScript',
    icon: SiJavascript,
    benefit: 'Linguagem de programação que torna o site interativo e dinâmico.',
  },
  {
    name: 'Vite',
    icon: SiVite,
    benefit: 'Carregamento instantâneo, mesmo em conexões e celulares mais lentos.',
  },
  {
    name: 'Three.js',
    icon: SiThreedotjs,
    benefit: 'Efeitos 3D e movimento que impressionam já no primeiro segundo.',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    benefit: 'Integrações e automações para o site trabalhar pelo seu negócio.',
  },

];

import { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiVite,
  SiThreedotjs,
  SiNodedotjs,
  SiFigma,
} from 'react-icons/si';

export interface TechItem {
  name: string;
  icon: IconType;
}

/**
 * Stack real usada pela dupla — reforça credibilidade técnica (prova de
 * capacidade). Só ferramentas que de fato usamos; sem enfeite.
 */
export const techStack: TechItem[] = [
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Vite', icon: SiVite },
  { name: 'Three.js', icon: SiThreedotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Figma', icon: SiFigma },
];

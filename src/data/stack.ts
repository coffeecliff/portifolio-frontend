import { IconType } from 'react-icons';
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiVite, 
  SiNodedotjs, 
  SiMysql
} from 'react-icons/si';

export interface TechItem {
  name: string;
  icon: IconType;
}

export const techStack: TechItem[] = [
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Vite', icon: SiVite },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'MySQL', icon: SiMysql },
];
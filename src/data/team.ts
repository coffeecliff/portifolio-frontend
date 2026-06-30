export interface TeamArea {
  id: string;
  tag: string;
  title: string;
  description: string;
}

export const teamAreas: TeamArea[] = [
  {
    id: 'team1',
    tag: 'Engenharia',
    title: 'Engenharia & Arquitetura',
    description:
      'Sistemas distribuídos, performance e código sustentável. Do protótipo à escala de produção.',
  },
  {
    id: 'team2',
    tag: 'Design',
    title: 'Design & Experiência',
    description:
      'Interfaces que unem estética e clareza. Design systems, motion e protótipos de alta fidelidade.',
  },
  {
    id: 'team3',
    tag: 'Produto',
    title: 'Produto & Estratégia',
    description:
      'Descoberta, roadmap e métricas. Traduzimos objetivos de negócio em produtos que entregam valor.',
  },
  {
    id: 'team4',
    tag: 'Infra',
    title: 'Infra & DevOps',
    description:
      'Cloud, CI/CD e observabilidade. Infraestrutura resiliente para entregas contínuas e seguras.',
  },
];

export interface Milestone {
  year: string;
  title: string;
  desc: string;
  detail: string;
}

export const milestones: Milestone[] = [
  {
    year: '2019',
    title: 'A origem',
    desc: 'Três amigos engenheiros começam a prototipar produtos nos fins de semana.',
    detail:
      'Um repositório compartilhado, um Figma e muita vontade. Os primeiros experimentos definiram a cultura de qualidade e velocidade que carregamos até hoje.',
  },
  {
    year: '2021',
    title: 'Primeiros clientes',
    desc: 'O coletivo se formaliza e entrega seus primeiros produtos para clientes reais.',
    detail:
      'Migramos de freelas pontuais para parcerias de longo prazo. Estruturamos o nosso primeiro design system interno e o processo de descoberta de produto.',
  },
  {
    year: '2023',
    title: 'Escala',
    desc: 'Projetos com milhões de usuários e times multidisciplinares dedicados.',
    detail:
      'Investimos pesado em infraestrutura, observabilidade e automação. As entregas passaram a ser contínuas, com qualidade de produção desde o primeiro dia.',
  },
  {
    year: '2026',
    title: 'Hoje',
    desc: 'Um estúdio de tecnologia de elite, do conceito ao deploy.',
    detail:
      'Operamos como um único organismo: produto, design e engenharia em sincronia. Buscamos parceiros que querem construir algo extraordinário.',
  },
];

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'proj1',
    category: 'Web3 · Protocol',
    title: 'Protocolo DeFi descentralizado',
    description:
      'Plataforma de trading on-chain com liquidez automatizada, dashboards em tempo real e carteira integrada.',
    tags: ['Solidity', 'React', 'The Graph'],
  },
  {
    id: 'proj2',
    category: 'Data · SaaS',
    title: 'Painel de analytics em tempo real',
    description:
      'Streaming de eventos com visualizações interativas, alertas e relatórios automatizados para times de produto.',
    tags: ['TypeScript', 'WebSocket', 'D3'],
  },
  {
    id: 'proj3',
    category: 'Mobile · App',
    title: 'App de mobilidade urbana',
    description:
      'Roteamento inteligente, pagamentos integrados e experiência fluida para milhões de viagens por mês.',
    tags: ['React Native', 'Node.js', 'Maps'],
  },
  {
    id: 'proj4',
    category: 'Commerce · B2B',
    title: 'Marketplace B2B',
    description:
      'Catálogo multi-fornecedor, cotações e gestão de pedidos com integrações de ERP e logística.',
    tags: ['Next.js', 'GraphQL', 'PostgreSQL'],
  },
];

export interface Project {
  id: string;
  /** Segmento de mercado — reforça versatilidade (atendemos qualquer ramo). */
  segment: string;
  title: string;
  description: string;
  /** Entregáveis/atributos da solução (não são clientes reais). */
  tags: string[];
}

/**
 * ⚠️ PLACEHOLDER: portfólio em construção. Os cards abaixo são exemplos
 * ILUSTRATIVOS das soluções que entregamos por segmento — não representam
 * clientes reais nem métricas. Substituir por cases reais quando disponíveis
 * (respeitando a regra de nunca fabricar resultados/depoimentos).
 */
export const projects: Project[] = [
  {
    id: 'seg-varejo',
    segment: 'Varejo & E-commerce',
    title: 'Loja online que vende',
    description:
      'Vitrine digital rápida e persuasiva, pensada para transformar cada visita em pedido.',
    tags: ['Design sob medida', 'Responsivo', 'SEO'],
  },
  {
    id: 'seg-saude',
    segment: 'Saúde & Bem-estar',
    title: 'Site de clínica que gera agendamentos',
    description:
      'Presença profissional que transmite confiança e leva o paciente direto ao contato.',
    tags: ['Conversão', 'Agendamento', 'Mobile-first'],
  },
  {
    id: 'seg-servicos',
    segment: 'Serviços & B2B',
    title: 'Landing page que qualifica leads',
    description:
      'Autoridade e clareza para atrair o cliente certo e abastecer o seu time comercial.',
    tags: ['Copy de vendas', 'Formulário', 'Performance'],
  },
  {
    id: 'seg-eventos',
    segment: 'Eventos & Lançamentos',
    title: 'Página de captação de inscrições',
    description:
      'Impacto visual e senso de urgência para lotar o seu evento ou lançamento.',
    tags: ['Alto impacto', 'Contagem regressiva', 'Integrações'],
  },
];

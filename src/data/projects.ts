export interface ProjectShot {
  id: string;
  /** Tipo de tela retratada — placeholder até a prévia real existir. */
  label: string;
}

export interface Project {
  id: string;
  /** Segmento de mercado — reforça versatilidade (atendemos qualquer ramo). */
  segment: string;
  title: string;
  description: string;
  /** Entregáveis/atributos da solução (não são clientes reais). */
  tags: string[];
  /**
   * Telas exibidas em sequência na seção de projetos. Enquanto o portfólio
   * real não existe, servem de placeholder: cada `label` nomeia o TIPO de
   * tela que a prévia mostraria (sem métricas nem clientes fabricados).
   */
  shots: ProjectShot[];
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
    shots: [
      { id: 'varejo-home', label: 'Home da loja' },
      { id: 'varejo-produto', label: 'Página de produto' },
    ],
  },
  {
    id: 'seg-saude',
    segment: 'Saúde & Bem-estar',
    title: 'Site de clínica que gera agendamentos',
    description:
      'Presença profissional que transmite confiança e leva o paciente direto ao contato.',
    tags: ['Conversão', 'Agendamento', 'Mobile-first'],
    shots: [
      { id: 'saude-home', label: 'Página inicial' },
      { id: 'saude-servicos', label: 'Especialidades' },
      { id: 'saude-equipe', label: 'Equipe' },
      { id: 'saude-agenda', label: 'Agendamento' },
    ],
  },
  {
    id: 'seg-servicos',
    segment: 'Serviços & B2B',
    title: 'Landing page que qualifica leads',
    description:
      'Autoridade e clareza para atrair o cliente certo e abastecer o seu time comercial.',
    tags: ['Copy de vendas', 'Formulário', 'Performance'],
    shots: [
      { id: 'servicos-hero', label: 'Proposta de valor' },
      { id: 'servicos-solucao', label: 'Solução' },
      { id: 'servicos-form', label: 'Formulário de contato' },
    ],
  },
  {
    id: 'seg-eventos',
    segment: 'Eventos & Lançamentos',
    title: 'Página de captação de inscrições',
    description:
      'Impacto visual e senso de urgência para lotar o seu evento ou lançamento.',
    tags: ['Alto impacto', 'Contagem regressiva', 'Integrações'],
    shots: [
      { id: 'eventos-hero', label: 'Abertura do evento' },
      { id: 'eventos-programacao', label: 'Programação' },
      { id: 'eventos-palestrantes', label: 'Palestrantes' },
      { id: 'eventos-inscricao', label: 'Inscrição' },
    ],
  },
];

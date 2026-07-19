/**
 * Conteúdo da seção "Sobre" — posicionamento do estúdio VÉRTICE.
 * Fala da marca (não expõe os indivíduos), constrói confiança e reforça o alto
 * padrão. Sem métricas/clientes inventados — apenas posicionamento verdadeiro.
 *
 * ⚠️ PLACEHOLDER: os textos abaixo são posicionamento genérico da equipe.
 * Refine com a história real do estúdio antes de publicar (sem inventar dados).
 */

export interface AboutPillar {
  id: string;
  title: string;
  description: string;
  /** URL da imagem real da tile; ausente = mostra placeholder. */
  image?: string;
  /** Texto alternativo da imagem (acessibilidade). Sempre preencher. */
  imageAlt: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  /** Parágrafos de apresentação do estúdio. */
  paragraphs: string[];
  /** Diferenciais/pilares que sustentam a promessa de valor. */
  pillars: AboutPillar[];
}

export const about: AboutContent = {
  eyebrow: 'Sobre o estúdio',
  title: 'Um estúdio enxuto, obcecado por acabamento',
  paragraphs: [
    'A VÉRTICE nasceu para resolver um problema simples: a maioria dos sites parece igual e não vende. Somos uma equipe de front-end que trata cada projeto como a nossa própria vitrine, do primeiro pixel à entrega final.',
    'Trabalhamos unidos, sem intermediários e sem burocracia de agência. Isso significa comunicação direta, decisões rápidas e um cuidado artesanal com cada detalhe da sua presença digital, não importa o seu segmento.',
  ],
  pillars: [
    {
      id: 'pillar-craft',
      title: 'Acabamento de verdade',
      description:
        'Nada de template genérico. Cada tela é desenhada e ajustada até transmitir o alto padrão que a sua marca merece.',
      imageAlt: 'Prévia de uma tela com acabamento premium desenhada pelo estúdio',
    },
    {
      id: 'pillar-direct',
      title: 'Contato direto com quem faz',
      description:
        'Você fala diretamente com a equipe que desenha e desenvolve. Sem ruído, sem repasse, mais agilidade e clareza.',
      imageAlt: 'Equipe do estúdio em uma conversa direta com o cliente',
    },
    {
      id: 'pillar-conversion',
      title: 'Foco em resultado',
      description:
        'Bonito não basta. Estruturamos cada página para guiar o seu visitante até a ação: contato, orçamento ou venda.',
      imageAlt: 'Fluxo de conversão de uma landing page guiando até o contato',
    },
    {
      id: 'pillar-versatile',
      title: 'Qualquer segmento',
      description:
        'Varejo, saúde, serviços, tech, eventos. Adaptamos linguagem e estética ao seu ramo, com o mesmo padrão de qualidade.',
      imageAlt: 'Composição representando diferentes segmentos atendidos pelo estúdio',
    },
  ],
};

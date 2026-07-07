export interface Service {
  id: string;
  /** Numeração exibida como acento (01, 02, …). */
  index: string;
  tag: string;
  title: string;
  description: string;
}

/**
 * Serviços da equipe, traduzidos em benefício para o cliente (framework FAB).
 * Reforçam a oferta central — landing pages e sites de alto padrão — e a
 * versatilidade para qualquer segmento.
 */
export const services: Service[] = [
  {
    id: 'srv-landing',
    index: '01',
    tag: 'Conversão',
    title: 'Landing pages que convertem',
    description:
      'Páginas com um objetivo claro: transformar visitantes em contatos, orçamentos e vendas. Cada seção guia o cliente até a ação.',
  },
  {
    id: 'srv-sites',
    index: '02',
    tag: 'Autoridade',
    title: 'Sites institucionais & portfólios',
    description:
      'Presença digital completa que transmite credibilidade e o alto padrão da sua marca, a vitrine que o seu negócio merece.',
  },
  {
    id: 'srv-design',
    index: '03',
    tag: 'Sob medida',
    title: 'Design exclusivo, nada de template',
    description:
      'Interface pensada pixel a pixel para a sua audiência e o seu segmento. Um acabamento que diferencia você da concorrência.',
  },
  {
    id: 'srv-perf',
    index: '04',
    tag: 'Performance',
    title: 'Rápido e impecável em qualquer tela',
    description:
      'Carregamento veloz e experiência fluida do celular ao desktop. Site leve, responsivo e pronto para ser encontrado no Google.',
  },
];

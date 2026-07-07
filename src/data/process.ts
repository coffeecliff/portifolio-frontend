export interface ProcessStep {
  /** Numeração do passo (01, 02, …). */
  step: string;
  title: string;
  desc: string;
  detail: string;
}

/**
 * Como trabalhamos — etapas reais do serviço. Antecipa objeções de prazo,
 * clareza e acompanhamento, reforçando profissionalismo e previsibilidade.
 */
export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Briefing & estratégia',
    desc: 'Entendemos o seu negócio, o seu público e o objetivo do site antes de desenhar qualquer coisa.',
    detail:
      'Uma conversa direta para mapear o que você vende, para quem e qual ação o site precisa gerar. Saímos daqui com um escopo claro, prazo e o caminho de conversão definido, sem retrabalho depois.',
  },
  {
    step: '02',
    title: 'Design & protótipo',
    desc: 'Criamos o layout sob medida e alinhamos cada tela com você antes de programar.',
    detail:
      'Você aprova a identidade visual, a estrutura das seções e a copy em um protótipo navegável. Ajustamos até ficar do jeito certo, o que evita surpresas e garante que o resultado combine com a sua marca.',
  },
  {
    step: '03',
    title: 'Desenvolvimento',
    desc: 'Transformamos o design em um site rápido, responsivo e pronto para escalar.',
    detail:
      'Código limpo e otimizado, com foco em performance, responsividade e SEO técnico. Testamos em diferentes tamanhos de tela e navegadores para entregar uma experiência impecável para todo visitante.',
  },
  {
    step: '04',
    title: 'Entrega & suporte',
    desc: 'Publicamos o site no ar e acompanhamos os primeiros passos ao seu lado.',
    detail:
      'Cuidamos da publicação e deixamos tudo funcionando. Depois seguimos disponíveis para ajustes e evoluções, porque o seu site é um ativo vivo do negócio, não um projeto que termina no deploy.',
  },
];

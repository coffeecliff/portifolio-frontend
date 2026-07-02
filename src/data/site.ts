/**
 * Configuração de marca, contato e copy de topo do site.
 * Centraliza strings de identidade e canais para facilitar troca e i18n futura.
 *
 * ⚠️ PLACEHOLDERS: nome de marca e canais de contato abaixo são provisórios —
 * substituir pelos dados reais da dupla antes de publicar.
 */

export interface ContactChannel {
  label: string;
  href: string;
  /** Rótulo curto exibido em listas compactas (footer). */
  short?: string;
}

export interface SiteConfig {
  brandName: string;
  brandMark: string;
  tagline: string;
  hero: {
    eyebrow: string;
    titleLines: string[];
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    scrollHint: string;
  };
  contact: {
    whatsapp: ContactChannel;
    email: ContactChannel;
    instagram: ContactChannel;
    linkedin: ContactChannel;
  };
}

export const site: SiteConfig = {
  // Placeholder — substituir pelo nome real da dupla/estúdio.
  brandName: 'VÉRTICE',
  brandMark: '◈',
  tagline: 'Dupla freelancer de front-end — landing pages e sites de alto padrão.',

  hero: {
    eyebrow: 'Dupla freelancer de front-end',
    titleLines: ['Sites que vendem', 'por você.'],
    lead: 'Criamos landing pages e sites de alto padrão para qualquer segmento — do design à entrega. Presença digital rápida, bonita e feita para transformar visitantes em clientes.',
    primaryCta: { label: 'Fale conosco', href: '#contato' },
    secondaryCta: { label: 'Ver projetos', href: '#projetos' },
    scrollHint: 'ROLE PARA VER',
  },

  contact: {
    // ⚠️ Placeholders — trocar pelos canais reais.
    whatsapp: {
      label: 'Chamar no WhatsApp',
      short: 'WhatsApp',
      href: 'https://wa.me/5500000000000',
    },
    email: {
      label: 'contato@seudominio.com',
      short: 'E-mail',
      href: 'mailto:contato@seudominio.com',
    },
    instagram: {
      label: 'Instagram',
      short: 'Instagram',
      href: 'https://instagram.com/',
    },
    linkedin: {
      label: 'LinkedIn',
      short: 'LinkedIn',
      href: 'https://linkedin.com/',
    },
  },
};

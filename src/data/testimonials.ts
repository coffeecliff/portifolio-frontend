/**
 * Depoimentos de clientes — prova social.
 *
 * ⚠️ REGRA ANTI-FAKE: este array nasce VAZIO de propósito. Nunca preencha com
 * depoimentos, nomes ou resultados inventados. A seção `Testimonials` só
 * renderiza quando houver ao menos um depoimento REAL aqui — enquanto vazio,
 * ela retorna `null` e não ocupa espaço na página.
 *
 * Para ativar: adicione objetos `Testimonial` com o texto real do cliente,
 * autor e segmento. A seção aparece automaticamente.
 */

export interface Testimonial {
  id: string;
  /** Texto do depoimento (palavras do cliente). */
  quote: string;
  /** Nome (ou marca) de quem deu o depoimento. */
  author: string;
  /** Segmento/contexto do cliente — reforça a versatilidade. */
  segment: string;
}

export const testimonials: Testimonial[] = [];

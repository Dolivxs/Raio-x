/**
 * Dados do evento centralizados. Toda seção lê daqui — preço, data e cidade
 * não são digitados duas vezes em lugar nenhum.
 */
export const eventData = {
  brand: 'RAIO X',
  brandSuffix: 'EMPRESARIAL',
  city: 'Palmas/TO',
  date: '24 de outubro',
  time: '09h às 19h',
  format: 'Turma única',
  speaker: 'Tudy Vieira',
  /** Dias entre o evento e o encerramento de 2026 — o eixo do discurso. */
  daysLeft: 68,
  year: 2026,
  originalPrice: 1497,
  subsidizedPrice: 750.82,
  installments: 7,
  installmentValue: 107.26,
  scarcity: 'Vagas subsidiadas pelo Sebrae/TO são limitadas.',
  whatsapp: '', // ex.: '5563999999999' — vazio mantém o CTA em modo placeholder
  ctaLabel: 'QUERO GARANTIR MINHA VAGA',
  /** Versão curta para o botão fixo do header, onde a longa quebra em 2 linhas. */
  ctaLabelShort: 'GARANTIR VAGA',
  ctaMessage: 'Quero garantir minha vaga no RAIO X Empresarial.',
} as const

const brl = (value: number, cents = true) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(value)

/** Preços já formatados. O cheio vai sem centavos, como no material. */
export const price = {
  original: brl(eventData.originalPrice, false),
  subsidized: brl(eventData.subsidizedPrice),
  installment: brl(eventData.installmentValue),
  installmentLabel: `${eventData.installments}x de ${brl(eventData.installmentValue)}`,
} as const

/** Linha de informações práticas, na ordem em que aparece na página. */
export const eventFacts = [
  eventData.city,
  eventData.date,
  eventData.time,
  eventData.format,
] as const

/** Link do CTA. Sem whatsapp confirmado, devolve um href inerte e sinalizado. */
export function ctaHref(): string {
  if (!eventData.whatsapp) return '#vaga'
  return `https://wa.me/${eventData.whatsapp}?text=${encodeURIComponent(eventData.ctaMessage)}`
}

export const ctaIsPlaceholder = !eventData.whatsapp

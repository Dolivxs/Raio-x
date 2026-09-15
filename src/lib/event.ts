/**
 * Dados do evento centralizados.
 * A data de 24/06 que aparece no PDF é referência antiga e NÃO é usada aqui.
 * Ajuste este objeto quando os dados finais forem confirmados.
 */
export const eventData = {
  brand: 'RAIO X',
  brandSuffix: 'EMPRESARIAL',
  city: 'Palmas',
  date: 'DATA A DEFINIR',
  speaker: 'Tudy Vieira',
  whatsapp: '', // ex.: '5563999999999' — deixar vazio mantém o CTA em modo placeholder
  ctaLabel: 'QUERO MINHA VAGA',
  ctaMessage: 'Quero garantir minha vaga no RAIO X Empresarial.',
} as const

/** Link do CTA. Sem whatsapp confirmado, devolve um href inerte e sinalizado. */
export function ctaHref(): string {
  if (!eventData.whatsapp) return '#vaga'
  return `https://wa.me/${eventData.whatsapp}?text=${encodeURIComponent(eventData.ctaMessage)}`
}

export const ctaIsPlaceholder = !eventData.whatsapp

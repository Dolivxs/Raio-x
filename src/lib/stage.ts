/**
 * Contrato da camada mecânica persistente.
 *
 * Os objetos oficiais vivem em UMA camada fixa, não dentro das seções.
 * As seções só publicam seus ids; a camada se ancora neles pelo ScrollTrigger.
 * É isso que faz o mesmo objeto atravessar várias cenas sem teletransporte.
 */

export const SEC = {
  hero: 'sec-hero',
  overwork: 'sec-overwork',
  blockage: 'sec-blockage',
  attempts: 'sec-attempts',
  diagnosis: 'sec-diagnosis',
  symptom: 'sec-symptom',
  product: 'sec-product',
  method: 'sec-method',
  reveal: 'sec-reveal',
  audience: 'sec-audience',
  cost: 'sec-cost',
  final: 'sec-final',
} as const

export type SecKey = keyof typeof SEC

/**
 * Geometria medida no PNG oficial da lupa (1448x1086).
 * O centro do vidro não é o centro da imagem — sem isso, a lente e o
 * círculo de revelação do SymptomCause não coincidem.
 */
export const LENS = {
  centerX: 0.3229, // fração da largura da imagem
  centerY: 0.3621, // fração da altura da imagem
  radiusToWidth: 0.1495, // raio do vidro ÷ largura da imagem
  aspect: 1086 / 1448,
} as const

/** Largura da imagem necessária para um raio de vidro `r` em px. */
export const lensWidthFor = (r: number) => r / LENS.radiusToWidth

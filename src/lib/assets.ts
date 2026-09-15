/**
 * Assets OFICIAIS de produção.
 *
 * Estes arquivos são a única representação válida dos objetos da landing.
 * Não redesenhar, não recolorir, não recriar em SVG, não substituir.
 * No layout eles só recebem transform (translate / scale / rotate) e opacity —
 * nenhum filter, glow, blend ou tint por cima da peça.
 */
export const ASSET = {
  hourglass: '/raiox/hourglass/hourglass.png',
  chain: '/raiox/chains/chain-gold.png',
  magnifier: '/raiox/magnifier/magnifier.png',
  gear: {
    gold: '/raiox/gears/gear-gold.png',
    silver: '/raiox/gears/gear-silver.png',
    teal: '/raiox/gears/gear-teal.png',
  },
} as const

export type GearTone = keyof typeof ASSET.gear

/**
 * Geometria do vidro, medida no PNG oficial da lupa (1448x1086) por
 * flood-fill da região translúcida. O centro do vidro NÃO é o centro da
 * imagem: sem estes números o círculo de revelação não coincide com a lente.
 *
 *   centro  x = 0.3198 · largura   y = 0.3646 · altura
 *   raio    = 0.1385 · largura  (círculo inscrito no vidro, já descontado o bisel)
 */
export const LENS = {
  cx: 0.3198,
  cy: 0.3646,
  r: 0.1385,
  aspect: 1086 / 1448,
} as const

/** Largura que a imagem da lupa precisa ter para o vidro ter raio `r` em px. */
export const lensWidthFor = (r: number) => r / LENS.r

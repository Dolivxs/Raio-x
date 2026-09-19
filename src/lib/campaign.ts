/**
 * Preparação para UTMs — NENHUM script de tráfego é carregado aqui.
 *
 * As campanhas ainda não existem. O que este módulo faz é apenas guardar os
 * parâmetros de origem quando eles aparecem na URL, para que um Pixel/GA4
 * instalado depois consiga atribuir a visita sem perder o contexto.
 *
 * Deliberadamente NÃO anexamos as UTMs à mensagem do WhatsApp: o único canal
 * que o wa.me oferece é o texto, e isso sujaria a mensagem que o usuário
 * envia. Ligar a origem ao lead é decisão de tracking, a ser tomada junto
 * com a escolha da ferramenta.
 */
export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

export type UtmKey = (typeof UTM_KEYS)[number]
export type Campaign = Partial<Record<UtmKey, string>>

/** Chave única no sessionStorage. */
export const CAMPAIGN_STORAGE_KEY = 'raiox:campaign'

/** Lê as UTMs de uma query string. */
export function readCampaign(search: string): Campaign {
  const params = new URLSearchParams(search)
  const out: Campaign = {}
  for (const k of UTM_KEYS) {
    const v = params.get(k)
    if (v) out[k] = v
  }
  return out
}

/** Guarda a origem da visita. Só grava se algo veio na URL. */
export function persistCampaign(search: string): Campaign {
  const found = readCampaign(search)
  if (!Object.keys(found).length) return getCampaign()
  try {
    sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(found))
  } catch {
    // modo privado / storage bloqueado: seguir sem atribuição
  }
  return found
}

/** Recupera a origem guardada nesta sessão. */
export function getCampaign(): Campaign {
  try {
    const raw = sessionStorage.getItem(CAMPAIGN_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Campaign) : {}
  } catch {
    return {}
  }
}

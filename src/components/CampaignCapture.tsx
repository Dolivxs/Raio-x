'use client'

import { useEffect } from 'react'
import { persistCampaign } from '@/lib/campaign'

/**
 * Guarda as UTMs da visita. Não renderiza nada, não carrega script nenhum e
 * não altera o comportamento dos CTAs — só deixa a origem disponível para
 * quando um Pixel/GA4 for instalado.
 */
export default function CampaignCapture() {
  useEffect(() => {
    persistCampaign(window.location.search)
  }, [])

  return null
}

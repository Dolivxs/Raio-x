'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // No toque, o scroll nativo é melhor: mais previsível e sem lag de inércia dupla
      syncTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    // Hook de QA: permite posicionar o scroll com precisão nos testes visuais.
    if (process.env.NODE_ENV !== 'production') {
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    }

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}

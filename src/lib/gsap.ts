'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power2.out' })
  // Evita refresh a cada mudança da barra de endereço no mobile.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger }

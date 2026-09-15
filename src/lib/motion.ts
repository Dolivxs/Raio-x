'use client'

import { gsap, ScrollTrigger } from './gsap'

/** Planos de profundidade — velocidades diferentes é o que cria a profundidade. */
export const DEPTH = { foreground: 1, middleground: 0.55, background: 0.2 } as const
export type Depth = keyof typeof DEPTH

/** Parallax vertical por plano, guiado pelo scroll. */
export function parallax(
  target: gsap.TweenTarget,
  depth: Depth,
  distance: number,
  trigger: Element,
) {
  const d = distance * DEPTH[depth]
  return gsap.fromTo(
    target,
    { y: -d * 0.5 },
    {
      y: d * 0.5,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 1 },
    },
  )
}

/** Revelação curta de texto. Deslocamento pequeno — não é o fade-up de 80px. */
export function reveal(
  target: gsap.TweenTarget,
  opts: { trigger: Element; y?: number; stagger?: number; start?: string } = {} as never,
) {
  const { trigger, y = 24, stagger = 0.08, start = 'top 80%' } = opts
  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger, start, once: true },
    },
  )
}

/** Timeline presa a uma cena sticky. scrub numérico dá o peso. */
export function scene(trigger: Element, opts: { end?: string; scrub?: number } = {}) {
  const { end = 'bottom bottom', scrub = 1 } = opts
  return gsap.timeline({ scrollTrigger: { trigger, start: 'top top', end, scrub } })
}

export { gsap, ScrollTrigger }

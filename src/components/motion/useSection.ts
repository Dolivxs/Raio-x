'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

type BuildCtx<T> = { root: T; mm: gsap.MatchMedia }
type Build<T> = (ctx: BuildCtx<T>) => void | (() => void)

/**
 * Escopo de animação de uma seção.
 *
 * Tudo roda dentro de um gsap.context com revert() no cleanup — sem isso os
 * ScrollTriggers vazam. O `mm` (matchMedia) já vem revertido junto, e é por
 * onde se separam as variantes desktop / mobile / reduced-motion.
 */
export function useSection<T extends HTMLElement = HTMLDivElement>(
  build: Build<T>,
  deps: unknown[] = [],
) {
  const root = useRef<T>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => build({ root: el, mm }), el)

    return () => {
      mm.revert()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return root
}

/** Condições padrão usadas em todas as seções. */
export const MQ = {
  desktop: '(min-width: 768px)',
  mobile: '(max-width: 767px)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const

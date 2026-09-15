'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Progresso de diagnóstico. Tipografia pequena + linha fina — não é barra de loading.
 * Desktop: coluna vertical à esquerda. Mobile: hairline de 1px no rodapé.
 */
export default function DiagnosticProgress() {
  const [pct, setPct] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    const read = () => {
      raf.current = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      setPct(Math.round(p * 100))
    }
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  const label = String(pct).padStart(2, '0')

  return (
    <>
      {/* desktop */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        <span
          className="rx-eyebrow text-rx-silver/40"
          style={{ writingMode: 'vertical-rl', letterSpacing: '0.42em' }}
        >
          DIAGNÓSTICO
        </span>
        <span className="relative h-40 w-px bg-white/12">
          <span
            className="absolute inset-x-0 top-0 origin-top bg-rx-cyan-500"
            style={{ height: '100%', transform: `scaleY(${pct / 100})` }}
          />
        </span>
        <span className="rx-display text-[0.7rem] tabular-nums tracking-[0.12em] text-rx-cyan-500">
          {label}%
        </span>
      </div>

      {/* mobile — hairline discreto no rodapé */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="h-px w-full bg-white/10">
          <div
            className="h-full origin-left bg-rx-cyan-500/80"
            style={{ transform: `scaleX(${pct / 100})` }}
          />
        </div>
      </div>
    </>
  )
}

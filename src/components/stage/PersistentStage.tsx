'use client'

import { useLayoutEffect, useRef } from 'react'
import OfficialAsset from '@/components/art/OfficialAsset'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { LENS, SEC, type SecKey } from '@/lib/stage'

/**
 * Camada mecânica persistente.
 *
 * Os objetos oficiais NÃO pertencem a nenhuma seção. Vivem aqui, numa camada
 * fixa, e atravessam a narrativa:
 *
 *   corrente     Hero → Overwork → Blockage
 *   ampulheta    Overwork → Blockage (recuando)
 *   mecanismo    Diagnosis → SymptomCause → Product → Method → Reveal
 *   lupa         SymptomCause → Product
 *
 * Cada objeto tem TRÊS canais de transform aninhados, para que timelines
 * diferentes nunca disputem a mesma propriedade:
 *   [data-*-journey]  → a viagem entre cenas (x, y, scale, opacity)
 *   [data-*-assembly] → arranjo interno (Method: desalinhado → encaixado)
 *   <img>             → rotação própria, guiada pelo scroll
 */

type Pose = { xPercent: number; yPercent: number; scale: number; opacity: number; rotate?: number }

/** Onde o mecanismo está em cada cena. */
const CLUSTER: Partial<Record<SecKey, Pose>> = {
  attempts:  { xPercent: 56, yPercent: 14, scale: 0.9, opacity: 0 },
  diagnosis: { xPercent: 32, yPercent: -4, scale: 0.94, opacity: 1 },
  symptom:   { xPercent: 44, yPercent: 8, scale: 0.68, opacity: 0.3 },
  product:   { xPercent: 12, yPercent: 6, scale: 1.4, opacity: 0.14 },
  method:    { xPercent: -9, yPercent: 0, scale: 0.94, opacity: 1 },
  reveal:    { xPercent: -32, yPercent: -10, scale: 0.8, opacity: 0.26 },
  audience:  { xPercent: -60, yPercent: -18, scale: 0.7, opacity: 0 },
}

const CHAIN: Partial<Record<SecKey, Pose>> = {
  hero:      { xPercent: 0, yPercent: 0, scale: 1, opacity: 0.95, rotate: 9 },
  overwork:  { xPercent: -14, yPercent: 26, scale: 1.18, opacity: 0.8, rotate: 2 },
  blockage:  { xPercent: 4, yPercent: 48, scale: 1.35, opacity: 0.95, rotate: -7 },
  attempts:  { xPercent: 30, yPercent: 104, scale: 1.7, opacity: 0, rotate: -12 },
}

const GLASS: Partial<Record<SecKey, Pose>> = {
  hero:      { xPercent: 26, yPercent: 40, scale: 0.7, opacity: 0 },
  overwork:  { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 },
  blockage:  { xPercent: -26, yPercent: -16, scale: 0.78, opacity: 0.4 },
  attempts:  { xPercent: -48, yPercent: -30, scale: 0.6, opacity: 0 },
}

/** Desarranjo inicial de cada peça do mecanismo (estado "travado"). */
/** A lupa: neutra enquanto examina, depois recua para o Product. */
const LENS_TRIP: Partial<Record<SecKey, Pose>> = {
  diagnosis: { xPercent: -18, yPercent: 24, scale: 0.6, opacity: 0 },
  symptom:   { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 },
  product:   { xPercent: 34, yPercent: -34, scale: 0.62, opacity: 0.42 },
  method:    { xPercent: 62, yPercent: -58, scale: 0.5, opacity: 0 },
}

const SCATTER = [
  { xPercent: -26, yPercent: 16, rotate: -22, scale: 1.16 },
  { xPercent: 30, yPercent: -22, rotate: 27, scale: 1.12 },
  { xPercent: -18, yPercent: -30, rotate: 34, scale: 1.2 },
]

export default function PersistentStage() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const k = mobile ? 0.55 : 1

    const ctx = gsap.context(() => {
      const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)
      const sec = (key: SecKey) => document.getElementById(SEC[key])

      /** Reposiciona um objeto ENQUANTO a seção chega — é daí que vem o overlap. */
      const journey = (target: string, map: Partial<Record<SecKey, Pose>>, dim = 1) => {
        const o = (v: number) => (mobile ? v * dim : v)
        const keys = Object.keys(map) as SecKey[]
        const first = map[keys[0]]!
        gsap.set(target, {
          ...first,
          opacity: o(first.opacity),
          xPercent: first.xPercent * k,
          yPercent: first.yPercent * k,
        })
        if (reduced) return
        keys.slice(1).forEach((key, i) => {
          const s = sec(key)
          if (!s) return
          const from = map[keys[i]]!
          const to = map[key]!
          gsap.fromTo(
            target,
            { ...from, opacity: o(from.opacity), xPercent: from.xPercent * k, yPercent: from.yPercent * k },
            {
              ...to,
              opacity: o(to.opacity),
              xPercent: to.xPercent * k,
              yPercent: to.yPercent * k,
              ease: 'none',
              // Sem isto, cada fromTo aplicaria seu estado inicial já no load e o
              // ÚLTIMO venceria — o objeto apareceria na página inteira.
              immediateRender: false,
              scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 15%', scrub: 1 },
            },
          )
        })
      }

      journey('[data-chain-journey]', CHAIN, 0.6)
      journey('[data-glass-journey]', GLASS, 0.45)
      journey('[data-cluster-journey]', CLUSTER, 0.7)
      journey('[data-lens-journey]', LENS_TRIP, 0.95)

      if (reduced) {
        gsap.set('[data-gear-assembly]', { xPercent: 0, yPercent: 0, rotate: 0, scale: 1 })
        return
      }

      // ---- rotação própria das engrenagens, contínua de Diagnosis a Reveal ----
      const d = sec('diagnosis')
      const rv = sec('reveal')
      if (d && rv) {
        gsap.utils.toArray<HTMLElement>('[data-gear-spin]', el).forEach((g) => {
          gsap.fromTo(
            g,
            { rotate: 0 },
            {
              rotate: Number(g.dataset.spin ?? 180),
              ease: 'none',
              scrollTrigger: {
                trigger: d,
                start: 'top bottom',
                endTrigger: rv,
                end: 'bottom bottom',
                scrub: 1,
              },
            },
          )
        })
      }

      // ---- Method: o MESMO mecanismo evolui pelas 6 etapas ----
      const m = sec('method')
      if (m) {
        const slots = gsap.utils.toArray<HTMLElement>('[data-gear-assembly]', el)
        const tl = gsap.timeline({
          scrollTrigger: { trigger: m, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
        })
        tl.to({}, { duration: 1 }, 0) // régua: posições = fração do progresso

        slots.forEach((slot, i) => {
          const s = SCATTER[i % SCATTER.length]
          // 01 desalinhado → 04 começa a encaixar → 06 sincronizado
          tl.fromTo(
            slot,
            { xPercent: s.xPercent * k, yPercent: s.yPercent * k, rotate: s.rotate * k, scale: s.scale },
            { xPercent: 0, yPercent: 0, rotate: 0, scale: 1, ease: 'power1.inOut', duration: 1 },
            0,
          )
        })

        // 02 RAIO-X: a falha é revelada — o mecanismo estremece e clareia
        tl.fromTo('[data-cluster-shake]', { x: 0 }, { x: 5 * k, duration: 0.04, yoyo: true, repeat: 3 }, 0.17)
        // 05/06: o conjunto assenta
        tl.fromTo('[data-cluster-shake]', { x: 0 }, { x: 0, duration: 0.2 }, 0.7)
      }

      ScrollTrigger.refresh()
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} aria-hidden>
      {/* ================= FUNDO: mecanismo ================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div data-cluster-journey className="absolute inset-0 will-change-transform">
          <div data-cluster-shake className="absolute inset-0">
            {/* prata — a maior, eixo do conjunto */}
            <div
              data-gear-assembly
              className="absolute left-[22%] top-[50%] w-[64vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 md:left-[24%] md:top-[46%] md:w-[32vw]"
            >
              <OfficialAsset src="/raiox/gears/gear-silver.png" data-gear-spin data-spin={196} className="w-full" />
            </div>
            {/* teal — engrena acima à direita */}
            <div
              data-gear-assembly
              className="absolute left-[52%] top-[22%] w-[42vw] max-w-[470px] -translate-x-1/2 -translate-y-1/2 md:left-[45%] md:top-[23%] md:w-[21vw]"
            >
              <OfficialAsset src="/raiox/gears/gear-teal.png" data-gear-spin data-spin={-268} className="w-full" />
            </div>
            {/* dourada — engrena abaixo à direita */}
            <div
              data-gear-assembly
              className="absolute left-[56%] top-[78%] w-[46vw] max-w-[540px] -translate-x-1/2 -translate-y-1/2 md:left-[43%] md:top-[76%] md:w-[24vw]"
            >
              <OfficialAsset src="/raiox/gears/gear-gold.png" data-gear-spin data-spin={224} className="w-full" />
            </div>
          </div>
        </div>

        {/* ampulheta — entra na Overwork, recua na Blockage */}
        <div data-glass-journey className="absolute inset-0 will-change-transform">
          <OfficialAsset
            src="/raiox/hourglass/hourglass.png"
            className="absolute -left-[30%] top-1/2 h-[62vh] w-auto -translate-y-1/2 md:-left-[7%] md:h-[88vh]"
          />
        </div>
      </div>

      {/* ============ FRENTE: lupa oficial (SymptomCause → Product) ============
          Posicionada pelas variáveis --lx/--ly/--lr do :root, as mesmas que a
          cena SymptomCause usa para o círculo de revelação. Uma lupa só. */}
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        <div data-lens-journey className="absolute inset-0 will-change-transform">
          <OfficialAsset
            src="/raiox/magnifier/magnifier.png"
            className="absolute left-0 top-0 will-change-transform"
            style={{
              width: `calc(var(--lr) * ${1 / LENS.radiusToWidth})`,
              transform:
                `translate3d(calc(var(--sw) * var(--lx) - var(--lr) * ${LENS.centerX / LENS.radiusToWidth}),` +
                ` calc(var(--sh) * var(--ly) - var(--lr) * ${(LENS.centerY * LENS.aspect) / LENS.radiusToWidth}), 0)`,
            }}
          />
        </div>
      </div>

      {/* ================= FRENTE: corrente colada na câmera ================= */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        <div data-chain-journey className="absolute inset-0 will-change-transform">
          <OfficialAsset
            src="/raiox/chains/chain-gold.png"
            className="absolute -left-[22%] top-[6%] w-[150vw] max-w-none md:-left-[16%] md:w-[86vw]"
          />
        </div>
      </div>
    </div>
  )
}

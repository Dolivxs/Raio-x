'use client'

import { useLayoutEffect, useRef } from 'react'
import ChainStrip from '@/components/art/ChainStrip'
import OfficialAsset from '@/components/art/OfficialAsset'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { LENS, SEC, type SecKey } from '@/lib/stage'

/**
 * MechanicalWorld — a página é uma câmera atravessando UMA máquina.
 *
 * O conteúdo narrativo fica em screen-space. Tudo aqui vive em world-space:
 * a câmera (translate3d + scale + rotação mínima) move o mundo inteiro, e os
 * planos respondem a ela com amplitudes diferentes — foreground desloca mais,
 * background menos.
 *
 * As peças NÃO se movem de forma independente e decorativa: as engrenagens
 * transmitem rotação entre si pela razão dos raios, a corrente flexiona e
 * tensiona, e a ampulheta reage à tensão da corrente.
 */

/* ---------------------------------------------------------------- raios
 * Medidos no asset: a engrenagem ocupa ~96% do PNG, logo r ≈ 0.48 * largura.
 * A prata é a CONDUTORA; as outras derivam dela.                          */
const R_SILVER = 0.48 * 32 // 32vw
const R_TEAL = 0.48 * 21 // 21vw
const R_GOLD = 0.48 * 24 // 24vw

/** rotationB = -(rotationA * radiusA / radiusB) */
const ratio = (rDriven: number) => -(R_SILVER / rDriven)
const SPIN = {
  silver: 1,
  teal: ratio(R_TEAL), // ≈ -1.52
  gold: ratio(R_GOLD), // ≈ -1.33
}

/**
 * Microdelay físico: a condutora reage primeiro, as conduzidas chegam depois.
 * Com scrub, um valor maior É atraso — a peça persegue o alvo mais devagar.
 */
const LAG = { silver: 0.55, teal: 0.78, gold: 0.92 }

type Pose = { xPercent: number; yPercent: number; scale: number; opacity: number; rotate?: number }

const CLUSTER: Partial<Record<SecKey, Pose>> = {
  attempts: { xPercent: 56, yPercent: 14, scale: 0.9, opacity: 0 },
  diagnosis: { xPercent: 32, yPercent: -4, scale: 0.94, opacity: 1 },
  symptom: { xPercent: 44, yPercent: 8, scale: 0.68, opacity: 0.3 },
  product: { xPercent: 12, yPercent: 6, scale: 1.4, opacity: 0.14 },
  method: { xPercent: -9, yPercent: 0, scale: 0.94, opacity: 1 },
  reveal: { xPercent: -32, yPercent: -10, scale: 0.8, opacity: 0.26 },
  audience: { xPercent: -60, yPercent: -18, scale: 0.7, opacity: 0 },
}

const CHAIN: Partial<Record<SecKey, Pose>> = {
  hero: { xPercent: 0, yPercent: 0, scale: 1, opacity: 0.95, rotate: 9 },
  overwork: { xPercent: -14, yPercent: 26, scale: 1.18, opacity: 0.8, rotate: 2 },
  blockage: { xPercent: 2, yPercent: 20, scale: 1.3, opacity: 0.95, rotate: -5 },
  attempts: { xPercent: 26, yPercent: 86, scale: 1.6, opacity: 0, rotate: -11 },
}

const GLASS: Partial<Record<SecKey, Pose>> = {
  hero: { xPercent: 26, yPercent: 40, scale: 0.7, opacity: 0 },
  overwork: { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 },
  blockage: { xPercent: -26, yPercent: -16, scale: 0.78, opacity: 0.4 },
  attempts: { xPercent: -48, yPercent: -30, scale: 0.6, opacity: 0 },
}

const LENS_TRIP: Partial<Record<SecKey, Pose>> = {
  diagnosis: { xPercent: -18, yPercent: 24, scale: 0.6, opacity: 0 },
  symptom: { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 },
  product: { xPercent: 34, yPercent: -34, scale: 0.62, opacity: 0.42 },
  method: { xPercent: 62, yPercent: -58, scale: 0.5, opacity: 0 },
}

/** Câmera: escala e deslocamento do MUNDO em cada cena. */
const CAMERA: Partial<Record<SecKey, { s: number; x: number; y: number; r: number }>> = {
  attempts: { s: 0.86, x: 0, y: 0, r: 0 },
  diagnosis: { s: 1.06, x: -2, y: 1, r: -0.6 },
  symptom: { s: 1.26, x: 6, y: -4, r: 0.8 }, // aproxima para examinar a falha
  product: { s: 0.8, x: 0, y: 2, r: 0 }, // recua, mecanismo ao fundo
  method: { s: 1.04, x: -3, y: 0, r: -0.4 }, // acompanha a reorganização
  reveal: { s: 0.88, x: 2, y: -2, r: 0.3 }, // recuo final
  audience: { s: 0.8, x: 0, y: 0, r: 0 },
}

/** Desalinhamento inicial das peças (estado travado). */
const SCATTER = [
  { xPercent: -26, yPercent: 16, rotate: -22, scale: 1.16 },
  { xPercent: 30, yPercent: -22, rotate: 27, scale: 1.12 },
  { xPercent: -18, yPercent: -30, rotate: 34, scale: 1.2 },
]

/** Janelas das 6 etapas, em % de rolagem da seção Method. */
const STAGE = [
  { a: 2, b: 14 }, // 01 ANAMNESE      parado / desorganizado
  { a: 14, b: 26 }, // 02 RAIO-X        falha revelada
  { a: 26, b: 38 }, // 03 LAUDO         uma peça gira sem transmitir
  { a: 38, b: 50 }, // 04 TRATAMENTO    peças deslizam para a posição
  { a: 50, b: 62 }, // 05 PRESCRIÇÃO    encaixe com micro snap
  { a: 62, b: 74 }, // 06 ACOMPANHAMENTO condutora leva todas
]

export default function MechanicalWorld() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const k = mobile ? 0.55 : 1

    const ctx = gsap.context(() => {
      const sec = (key: SecKey) => document.getElementById(SEC[key])

      /** Reposiciona ENQUANTO a seção chega — é daí que vem o overlap. */
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
        gsap.set('[data-chain-seg]', { y: 0, rotate: 0 })
        return
      }

      // ================= CÂMERA =================
      // O mundo inteiro se move. Planos com profundidades diferentes recebem
      // a mesma câmera com amplitudes diferentes (foreground responde mais).
      const camKeys = Object.keys(CAMERA) as SecKey[]
      const cam = CAMERA[camKeys[0]]!
      gsap.set('[data-world]', { scale: cam.s, xPercent: cam.x * k, yPercent: cam.y * k, rotate: cam.r })
      camKeys.slice(1).forEach((key, i) => {
        const s = sec(key)
        if (!s) return
        const a = CAMERA[camKeys[i]]!
        const b = CAMERA[key]!
        gsap.fromTo(
          '[data-world]',
          { scale: a.s, xPercent: a.x * k, yPercent: a.y * k, rotate: a.r },
          {
            scale: b.s,
            xPercent: b.x * k,
            yPercent: b.y * k,
            rotate: b.r,
            ease: 'none',
            immediateRender: false,
            // scrub alto: a câmera tem inércia, nunca acompanha o dedo
            scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 10%', scrub: 1.4 },
          },
        )
      })

      // ============== TRANSMISSÃO ENTRE ENGRENAGENS ==============
      // Uma volta da condutora → as conduzidas giram na razão dos raios, em
      // sentido oposto, e com atraso de reação (scrub maior = chega depois).
      const d = sec('diagnosis')
      const mm2 = sec('method')
      const rv = sec('reveal')

      // FASE A — Diagnosis → Product: o mecanismo gira, mas de forma incompleta.
      // Termina ao entrar no Method, para que as 6 etapas possam ter estados
      // próprios (parado, girando sozinho, sincronizado).
      if (d && mm2) {
        ;(['silver', 'teal', 'gold'] as const).forEach((name) => {
          gsap.fromTo(
            `[data-gear="${name}"]`,
            { rotate: 0 },
            {
              rotate: 190 * SPIN[name],
              ease: 'none',
              scrollTrigger: {
                trigger: d,
                start: 'top bottom',
                endTrigger: mm2,
                end: 'top top',
                scrub: LAG[name],
              },
            },
          )
        })
      }

      // FASE C — Reveal: o mecanismo permanece funcionando ao fundo.
      if (rv) {
        ;(['silver', 'teal', 'gold'] as const).forEach((name) => {
          gsap.fromTo(
            `[data-gear="${name}"]`,
            { rotate: '+=0' },
            {
              rotate: `+=${150 * SPIN[name]}`,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: { trigger: rv, start: 'top bottom', end: 'bottom bottom', scrub: LAG[name] },
            },
          )
        })
      }

      // ================= ESTADOS NO METHOD =================
      const m = sec('method')
      if (m) {
        const slots = gsap.utils.toArray<HTMLElement>('[data-gear-assembly]', el)
        const win = (i: number, extra: Record<string, unknown> = {}) => ({
          trigger: m,
          start: `${STAGE[i].a}% top`,
          end: `${STAGE[i].b}% top`,
          scrub: 1,
          ...extra,
        })

        // 01 ANAMNESE — parado e desorganizado
        slots.forEach((slot, i) => {
          const s = SCATTER[i % SCATTER.length]
          gsap.set(slot, {
            xPercent: s.xPercent * k,
            yPercent: s.yPercent * k,
            rotate: s.rotate * k,
            scale: s.scale,
          })
        })

        // 02 RAIO-X — a falha é revelada: o conjunto estremece e trava
        const shake = gsap.timeline({ scrollTrigger: win(1) })
        shake
          .to('[data-cluster-shake]', { x: 4 * k, duration: 0.12, ease: 'power1.inOut' })
          .to('[data-cluster-shake]', { x: -3 * k, duration: 0.1, ease: 'power1.inOut' })
          .to('[data-cluster-shake]', { x: 2 * k, duration: 0.1, ease: 'power1.inOut' })
          .to('[data-cluster-shake]', { x: 0, duration: 0.12, ease: 'power1.inOut' })

        // 03 LAUDO — a teal gira sozinha e NÃO transmite: o dente não engata
        gsap.fromTo(
          '[data-gear="teal"]',
          { rotate: '+=0' },
          { rotate: '+=46', ease: 'none', immediateRender: false, scrollTrigger: win(2) },
        )

        // 04 TRATAMENTO — as peças deslizam para a posição correta
        slots.forEach((slot, i) => {
          const s = SCATTER[i % SCATTER.length]
          gsap.fromTo(
            slot,
            { xPercent: s.xPercent * k, yPercent: s.yPercent * k, rotate: s.rotate * k, scale: s.scale },
            {
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
              scale: 1,
              ease: 'power2.inOut',
              immediateRender: false,
              scrollTrigger: win(3, { scrub: 1 + i * 0.12 }), // chegam em ordem
            },
          )
        })

        // 04 (cont.) — enquanto deslizam, giram pouco: ainda não transmitem
        ;(['silver', 'gold'] as const).forEach((name) => {
          gsap.fromTo(
            `[data-gear="${name}"]`,
            { rotate: '+=0' },
            { rotate: `+=${18 * SPIN[name]}`, ease: 'none', immediateRender: false, scrollTrigger: win(3) },
          )
        })

        // 05 PRESCRIÇÃO — encaixe: contato metálico, sem bounce
        slots.forEach((slot, i) => {
          const snap = gsap.timeline({ scrollTrigger: win(4), paused: false })
          snap
            .to(slot, { scale: 0.985, duration: 0.18, ease: 'power3.in', delay: i * 0.05 }, 0)
            .to(slot, { scale: 1, duration: 0.32, ease: 'power2.out' })
        })

        // 06 ACOMPANHAMENTO — a condutora leva todas, sincronizadas
        ;(['silver', 'teal', 'gold'] as const).forEach((name) => {
          gsap.fromTo(
            `[data-gear="${name}"]`,
            { rotate: '+=0' },
            {
              rotate: `+=${200 * SPIN[name]}`,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: win(5, { scrub: LAG[name] }),
            },
          )
        })
      }

      // ================= CORRENTE: FLEXÃO E TENSÃO =================
      // Cada fatia mostra pixels do MESMO PNG. A diferença de deslocamento
      // entre fatias vizinhas é o que produz curva, flexão e tensão.
      const segs = gsap.utils.toArray<HTMLElement>('[data-chain-seg]', el)
      const N = segs.length
      const wave = (i: number, amp: number, phase: number) =>
        amp * Math.sin((i / (N - 1)) * Math.PI * 2.1 + phase)

      const chainPhase = (key: SecKey, amp: number, phase: number, lagStep: number) => {
        const s = sec(key)
        if (!s) return
        segs.forEach((seg, i) => {
          gsap.to(seg, {
            y: wave(i, amp * k, phase),
            rotate: wave(i, amp * 0.06 * k, phase + 0.4),
            ease: 'none',
            immediateRender: false,
            // o atraso cresce ao longo da corrente: a onda VIAJA de uma ponta à outra
            scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 15%', scrub: 0.8 + i * lagStep },
          })
        })
      }

      // Hero: solta.  Overwork: começa a envolver.  Blockage: tensionada.
      segs.forEach((seg, i) => gsap.set(seg, { y: wave(i, 20 * k, 0), rotate: wave(i, 1.3 * k, 0.4) }))
      chainPhase('overwork', 13, 1.1, 0.045)
      chainPhase('blockage', 4, 2.3, 0.02) // amplitude baixa = corda esticada
      chainPhase('attempts', 18, 3.4, 0.05) // solta ao sair de cena

      // ============ AMPULHETA REAGE À TENSÃO DA CORRENTE ============
      // Mesmos gatilhos da corrente, com scrub maior: a ampulheta responde
      // DEPOIS que a corrente puxa, como um corpo pendurado nela.
      const tilt = (key: SecKey, rot: number, x: number) => {
        const s = sec(key)
        if (!s) return
        gsap.to('[data-glass-tilt]', {
          rotate: rot * k,
          xPercent: x * k,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 15%', scrub: 1.6 },
        })
      }
      gsap.set('[data-glass-tilt]', { rotate: -2.4 * k })
      tilt('overwork', 1.6, -1.5)
      tilt('blockage', -3.8, 2.5) // a corrente tensiona e puxa a ampulheta
      tilt('attempts', -6, 5)

      ScrollTrigger.refresh()
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} aria-hidden>
      {/* ============ MUNDO: tudo que a câmera atravessa ============ */}
      <div data-world className="pointer-events-none fixed inset-0 z-0 overflow-hidden will-change-transform">
        {/* --- mecanismo --- */}
        <div data-cluster-journey className="absolute inset-0 will-change-transform">
          <div data-cluster-shake className="absolute inset-0">
            <div
              data-gear-assembly
              className="absolute left-[22%] top-[50%] w-[64vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 md:left-[24%] md:top-[46%] md:w-[32vw]"
            >
              <OfficialAsset src="/raiox/gears/gear-silver.png" data-gear="silver" className="w-full" />
            </div>
            <div
              data-gear-assembly
              className="absolute left-[52%] top-[22%] w-[42vw] max-w-[470px] -translate-x-1/2 -translate-y-1/2 md:left-[45%] md:top-[23%] md:w-[21vw]"
            >
              <OfficialAsset src="/raiox/gears/gear-teal.png" data-gear="teal" className="w-full" />
            </div>
            <div
              data-gear-assembly
              className="absolute left-[56%] top-[78%] w-[46vw] max-w-[540px] -translate-x-1/2 -translate-y-1/2 md:left-[43%] md:top-[76%] md:w-[24vw]"
            >
              <OfficialAsset src="/raiox/gears/gear-gold.png" data-gear="gold" className="w-full" />
            </div>
          </div>
        </div>

        {/* --- ampulheta: pendurada na corrente --- */}
        <div data-glass-journey className="absolute inset-0 will-change-transform">
          <div data-glass-tilt className="absolute inset-0 origin-top will-change-transform">
            <OfficialAsset
              src="/raiox/hourglass/hourglass.png"
              className="absolute -left-[30%] top-1/2 h-[62vh] w-auto -translate-y-1/2 md:-left-[7%] md:h-[88vh]"
            />
          </div>
        </div>

        {/* --- corrente: foreground, o plano que mais responde à câmera --- */}
        <div data-chain-journey className="absolute inset-0 z-30 will-change-transform">
          <ChainStrip
            segments={18}
            className="absolute -left-[22%] top-[6%] h-[64vh] w-[150vw] md:-left-[16%] md:h-[72vh] md:w-[86vw]"
          />
        </div>
      </div>

      {/* ====== LUPA: fora do mundo, em screen-space ======
          Precisa coincidir pixel a pixel com o círculo de revelação da cena
          SymptomCause — se a câmera a escalasse, as duas camadas separariam. */}
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
    </div>
  )
}

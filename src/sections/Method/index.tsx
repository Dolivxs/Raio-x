'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Chain from '@/components/art/Chain'
import Gear from '@/components/art/Gear'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'
import { STAGES } from './stages'

/**
 * O CSS descreve o mecanismo ORGANIZADO (estado final).
 * A desordem inicial vive aqui, como deslocamento de onde cada peça parte.
 */
const SCATTER = [
  { x: -32, y: 20, r: -24, s: 1.14 },
  { x: 38, y: -28, r: 31, s: 1.1 },
  { x: -44, y: -34, r: 47, s: 1.18 },
  { x: 24, y: 30, r: -19, s: 1.08 },
]

export default function Method() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>
      const slots = gsap.utils.toArray<HTMLElement>('[data-mt-slot]', root)
      const panels = gsap.utils.toArray<HTMLElement>('[data-mt-panel]', root)
      const rails = gsap.utils.toArray<HTMLElement>('[data-mt-rail]', root)

      if (!isMotion) {
        gsap.set(slots, { x: 0, y: 0, rotate: 0, scale: 1 })
        gsap.set(panels, { opacity: 1, position: 'relative', y: 0 })
        gsap.set(rails, { opacity: 1 })
        gsap.set('[data-mt-chain]', { opacity: 0 })
        return
      }

      const k = isDesktop ? 1 : 0.55
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      // 1) A máquina se reorganiza ao longo de TODA a cena: da desordem ao encaixe.
      slots.forEach((slot, i) => {
        const s = SCATTER[i % SCATTER.length]
        tl.fromTo(
          slot,
          { xPercent: s.x * k, yPercent: s.y * k, rotate: s.r * k, scale: s.s },
          { xPercent: 0, yPercent: 0, rotate: 0, scale: 1, ease: 'power1.inOut', duration: 1 },
          0,
        )
      })

      // 2) Rotação própria de cada engrenagem, proporcional e em sentidos opostos.
      gsap.utils.toArray<HTMLElement>('[data-gear]', root).forEach((g) => {
        const spin = Number(g.dataset.spin ?? 180)
        tl.fromTo(g, { rotate: 0 }, { rotate: spin, ease: 'none', duration: 1 }, 0)
      })

      // 3) As correntes se soltam na primeira metade — o bloqueio cede.
      tl.fromTo('[data-mt-chain]', { opacity: 0.8 }, { opacity: 0, ease: 'none', duration: 0.45 }, 0.05)

      // 4) Etapas: uma de cada vez, no mesmo espaço.
      const span = 1 / STAGES.length
      panels.forEach((panel, i) => {
        const at = i * span
        tl.fromTo(
          panel,
          { opacity: 0, y: 30 * k },
          { opacity: 1, y: 0, duration: span * 0.3, ease: 'power2.out' },
          at,
        )
        if (i < STAGES.length - 1) {
          tl.to(panel, { opacity: 0, y: -26 * k, duration: span * 0.25, ease: 'power2.in' }, at + span * 0.72)
        }
        tl.to(rails[i], { opacity: 1, duration: span * 0.2 }, at)
        if (i < STAGES.length - 1) {
          tl.to(rails[i], { opacity: 0.28, duration: span * 0.2 }, at + span * 0.8)
        }
      })
    })
  })

  return (
    <section ref={root} className="relative h-[290vh] w-full md:h-[380vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Atmosphere tone="method" grid vignette={1.0} />

        {/* ---------- mecanismo ---------- */}
        <div aria-hidden className="absolute inset-0 opacity-30 md:opacity-100">
          <div
            data-mt-slot=""
            className="absolute -left-[14%] top-[26%] w-[62vw] max-w-[560px] md:left-[2%] md:top-[24%] md:w-[26vw]"
          >
            <Gear variant="primary" spin={200} className="w-full" />
          </div>
          <div
            data-mt-slot=""
            className="absolute left-[24%] top-[58%] w-[42vw] max-w-[380px] md:left-[20%] md:top-[56%] md:w-[18vw]"
          >
            <Gear variant="secondary" spin={-146} className="w-full" />
          </div>
          <div
            data-mt-slot=""
            className="absolute left-[52%] top-[30%] w-[26vw] max-w-[240px] blur-[1px] md:left-[34%] md:top-[32%] md:w-[11vw]"
          >
            <Gear variant="small" spin={94} className="w-full" />
          </div>
          <div
            data-mt-slot=""
            className="absolute -left-[26%] -top-[10%] w-[92vw] max-w-[900px] opacity-45 blur-[4px] md:-left-[12%] md:-top-[16%] md:w-[42vw]"
          >
            <Gear variant="ghost" spin={-58} className="w-full" />
          </div>

          <Chain
            data-mt-chain=""
            className="absolute -top-[12%] left-[6%] hidden h-[130%] w-[34px] rotate-[13deg] md:block md:left-[10%] md:w-[52px]"
          />
          <Chain
            data-mt-chain=""
            className="absolute -top-[16%] left-[34%] hidden h-[135%] w-[24px] rotate-[-9deg] md:block md:left-[30%] md:w-[36px]"
          />
        </div>

        {/* ---------- etapas ---------- */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <div className="ml-auto w-full md:w-[46%]">
            <p className="rx-eyebrow text-rx-cyan-500/80">COMO FUNCIONA O RAIO X</p>
            <p className="mt-3 text-[clamp(0.9rem,1.5vw,1.05rem)] text-rx-silver/60">
              Do sintoma ao tratamento, em <strong className="text-white">6 etapas clínicas.</strong>
            </p>

            <div className="mt-8 flex gap-6 md:mt-12 md:gap-10">
              {/* trilho de progresso */}
              <ul className="hidden shrink-0 flex-col gap-3 pt-2 md:flex">
                {STAGES.map((s) => (
                  <li
                    key={s.n}
                    data-mt-rail=""
                    className="flex items-center gap-3 opacity-[0.28]"
                  >
                    <span className="h-px w-6 bg-rx-cyan-500" />
                    <span className="rx-eyebrow text-rx-silver">{s.n}</span>
                  </li>
                ))}
              </ul>

              {/* painéis — empilhados no mesmo espaço */}
              <div className="relative min-h-[58svh] flex-1 md:min-h-[52svh]">
                {STAGES.map((s, i) => (
                  <article
                    key={s.n}
                    data-mt-panel=""
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <span className="rx-display block text-[clamp(3rem,11vw,7rem)] leading-none text-white/[0.07]">
                      {s.n}
                    </span>
                    <p className="rx-eyebrow -mt-6 text-rx-silver/50 md:-mt-8">ETAPA {s.n}</p>
                    <h3 className="rx-display mt-3 text-[clamp(1.7rem,5vw,3.4rem)] rx-accent">
                      {s.name}
                    </h3>
                    <p className="rx-eyebrow mt-5 text-white">{s.headline}</p>
                    <p className="rx-body mt-4 text-rx-silver">{s.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

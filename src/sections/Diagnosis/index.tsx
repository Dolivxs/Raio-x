'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Gear from '@/components/art/Gear'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'

export default function Diagnosis() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>

      if (!isMotion) {
        gsap.set('[data-dg-a], [data-dg-b], [data-dg-note]', { opacity: 1, y: 0 })
        return
      }

      const k = isDesktop ? 1 : 0.5
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      // Engrenagens giram por progresso de scroll, em proporções e sentidos diferentes.
      // Param quando o scroll para; invertem quando o usuário volta.
      gsap.utils.toArray<HTMLElement>('[data-gear]', root).forEach((g) => {
        const spin = Number(g.dataset.spin ?? 180)
        tl.fromTo(g, { rotate: 0 }, { rotate: spin, ease: 'none', duration: 1 }, 0)
      })

      tl.fromTo('[data-dg-a]', { opacity: 0, y: 34 * k }, { opacity: 1, y: 0, duration: 0.14 }, 0.04)
        .to('[data-dg-a]', { opacity: 0, y: -30 * k, duration: 0.12 }, 0.44)
        .fromTo('[data-dg-b]', { opacity: 0, y: 40 * k, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.16 }, 0.52)
        .fromTo('[data-dg-note]', { opacity: 0, y: 24 * k }, { opacity: 1, y: 0, duration: 0.12 }, 0.7)
    })
  })

  return (
    <section ref={root} className="relative h-[280vh] w-full bg-rx-navy-950 md:h-[340vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Atmosphere grid />

        {/* mecanismo entrando em cena — cortado pelas bordas, três escalas */}
        <Gear
          variant="primary"
          spin={180}
          className="absolute -right-[26%] -top-[14%] w-[80vw] max-w-[720px] opacity-90 md:-right-[9%] md:-top-[18%] md:w-[38vw]"
        />
        <Gear
          variant="secondary"
          spin={-120}
          className="absolute -right-[6%] top-[42%] w-[48vw] max-w-[420px] opacity-80 md:right-[22%] md:top-[54%] md:w-[22vw]"
        />
        <Gear
          variant="small"
          spin={80}
          className="absolute -left-[12%] bottom-[6%] w-[34vw] max-w-[240px] opacity-85 md:left-[6%] md:bottom-[10%] md:w-[13vw]"
        />
        <Gear
          variant="ghost"
          spin={-46}
          className="absolute -left-[30%] top-[2%] w-[86vw] max-w-[860px] opacity-60 md:-left-[16%] md:w-[44vw]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <div className="relative w-full max-w-[46rem] md:ml-[6%]">
            <h2 data-dg-a="" data-anim="hidden" className="absolute inset-0">
              <span className="rx-display block text-d3 text-rx-silver/80">
                O problema não é
              </span>
              <span className="rx-display block text-d3 text-white">
                falta de esforço.
              </span>
            </h2>

            <div data-dg-b="" data-anim="hidden" className="absolute inset-0">
              <span className="rx-display block text-[clamp(1.4rem,3.6vw,2.6rem)] text-rx-silver/70">
                É FALTA DE
              </span>
              <span className="rx-display block text-d1 leading-[0.86] text-rx-cyan-500">
                DIAGNÓSTICO
              </span>
              <p
                data-dg-note=""
                data-anim="hidden"
                className="rx-body mt-8 border-l-2 border-rx-cyan-500/50 pl-6 text-rx-silver md:mt-10"
              >
                Você está tratando sintomas e nunca olhou o <strong className="text-white">RAIO X</strong>{' '}
                do seu negócio.
              </p>
            </div>

            {/* reserva de altura — as duas mensagens dividem o mesmo espaço */}
            <div aria-hidden className="pointer-events-none invisible">
              <span className="rx-display block text-[clamp(1.4rem,3.6vw,2.6rem)]">É FALTA DE</span>
              <span className="rx-display block text-d1 leading-[0.86]">
                DIAGNÓSTICO
              </span>
              <p className="rx-body mt-8 pl-6 md:mt-10">
                Você está tratando sintomas e nunca olhou o RAIO X do seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

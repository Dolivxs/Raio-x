'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Chain from '@/components/art/Chain'
import Hourglass, { SAND_ORIGIN } from '@/components/art/Hourglass'
import Rope from '@/components/art/Rope'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'

const SINTOMAS = [
  'A equipe não entrega como deveria.',
  'As metas não batem como deveriam.',
  'Você está em todas as frentes da operação, gestão, time, cliente — e mesmo assim sente que o negócio anda no mesmo lugar.',
]

export default function Overwork() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>
      const k = isDesktop ? 1 : 0.5 // mobile: mesmos movimentos, amplitude menor

      if (!isMotion) {
        gsap.set('[data-sand-top]', { scaleY: 0.15, svgOrigin: SAND_ORIGIN.top })
        gsap.set('[data-sand-bottom]', { scaleY: 0.85, svgOrigin: SAND_ORIGIN.bottom })
        gsap.set('[data-ow-a], [data-ow-b], [data-ow-list] > li', { opacity: 1, y: 0 })
        return
      }

      // A origem do scale da areia é fixada uma única vez, em coordenadas do
      // viewBox. Passá-la dentro de um fromTo faz o GSAP interpolar a origem.
      gsap.set('[data-sand-top]', { svgOrigin: SAND_ORIGIN.top })
      gsap.set('[data-sand-bottom]', { svgOrigin: SAND_ORIGIN.bottom })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      // A areia escoa ao longo de toda a cena — peso, tempo passando.
      tl.fromTo('[data-sand-top]', { scaleY: 1 }, { scaleY: 0.08, ease: 'none', duration: 1 }, 0)
        .fromTo('[data-sand-bottom]', { scaleY: 0 }, { scaleY: 0.92, ease: 'none', duration: 1 }, 0)
        .fromTo('[data-sand-stream]', { opacity: 0 }, { opacity: 0.75, duration: 0.08 }, 0.06)
        .to('[data-sand-stream]', { opacity: 0, duration: 0.08 }, 0.88)

      // A ampulheta desloca e inclina poucos graus. Nunca rotação contínua.
      tl.fromTo(
        '[data-ow-glass]',
        { yPercent: 8 * k, rotate: -3.2 * k, xPercent: 0 },
        { yPercent: -10 * k, rotate: 2.4 * k, xPercent: -3 * k, ease: 'none', duration: 1 },
        0,
      )

      // Ritmo: movimento → respiro → movimento → pausa
      tl.fromTo('[data-ow-a]', { opacity: 0, y: 30 * k }, { opacity: 1, y: 0, duration: 0.16 }, 0.06)
        .to('[data-ow-a]', { opacity: 0, y: -26 * k, duration: 0.12 }, 0.42)
        .fromTo('[data-ow-b]', { opacity: 0, y: 34 * k }, { opacity: 1, y: 0, duration: 0.16 }, 0.5)
        .fromTo(
          '[data-ow-list] > li',
          { opacity: 0, x: 22 * k },
          { opacity: 1, x: 0, duration: 0.12, stagger: 0.06 },
          0.64,
        )

      tl.fromTo('[data-rope-path]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', duration: 0.5 }, 0.45)

      // O foreground corre mais rápido que o objeto principal — profundidade.
      tl.fromTo('[data-ow-fg]', { yPercent: -16 * k }, { yPercent: 22 * k, ease: 'none', duration: 1 }, 0)
    })
  })

  return (
    <section ref={root} className="relative h-[200vh] w-full md:h-[230vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Atmosphere tone="overwork" vignette={0.9} />

        {/* corda: fio condutor que costura esta seção com a próxima */}
        <Rope className="absolute bottom-[8%] left-0 h-[24vh] w-[130%] opacity-50" tone="silver" />

        {/* foreground: corrente muito próxima da câmera, fora de foco */}
        <Chain
          variant="heavy"
          data-ow-fg=""
          className="absolute -top-[24%] -right-[10%] z-20 h-[156%] w-[70px] rotate-[-13deg] opacity-40 blur-[3px]
            md:right-[6%] md:w-[168px] md:opacity-70"
        />

        {/* AMPULHETA — objeto principal, grande, parcialmente fora da viewport */}
        <Hourglass
          data-ow-glass=""
          className="absolute -left-[42%] top-1/2 h-[88vh] max-h-none -translate-y-1/2 opacity-55
            md:-left-[5%] md:h-[108vh] md:opacity-100 lg:-left-[1%]"
        />

        <div className="relative z-10 ml-auto w-full max-w-[1600px] px-5 md:px-10">
          <div className="ml-auto w-full max-w-[38rem] md:w-[54%]">
            <div className="relative">
              <h2
                data-ow-a=""
                data-anim="hidden"
                className="absolute inset-0 rx-display text-d2 text-rx-cyan-500"
              >
                VOCÊ
                <br />
                TRABALHA
                <br />
                DEMAIS.
              </h2>

              <div data-ow-b="" data-anim="hidden" className="absolute inset-0">
                <h2 className="rx-display text-d3 text-white">
                  E O RESULTADO
                  <br />
                  NÃO CHEGA.
                </h2>
                <ul data-ow-list="" className="mt-8 space-y-5 md:mt-10">
                  {SINTOMAS.map((s) => (
                    <li key={s} data-anim="hidden" className="flex gap-4">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rx-cyan-500" />
                      <span className="rx-body text-rx-silver">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* reserva de altura: as duas mensagens se sobrepõem no mesmo espaço */}
              <div aria-hidden className="pointer-events-none invisible">
                <h2 className="rx-display text-d3">
                  E O RESULTADO
                  <br />
                  NÃO CHEGA.
                </h2>
                <ul className="mt-8 space-y-5 md:mt-10">
                  {SINTOMAS.map((s) => (
                    <li key={s} className="rx-body">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

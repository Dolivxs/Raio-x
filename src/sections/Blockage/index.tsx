'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Chain from '@/components/art/Chain'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap, parallax, reveal } from '@/lib/motion'

const FRENTES = ['OPERAÇÃO', 'GESTÃO', 'TIME', 'CLIENTE']

export default function Blockage() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add(MQ.reduced, () => {
      gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0 })
    })

    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>
      if (!isMotion) return
      const k = isDesktop ? 1 : 0.45

      // Dois planos, duas velocidades — a diferença é o que cria a profundidade.
      parallax('[data-bk-fg]', 'foreground', 560 * k, root)
      parallax('[data-bk-mg]', 'middleground', 380 * k, root)

      reveal('[data-bk-head] > *', { trigger: root, y: 30 * k, stagger: 0.12 })
      reveal('[data-bk-frente]', { trigger: root, y: 24 * k, stagger: 0.1, start: 'top 62%' })
      reveal('[data-bk-close]', { trigger: root, y: 26 * k, start: 'top 45%' })
    })
  })

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden pb-[10vh] pt-[14vh] md:pb-[12vh] md:pt-[18vh]"
    >
      <Atmosphere tone="blockage" vignette={1.35} />

      {/* A corrente é o único objeto desta cena, em dois planos.
          Vive na calha esquerda, fora da coluna de texto (md:w-[62%] à direita):
          entra cortada pela borda e nunca cobre a copy.                      */}

      {/* SECUNDÁRIO — corrente ao fundo, menor e mais apagada */}
      <Chain
        data-bk-mg=""
        className="absolute hidden md:block md:-left-[17%] md:top-[54%] md:w-[21vw] md:opacity-[0.20]
          md:max-w-none md:rotate-[54deg]"
      />

      {/* DOMINANTE — corrente em primeiro plano, grande, saindo pela borda */}
      <Chain
        data-bk-fg=""
        className="absolute -left-[58%] -top-[6%] z-20 w-[78vw] max-w-none rotate-[78deg] opacity-35
          md:-left-[24%] md:-top-[10%] md:w-[70vw] md:rotate-[68deg] md:opacity-85"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <div className="ml-auto w-full md:w-[62%]">
          <div data-bk-head="">
            <p data-anim="hidden" className="rx-eyebrow text-rx-cyan-500/80">
              O QUE PRENDE
            </p>
            <h2 data-anim="hidden" className="rx-display mt-6 text-d3 text-white">
              Você está em
              <br />
              <span className="rx-accent">todas as frentes.</span>
            </h2>
          </div>

          {/* frentes: tipografia editorial empilhada, sem cards */}
          <ul className="mt-14 md:mt-20">
            {FRENTES.map((f, i) => (
              <li
                key={f}
                data-bk-frente=""
                data-anim="hidden"
                className="flex items-baseline gap-5 border-t border-white/[0.07] py-4 md:gap-8 md:py-6"
              >
                <span className="rx-eyebrow w-8 shrink-0 text-rx-silver/35 md:w-12">
                  0{i + 1}
                </span>
                <span className="rx-display text-[clamp(1.6rem,5.5vw,3.6rem)] text-rx-silver/85">
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <p
            data-bk-close=""
            data-anim="hidden"
            className="rx-body mt-14 border-l-2 border-rx-cyan-500/60 pl-6 text-rx-silver md:mt-20"
          >
            E mesmo assim sente que o negócio anda no mesmo lugar. Não é falta de esforço —
            é o mecanismo travado por dentro.
          </p>
        </div>
      </div>
    </section>
  )
}

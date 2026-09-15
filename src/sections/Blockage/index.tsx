'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Chain from '@/components/art/Chain'
import Gear from '@/components/art/Gear'
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

      // Três planos, três velocidades — é a diferença que cria a profundidade.
      parallax('[data-bk-fg]', 'foreground', 620 * k, root)
      parallax('[data-bk-fg2]', 'foreground', 430 * k, root)
      parallax('[data-bk-mg]', 'middleground', 460 * k, root)
      parallax('[data-bk-bg]', 'background', 460 * k, root)

      gsap.fromTo(
        '[data-bk-fg]',
        { rotate: 14 },
        {
          rotate: 9,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )

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

      {/* background — engrenagem distante, quase submersa */}
      <Gear
        variant="ghost"
        data-bk-bg=""
        className="absolute -right-[24%] top-[8%] w-[70vw] max-w-[760px] opacity-70 md:-right-[8%] md:w-[38vw]"
      />

      {/* middleground — corrente afastada */}
      <Chain
        data-bk-mg=""
        className="absolute -top-[10%] right-[16%] h-[130%] w-[26px] rotate-[-11deg] opacity-45 md:right-[26%] md:w-[34px]"
      />

      {/* foreground — 3 ou 4 elos gigantes atravessando a câmera, fora de foco.
          Não é para caber inteira: é para parecer perto demais.            */}
      <Chain
        variant="heavy"
        data-bk-fg=""
        className="absolute -top-[34%] -left-[26%] z-20 h-[190%] w-[124px] rotate-[17deg] opacity-55 blur-[3px]
          md:left-[2%] md:w-[300px] md:opacity-90"
      />
      <Chain
        data-bk-fg2=""
        className="absolute -top-[12%] left-[34%] z-20 hidden h-[132%] w-[44px] rotate-[9deg] opacity-80 blur-[1px]
          md:block md:left-[30%] md:w-[62px]"
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

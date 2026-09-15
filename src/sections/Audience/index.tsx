'use client'

import Atmosphere from '@/components/art/Atmosphere'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap, reveal } from '@/lib/motion'

const SIM = [
  'Você é empresário e sente que o negócio está parado, mesmo trabalhando muito.',
  'Você carrega a empresa nas costas e não consegue fazer o time andar no mesmo ritmo.',
  'Você já investiu em cursos, mentorias, consultorias e ainda não viu o resultado prometido.',
  'Você está pronto para parar de auto-medicar e operar com base em diagnóstico real.',
]

const NAO = [
  'Você quer remédio sem exame.',
  'Você espera motivação no lugar de método.',
  'Você não está disposto a olhar com honestidade para dentro do próprio negócio.',
]

export default function Audience() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add(MQ.reduced, () => gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0, x: 0 }))

    mm.add(MQ.motion, () => {
      reveal('[data-au-head] > *', { trigger: root, y: 26, stagger: 0.12 })
      gsap.fromTo(
        '[data-au-sim]',
        { opacity: 0, x: -26 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-au-cols]', start: 'top 74%', once: true },
        },
      )
      gsap.fromTo(
        '[data-au-nao]',
        { opacity: 0, x: 26 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-au-cols]', start: 'top 74%', once: true },
        },
      )
    })
  })

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden py-[11vh] md:py-[14vh]"
    >
      <Atmosphere tone="audience" vignette={0.8} />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <div data-au-head="" className="max-w-[20ch]">
          <h2 data-anim="hidden" className="rx-display text-d3 text-white">
            Esse evento é
          </h2>
          <h2 data-anim="hidden" className="rx-display text-d2 rx-accent">
            PARA VOCÊ?
          </h2>
        </div>

        {/* divisão progressiva: entra pela esquerda, entra pela direita */}
        <div data-au-cols="" className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-20">
          <div>
            <p className="rx-eyebrow border-b border-rx-cyan-500/40 pb-4 text-rx-cyan-500">
              É PARA VOCÊ SE
            </p>
            <ul className="mt-8 space-y-7">
              {SIM.map((s) => (
                <li key={s} data-au-sim="" data-anim="hidden" className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-rx-cyan-500" />
                  <span className="rx-body text-rx-silver">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:border-l md:border-white/[0.07] md:pl-20">
            <p className="rx-eyebrow border-b border-white/12 pb-4 text-rx-silver/50">
              NÃO É PARA VOCÊ SE
            </p>
            <ul className="mt-8 space-y-7">
              {NAO.map((s) => (
                <li key={s} data-au-nao="" data-anim="hidden" className="flex gap-4">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-rx-silver/40" />
                  <span className="rx-body text-rx-silver/45 line-through decoration-rx-silver/25">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

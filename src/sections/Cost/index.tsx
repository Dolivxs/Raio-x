'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Gear from '@/components/art/Gear'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap, parallax, reveal } from '@/lib/motion'

const CONTAS = [
  'Quanto custa passar mais dois meses resolvendo sintomas?',
  'Quanto vale saber exatamente onde concentrar tempo, equipe e recurso antes da reta final?',
  'Quanto do resultado de 2026 ainda depende das decisões que você tomar agora?',
]

export default function Cost() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add(MQ.reduced, () => {
      gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0 })
    })

    mm.add(MQ.motion, () => {
      reveal('[data-ct-head] > *', { trigger: root, y: 26, stagger: 0.14 })
      reveal('[data-ct-lead]', { trigger: root, y: 22, start: 'top 66%' })
      reveal('[data-ct-item]', { trigger: root, y: 26, stagger: 0.16, start: 'top 58%' })
      reveal('[data-ct-close]', { trigger: root, y: 24, start: 'top 46%' })

      // mecanismo distante — quase só atmosfera
      parallax('[data-ct-gear]', 'background', 260, root)
    })
  })

  return (
    // A seção do custo respira: muito espaço negativo, poucos elementos.
    <section
      ref={root}
      className="relative w-full overflow-hidden py-[13vh] md:py-[16vh]"
    >
      <Atmosphere tone="cost" vignette={1.2} />
      {/* Perto do fim a página vai ficando mais limpa: sobra uma peça só,
          distante, fora da coluna de texto (max-w-[1100px] centralizada). */}
      <Gear
        tone="silver"
        data-ct-gear=""
        className="absolute -right-[34%] top-[16%] w-[84vw] max-w-[720px] opacity-[0.12]
          md:-right-[16%] md:w-[30vw]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <div data-ct-head="" className="max-w-[18ch]">
          <h2 data-anim="hidden" className="rx-display text-[clamp(1.3rem,3.2vw,2.3rem)] text-rx-silver/70">
            68 dias passam de qualquer jeito.
          </h2>
          <h2 data-anim="hidden" className="rx-display text-d2 rx-accent">
            A DIFERENÇA
            <br />
            É A DIREÇÃO.
          </h2>
        </div>

        <p data-ct-lead="" data-anim="hidden" className="rx-body mt-12 text-white md:mt-16">
          O ano não vai esperar você descobrir sozinho.
        </p>

        <p className="rx-eyebrow mt-14 text-rx-silver/45 md:mt-20">FAZ A CONTA</p>
        <ul className="mt-8 space-y-8 md:mt-10 md:space-y-11">
          {CONTAS.map((c) => (
            <li key={c} data-ct-item="" data-anim="hidden" className="flex gap-5 md:gap-8">
              <span className="mt-3 h-px w-8 shrink-0 bg-rx-cyan-500 md:w-14" />
              <p className="max-w-[30ch] text-[clamp(1.05rem,2.4vw,1.75rem)] font-medium leading-[1.35] text-rx-silver">
                {c}
              </p>
            </li>
          ))}
        </ul>

        <p
          data-ct-close=""
          data-anim="hidden"
          className="mt-16 max-w-[34ch] text-[clamp(1.1rem,2.6vw,1.9rem)] font-medium leading-[1.35] text-white md:mt-24"
        >
          Os 68 dias vão passar.
          <span className="mt-3 block text-rx-silver/60">
            A diferença é como você vai conduzi-los.
          </span>
        </p>
      </div>
    </section>
  )
}

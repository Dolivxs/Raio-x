'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Gear from '@/components/art/Gear'
import Wordmark from '@/components/ui/Wordmark'
import { eventData } from '@/lib/event'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap, reveal } from '@/lib/motion'

const NEGATIVAS = ['Aqui não tem palpite.', 'Não tem teoria genérica.', 'Não tem fórmula mágica.']
const POSITIVAS = ['DIAGNÓSTICO', 'DIREÇÃO', 'EXECUÇÃO']

export default function Product() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add(MQ.reduced, () => gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0 }))

    mm.add(MQ.motion, () => {
      reveal('[data-pd-mark]', { trigger: root, y: 30 })
      reveal('[data-pd-claim] > span', { trigger: root, y: 26, stagger: 0.14, start: 'top 72%' })
      reveal('[data-pd-lead]', { trigger: root, y: 24, start: 'top 68%' })
      reveal('[data-pd-neg]', { trigger: root, y: 22, stagger: 0.1, start: 'top 62%' })
      reveal('[data-pd-pos]', { trigger: root, y: 26, stagger: 0.12, start: 'top 58%' })
      reveal('[data-pd-body] > p', { trigger: root, y: 24, stagger: 0.12, start: 'top 52%' })

      // A seção respira: a peça é só uma presença de fundo, girando devagar.
      gsap.fromTo(
        '[data-pd-bg]',
        { rotate: -10, y: 30 },
        {
          rotate: 10,
          y: -30,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
        },
      )
    })
  })

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden py-[11vh] md:py-[14vh]"
    >
      <Atmosphere tone="product" vignette={0.6} />

      {/* Única peça da cena, no limite do visível: o claim é o protagonista.
          "TEM EXAME. TEM LAUDO. TEM PRESCRIÇÃO." não divide atenção com nada. */}
      {/* Centrada por margin auto: o GSAP anima o transform e apagaria o
          -translate-x-1/2 do Tailwind. */}
      <Gear
        tone="silver"
        data-pd-bg=""
        className="absolute inset-x-0 top-[28%] mx-auto w-[140vw] max-w-[1400px] opacity-[0.05]
          md:w-[78vw]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <div data-pd-mark="" data-anim="hidden" className="flex justify-center">
          <Wordmark size="lg" />
        </div>

        <p
          data-pd-claim=""
          className="mt-14 flex flex-col items-center gap-1 text-center md:mt-20 md:gap-2"
        >
          <span data-anim="hidden" className="rx-display text-d4 text-white">
            UMA PARADA ESTRATÉGICA.
          </span>
          <span data-anim="hidden" className="rx-display text-d4 rx-accent">
            68 DIAS DE DIREÇÃO.
          </span>
        </p>

        <p
          data-pd-lead=""
          data-anim="hidden"
          className="rx-body mx-auto mt-16 text-center text-rx-silver md:mt-20"
        >
          Um dia para examinar. Uma estratégia para executar.
        </p>

        {/* negativas — divisores finos, sem cards */}
        <ul className="mx-auto mt-20 flex max-w-4xl flex-col divide-y divide-white/[0.07] border-y border-white/[0.07] md:mt-24 md:flex-row md:divide-x md:divide-y-0">
          {NEGATIVAS.map((n) => (
            <li
              key={n}
              data-pd-neg=""
              data-anim="hidden"
              className="flex-1 px-2 py-6 text-center text-[clamp(0.95rem,1.6vw,1.15rem)] text-rx-silver/75 md:px-8 md:py-8"
            >
              {n}
            </li>
          ))}
        </ul>

        <p className="mt-20 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 md:mt-24">
          {POSITIVAS.map((p) => (
            <span key={p} data-pd-pos="" data-anim="hidden" className="rx-display text-[clamp(1.5rem,5vw,3.4rem)]">
              <span className="rx-accent">{p}.</span>
            </span>
          ))}
        </p>

        <div data-pd-body="" className="mx-auto mt-20 max-w-3xl space-y-8 md:mt-24">
          <p data-anim="hidden" className="rx-body mx-auto text-rx-silver">
            O RAIO X Empresarial é uma imersão presencial para examinar o negócio, identificar o
            gargalo que mais interfere no resultado e definir a estratégia que vai orientar a reta
            final de {eventData.year}.
          </p>
        </div>
      </div>
    </section>
  )
}

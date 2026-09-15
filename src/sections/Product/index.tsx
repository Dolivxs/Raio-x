'use client'

import Wordmark from '@/components/ui/Wordmark'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap, reveal } from '@/lib/motion'

const NEGATIVAS = ['Aqui não tem palpite.', 'Não tem teoria genérica.', 'Não tem fórmula mágica.']
const POSITIVAS = ['EXAME', 'LAUDO', 'PRESCRIÇÃO']

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

      gsap.fromTo(
        '[data-pd-bg]',
        { rotate: -16, y: 40 },
        {
          rotate: 16,
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
        },
      )

      gsap.fromTo(
        '[data-rope-path]',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 85%', end: 'center center', scrub: 1 },
        },
      )
    })
  })

  return (
    <section
      ref={root}
      id="sec-product"
      className="relative w-full overflow-hidden py-[11vh] md:py-[14vh]"
    >

      {/* mecanismo enorme, no limite do visível — só profundidade, sem competir */}

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <div data-pd-mark="" data-anim="hidden" className="flex justify-center">
          <Wordmark size="lg" />
        </div>

        <p
          data-pd-claim=""
          className="mt-14 flex flex-col items-center gap-1 text-center md:mt-20 md:gap-2"
        >
          <span data-anim="hidden" className="rx-display text-d4 text-white">
            Um dia.
          </span>
          <span data-anim="hidden" className="rx-display text-d4 text-white">
            Um diagnóstico.
          </span>
          <span data-anim="hidden" className="rx-display text-d4 rx-accent">
            Uma rota.
          </span>
        </p>

        <p
          data-pd-lead=""
          data-anim="hidden"
          className="rx-body mx-auto mt-16 text-center text-rx-silver md:mt-20"
        >
          Uma imersão presencial de um dia inteiro, feita sob medida para o empresário que está
          cansado de auto-medicar o próprio negócio e quer, de uma vez por todas, enxergar o que
          realmente trava o crescimento.
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
              <span className="text-rx-silver/55">TEM </span>
              <span className="rx-accent">{p}.</span>
            </span>
          ))}
        </p>

        <div data-pd-body="" className="mx-auto mt-20 max-w-3xl space-y-8 md:mt-24">
          <p data-anim="hidden" className="rx-body mx-auto text-rx-silver">
            Você vai passar o dia abrindo seu negócio comigo. Olhando por dentro. Enxergando o que o
            olho nu não mostra: as obstruções, as fraturas, os pontos cegos que estão sangrando o
            resultado em silêncio.
          </p>
          <p data-anim="hidden" className="rx-body mx-auto text-white">
            E vai sair de lá com algo que a maioria dos empresários nunca teve na vida:{' '}
            <strong className="rx-accent">o diagnóstico real do próprio negócio</strong> e a
            prescrição certa para destravar.
          </p>
        </div>
      </div>
    </section>
  )
}

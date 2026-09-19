'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Cta from '@/components/ui/Cta'
import Wordmark from '@/components/ui/Wordmark'
import { MQ, useSection } from '@/components/motion/useSection'
import { ctaIsPlaceholder, eventData, eventFacts, price } from '@/lib/event'
import { gsap, reveal } from '@/lib/motion'

export default function FinalCTA() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add(MQ.reduced, () => gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0 }))

    // Movimento mínimo: aqui a página já disse tudo. Só assenta.
    mm.add(MQ.motion, () => {
      reveal('[data-fc-el]', { trigger: root, y: 22, stagger: 0.12, start: 'top 76%' })
    })
  })

  return (
    <section
      ref={root}
      id="vaga"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-[10vh] md:px-10"
    >
      <Atmosphere tone="final" grid vignette={0.85} />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <p data-fc-el="" data-anim="hidden" className="rx-eyebrow text-rx-cyan-500">
          {eventFacts.join(' · ')}
        </p>

        <div data-fc-el="" data-anim="hidden" className="mt-10">
          <Wordmark size="lg" />
        </div>

        <h2
          data-fc-el=""
          data-anim="hidden"
          className="rx-display mt-14 text-[clamp(1.7rem,5.2vw,3.6rem)] text-white"
        >
          Uma parada estratégica.
          <br />
          <span className="rx-accent">68 dias de direção.</span>
        </h2>

        <p data-fc-el="" data-anim="hidden" className="rx-body mt-8 text-rx-silver/75">
          {eventData.date} pode ser o dia em que você para de reagir ao negócio e começa a
          conduzir a reta final de {eventData.year} com clareza.
        </p>

        <div data-fc-el="" data-anim="hidden" className="mt-14">
          <p className="rx-eyebrow text-rx-silver/40">
            De <span className="line-through decoration-rx-silver/30">{price.original}</span> por
          </p>
          <p className="rx-display mt-2 text-[clamp(2.1rem,5vw,3.4rem)] leading-none rx-accent">
            {price.subsidized}
          </p>
          <p className="mt-2 text-[clamp(0.9rem,1.5vw,1.05rem)] text-rx-silver/70">
            ou {price.installmentLabel}
          </p>
          <p className="rx-eyebrow mx-auto mt-5 max-w-[34ch] leading-[1.7] text-rx-silver/45">
            {eventData.scarcity}
          </p>
        </div>

        <div data-fc-el="" data-anim="hidden" className="mt-12">
          <Cta size="xl" />
          {ctaIsPlaceholder && (
            <p className="rx-eyebrow mt-5 text-rx-silver/35">
              WHATSAPP A DEFINIR — AJUSTAR EM src/lib/event.ts
            </p>
          )}
        </div>

        <div
          data-fc-el=""
          data-anim="hidden"
          className="mt-16 max-w-[46ch] border-t border-white/[0.07] pt-8"
        >
          <p className="rx-body mx-auto text-rx-silver/70">
            Você pode passar os próximos 68 dias reagindo ao que aparece. Ou pode passar um dia
            examinando o negócio e conduzir a reta final com direção.
          </p>
          <p className="rx-display mt-8 text-[clamp(1.1rem,2.6vw,1.7rem)] rx-metal">
            A ESCOLHA É SUA.
          </p>
        </div>

        <p data-fc-el="" data-anim="hidden" className="rx-eyebrow mt-16 text-rx-silver/35">
          {eventData.speaker}
        </p>
      </div>
    </section>
  )
}

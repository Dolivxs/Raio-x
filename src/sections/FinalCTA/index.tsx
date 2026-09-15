'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Cta from '@/components/ui/Cta'
import Wordmark from '@/components/ui/Wordmark'
import { MQ, useSection } from '@/components/motion/useSection'
import { ctaIsPlaceholder, eventData } from '@/lib/event'
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
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-rx-navy-950 px-5 py-[16vh] md:px-10"
    >
      <Atmosphere grid />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <p data-fc-el="" data-anim="hidden" className="rx-eyebrow text-rx-cyan-500">
          {eventData.city} · {eventData.date}
        </p>

        <div data-fc-el="" data-anim="hidden" className="mt-10">
          <Wordmark size="lg" />
        </div>

        <h2
          data-fc-el=""
          data-anim="hidden"
          className="rx-display mt-14 text-[clamp(1.5rem,4.6vw,3.2rem)] text-white"
        >
          Pronto para parar
          <br />
          <span className="rx-accent">de tentar no escuro?</span>
        </h2>

        <p data-fc-el="" data-anim="hidden" className="rx-body mt-8 text-rx-silver/75">
          Turma única. Vagas limitadas. Quem entra, sai com diagnóstico, laudo e prescrição.
          Quem fica de fora, continua tratando sintoma.
        </p>

        <div data-fc-el="" data-anim="hidden" className="mt-14">
          <Cta />
          {ctaIsPlaceholder && (
            <p className="rx-eyebrow mt-5 text-rx-silver/35">
              WHATSAPP A DEFINIR — AJUSTAR EM src/lib/event.ts
            </p>
          )}
        </div>

        <div
          data-fc-el=""
          data-anim="hidden"
          className="mt-24 max-w-[46ch] border-t border-white/[0.07] pt-10"
        >
          <p className="rx-body mx-auto text-rx-silver/70">
            Você pode passar mais um ano tentando consertar o que não entende. Ou pode passar um
            dia finalmente enxergando o que estava ali o tempo todo.
          </p>
          <p className="rx-display mt-8 text-[clamp(1.1rem,2.6vw,1.7rem)] rx-metal">
            A ESCOLHA É SUA.
          </p>
        </div>

        <p data-fc-el="" data-anim="hidden" className="rx-eyebrow mt-24 text-rx-silver/35">
          {eventData.speaker}
        </p>
      </div>
    </section>
  )
}

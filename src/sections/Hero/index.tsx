'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Chain from '@/components/art/Chain'
import { MQ, useSection } from '@/components/motion/useSection'
import Cta from '@/components/ui/Cta'
import { eventData, eventFacts, price } from '@/lib/event'
import { gsap } from '@/lib/motion'

export default function Hero() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    // Entrada rápida: a página precisa ficar utilizável logo, sem splash.
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.set('[data-anim="hidden"]', { opacity: 0 })
        .to('[data-hero-fg]', { opacity: 1, duration: 0.9 }, 0.18)
        .to('[data-hero-detail]', { opacity: 1, duration: 0.8, stagger: 0.1 }, 0.15)
        .fromTo(
          '[data-hero-mark]',
          { opacity: 0, scale: 1.05, filter: 'blur(7px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1 },
          0.3,
        )
        .fromTo('[data-hero-sub]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.9)
        .fromTo('[data-hero-line]', { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, 0.95)
        .fromTo('[data-hero-head]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9 }, 1.05)
        .fromTo('[data-hero-cue]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.4)
    })

    mm.add(MQ.reduced, () => {
      gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0, scale: 1, filter: 'none' })
      gsap.set('[data-hero-line]', { scaleX: 1 })
    })

    // Saída: cada plano sai numa velocidade — é o que faz o hero virar cena.
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      if (!ctx.conditions?.isMotion) return
      const k = ctx.conditions.isDesktop ? 1 : 0.55
      const out = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      out
        .to('[data-hero-mark]', { yPercent: -32, scale: 0.92, opacity: 0.12, ease: 'none' }, 0)
        .to('[data-hero-head]', { yPercent: -58, opacity: 0, ease: 'none' }, 0)
        .to('[data-hero-cue]', { opacity: 0, ease: 'none', duration: 0.3 }, 0)
        // corrente: parallax de primeiro plano, sem giro
        .to('[data-hero-fg]', { yPercent: 26 * k, xPercent: -3 * k, ease: 'none' }, 0)
    })
  })

  return (
    <section
      ref={root}
      id="topo"
      className="relative isolate flex h-[100svh] min-h-[600px] w-full flex-col overflow-hidden"
    >
      <Atmosphere tone="hero" grid vignette={1.0} />

      {/* Objeto único do hero: a marca é a protagonista e o topo fica limpo.
          A corrente ocupa a faixa vazia à direita — entre a linha de crédito e
          a headline do rodapé — e sai pela borda. Não cruza texto nenhum. */}
      <Chain
        data-anim="hidden"
        data-hero-fg=""
        className="absolute -right-[40%] top-[58%] w-[104vw] max-w-none rotate-[58deg] opacity-0
          md:-right-[13%] md:top-[27%] md:w-[32vw] md:rotate-[62deg]"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-5 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
        <div className="flex items-start justify-between gap-6">
          <p data-anim="hidden" data-hero-detail="" className="rx-eyebrow text-rx-cyan-500/80 opacity-0">
            {eventFacts.join(' · ')}
          </p>
          <p
            data-anim="hidden"
            data-hero-detail=""
            className="rx-eyebrow max-w-[10rem] text-right text-rx-silver/45 opacity-0 md:max-w-none"
          >
            com {eventData.speaker}
          </p>
        </div>

        <div className="-mt-4 md:-mt-10">
          <h1 data-anim="hidden" data-hero-mark="" className="rx-display opacity-0">
            <span className="block text-[clamp(3.6rem,17vw,15rem)] leading-[0.82]">
              <span className="rx-metal">RAIO</span>
              <span className="rx-accent">X</span>
            </span>
            <span
              data-anim="hidden"
              data-hero-sub=""
              className="mt-3 block text-[clamp(0.7rem,2.6vw,2rem)] font-semibold text-rx-silver/70 opacity-0 md:mt-5"
              style={{ letterSpacing: '0.46em' }}
            >
              EMPRESARIAL
            </span>
          </h1>
          <span
            data-hero-line=""
            className="rx-hairline mt-8 block h-px w-full origin-left md:mt-10"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Oferta na primeira dobra: quem chega pelo anúncio já sabe o que é
              o evento — aqui ele confirma preço, condição e como garantir. */}
          <div data-anim="hidden" data-hero-cue="" className="opacity-0">
            <p className="rx-eyebrow text-rx-silver/40">
              De <span className="line-through decoration-rx-silver/30">{price.original}</span> por
            </p>
            <p className="rx-display mt-2 text-[clamp(1.9rem,4.2vw,3rem)] leading-none rx-accent">
              {price.subsidized}
            </p>
            <p className="mt-2 text-[clamp(0.85rem,1.4vw,1rem)] text-rx-silver/70">
              ou {price.installmentLabel}
            </p>
            <p className="rx-eyebrow mt-4 max-w-[28ch] leading-[1.7] text-rx-silver/45">
              {eventData.scarcity}
            </p>
            <div className="mt-6">
              <Cta />
            </div>
          </div>

          <div
            data-anim="hidden"
            data-hero-head=""
            className="max-w-[34ch] opacity-0 md:text-right"
          >
            <h2 className="text-[clamp(1.05rem,2.1vw,1.6rem)] font-medium leading-[1.42] text-white">
              Prepare-se para os últimos {eventData.daysLeft} dias do ano —
              <span className="block text-rx-silver/70">
                e garanta o seu resultado de {eventData.year}.
              </span>
            </h2>
            <p className="mt-4 text-[clamp(0.9rem,1.45vw,1.05rem)] leading-[1.55] text-rx-silver/60">
              Uma imersão presencial de um dia para examinar a sua empresa, identificar o gargalo
              que está segurando o resultado e sair com uma estratégia clara para a reta final do
              ano.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

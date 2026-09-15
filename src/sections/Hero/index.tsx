'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Chain from '@/components/art/Chain'
import Gear from '@/components/art/Gear'
import { MQ, useSection } from '@/components/motion/useSection'
import { eventData } from '@/lib/event'
import { gsap } from '@/lib/motion'

export default function Hero() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    // Entrada: rápida. A página precisa ficar utilizável logo — nada de splash.
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.set('[data-anim="hidden"]', { opacity: 0 })
        .to('[data-hero-detail]', { opacity: 1, duration: 0.9, stagger: 0.12 }, 0)
        .fromTo(
          '[data-hero-mark]',
          { opacity: 0, scale: 1.06, filter: 'blur(6px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1 },
          0.25,
        )
        .fromTo('[data-hero-sub]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
        .fromTo('[data-hero-line]', { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, 0.9)
        .fromTo('[data-hero-head]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9 }, 1.0)
        .fromTo('[data-hero-cue]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.35)
    })

    mm.add(MQ.reduced, () => {
      gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0, scale: 1, filter: 'none' })
      gsap.set('[data-hero-line]', { scaleX: 1 })
    })

    // Saída: o hero se desmonta e entrega a cena para a ampulheta.
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      if (!ctx.conditions?.isMotion) return
      const far = ctx.conditions.isDesktop ? 1 : 0.55
      const out = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      out
        .to('[data-hero-mark]', { yPercent: -34, scale: 0.9, opacity: 0.15, ease: 'none' }, 0)
        .to('[data-hero-head]', { yPercent: -60, opacity: 0, ease: 'none' }, 0)
        .to('[data-hero-cue]', { opacity: 0, ease: 'none', duration: 0.3 }, 0)
        .to('[data-hero-gear]', { rotate: 42 * far, yPercent: -14 * far, ease: 'none' }, 0)
        .to('[data-hero-chain]', { yPercent: 26 * far, ease: 'none' }, 0)
        .to('[data-hero-gear-sm]', { rotate: -68 * far, xPercent: -10 * far, ease: 'none' }, 0)
    })
  })

  return (
    <section
      ref={root}
      id="topo"
      className="relative isolate flex h-[100svh] min-h-[600px] w-full flex-col overflow-hidden bg-rx-navy-950"
    >
      <Atmosphere grid />

      {/* background — engrenagem fantasma, cortada pelo canto */}
      <Gear
        variant="ghost"
        data-anim="hidden"
        spin={42}
        className="absolute -right-[22%] -top-[26%] w-[85vw] max-w-[900px] opacity-0 md:-right-[10%] md:-top-[30%] md:w-[52vw]"
        data-hero-detail=""
      />

      {/* middleground — engrenagem menor, cortada pela borda esquerda */}
      <Gear
        variant="secondary"
        data-anim="hidden"
        className="absolute -left-[18%] top-[52%] w-[46vw] max-w-[380px] opacity-0 md:-left-[7%] md:top-[46%] md:w-[22vw]"
        data-hero-gear-sm=""
      />

      {/* foreground — corrente atravessando na diagonal */}
      <Chain
        data-anim="hidden"
        data-hero-detail=""
        data-hero-chain=""
        className="absolute -top-[18%] right-[6%] z-20 h-[150%] w-[34px] rotate-[15deg] opacity-0 md:left-[12%] md:right-auto md:w-[54px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-5 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
        {/* topo */}
        <div className="flex items-start justify-between gap-6">
          <p data-anim="hidden" data-hero-detail="" className="rx-eyebrow text-rx-cyan-500/80 opacity-0">
            {eventData.city} · {eventData.date}
          </p>
          <p
            data-anim="hidden"
            data-hero-detail=""
            className="rx-eyebrow max-w-[10rem] text-right text-rx-silver/45 opacity-0 md:max-w-none"
          >
            com {eventData.speaker}
          </p>
        </div>

        {/* marca — grande, alinhada à esquerda, ocupando a composição */}
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

        {/* base — headline deslocada para a direita, coluna estreita */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p data-anim="hidden" data-hero-cue="" className="rx-eyebrow flex items-center gap-3 text-rx-silver/40 opacity-0">
            <span className="h-8 w-px bg-rx-cyan-500/50 md:h-12" />
            ROLE PARA COMEÇAR O EXAME
          </p>
          <h2
            data-anim="hidden"
            data-hero-head=""
            className="max-w-[34ch] text-[clamp(1.05rem,2.1vw,1.6rem)] font-medium leading-[1.42] text-white opacity-0 md:text-right"
          >
            Sua empresa continua girando.
            <span className="block text-rx-silver/70">
              Mas será que ainda está indo na direção certa?
            </span>
          </h2>
        </div>
      </div>
    </section>
  )
}

'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Chain from '@/components/art/Chain'
import Gear from '@/components/art/Gear'
import { MQ, useSection } from '@/components/motion/useSection'
import { eventData } from '@/lib/event'
import { gsap } from '@/lib/motion'

export default function Hero() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    // Entrada rápida: a página precisa ficar utilizável logo, sem splash.
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.set('[data-anim="hidden"]', { opacity: 0 })
        .to('[data-hero-bg]', { opacity: 1, duration: 1.2 }, 0)
        .to('[data-hero-mg]', { opacity: 1, duration: 1.0 }, 0.12)
        .to('[data-hero-fg]', { opacity: 1, duration: 0.9 }, 0.2)
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
        .to('[data-hero-bg]', { rotate: 26 * k, yPercent: -7 * k, ease: 'none' }, 0)
        .to('[data-hero-mg]', { rotate: -58 * k, xPercent: -9 * k, yPercent: -16 * k, ease: 'none' }, 0)
        .to('[data-hero-fg]', { yPercent: 34 * k, ease: 'none' }, 0)
        .to('[data-hero-edge]', { yPercent: -26 * k, rotate: 30 * k, ease: 'none' }, 0)
    })
  })

  return (
    <section
      ref={root}
      id="topo"
      className="relative isolate flex h-[100svh] min-h-[600px] w-full flex-col overflow-hidden"
    >
      <Atmosphere tone="hero" grid vignette={1.0} />

      {/* ---------- BACKGROUND: fundo do mecanismo, fora de foco ---------- */}
      <Gear
        variant="ghost"
        data-anim="hidden"
        data-hero-bg=""
        className="absolute -right-[24%] -top-[28%] w-[92vw] max-w-[980px] opacity-0 blur-[3px]
          md:-right-[11%] md:-top-[34%] md:w-[56vw]"
        style={{ opacity: 0 }}
      />

      {/* ---------- MIDGROUND: peça de aço cortada pela borda esquerda ---------- */}
      <Gear
        variant="secondary"
        data-anim="hidden"
        data-hero-mg=""
        className="absolute -left-[24%] top-[58%] w-[52vw] max-w-[420px] opacity-0 blur-[1px]
          md:-left-[13%] md:top-[40%] md:w-[26vw]"
        style={{ opacity: 0 }}
      />

      {/* ---------- peça entrando pela borda inferior direita ---------- */}
      <Gear
        variant="small"
        data-anim="hidden"
        data-hero-edge=""
        data-hero-detail=""
        className="absolute -bottom-[14%] right-[6%] w-[30vw] max-w-[190px] opacity-0
          md:-bottom-[11%] md:right-[14%] md:w-[11vw]"
        style={{ opacity: 0 }}
      />

      {/* ---------- FOREGROUND: corrente colada na câmera, levemente desfocada ---------- */}
      <Chain
        variant="heavy"
        data-anim="hidden"
        data-hero-fg=""
        className="absolute -top-[26%] -right-[6%] z-20 h-[164%] w-[78px] rotate-[9deg] opacity-0 blur-[2px]
          md:-left-[15%] md:right-auto md:w-[230px]"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-5 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
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

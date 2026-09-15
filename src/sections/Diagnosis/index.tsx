'use client'

import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'

export default function Diagnosis() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>

      if (!isMotion) {
        gsap.set('[data-dg-a], [data-dg-b], [data-dg-note]', { opacity: 1, y: 0 })
        return
      }

      const k = isDesktop ? 1 : 0.5
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      // Engrenagens giram por progresso de scroll, em proporções e sentidos diferentes.
      // Param quando o scroll para; invertem quando o usuário volta.
      gsap.utils.toArray<HTMLElement>('[data-gear]', root).forEach((g) => {
        const spin = Number(g.dataset.spin ?? 180)
        tl.fromTo(g, { rotate: 0 }, { rotate: spin, ease: 'none', duration: 1 }, 0)
      })

      tl.fromTo('[data-dg-a]', { opacity: 0, y: 34 * k }, { opacity: 1, y: 0, duration: 0.14 }, 0.04)
        .to('[data-dg-a]', { opacity: 0, y: -30 * k, duration: 0.12 }, 0.44)
        .fromTo('[data-dg-b]', { opacity: 0, y: 40 * k, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.16 }, 0.52)
        .fromTo('[data-dg-note]', { opacity: 0, y: 24 * k }, { opacity: 1, y: 0, duration: 0.12 }, 0.7)
    })
  })

  return (
    <section ref={root}
      id="sec-diagnosis" className="relative h-[180vh] w-full md:h-[210vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">

        {/* ---------- mecanismo em três profundidades declaradas ----------
            fundo: quase preto e fora de foco · meio: prata em foco ·
            frente: pequena dourada, grande na tela e levemente desfocada. */}

        {/* BACKGROUND — quase submersa */}

        {/* MIDGROUND — prata, nítida, é a peça que se lê */}

        {/* FOREGROUND — dourada, colada na câmera, cortada pela borda */}

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <div className="relative w-full max-w-[46rem] md:ml-[6%]">
            <h2 data-dg-a="" data-anim="hidden" className="absolute inset-0">
              <span className="rx-display block text-d3 text-rx-silver/80">
                O problema não é
              </span>
              <span className="rx-display block text-d3 text-white">
                falta de esforço.
              </span>
            </h2>

            <div data-dg-b="" data-anim="hidden" className="absolute inset-0">
              <span className="rx-display block text-[clamp(1.4rem,3.6vw,2.6rem)] text-rx-silver/70">
                É FALTA DE
              </span>
              <span className="rx-display block text-d1 leading-[0.86] text-rx-cyan-500">
                DIAGNÓSTICO
              </span>
              <p
                data-dg-note=""
                data-anim="hidden"
                className="rx-body mt-8 border-l-2 border-rx-cyan-500/50 pl-6 text-rx-silver md:mt-10"
              >
                Você está tratando sintomas e nunca olhou o <strong className="text-white">RAIO X</strong>{' '}
                do seu negócio.
              </p>
            </div>

            {/* reserva de altura — as duas mensagens dividem o mesmo espaço */}
            <div aria-hidden className="pointer-events-none invisible">
              <span className="rx-display block text-[clamp(1.4rem,3.6vw,2.6rem)]">É FALTA DE</span>
              <span className="rx-display block text-d1 leading-[0.86]">
                DIAGNÓSTICO
              </span>
              <p className="rx-body mt-8 pl-6 md:mt-10">
                Você está tratando sintomas e nunca olhou o RAIO X do seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

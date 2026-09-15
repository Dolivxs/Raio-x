'use client'

import Atmosphere from '@/components/art/Atmosphere'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'

/** Posições editoriais diferentes por palavra — nada de lista alinhada. */
const TENTATIVAS = [
  { label: 'CURSOS', pos: 'md:ml-[4%] md:mr-auto', size: 'text-[clamp(2rem,9vw,6.5rem)]' },
  { label: 'CONSULTORIA', pos: 'md:ml-auto md:mr-[6%]', size: 'text-[clamp(1.7rem,7.4vw,5.4rem)]' },
  { label: 'LIVROS', pos: 'md:ml-[18%] md:mr-auto', size: 'text-[clamp(2rem,8.6vw,6rem)]' },
  { label: 'MENTORIAS', pos: 'md:ml-auto md:mr-[16%]', size: 'text-[clamp(1.8rem,7.8vw,5.6rem)]' },
  { label: 'TROCAR PESSOAS', pos: 'md:ml-[8%] md:mr-auto', size: 'text-[clamp(1.5rem,6.4vw,4.6rem)]' },
  { label: 'MUDAR PROCESSOS', pos: 'md:ml-auto md:mr-[4%]', size: 'text-[clamp(1.5rem,6.4vw,4.6rem)]' },
]

export default function Attempts() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>

      if (!isMotion) {
        gsap.set('[data-at-word]', { opacity: 0.34, x: 0 })
        gsap.set('[data-at-strike]', { scaleX: 1 })
        gsap.set('[data-at-head], [data-at-close]', { opacity: 1, y: 0 })
        return
      }

      const k = isDesktop ? 1 : 0.45
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      tl.fromTo('[data-at-head]', { opacity: 0, y: 26 * k }, { opacity: 1, y: 0, duration: 0.1 }, 0)

      const words = gsap.utils.toArray<HTMLElement>('[data-at-word]')
      words.forEach((w, i) => {
        const at = 0.1 + i * 0.1
        const dir = i % 2 === 0 ? -1 : 1
        // entra de fora da composição, é riscada, perde peso
        tl.fromTo(
          w,
          { opacity: 0, x: 70 * dir * k },
          { opacity: 1, x: 0, duration: 0.07, ease: 'power2.out' },
          at,
        )
          .fromTo(
            w.querySelector('[data-at-strike]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.05, ease: 'power2.inOut' },
            at + 0.055,
          )
          .to(w, { opacity: 0.26, duration: 0.06 }, at + 0.08)
      })

      tl.fromTo(
        '[data-at-close]',
        { opacity: 0, y: 34 * k },
        { opacity: 1, y: 0, duration: 0.1 },
        0.82,
      )
    })
  })

  return (
    <section ref={root} className="relative h-[260vh] w-full bg-rx-navy-950 md:h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Atmosphere vignette={false} />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <p
            data-at-head=""
            data-anim="hidden"
            className="rx-display text-[clamp(1.2rem,3vw,2.2rem)] text-white"
          >
            Você já <span className="rx-accent">tentou de tudo:</span>
          </p>

          <div className="mt-8 flex flex-col gap-1 md:mt-10 md:gap-2">
            {TENTATIVAS.map((t) => (
              <span
                key={t.label}
                data-at-word=""
                data-anim="hidden"
                className={`relative inline-block w-fit ${t.pos}`}
              >
                <span className={`rx-display ${t.size} text-rx-silver/85`}>{t.label}</span>
                <span
                  data-at-strike=""
                  className="absolute left-0 top-1/2 h-[3px] w-full origin-left bg-rx-cyan-500 md:h-[5px]"
                  style={{ transform: 'scaleX(0)' }}
                />
              </span>
            ))}
          </div>

          <p
            data-at-close=""
            data-anim="hidden"
            className="mt-12 max-w-[26ch] text-[clamp(1.1rem,2.6vw,2rem)] font-medium leading-[1.35] text-white md:mt-16"
          >
            Você corre.
            <span className="block text-rx-cyan-500">O negócio não acompanha.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

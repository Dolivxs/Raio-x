'use client'

import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'

/** Posições editoriais diferentes por palavra — nada de lista alinhada. */
/** Escalas e tons deliberadamente desiguais: algumas palavras estão perto da
 *  câmera, outras recuadas. É o que tira a lista do plano único.            */
const TENTATIVAS = [
  { label: 'CURSOS',           pos: 'md:ml-[2%]  md:mr-auto', size: 'text-[clamp(2.2rem,10.5vw,7.6rem)]', tone: 'text-rx-silver/90', depth: 1.0 },
  { label: 'CONSULTORIA',      pos: 'md:ml-auto md:mr-[8%]',  size: 'text-[clamp(1.4rem,6.0vw,4.2rem)]',  tone: 'text-rx-silver/45', depth: 0.35 },
  { label: 'LIVROS',           pos: 'md:ml-[22%] md:mr-auto', size: 'text-[clamp(2.4rem,11vw,8rem)]',     tone: 'text-rx-silver/95', depth: 1.15 },
  { label: 'MENTORIAS',        pos: 'md:ml-auto md:mr-[18%]', size: 'text-[clamp(1.3rem,5.4vw,3.8rem)]',  tone: 'text-rx-silver/40', depth: 0.3 },
  { label: 'TROCAR PESSOAS',   pos: 'md:ml-[6%]  md:mr-auto', size: 'text-[clamp(1.6rem,7vw,5rem)]',      tone: 'text-rx-silver/70', depth: 0.65 },
  { label: 'MUDAR PROCESSOS',  pos: 'md:ml-auto md:mr-[2%]',  size: 'text-[clamp(1.9rem,8.4vw,6rem)]',    tone: 'text-rx-silver/85', depth: 0.9 },
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
        const depth = Number(w.dataset.depth ?? 1)
        // Entra de fora da composição, é riscada, perde peso.
        // Quanto mais perto da câmera, maior o deslocamento de entrada.
        tl.fromTo(
          w,
          { opacity: 0, x: 70 * dir * k * depth },
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
    <section ref={root}
      id="sec-attempts" className="relative h-[155vh] w-full md:h-[180vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">

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
                data-depth={t.depth}
                data-anim="hidden"
                className={`relative inline-block w-fit ${t.pos}`}
              >
                <span className={`rx-display ${t.size} ${t.tone}`}>{t.label}</span>
                <span
                  data-at-strike=""
                  className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-rx-cyan-500 md:h-[4px]"
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

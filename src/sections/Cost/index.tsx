'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Gear from '@/components/art/Gear'
import Rope from '@/components/art/Rope'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap, parallax, reveal } from '@/lib/motion'

const CONTAS = [
  'Quanto você perdeu nos últimos 12 meses tentando consertar o que não entendia?',
  'Quanto vale identificar o que realmente está travando seu negócio e sair com um plano para mudar o jogo?',
  'Quanto vale você deixar de carregar a empresa nas costas?',
]

export default function Cost() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add(MQ.reduced, () => {
      gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0 })
      gsap.set('[data-rope-path]', { strokeDashoffset: 0 })
    })

    mm.add(MQ.motion, () => {
      reveal('[data-ct-head] > *', { trigger: root, y: 26, stagger: 0.14 })
      reveal('[data-ct-lead]', { trigger: root, y: 22, start: 'top 66%' })
      reveal('[data-ct-item]', { trigger: root, y: 26, stagger: 0.16, start: 'top 58%' })
      reveal('[data-ct-close]', { trigger: root, y: 24, start: 'top 46%' })

      // mecanismo distante — quase só atmosfera
      parallax('[data-ct-gear]', 'background', 300, root)

      gsap.fromTo(
        '[data-rope-path]',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom center', scrub: 1 },
        },
      )
    })
  })

  return (
    // A seção do custo respira: muito espaço negativo, poucos elementos.
    <section
      ref={root}
      className="relative w-full overflow-hidden py-[13vh] md:py-[16vh]"
    >
      <Atmosphere tone="cost" vignette={1.2} />
      <Gear
        variant="ghost"
        data-ct-gear=""
        className="absolute -right-[30%] top-[18%] w-[90vw] max-w-[820px] opacity-25 md:-right-[14%] md:w-[36vw]"
      />
      <Rope className="absolute bottom-[10%] left-0 h-[16vh] w-[120%] opacity-25" tone="silver" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <div data-ct-head="" className="max-w-[18ch]">
          <h2 data-anim="hidden" className="rx-display text-[clamp(1.3rem,3.2vw,2.3rem)] text-rx-silver/70">
            Quanto te custa
          </h2>
          <h2 data-anim="hidden" className="rx-display text-d2 rx-accent">
            CONTINUAR
            <br />
            COMO ESTÁ?
          </h2>
        </div>

        <p data-ct-lead="" data-anim="hidden" className="rx-body mt-12 text-white md:mt-16">
          Um mês a mais sem diagnóstico é um mês a mais sangrando resultado em silêncio.
        </p>

        <p className="rx-eyebrow mt-14 text-rx-silver/45 md:mt-20">FAZ A CONTA</p>
        <ul className="mt-8 space-y-8 md:mt-10 md:space-y-11">
          {CONTAS.map((c) => (
            <li key={c} data-ct-item="" data-anim="hidden" className="flex gap-5 md:gap-8">
              <span className="mt-3 h-px w-8 shrink-0 bg-rx-cyan-500 md:w-14" />
              <p className="max-w-[30ch] text-[clamp(1.05rem,2.4vw,1.75rem)] font-medium leading-[1.35] text-rx-silver">
                {c}
              </p>
            </li>
          ))}
        </ul>

        <p
          data-ct-close=""
          data-anim="hidden"
          className="mt-16 max-w-[34ch] text-[clamp(1.1rem,2.6vw,1.9rem)] font-medium leading-[1.35] text-white md:mt-24"
        >
          Continuar como está custa muito mais.
          <span className="mt-3 block text-rx-silver/60">
            Só que parcelado em meses, em anos, em saúde, em noites mal dormidas.
          </span>
        </p>
      </div>
    </section>
  )
}

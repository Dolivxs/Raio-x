'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Fracture from '@/components/art/Fracture'
import Gear from '@/components/art/Gear'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'

/** As 5 descobertas oficiais. Cada uma toma a composição inteira, uma por vez. */
const DESCOBERTAS = [
  {
    n: '01',
    forte: 'Por que sua equipe não entrega',
    resto: 'E por que a resposta quase nunca é a que o empresário imagina.',
  },
  {
    n: '02',
    forte: 'Onde está a fratura silenciosa da sua gestão',
    resto: 'O que está travando o crescimento e você ainda não tinha enxergado.',
  },
  {
    n: '03',
    forte: 'Por que você trabalha tanto e o resultado não chega',
    resto: 'E como inverter essa lógica de uma vez.',
  },
  {
    n: '04',
    forte: 'O diagnóstico real do seu negócio',
    resto: 'Feito por você, dentro da imersão, com a minha condução.',
  },
  {
    n: '05',
    forte: 'Sua prescrição executável',
    resto: "O protocolo certo para os seus próximos passos, não o que 'funciona em geral'.",
  },
]

export default function Reveal() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>
      const panels = gsap.utils.toArray<HTMLElement>('[data-rv-panel]', root)
      const ticks = gsap.utils.toArray<HTMLElement>('[data-rv-tick]', root)

      if (!isMotion) {
        gsap.set(panels, { opacity: 1, position: 'relative', y: 0 })
        gsap.set(ticks, { scaleX: 1, opacity: 1 })
        gsap.set('[data-crack]', { strokeDashoffset: 0 })
        gsap.set('[data-rv-head]', { opacity: 1, y: 0 })
        return
      }

      const k = isDesktop ? 1 : 0.55
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })
      tl.to({}, { duration: 1 }, 0)

      // O cabeçalho abre a cena e cede lugar às descobertas.
      tl.fromTo('[data-rv-head]', { opacity: 0, y: 30 * k }, { opacity: 1, y: 0, duration: 0.07 }, 0)
        .to('[data-rv-head]', { opacity: 0.22, duration: 0.06 }, 0.16)

      // A fratura se propaga ao longo de toda a revelação.
      tl.fromTo('[data-crack]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', stagger: 0.02, duration: 0.75 }, 0.14)
      tl.fromTo('[data-rv-fracture]', { yPercent: -8, rotate: -3 }, { yPercent: 8, rotate: 3, ease: 'none', duration: 1 }, 0)
      tl.fromTo('[data-rv-bg]', { rotate: -14 }, { rotate: 14, ease: 'none', duration: 1 }, 0)

      // Cada descoberta ocupa a cena e sai. Não é lista: é uma de cada vez.
      const start = 0.18
      const span = (1 - start) / DESCOBERTAS.length
      panels.forEach((panel, i) => {
        const at = start + i * span
        tl.fromTo(
          panel,
          { opacity: 0, y: 44 * k },
          { opacity: 1, y: 0, duration: span * 0.32, ease: 'power3.out' },
          at,
        )
        if (i < panels.length - 1) {
          tl.to(panel, { opacity: 0, y: -38 * k, duration: span * 0.26, ease: 'power2.in' }, at + span * 0.7)
        }
        tl.fromTo(ticks[i], { scaleX: 0.18, opacity: 0.3 }, { scaleX: 1, opacity: 1, duration: span * 0.25 }, at)
        if (i < panels.length - 1) {
          tl.to(ticks[i], { opacity: 0.3, duration: span * 0.2 }, at + span * 0.8)
        }
      })
    })
  })

  return (
    <section ref={root} className="relative h-[195vh] w-full md:h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Atmosphere tone="reveal" vignette={0.95} />

        {/* fundo: mecanismo submerso, fora de foco */}
        <Gear
          variant="ghost"
          data-rv-bg=""
          className="absolute -left-[34%] top-[8%] w-[104vw] max-w-[1000px] opacity-[0.22] blur-[5px]
            md:-left-[16%] md:w-[50vw]"
        />

        {/* a fratura silenciosa, se propagando à direita */}
        <Fracture
          data-rv-fracture=""
          className="absolute -right-[20%] top-[6%] w-[96vw] max-w-[820px] opacity-50
            md:-right-[4%] md:w-[44vw]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          {/* cabeçalho fixo da cena */}
          <div data-rv-head="" className="max-w-[24ch]">
            <p className="rx-eyebrow text-rx-silver/50">
              O QUE O SEU <span className="font-bold text-white">RAIO X</span> VAI
            </p>
            <h2 className="rx-display mt-3 text-d2 rx-accent">REVELAR</h2>
          </div>

          <div className="mt-10 flex gap-6 md:mt-14 md:gap-12">
            {/* marcadores das 5 descobertas */}
            <ul className="hidden shrink-0 flex-col justify-center gap-4 md:flex">
              {DESCOBERTAS.map((d) => (
                <li key={d.n} className="flex items-center gap-3">
                  <span
                    data-rv-tick=""
                    className="h-px w-10 origin-left bg-rx-cyan-500"
                    style={{ transform: 'scaleX(0.18)', opacity: 0.3 }}
                  />
                  <span className="rx-eyebrow text-rx-silver/45">{d.n}</span>
                </li>
              ))}
            </ul>

            {/* painéis empilhados no mesmo espaço */}
            <div className="relative min-h-[46svh] flex-1 md:min-h-[42svh]">
              {DESCOBERTAS.map((d, i) => (
                <article
                  key={d.n}
                  data-rv-panel=""
                  className="absolute inset-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <span className="rx-display block text-[clamp(4rem,15vw,10rem)] leading-[0.8] text-white/[0.06]">
                    {d.n}
                  </span>
                  <h3 className="rx-display -mt-8 max-w-[18ch] text-[clamp(1.4rem,4.2vw,3.1rem)] leading-[1.02] text-white md:-mt-14">
                    {d.forte}
                  </h3>
                  <p className="rx-body mt-5 max-w-[42ch] text-rx-silver/75 md:mt-7">{d.resto}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

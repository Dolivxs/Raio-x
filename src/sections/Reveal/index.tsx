'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Fracture from '@/components/art/Fracture'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap, reveal } from '@/lib/motion'

const DESCOBERTAS = [
  { forte: 'Por que sua equipe não entrega', resto: 'e por que a resposta quase nunca é a que o empresário imagina.' },
  { forte: 'Onde está a fratura silenciosa da sua gestão', resto: 'o que está travando o crescimento e você ainda não tinha enxergado.' },
  { forte: 'Por que você trabalha tanto e o resultado não chega', resto: 'e como inverter essa lógica de uma vez.' },
  { forte: 'O diagnóstico real do seu negócio', resto: 'feito por você, dentro da imersão, com a minha condução.' },
  { forte: 'Sua prescrição executável', resto: "o protocolo certo para os seus próximos passos, não o que 'funciona em geral'." },
]

export default function Reveal() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add(MQ.reduced, () => {
      gsap.set('[data-anim="hidden"]', { opacity: 1, y: 0 })
      gsap.set('[data-crack]', { strokeDashoffset: 0 })
    })

    mm.add(MQ.motion, () => {
      reveal('[data-rv-head] > *', { trigger: root, y: 28, stagger: 0.12 })
      reveal('[data-rv-item]', { trigger: root, y: 30, stagger: 0.14, start: 'top 68%' })

      // A fratura se propaga conforme a leitura avança.
      gsap.fromTo(
        '[data-crack]',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom bottom', scrub: 1 },
        },
      )

      gsap.fromTo(
        '[data-rv-fracture]',
        { y: -60 },
        {
          y: 60,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
    })
  })

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden bg-rx-navy-950 py-[16vh] md:py-[20vh]"
    >
      <Atmosphere />
      <Fracture
        data-rv-fracture=""
        className="absolute -right-[18%] top-[12%] w-[86vw] max-w-[720px] opacity-45 md:right-[2%] md:w-[38vw]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <div data-rv-head="" className="max-w-[16ch] md:max-w-[60%]">
          <h2 data-anim="hidden" className="rx-display text-d4 text-rx-silver/80">
            O que o seu <span className="font-bold text-white">RAIO X</span>
          </h2>
          <h2 data-anim="hidden" className="rx-display text-d2 rx-accent">
            VAI REVELAR
          </h2>
          <p data-anim="hidden" className="rx-body mt-6 text-rx-silver/70">
            As 5 descobertas que vão mudar como você olha para o seu negócio.
          </p>
        </div>

        {/* lista editorial numerada — não são cards */}
        <ol className="mt-16 md:mt-24">
          {DESCOBERTAS.map((d, i) => (
            <li
              key={d.forte}
              data-rv-item=""
              data-anim="hidden"
              className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-white/[0.07] py-8
                md:grid-cols-[6rem_1fr_1.2fr] md:gap-x-10 md:py-12"
            >
              <span className="rx-display text-[clamp(1.6rem,4vw,3rem)] leading-none text-white/12">
                0{i + 1}
              </span>
              <h3 className="rx-display text-[clamp(1.1rem,2.6vw,1.9rem)] leading-tight text-white">
                {d.forte}
              </h3>
              <p className="rx-body col-start-2 text-rx-silver/75 md:col-start-3 md:mt-1">
                {d.resto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

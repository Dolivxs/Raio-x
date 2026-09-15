'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Chain from '@/components/art/Chain'
import OfficialAsset from '@/components/art/OfficialAsset'
import { MQ, useSection } from '@/components/motion/useSection'
import { ASSET } from '@/lib/assets'
import { gsap } from '@/lib/motion'

const SINTOMAS = [
  'A equipe não entrega como deveria.',
  'As metas não batem como deveriam.',
  'Você está em todas as frentes da operação, gestão, time, cliente — e mesmo assim sente que o negócio anda no mesmo lugar.',
]

export default function Overwork() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>
      const k = isDesktop ? 1 : 0.5 // mobile: mesmos movimentos, amplitude menor

      if (!isMotion) {
        gsap.set('[data-ow-a], [data-ow-b], [data-ow-list] > li', { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      // A ampulheta é o objeto dominante da cena. A areia é a do arquivo
      // oficial e NÃO é animada: o tempo passa pelo deslocamento da peça.
      // Parallax curto, inclinação de poucos graus, escala quase imperceptível.
      tl.fromTo(
        '[data-ow-glass]',
        { yPercent: 7 * k, rotate: -2.6 * k, scale: 1.015 },
        { yPercent: -9 * k, rotate: 2.2 * k, scale: 0.985, ease: 'none', duration: 1 },
        0,
      )

      // Saída suave: a ampulheta cede a cena antes do fim, sem sumir de golpe.
      tl.to('[data-ow-glass]', { opacity: 0.35, ease: 'none', duration: 0.22 }, 0.78)

      // Ritmo: movimento → respiro → movimento → pausa
      tl.fromTo('[data-ow-a]', { opacity: 0, y: 30 * k }, { opacity: 1, y: 0, duration: 0.16 }, 0.06)
        .to('[data-ow-a]', { opacity: 0, y: -26 * k, duration: 0.12 }, 0.42)
        .fromTo('[data-ow-b]', { opacity: 0, y: 34 * k }, { opacity: 1, y: 0, duration: 0.16 }, 0.5)
        .fromTo(
          '[data-ow-list] > li',
          { opacity: 0, x: 22 * k },
          { opacity: 1, x: 0, duration: 0.12, stagger: 0.06 },
          0.64,
        )

      // Secundário: a corrente corre mais que a ampulheta — é só profundidade.
      // Não encosta nela e não reage a ela: são dois objetos independentes.
      tl.fromTo('[data-ow-fg]', { yPercent: -13 * k }, { yPercent: 18 * k, ease: 'none', duration: 1 }, 0)
    })
  })

  return (
    <section ref={root} className="relative h-[200vh] w-full md:h-[230vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Atmosphere tone="overwork" vignette={0.9} />

        {/* SECUNDÁRIO — corrente na borda direita, distante e discreta.
            Não toca a ampulheta: nesta cena não há ligação física entre elas. */}
        <Chain
          data-ow-fg=""
          className="absolute hidden md:block md:-right-[22%] md:top-[2%] md:w-[58vw] md:opacity-35
            md:max-w-none md:rotate-[72deg]"
        />

        {/* DOMINANTE — ampulheta oficial, grande, cortada pela borda esquerda */}
        {/* Centrada por margin auto, não por -translate-y-1/2: o GSAP anima o
            transform desta imagem e sobrescreveria a classe do Tailwind. */}
        <OfficialAsset
          src={ASSET.hourglass}
          data-ow-glass=""
          className="absolute -left-[46%] top-[46%] h-[54vh] w-auto opacity-[0.22]
            md:inset-y-0 md:-left-[3%] md:top-auto md:my-auto md:h-[86vh] md:opacity-100 lg:left-[2%]"
        />

        <div className="relative z-10 ml-auto w-full max-w-[1600px] px-5 md:px-10">
          <div className="ml-auto w-full max-w-[38rem] md:w-[54%]">
            <div className="relative">
              <h2
                data-ow-a=""
                data-anim="hidden"
                className="absolute inset-0 rx-display text-d2 text-rx-cyan-500"
              >
                VOCÊ
                <br />
                TRABALHA
                <br />
                DEMAIS.
              </h2>

              <div data-ow-b="" data-anim="hidden" className="absolute inset-0">
                <h2 className="rx-display text-d3 text-white">
                  E O RESULTADO
                  <br />
                  NÃO CHEGA.
                </h2>
                <ul data-ow-list="" className="mt-8 space-y-5 md:mt-10">
                  {SINTOMAS.map((s) => (
                    <li key={s} data-anim="hidden" className="flex gap-4">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rx-cyan-500" />
                      <span className="rx-body text-rx-silver">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* reserva de altura: as duas mensagens se sobrepõem no mesmo espaço */}
              <div aria-hidden className="pointer-events-none invisible">
                <h2 className="rx-display text-d3">
                  E O RESULTADO
                  <br />
                  NÃO CHEGA.
                </h2>
                <ul className="mt-8 space-y-5 md:mt-10">
                  {SINTOMAS.map((s) => (
                    <li key={s} className="rx-body">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

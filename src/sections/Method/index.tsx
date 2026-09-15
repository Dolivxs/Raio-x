'use client'

import Atmosphere from '@/components/art/Atmosphere'
import Gear from '@/components/art/Gear'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'
import { STAGES } from './stages'

/**
 * O CSS descreve o mecanismo ORGANIZADO (estado final).
 * A desordem inicial vive aqui, como deslocamento de onde cada peça parte.
 */
/**
 * Deslocamento inicial de cada peça, em % da sua própria largura.
 * As direções apontam para FORA do centro do grupo — é isso que faz a etapa 01
 * parecer espalhada e a 06 parecer compacta. Sem isso as peças só trocam de
 * lugar e a reorganização não se lê.
 */
const SCATTER = [
  { x: -17, y: -20, r: -19, s: 1.1 }, // dourada: sobe pela esquerda
  { x: -11, y: 44, r: 26, s: 1.08 }, // prata: desce
  { x: 58, y: -50, r: 38, s: 1.12 }, // ciano: sobe pela direita
]

/**
 * Quanto do deslocamento inicial ainda resta em cada uma das 6 etapas.
 * 01-02 espalhadas · 03-04 se aproximando · 05 quase organizadas ·
 * 06 composição compacta. É a leitura da desordem virando ordem.
 */
const CLOSING = [1, 0.88, 0.62, 0.36, 0.14, 0]
const STEP = 1 / CLOSING.length

export default function Method() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>
      const slots = gsap.utils.toArray<HTMLElement>('[data-mt-slot]', root)
      const panels = gsap.utils.toArray<HTMLElement>('[data-mt-panel]', root)
      const rails = gsap.utils.toArray<HTMLElement>('[data-mt-rail]', root)

      if (!isMotion) {
        gsap.set(slots, { x: 0, y: 0, rotate: 0, scale: 1 })
        gsap.set(panels, { opacity: 1, position: 'relative', y: 0 })
        gsap.set(rails, { opacity: 1 })
        return
      }

      const k = isDesktop ? 1 : 0.55
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      // 1) A máquina se reorganiza ao longo de TODA a cena: da desordem ao encaixe.
      slots.forEach((slot, i) => {
        const s = SCATTER[i % SCATTER.length]
        // A reorganização é lida por etapa, não como uma interpolação única:
        // cada marco encolhe o deslocamento inicial. Só translate, rotação
        // lenta e uma variação de escala mínima — nada de encaixe ou física.
        tl.set(slot, { xPercent: s.x * k, yPercent: s.y * k, rotate: s.r * k, scale: s.s }, 0)
        CLOSING.forEach((f, stage) => {
          tl.to(
            slot,
            {
              xPercent: s.x * k * f,
              yPercent: s.y * k * f,
              rotate: s.r * k * f,
              scale: 1 + (s.s - 1) * f,
              ease: 'power1.inOut',
              duration: STEP * 0.82,
            },
            stage * STEP,
          )
        })
      })

      // 2) Cada engrenagem gira no seu próprio ritmo. Sentidos opostos porque
      //    é assim que um mecanismo se lê — não há transmissão calculada por
      //    raio: nenhuma peça é escrava da outra.
      gsap.utils.toArray<HTMLElement>('[data-gear]', root).forEach((g) => {
        const spin = Number(g.dataset.spin ?? 180)
        tl.fromTo(g, { rotate: 0 }, { rotate: spin, ease: 'none', duration: 1 }, 0)
      })

      // 3) O conjunto inteiro também fecha, nos mesmos marcos: a composição
      //    final é mais compacta e centrada que a do começo.
      const RIG = [-3.5, -3, -2.1, -1.2, -0.5, 0]
      tl.set('[data-mt-rig]', { xPercent: RIG[0] * k }, 0)
      RIG.forEach((v, stage) => {
        tl.to('[data-mt-rig]', { xPercent: v * k, ease: 'power1.inOut', duration: STEP * 0.82 }, stage * STEP)
      })

      // 4) Etapas: uma de cada vez, no mesmo espaço.
      const span = 1 / STAGES.length
      panels.forEach((panel, i) => {
        const at = i * span
        tl.fromTo(
          panel,
          { opacity: 0, y: 30 * k },
          { opacity: 1, y: 0, duration: span * 0.3, ease: 'power2.out' },
          at,
        )
        if (i < STAGES.length - 1) {
          tl.to(panel, { opacity: 0, y: -26 * k, duration: span * 0.25, ease: 'power2.in' }, at + span * 0.72)
        }
        tl.to(rails[i], { opacity: 1, duration: span * 0.2 }, at)
        if (i < STAGES.length - 1) {
          tl.to(rails[i], { opacity: 0.28, duration: span * 0.2 }, at + span * 0.8)
        }
      })
    })
  })

  return (
    <section ref={root} className="relative h-[290vh] w-full md:h-[380vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <Atmosphere tone="method" grid vignette={1.0} />

        {/* ---------- mecanismo: as TRÊS engrenagens oficiais ----------
            Composição lateral de apoio, na calha esquerda — a coluna de texto
            ocupa md:w-[46%] à direita. Elas partem desencontradas e vão se
            organizando ao longo das 6 etapas: mudam de posição, giram devagar
            e se aproximam. Não há prova de física, há leitura.            */}
        <div data-mt-rig="" aria-hidden className="absolute inset-0 opacity-[0.16] md:opacity-100">
          <div
            data-mt-slot=""
            className="absolute -left-[16%] top-[22%] w-[60vw] max-w-[540px] md:left-[5%] md:top-[20%] md:w-[25vw] lg:left-[14%]"
          >
            <Gear tone="gold" spin={104} className="w-full" />
          </div>
          <div
            data-mt-slot=""
            className="absolute left-[22%] top-[56%] w-[40vw] max-w-[360px] md:left-[19%] md:top-[54%] md:w-[17vw]"
          >
            <Gear tone="silver" spin={-78} className="w-full" />
          </div>
          <div
            data-mt-slot=""
            className="absolute left-[50%] top-[30%] w-[24vw] max-w-[220px] opacity-60 md:left-[32%] md:top-[32%] md:w-[10vw]"
          >
            <Gear tone="teal" spin={52} className="w-full" />
          </div>
        </div>

        {/* ---------- etapas ---------- */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <div className="ml-auto w-full md:w-[46%]">
            <p className="rx-eyebrow text-rx-cyan-500/80">COMO FUNCIONA O RAIO X</p>
            <p className="mt-3 text-[clamp(0.9rem,1.5vw,1.05rem)] text-rx-silver/60">
              Do sintoma ao tratamento, em <strong className="text-white">6 etapas clínicas.</strong>
            </p>

            <div className="mt-8 flex gap-6 md:mt-12 md:gap-10">
              {/* trilho de progresso */}
              <ul className="hidden shrink-0 flex-col gap-3 pt-2 md:flex">
                {STAGES.map((s) => (
                  <li
                    key={s.n}
                    data-mt-rail=""
                    className="flex items-center gap-3 opacity-[0.28]"
                  >
                    <span className="h-px w-6 bg-rx-cyan-500" />
                    <span className="rx-eyebrow text-rx-silver">{s.n}</span>
                  </li>
                ))}
              </ul>

              {/* painéis — empilhados no mesmo espaço */}
              <div className="relative min-h-[58svh] flex-1 md:min-h-[52svh]">
                {STAGES.map((s, i) => (
                  <article
                    key={s.n}
                    data-mt-panel=""
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <span className="rx-display block text-[clamp(3rem,11vw,7rem)] leading-none text-white/[0.07]">
                      {s.n}
                    </span>
                    <p className="rx-eyebrow -mt-6 text-rx-silver/50 md:-mt-8">ETAPA {s.n}</p>
                    <h3 className="rx-display mt-3 text-[clamp(1.7rem,5vw,3.4rem)] rx-accent">
                      {s.name}
                    </h3>
                    <p className="rx-eyebrow mt-5 text-white">{s.headline}</p>
                    <p className="rx-body mt-4 text-rx-silver">{s.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

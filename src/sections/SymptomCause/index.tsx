'use client'

import Atmosphere from '@/components/art/Atmosphere'
import { MQ, useSection } from '@/components/motion/useSection'
import { gsap } from '@/lib/motion'

const LINHAS = [
  { sintoma: 'A equipe não entrega?', reacao: 'Você cobra mais.' },
  { sintoma: 'As metas não batem?', reacao: 'Você contrata mais.' },
  { sintoma: 'O resultado não chega?', reacao: 'Você trabalha mais.' },
]

/** Razão entre o diâmetro do vidro e a largura total do SVG do aro. */
const FRAME_RATIO = 1 / 0.5

export default function SymptomCause() {
  const root = useSection<HTMLElement>(({ root, mm }) => {
    const sceneEl = root.querySelector<HTMLElement>('[data-sc-scene]')
    if (!sceneEl) return

    // A camada revelada é uma cópia contra-transladada: precisa saber o tamanho
    // exato da cena, não 100vw (a barra de rolagem desalinharia as duas camadas).
    const sync = () => {
      const r = sceneEl.getBoundingClientRect()
      sceneEl.style.setProperty('--sw', `${r.width}px`)
      sceneEl.style.setProperty('--sh', `${r.height}px`)
    }
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(sceneEl)

    mm.add({ isDesktop: MQ.desktop, isMotion: MQ.motion }, (ctx) => {
      const { isDesktop, isMotion } = ctx.conditions as Record<string, boolean>
      const r = isDesktop ? 250 : 106
      sceneEl.style.setProperty('--lr', `${r}px`)

      if (!isMotion) {
        // Sem movimento: a lente descansa sobre a primeira linha e o texto fica legível.
        gsap.set(sceneEl, { '--lx': 0.38, '--ly': 0.52 })
        gsap.set('[data-sc-b], [data-sc-note]', { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      tl.fromTo('[data-sc-b]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.08 }, 0.04)

      // A lupa varre a composição: desce pelas linhas e sobe para a virada final.
      // A lupa varre a linha que troca. Fora dela não há nada para revelar.
      // A lente ou está CENTRADA na linha que troca, ou claramente abaixo dela.
      // Posição intermediária produz palavra híbrida ("O SINTOMASA."), então o
      // percurso estaciona no ponto de leitura e se afasta por baixo — a linha
      // fica acima do círculo, sem interseção.
      const path = isDesktop
        ? [
            { x: 0.32, y: 0.74 },
            { x: 0.19, y: 0.42 },
            { x: 0.19, y: 0.42 },
            { x: 0.34, y: 0.71 },
            { x: 0.19, y: 0.42 },
          ]
        : [
            { x: 0.56, y: 0.72 },
            { x: 0.25, y: 0.38 },
            { x: 0.25, y: 0.38 },
            { x: 0.60, y: 0.69 },
            { x: 0.25, y: 0.38 },
          ]

      gsap.set(sceneEl, { '--lx': path[0].x, '--ly': path[0].y })
      path.slice(1).forEach((p, i) => {
        tl.to(
          sceneEl,
          { '--lx': p.x, '--ly': p.y, ease: 'power2.inOut', duration: 0.14 },
          0.1 + i * 0.21,
        )
      })

      tl.fromTo('[data-sc-note]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.08 }, 0.22)
    })

    return () => ro.disconnect()
  })

  return (
    <section ref={root} className="relative h-[195vh] w-full md:h-[220vh]">
      <div
        data-sc-scene=""
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={
          {
            '--lr': '190px',
            '--lx': 0.3,
            '--ly': 0.45,
            '--sw': '100vw',
            '--sh': '100svh',
          } as React.CSSProperties
        }
      >
        <Atmosphere tone="symptom" grid vignette={1.45} />

        {/* ---------- camada SINTOMA (superfície) ---------- */}
        <div className="absolute inset-0">
          <Layer variant="sintoma" />
        </div>

        {/* ---------- camada CAUSA, revelada dentro da lente ----------
            Círculo transladado + conteúdo contra-transladado: só transform,
            sem máscara animada, sem repaint de área grande.               */}
        <div
          aria-hidden
          className="absolute left-0 top-0 overflow-hidden rounded-full will-change-transform"
          style={{
            width: 'calc(var(--lr) * 2)',
            height: 'calc(var(--lr) * 2)',
            transform:
              'translate3d(calc(var(--sw) * var(--lx) - var(--lr)), calc(var(--sh) * var(--ly) - var(--lr)), 0)',
          }}
        >
          <div
            className="absolute left-0 top-0 bg-rx-navy-950"
            style={{
              width: 'var(--sw)',
              height: 'var(--sh)',
              transform:
                'translate3d(calc(var(--lr) - var(--sw) * var(--lx)), calc(var(--lr) - var(--sh) * var(--ly)), 0)',
            }}
          >
            <div className="absolute inset-0 bg-rx-cyan-500/[0.10]" />
            <Layer variant="causa" />
          </div>
        </div>

        {/* aro da lupa, acompanhando a mesma posição */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/raiox/lens/lens-frame.svg"
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute left-0 top-0 select-none will-change-transform"
          style={{
            width: `calc(var(--lr) * 2 * ${FRAME_RATIO})`,
            transform: `translate3d(calc(var(--sw) * var(--lx) - var(--lr) * ${FRAME_RATIO}), calc(var(--sh) * var(--ly) - var(--lr) * ${FRAME_RATIO}), 0)`,
          }}
        />
      </div>
    </section>
  )
}

/**
 * As duas camadas são IDÊNTICAS, exceto pela linha que troca.
 * É isso que faz a revelação ser lida em menos de um segundo: o olho só
 * precisa registrar uma diferença, não recompor a cena inteira.
 */
function Layer({ variant }: { variant: 'sintoma' | 'causa' }) {
  const causa = variant === 'causa'

  return (
    <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-center px-5 md:px-10">
      <div className="w-full max-w-[52rem]">
        <h2 className="rx-display">
          {/* linha 1 — igual nas duas camadas */}
          <span className="block text-d4 text-rx-silver/55">VOCÊ ESTÁ TRATANDO</span>
          {/* linha 2 — a única coisa que a lente troca. Dimensionada para caber
              inteira dentro da lente, senão a leitura vira palavra híbrida. */}
          {causa ? (
            <span className="block text-[clamp(1.5rem,4.3vw,3rem)] rx-accent">NÃO A CAUSA.</span>
          ) : (
            <span className="block text-[clamp(1.5rem,4.3vw,3rem)] text-white">O SINTOMA.</span>
          )}
        </h2>

        {/* daqui para baixo, tudo igual nas duas camadas */}
        <ul data-sc-b={causa ? undefined : ''} className="mt-10 space-y-5 md:mt-14 md:space-y-7">
          {LINHAS.map((l) => (
            <li key={l.sintoma} className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="text-[clamp(0.95rem,1.7vw,1.25rem)] text-rx-silver/70">
                {l.sintoma}
              </span>
              <span className="h-4 w-px bg-rx-cyan-500/60" />
              <span className="text-[clamp(0.95rem,1.7vw,1.25rem)] font-semibold text-white">
                {l.reacao}
              </span>
            </li>
          ))}
        </ul>

        <p
          data-sc-note={causa ? undefined : ''}
          className="rx-body mt-12 max-w-[46ch] text-rx-silver md:mt-16"
        >
          E é por isso que, mesmo fazendo tudo,{' '}
          <strong className="text-white">o problema sempre volta.</strong>
        </p>
      </div>
    </div>
  )
}

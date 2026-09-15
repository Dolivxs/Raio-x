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
const FRAME_RATIO = 1 / 0.62

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
      const r = isDesktop ? 190 : 88
      sceneEl.style.setProperty('--lr', `${r}px`)

      if (!isMotion) {
        // Sem movimento: a lente descansa sobre a primeira linha e o texto fica legível.
        gsap.set(sceneEl, { '--lx': 0.38, '--ly': 0.52 })
        gsap.set('[data-sc-a], [data-sc-b], [data-sc-note]', { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
      })

      // Régua: fixa a duração da timeline em 1, para que as posições dos tweens
      // sejam lidas como fração do progresso do scroll.
      tl.to({}, { duration: 1 }, 0)

      tl.fromTo('[data-sc-a]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.1 }, 0)

      // A lupa varre a composição: desce pelas linhas e sobe para a virada final.
      const path = isDesktop
        ? [
            // O percurso fica sobre a coluna de texto (~10%-54% da largura),
            // senão em telas largas a lupa varre o vazio à direita.
            { x: 0.15, y: 0.3 },
            { x: 0.27, y: 0.52 },
            { x: 0.44, y: 0.66 },
            { x: 0.5, y: 0.44 },
            { x: 0.33, y: 0.3 },
          ]
        : [
            { x: 0.3, y: 0.26 },
            { x: 0.58, y: 0.44 },
            { x: 0.34, y: 0.62 },
            { x: 0.6, y: 0.74 },
            { x: 0.46, y: 0.36 },
          ]

      gsap.set(sceneEl, { '--lx': path[0].x, '--ly': path[0].y })
      path.slice(1).forEach((p, i) => {
        tl.to(
          sceneEl,
          { '--lx': p.x, '--ly': p.y, ease: 'power1.inOut', duration: 0.2 },
          0.08 + i * 0.2,
        )
      })

      tl.fromTo('[data-sc-b]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08 }, 0.1)
        .fromTo('[data-sc-note]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.08 }, 0.3)
    })

    return () => ro.disconnect()
  })

  return (
    <section ref={root} className="relative h-[300vh] w-full bg-rx-navy-950 md:h-[360vh]">
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
        <Atmosphere grid />

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
            <div className="absolute inset-0 bg-rx-cyan-500/[0.07]" />
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
 * As duas camadas compartilham exatamente a mesma malha. Qualquer divergência
 * de posicionamento aparece como fantasma na borda da lente.
 */
function Layer({ variant }: { variant: 'sintoma' | 'causa' }) {
  const causa = variant === 'causa'

  return (
    <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-center px-5 md:px-10">
      <div className="w-full max-w-[52rem]">
        <div className="relative">
          <h2 data-sc-a={causa ? undefined : ''} className="rx-display text-d3">
            <span className={causa ? 'text-rx-silver/45' : 'text-white'}>VOCÊ ESTÁ TRATANDO</span>
            <br />
            {causa ? (
              <span className="rx-accent">NÃO A CAUSA.</span>
            ) : (
              <span className="text-rx-silver/55">O SINTOMA.</span>
            )}
          </h2>
        </div>

        <ul data-sc-b={causa ? undefined : ''} className="mt-10 space-y-5 md:mt-14 md:space-y-7">
          {LINHAS.map((l) => (
            <li key={l.sintoma} className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="text-[clamp(0.95rem,1.7vw,1.25rem)] text-rx-silver/70">
                {l.sintoma}
              </span>
              <span className="h-4 w-px bg-rx-cyan-500/60" />
              {causa ? (
                <span className="rx-eyebrow text-rx-cyan-500">
                  O QUE ESTÁ POR BAIXO DA SUPERFÍCIE
                </span>
              ) : (
                <span className="text-[clamp(0.95rem,1.7vw,1.25rem)] font-semibold text-white">
                  {l.reacao}
                </span>
              )}
            </li>
          ))}
        </ul>

        <p
          data-sc-note={causa ? undefined : ''}
          className="rx-body mt-12 max-w-[46ch] text-rx-silver md:mt-16"
        >
          {causa ? (
            <>
              Exame sem laudo é só imagem. Aqui a gente lê o resultado juntos.{' '}
              <strong className="text-white">Causa raiz, não sintoma.</strong>
            </>
          ) : (
            <>
              E é por isso que, mesmo fazendo tudo,{' '}
              <strong className="text-white">o problema sempre volta.</strong>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

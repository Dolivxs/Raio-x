'use client'

import Atmosphere from '@/components/art/Atmosphere'
import OfficialAsset from '@/components/art/OfficialAsset'
import { MQ, useSection } from '@/components/motion/useSection'
import { ASSET, LENS } from '@/lib/assets'
import { gsap } from '@/lib/motion'

const LINHAS = [
  { sintoma: 'A equipe não entrega?', reacao: 'Você cobra mais.' },
  { sintoma: 'As metas não batem?', reacao: 'Você contrata mais.' },
  { sintoma: 'O resultado não chega?', reacao: 'Você trabalha mais.' },
]

/**
 * Conversão do raio do vidro (--lr) para a geometria do PNG oficial.
 * O centro do vidro não é o centro da imagem, então a lupa é posicionada
 * pelo seu próprio centro óptico — é isso que faz a peça parecer uma lente
 * e não um adesivo por cima do texto.
 */
const IMG_W = 1 / LENS.r // largura da imagem = IMG_W · raio
const OFF_X = LENS.cx / LENS.r // recuo horizontal até o centro do vidro
const OFF_Y = (LENS.cy * LENS.aspect) / LENS.r // recuo vertical até o centro do vidro

/** Raio do vidro em px, por viewport. A lupa cruza o conteúdo — não a viewport. */
const RADIUS = { desktop: 120, mobile: 80 } as const

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
      const r = isDesktop ? RADIUS.desktop : RADIUS.mobile
      sceneEl.style.setProperty('--lr', `${r}px`)

      // O ponto de leitura é MEDIDO na linha que troca, não chutado. É o que
      // impede a palavra híbrida ("O SINTOMASA.") quando a lente para no meio.
      // A medida é feita por Range: a linha é um bloco da largura da coluna e
      // o texto fica alinhado à esquerda dentro dele — usar a caixa do elemento
      // jogaria o vidro algumas centenas de px para a direita das palavras.
      const scene = sceneEl.getBoundingClientRect()
      const swapEl = sceneEl.querySelector<HTMLElement>('[data-sc-swap]')
      let swap: DOMRect | undefined
      if (swapEl) {
        const range = document.createRange()
        range.selectNodeContents(swapEl)
        swap = range.getBoundingClientRect()
        range.detach()
      }
      const read = swap
        ? {
            x: (swap.left + swap.width / 2 - scene.left) / scene.width,
            y: (swap.top + swap.height / 2 - scene.top) / scene.height,
          }
        : { x: 0.2, y: 0.36 }

      // Margem: o vidro inteiro precisa caber na tela nos dois eixos.
      const mx = r / scene.width + 0.015
      const my = r / scene.height + 0.015
      const clamp = (p: { x: number; y: number }) => ({
        x: gsap.utils.clamp(mx, 1 - mx, p.x),
        y: gsap.utils.clamp(my, 1 - my, p.y),
      })

      if (!isMotion) {
        const p = clamp(read)
        gsap.set(sceneEl, { '--lx': p.x, '--ly': p.y })
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

      // A lupa examina a composição: desce até a lista, volta para a linha que
      // troca, se afasta e volta. Sem zoom de câmera — só a peça se move.
      // Fora do ponto de leitura ela nunca estaciona em cima da linha pela metade.
      const away = clamp({ x: read.x + (isDesktop ? 0.16 : 0.22), y: read.y + 0.3 })
      const path = [away, clamp(read), clamp(read), away, clamp(read)]

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
            '--lr': `${RADIUS.desktop}px`,
            '--lx': 0.3,
            '--ly': 0.42,
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

        {/* ---------- camada CAUSA, revelada dentro do vidro ----------
            Círculo transladado + conteúdo contra-transladado: só transform,
            sem máscara animada, sem repaint de área grande. Fica ABAIXO da
            lupa — o vidro do PNG oficial é translúcido, então a revelação
            aparece através dele, com o aro e os reflexos por cima.        */}
        <div
          aria-hidden
          className="absolute left-0 top-0 z-20 overflow-hidden rounded-full will-change-transform"
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

        {/* LUPA OFICIAL — posicionada pelo centro do vidro, não pelo centro
            da imagem. Só translate: escala e proporção da peça intactas. */}
        <OfficialAsset
          src={ASSET.magnifier}
          className="absolute left-0 top-0 z-30 max-w-none will-change-transform"
          style={{
            width: `calc(var(--lr) * ${IMG_W})`,
            transform:
              `translate3d(calc(var(--sw) * var(--lx) - var(--lr) * ${OFF_X}),` +
              ` calc(var(--sh) * var(--ly) - var(--lr) * ${OFF_Y}), 0)`,
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
      {/* A coluna examinada é recuada no desktop: a lupa precisa de espaço à
          esquerda da linha que troca para caber inteira, com aro e tudo. */}
      <div className="w-full max-w-[52rem] md:ml-[5rem] lg:ml-[9rem]">
        <h2 className="rx-display">
          {/* linha 1 — igual nas duas camadas */}
          <span className="block text-d4 text-rx-silver/55">VOCÊ ESTÁ TRATANDO</span>
          {/* linha 2 — a única coisa que a lente troca. Dimensionada para caber
              inteira dentro do vidro, senão a leitura vira palavra híbrida. */}
          {causa ? (
            <span className="block text-[clamp(1.1rem,2.05vw,1.7rem)] rx-accent">NÃO A CAUSA.</span>
          ) : (
            <span
              data-sc-swap=""
              className="block text-[clamp(1.1rem,2.05vw,1.7rem)] text-white"
            >
              O SINTOMA.
            </span>
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

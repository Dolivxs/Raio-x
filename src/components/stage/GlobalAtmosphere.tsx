'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SEC, type SecKey } from '@/lib/stage'

/**
 * Background global e contínuo.
 *
 * Antes cada seção tinha a própria <Atmosphere>, e a troca aparecia como corte.
 * Agora todas as atmosferas existem numa única camada fixa e fazem crossfade
 * por opacidade, ancoradas nas seções reais — nunca há hard cut.
 */

const GROUND: Record<SecKey, string> = {
  hero: 'linear-gradient(180deg, #050D18 0%, #08131f 58%, #050D18 100%)',
  overwork: 'linear-gradient(180deg, #050D18 0%, #07121e 50%, #040A13 100%)',
  blockage: 'linear-gradient(180deg, #040A13 0%, #060F1A 60%, #030810 100%)',
  attempts: 'linear-gradient(180deg, #030810 0%, #050D18 50%, #030810 100%)',
  diagnosis: 'linear-gradient(180deg, #030810 0%, #071523 62%, #0A1E30 100%)',
  symptom: 'linear-gradient(180deg, #0A1E30 0%, #050D18 40%, #03080F 100%)',
  product: 'linear-gradient(180deg, #03080F 0%, #0A1A2C 46%, #071320 100%)',
  method: 'linear-gradient(180deg, #071320 0%, #050D18 52%, #061019 100%)',
  reveal: 'linear-gradient(180deg, #061019 0%, #08141f 54%, #040B14 100%)',
  audience: 'linear-gradient(180deg, #040B14 0%, #061019 50%, #050D18 100%)',
  cost: 'linear-gradient(180deg, #050D18 0%, #02060C 52%, #03080F 100%)',
  final: 'linear-gradient(180deg, #03080F 0%, #071523 62%, #0A1E30 100%)',
}

const LIGHT: Record<SecKey, string> = {
  hero: 'radial-gradient(72% 58% at 78% 12%, rgba(16,192,224,0.17), transparent 64%), radial-gradient(90% 70% at 12% 88%, rgba(16,85,127,0.20), transparent 62%)',
  overwork: 'radial-gradient(64% 74% at 12% 46%, rgba(127,219,255,0.15), transparent 62%), radial-gradient(70% 50% at 88% 84%, rgba(16,85,127,0.14), transparent 66%)',
  blockage: 'radial-gradient(58% 48% at 84% 78%, rgba(16,85,127,0.24), transparent 64%), radial-gradient(50% 40% at 8% 6%, rgba(16,192,224,0.08), transparent 70%)',
  attempts: 'radial-gradient(90% 62% at 50% 42%, rgba(16,85,127,0.13), transparent 72%)',
  diagnosis: 'radial-gradient(76% 60% at 32% 96%, rgba(16,192,224,0.24), transparent 62%), radial-gradient(60% 50% at 88% 10%, rgba(16,85,127,0.20), transparent 66%)',
  symptom: 'radial-gradient(50% 44% at 34% 50%, rgba(127,219,255,0.14), transparent 68%)',
  product: 'radial-gradient(85% 65% at 50% 30%, rgba(16,192,224,0.15), transparent 68%), radial-gradient(70% 60% at 50% 100%, rgba(16,85,127,0.16), transparent 62%)',
  method: 'radial-gradient(62% 78% at 18% 40%, rgba(127,219,255,0.13), transparent 64%), radial-gradient(46% 44% at 92% 88%, rgba(16,85,127,0.16), transparent 68%)',
  reveal: 'radial-gradient(64% 58% at 88% 26%, rgba(16,192,224,0.18), transparent 64%), radial-gradient(60% 60% at 6% 82%, rgba(16,85,127,0.14), transparent 68%)',
  audience: 'radial-gradient(46% 70% at 16% 46%, rgba(16,192,224,0.13), transparent 66%), radial-gradient(46% 70% at 86% 58%, rgba(10,26,44,0.9), transparent 62%)',
  cost: 'radial-gradient(60% 48% at 74% 18%, rgba(16,85,127,0.14), transparent 70%)',
  final: 'radial-gradient(70% 56% at 50% 104%, rgba(16,192,224,0.20), transparent 62%), radial-gradient(80% 50% at 50% -6%, rgba(16,85,127,0.16), transparent 64%)',
}

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")"

const KEYS = Object.keys(SEC) as SecKey[]

export default function GlobalAtmosphere() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      const layers = KEYS.map((k) => el.querySelector<HTMLElement>(`[data-tone="${k}"]`))

      /**
       * Só as camadas vizinhas ficam pintando. Manter as 12 sempre no fluxo de
       * composição custava ~30ms por quadro de scroll em 1920; escondendo as
       * distantes o custo vira zero e o crossfade continua idêntico.
       */
      const janela = (i: number) =>
        layers.forEach((l, j) => {
          if (l) l.style.display = Math.abs(j - i) <= 1 ? 'block' : 'none'
        })
      janela(0)

      KEYS.forEach((key, i) => {
        const sec = document.getElementById(SEC[key])
        if (!sec || i === 0) return
        const prev = layers[i - 1]
        const cur = layers[i]
        if (!prev || !cur) return
        // O crossfade acontece ENQUANTO a seção sobe — o clima da próxima cena
        // já começa antes da anterior sair. Nunca há troca instantânea.
        const st = {
          trigger: sec,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
          onEnter: () => janela(i),
          onEnterBack: () => janela(i),
          onLeaveBack: () => janela(i - 1),
        }
        gsap.fromTo(cur, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: st })
        gsap.fromTo(prev, { opacity: 1 }, { opacity: 0, ease: 'none', immediateRender: false, scrollTrigger: { ...st, onEnter: undefined, onEnterBack: undefined, onLeaveBack: undefined } })
      })
      ScrollTrigger.refresh()
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {KEYS.map((k, i) => (
        <div
          key={k}
          data-tone={k}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, background: `${LIGHT[k]}, ${GROUND[k]}` }}
        />
      ))}

      {/* malha técnica e vinheta: constantes, para não marcar troca de cena */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(198,206,216,0.08) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(198,206,216,0.08) 1px, transparent 1px)',
          backgroundSize: '104px 104px',
          maskImage: 'radial-gradient(68% 58% at 50% 45%, #000 18%, transparent 76%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(126% 92% at 50% 44%, transparent 34%, rgba(3,8,15,0.68) 100%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
      />
    </div>
  )
}

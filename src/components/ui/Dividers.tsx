/**
 * Separadores recorrentes do LP-RX.pdf.
 *
 * Chevron: hairline de ponta a ponta com um recorte central em forma de aba
 * apontando para baixo, com uma seta dentro. Aparece entre quase todos os
 * blocos do PDF.
 */
export function Chevron({
  tone = 'cyan',
  className = '',
}: {
  tone?: 'cyan' | 'gold'
  className?: string
}) {
  const line = tone === 'cyan' ? 'rgba(25,219,252,0.75)' : 'rgba(199,163,113,0.8)'
  const arrow = tone === 'cyan' ? '#19dbfc' : '#c7a371'

  return (
    <div className={`relative z-10 h-0 w-full ${className}`} aria-hidden="true">
      <div
        className="absolute inset-x-0 -top-px h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${line} 12%, ${line} 88%, transparent)` }}
      />
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <svg width="112" height="44" viewBox="0 0 112 44" fill="none">
          <path
            d="M0 0h34c8 0 12 4 15 9l4 7c1.6 3 5.4 3 7 0l4-7c3-5 7-9 15-9h33"
            stroke={line}
            strokeWidth="1.5"
            fill="none"
            transform="translate(0 -1)"
          />
          <path d="M45 13l11 11 11-11" stroke={arrow} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </div>
  )
}

/** Barra ciano curta e brilhante que o PDF usa como respiro entre blocos. */
export function CyanBar({ className = '' }: { className?: string }) {
  return (
    <div className={`mx-auto h-[3px] w-[200px] rounded-full bar-cyan ${className}`} aria-hidden="true" />
  )
}

/** Risco ciano fino sob os títulos centralizados. */
export function TitleRule({ className = '' }: { className?: string }) {
  return <div className={`h-[3px] rounded-full bar-cyan ${className}`} aria-hidden="true" />
}

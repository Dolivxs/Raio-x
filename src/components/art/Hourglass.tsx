type Props = { className?: string } & React.SVGProps<SVGSVGElement>

/**
 * Ampulheta em SVG inline — precisa ser inline porque a areia é animada
 * por transform (scaleY com origem no gargalo), não por atributo.
 *
 * Hooks para o GSAP: [data-sand-top], [data-sand-bottom], [data-sand-stream].
 * Substituir por render final quando o asset existir: public/raiox/hourglass/.
 */
export default function Hourglass({ className = '', ...rest }: Props) {
  return (
    <svg viewBox="0 0 400 640" className={className} fill="none" aria-hidden focusable="false" {...rest}>
      <defs>
        <linearGradient id="hgMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EEF3F8" />
          <stop offset="30%" stopColor="#A9B6C4" />
          <stop offset="58%" stopColor="#4E6076" />
          <stop offset="100%" stopColor="#C6CED8" />
        </linearGradient>
        <linearGradient id="hgFrame" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#20374F" />
          <stop offset="50%" stopColor="#102040" />
          <stop offset="100%" stopColor="#0A1A2C" />
        </linearGradient>
        <linearGradient id="hgGold" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#F2DFA0" />
          <stop offset="45%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8A6E15" />
        </linearGradient>
        <linearGradient id="hgGlass" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#7FDBFF" stopOpacity="0.16" />
          <stop offset="45%" stopColor="#10C0E0" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="hgSand" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#DCE6EF" />
          <stop offset="48%" stopColor="#AEBCCB" />
          <stop offset="100%" stopColor="#75879B" />
        </linearGradient>

        <clipPath id="hgClipTop">
          <path d="M96 92 H304 C304 168 250 262 208 306 H192 C150 262 96 168 96 92 Z" />
        </clipPath>
        <clipPath id="hgClipBottom">
          <path d="M192 334 H208 C250 378 304 472 304 548 H96 C96 472 150 378 192 334 Z" />
        </clipPath>
      </defs>

      {/* vidro */}
      <path
        d="M96 92 H304 C304 168 250 262 208 306 H192 C150 262 96 168 96 92 Z"
        fill="url(#hgGlass)"
      />
      <path
        d="M192 334 H208 C250 378 304 472 304 548 H96 C96 472 150 378 192 334 Z"
        fill="url(#hgGlass)"
      />

      {/* areia — transform-box/origin deixam o scaleY ancorado no gargalo */}
      <g clipPath="url(#hgClipTop)">
        <rect
          data-sand-top
          x="90"
          y="88"
          width="220"
          height="222"
          fill="url(#hgSand)"
          style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
        />
      </g>
      <g clipPath="url(#hgClipBottom)">
        <rect
          data-sand-bottom
          x="90"
          y="330"
          width="220"
          height="222"
          fill="url(#hgSand)"
          style={{ transformBox: 'fill-box', transformOrigin: 'bottom center', transform: 'scaleY(0)' }}
        />
      </g>

      {/* filete de areia caindo */}
      <rect
        data-sand-stream
        x="197.5"
        y="300"
        width="5"
        height="44"
        fill="url(#hgSand)"
        opacity="0"
      />

      {/* contorno do vidro por cima da areia */}
      <path
        d="M96 92 H304 C304 168 250 262 208 306 H192 C150 262 96 168 96 92 Z"
        fill="none"
        stroke="url(#hgMetal)"
        strokeWidth="3.5"
        opacity="0.65"
      />
      <path
        d="M192 334 H208 C250 378 304 472 304 548 H96 C96 472 150 378 192 334 Z"
        fill="none"
        stroke="url(#hgMetal)"
        strokeWidth="3.5"
        opacity="0.65"
      />

      {/* estrutura */}
      <rect x="52" y="40" width="296" height="34" rx="12" fill="url(#hgFrame)" stroke="url(#hgMetal)" strokeWidth="2.5" />
      <rect x="52" y="566" width="296" height="34" rx="12" fill="url(#hgFrame)" stroke="url(#hgMetal)" strokeWidth="2.5" />
      <rect x="40" y="26" width="320" height="18" rx="9" fill="url(#hgFrame)" stroke="url(#hgGold)" strokeWidth="2" />
      <rect x="40" y="596" width="320" height="18" rx="9" fill="url(#hgFrame)" stroke="url(#hgGold)" strokeWidth="2" />
      <rect x="62" y="60" width="16" height="524" rx="8" fill="url(#hgFrame)" stroke="url(#hgMetal)" strokeWidth="2" />
      <rect x="322" y="60" width="16" height="524" rx="8" fill="url(#hgFrame)" stroke="url(#hgMetal)" strokeWidth="2" />
      <circle cx="70" cy="320" r="13" fill="url(#hgGold)" />
      <circle cx="330" cy="320" r="13" fill="url(#hgGold)" />
      <rect x="180" y="304" width="40" height="32" rx="6" fill="url(#hgGold)" opacity="0.92" />
    </svg>
  )
}

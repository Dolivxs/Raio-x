type Props = {
  className?: string
  /** Curva da corda. Padrão: fio condutor diagonal descendente. */
  d?: string
  tone?: 'gold' | 'silver'
} & React.SVGProps<SVGSVGElement>

/**
 * Corda — fio visual condutor que reaparece entre as seções.
 * Inline porque o traço é desenhado por strokeDashoffset guiado pelo scroll.
 * Hook para o GSAP: [data-rope-path].
 */
export default function Rope({
  className = '',
  d = 'M -40 40 C 220 130, 360 -30, 640 120 S 1040 320, 1340 210',
  tone = 'gold',
  ...rest
}: Props) {
  const stroke = tone === 'gold' ? '#C9A227' : '#8C9AAB'
  return (
    <svg
      viewBox="0 0 1300 340"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {/* alma escura, dá espessura sem custo de filtro */}
      <path d={d} pathLength={1} stroke="#050D18" strokeWidth="11" strokeLinecap="round" opacity="0.75" />
      <path
        data-rope-path
        d={d}
        pathLength={1}
        stroke={stroke}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      {/* fiapos: tracejado curto por cima sugere torção */}
      <path
        data-rope-path
        d={d}
        pathLength={1}
        stroke="#F2DFA0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0.006 0.012"
        strokeDashoffset="1"
        opacity="0.5"
      />
    </svg>
  )
}

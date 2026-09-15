type Props = { className?: string } & React.SVGProps<SVGSVGElement>

const CRACKS = [
  'M300 20 L286 118 L318 196 L296 300',
  'M286 118 L196 148 L118 118',
  'M318 196 L410 208 L486 166',
  'M296 300 L232 372 L246 470',
  'M296 300 L378 344 L438 438',
  'M196 148 L150 236 L176 316',
  'M410 208 L452 286 L430 356',
]

/**
 * Fratura silenciosa — traços propagados por strokeDashoffset no scroll.
 * Hook para o GSAP: [data-crack].
 */
export default function Fracture({ className = '', ...rest }: Props) {
  return (
    <svg viewBox="0 0 600 500" className={className} fill="none" aria-hidden focusable="false" {...rest}>
      {CRACKS.map((d, i) => (
        <g key={i}>
          <path
            data-crack
            d={d}
            pathLength={1}
            stroke="#7FDBFF"
            strokeWidth={i === 0 ? 2.6 : 1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1"
            strokeDashoffset="1"
            opacity={i === 0 ? 0.85 : 0.5}
          />
        </g>
      ))}
    </svg>
  )
}

type Props = { size?: 'sm' | 'lg' | 'xl'; align?: 'center' | 'left'; className?: string }

const SIZES = {
  sm: { main: 'text-lg md:text-xl', sub: 'text-[0.5rem] md:text-[0.55rem]' },
  lg: { main: 'text-[clamp(3rem,12vw,9rem)]', sub: 'text-[clamp(0.6rem,1.5vw,1.1rem)]' },
  xl: { main: 'text-[clamp(3.5rem,14vw,11rem)]', sub: 'text-[clamp(0.65rem,1.7vw,1.25rem)]' },
} as const

/** Marca oficial: RAIO em metal, X em ciano, EMPRESARIAL espaçado abaixo. */
export default function Wordmark({ size = 'lg', align = 'center', className = '' }: Props) {
  const s = SIZES[size]
  const box = align === 'left' ? 'items-start' : 'items-center'
  return (
    <span className={`inline-flex flex-col leading-none ${box} ${className}`}>
      <span className={`rx-display ${s.main}`}>
        <span className="rx-metal">RAIO</span>
        <span className="rx-accent">X</span>
      </span>
      <span
        className={`rx-eyebrow mt-[0.35em] text-rx-silver/75 ${s.sub}`}
        style={{ letterSpacing: '0.52em', textIndent: '0.52em' }}
      >
        EMPRESARIAL
      </span>
    </span>
  )
}

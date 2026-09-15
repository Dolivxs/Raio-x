type Variant = 'primary' | 'secondary' | 'small' | 'ghost'

type Props = {
  variant?: Variant
  className?: string
  /** Graus de rotação por progresso completo da cena. Lido pelas timelines. */
  spin?: number
} & React.ImgHTMLAttributes<HTMLImageElement>

const SRC: Record<Variant, string> = {
  primary: '/raiox/gears/gear-primary.svg',
  secondary: '/raiox/gears/gear-secondary.svg',
  small: '/raiox/gears/gear-small.svg',
  ghost: '/raiox/gears/gear-ghost.svg',
}

/** Engrenagem. Gira APENAS por scroll — nunca em loop automático. */
export default function Gear({ variant = 'primary', className = '', spin = 180, ...rest }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SRC[variant]}
      alt=""
      aria-hidden
      draggable={false}
      data-gear=""
      data-spin={spin}
      loading="lazy"
      decoding="async"
      className={`pointer-events-none select-none ${className}`}
      {...rest}
    />
  )
}

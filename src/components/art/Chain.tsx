type Props = {
  className?: string
  /**
   * `strand` — fita repetida, para correntes de plano médio/fundo.
   * `heavy`  — 4 elos gigantes, para foreground muito próximo da câmera.
   */
  variant?: 'strand' | 'heavy'
} & React.HTMLAttributes<HTMLDivElement>

const SRC = {
  strand: '/raiox/chains/chain-strand.svg',
  heavy: '/raiox/chains/chain-heavy.svg',
} as const

/** Corrente — bloqueio. Animada só por transform. */
export default function Chain({ className = '', variant = 'strand', style, ...rest }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none bg-repeat-y ${className}`}
      style={{
        backgroundImage: `url(${SRC[variant]})`,
        backgroundSize: '100% auto',
        ...style,
      }}
      {...rest}
    />
  )
}

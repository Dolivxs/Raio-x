type Props = { className?: string } & React.HTMLAttributes<HTMLDivElement>

/**
 * Corrente — bloqueio. Fita vertical repetida por background-repeat, para que
 * o comprimento seja livre e a animação continue sendo apenas transform.
 */
export default function Chain({ className = '', style, ...rest }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none bg-repeat-y ${className}`}
      style={{
        backgroundImage: 'url(/raiox/chains/chain-strand.svg)',
        backgroundSize: '100% auto',
        ...style,
      }}
      {...rest}
    />
  )
}

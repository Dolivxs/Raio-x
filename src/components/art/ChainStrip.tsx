type Props = {
  segments?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Corrente oficial, fatiada.
 *
 * NÃO redesenha nada: cada segmento é uma janela sobre o MESMO PNG
 * (/raiox/chains/chain-gold.png), posicionado por background-position.
 * Fatiar é o que permite curvar, tensionar e propagar uma onda ao longo dela —
 * uma imagem inteira só poderia ser transladada em bloco.
 *
 * Hook do GSAP: [data-chain-seg] (um por fatia, em ordem).
 */
export default function ChainStrip({ segments = 18, className = '', style }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none flex select-none ${className}`}
      style={style}
    >
      {Array.from({ length: segments }, (_, i) => (
        <span
          key={i}
          data-chain-seg=""
          data-seg={i}
          className="block h-full shrink-0 will-change-transform"
          style={{
            // +0.35% de sobreposição esconde a emenda quando as fatias deslocam
            width: `calc(${100 / segments}% + 0.35%)`,
            marginRight: '-0.35%',
            backgroundImage: 'url(/raiox/chains/chain-gold.png)',
            backgroundSize: `${segments * 100}% 100%`,
            backgroundPosition: `${(i / (segments - 1)) * 100}% 50%`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
    </div>
  )
}

type Props = {
  src: string
  className?: string
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>

/**
 * Invólucro fino para um asset oficial.
 *
 * Regra: a peça entra na tela exatamente como foi entregue. O componente não
 * aplica filter, glow, mix-blend nem tint — profundidade e clima se resolvem
 * na composição em volta (escala, posição, opacidade e a Atmosphere da cena).
 */
export default function OfficialAsset({ src, className = '', ...rest }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      loading="lazy"
      decoding="async"
      className={`pointer-events-none select-none ${className}`}
      {...rest}
    />
  )
}

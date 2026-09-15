type Props = {
  /** Caminho em /raiox/… — SEMPRE o arquivo oficial, nunca uma variante. */
  src: string
  className?: string
} & React.ImgHTMLAttributes<HTMLImageElement>

/**
 * Asset oficial do projeto.
 *
 * Regra: a imagem nunca é reestilizada. Sem filter, sem glow, sem mix-blend,
 * sem tint. Só transform e opacity — que é o que o GSAP anima.
 * Qualquer iluminação vem da composição ao redor, nunca do próprio asset.
 */
export default function OfficialAsset({ src, className = '', ...rest }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      decoding="async"
      className={`pointer-events-none max-w-none select-none ${className}`}
      {...rest}
    />
  )
}

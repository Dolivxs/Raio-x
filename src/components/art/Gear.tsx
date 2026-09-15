import { ASSET, type GearTone } from '@/lib/assets'
import OfficialAsset from './OfficialAsset'

type Props = {
  tone?: GearTone
  className?: string
  /** Graus de rotação por progresso completo da cena. Lido pelas timelines. */
  spin?: number
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>

/**
 * Engrenagem oficial. Gira APENAS por scroll — nunca em loop automático e
 * nunca transmitindo movimento por raio para outra peça: cada uma gira no seu
 * próprio ritmo, devagar. O PNG é quadrado e centrado, então a rotação
 * acontece em torno do centro natural da peça.
 */
export default function Gear({ tone = 'gold', className = '', spin = 90, ...rest }: Props) {
  return (
    <OfficialAsset
      src={ASSET.gear[tone]}
      data-gear=""
      data-spin={spin}
      className={className}
      {...rest}
    />
  )
}

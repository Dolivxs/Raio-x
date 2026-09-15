import { ASSET } from '@/lib/assets'
import OfficialAsset from './OfficialAsset'

type Props = {
  className?: string
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>

/**
 * Corrente oficial — o arquivo inteiro, sempre.
 *
 * Não é tile, não é sprite, não é segmentada: repetir ou recortar o PNG
 * quebraria os elos. Ela entra na cena grande e cortada pela borda, e se move
 * só por translate / rotate.
 */
export default function Chain({ className = '', ...rest }: Props) {
  return <OfficialAsset src={ASSET.chain} className={className} {...rest} />
}

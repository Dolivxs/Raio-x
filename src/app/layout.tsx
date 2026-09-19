import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import CampaignCapture from '@/components/CampaignCapture'
import '@/styles/globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = 'https://raio-x.online'
const TITLE = 'Raio X Empresarial | 68 dias de direção'
const DESCRIPTION =
  'Uma imersão presencial de um dia para identificar o gargalo real da sua empresa e definir a estratégia para os últimos 68 dias de 2026.'

/**
 * Imagem social 1200x630. Enquanto o arquivo oficial não for entregue isto
 * fica null e o metadata simplesmente não declara og:image — melhor ausente
 * do que apontando para um 404. Para ativar: coloque o arquivo em
 * public/og/raiox-og.jpg e troque para '/og/raiox-og.jpg'.
 */
const OG_IMAGE: string | null = null

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Raio X Empresarial',
    title: TITLE,
    description: DESCRIPTION,
    ...(OG_IMAGE
      ? { images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }] }
      : {}),
  },
  twitter: {
    card: OG_IMAGE ? 'summary_large_image' : 'summary',
    title: TITLE,
    description: DESCRIPTION,
    ...(OG_IMAGE ? { images: [OG_IMAGE] } : {}),
  },
}

export const viewport: Viewport = {
  themeColor: '#050D18',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <CampaignCapture />
        {children}
      </body>
    </html>
  )
}

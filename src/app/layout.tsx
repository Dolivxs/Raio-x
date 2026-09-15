import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'RAIO X EMPRESARIAL — o diagnóstico real do seu negócio',
  description:
    'A imersão presencial de 1 dia que revela, com diagnóstico real, o que está travando o crescimento do seu negócio. Tem exame. Tem laudo. Tem prescrição.',
}

export const viewport: Viewport = {
  themeColor: '#050D18',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}

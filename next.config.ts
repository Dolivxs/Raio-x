import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * www -> raiz, permanente. A condição casa apenas com o host www, e o
   * destino é o apex, então não há como fechar ciclo.
   *
   * ATENÇÃO: se na Vercel o domínio primário for configurado como
   * www.raio-x.online (redirecionando o apex para o www), aí sim haveria
   * loop. Na Vercel o primário precisa ser raio-x.online.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.raio-x.online' }],
        destination: 'https://raio-x.online/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

/**
 * Camada atmosférica. Cada cena tem uma iluminação própria dentro da MESMA
 * paleta — é o que impede que as seções pareçam a mesma tela repetida.
 * Tudo gradiente estático: nenhum filter animado.
 */
export type Tone =
  | 'hero'
  | 'overwork'
  | 'blockage'
  | 'attempts'
  | 'diagnosis'
  | 'symptom'
  | 'product'
  | 'method'
  | 'reveal'
  | 'audience'
  | 'cost'
  | 'final'

type Props = {
  tone: Tone
  className?: string
  grid?: boolean
  /** Vinheta: 0 desliga, 1 é a padrão, valores maiores fecham mais a cena. */
  vignette?: number
}

/** Luz localizada de cada cena. Sempre navy + ciano; nunca cor nova. */
const LIGHT: Record<Tone, string> = {
  // luz fria alta à direita, atrás do mecanismo
  hero: 'radial-gradient(72% 58% at 78% 12%, rgba(16,192,224,0.17), transparent 64%), radial-gradient(90% 70% at 12% 88%, rgba(16,85,127,0.20), transparent 62%)',
  // luz lateral esquerda: o objeto está lá
  overwork: 'radial-gradient(64% 74% at 12% 46%, rgba(127,219,255,0.15), transparent 62%), radial-gradient(70% 50% at 88% 84%, rgba(16,85,127,0.14), transparent 66%)',
  // cena mais fechada e baixa — pressão
  blockage: 'radial-gradient(58% 48% at 84% 78%, rgba(16,85,127,0.24), transparent 64%), radial-gradient(50% 40% at 8% 6%, rgba(16,192,224,0.08), transparent 70%)',
  // quase sem luz: as palavras é que carregam
  attempts: 'radial-gradient(90% 62% at 50% 42%, rgba(16,85,127,0.13), transparent 72%)',
  // a virada: ciano subindo do rodapé
  diagnosis: 'radial-gradient(76% 60% at 32% 96%, rgba(16,192,224,0.24), transparent 62%), radial-gradient(60% 50% at 88% 10%, rgba(16,85,127,0.20), transparent 66%)',
  // poça de luz central, resto no escuro — foco de exame
  symptom: 'radial-gradient(50% 44% at 34% 50%, rgba(127,219,255,0.14), transparent 68%)',
  // cena mais aberta e clara: é a apresentação do produto
  product: 'radial-gradient(85% 65% at 50% 30%, rgba(16,192,224,0.15), transparent 68%), radial-gradient(70% 60% at 50% 100%, rgba(16,85,127,0.16), transparent 62%)',
  // luz sobre o mecanismo, à esquerda
  method: 'radial-gradient(62% 78% at 18% 40%, rgba(127,219,255,0.13), transparent 64%), radial-gradient(46% 44% at 92% 88%, rgba(16,85,127,0.16), transparent 68%)',
  // luz vindo da direita, onde a fratura se propaga
  reveal: 'radial-gradient(64% 58% at 88% 26%, rgba(16,192,224,0.18), transparent 64%), radial-gradient(60% 60% at 6% 82%, rgba(16,85,127,0.14), transparent 68%)',
  // dividida: um lado respira, o outro não
  audience: 'radial-gradient(46% 70% at 16% 46%, rgba(16,192,224,0.13), transparent 66%), radial-gradient(46% 70% at 86% 58%, rgba(10,26,44,0.9), transparent 62%)',
  // a mais escura da landing — espaço negativo é o assunto
  cost: 'radial-gradient(60% 48% at 74% 18%, rgba(16,85,127,0.14), transparent 70%)',
  // luz subindo do rodapé, a decisão
  final: 'radial-gradient(70% 56% at 50% 104%, rgba(16,192,224,0.20), transparent 62%), radial-gradient(80% 50% at 50% -6%, rgba(16,85,127,0.16), transparent 64%)',
}

/** Profundidade do fundo: cada cena assenta num navy ligeiramente diferente. */
const GROUND: Record<Tone, string> = {
  hero: 'linear-gradient(180deg, #050D18 0%, #08131f 58%, #050D18 100%)',
  overwork: 'linear-gradient(180deg, #050D18 0%, #07121e 50%, #040A13 100%)',
  blockage: 'linear-gradient(180deg, #040A13 0%, #060F1A 60%, #030810 100%)',
  attempts: 'linear-gradient(180deg, #030810 0%, #050D18 50%, #030810 100%)',
  diagnosis: 'linear-gradient(180deg, #030810 0%, #071523 62%, #0A1E30 100%)',
  symptom: 'linear-gradient(180deg, #0A1E30 0%, #050D18 40%, #03080F 100%)',
  product: 'linear-gradient(180deg, #03080F 0%, #0A1A2C 46%, #071320 100%)',
  method: 'linear-gradient(180deg, #071320 0%, #050D18 52%, #061019 100%)',
  reveal: 'linear-gradient(180deg, #061019 0%, #08141f 54%, #040B14 100%)',
  audience: 'linear-gradient(180deg, #040B14 0%, #061019 50%, #050D18 100%)',
  cost: 'linear-gradient(180deg, #050D18 0%, #02060C 52%, #03080F 100%)',
  final: 'linear-gradient(180deg, #03080F 0%, #071523 62%, #0A1E30 100%)',
}

/** Ruído fino: existe para matar o banding dos gradientes, não como textura. */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")"

export default function Atmosphere({ tone, className = '', grid = false, vignette = 1 }: Props) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: GROUND[tone] }} />
      <div className="absolute inset-0" style={{ background: LIGHT[tone] }} />

      {grid && (
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(198,206,216,0.08) 1px, transparent 1px),' +
              'linear-gradient(to bottom, rgba(198,206,216,0.08) 1px, transparent 1px)',
            backgroundSize: '104px 104px',
            maskImage: 'radial-gradient(68% 58% at 50% 45%, #000 18%, transparent 76%)',
          }}
        />
      )}

      {vignette > 0 && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(128% 92% at 50% 44%, transparent ${38 - vignette * 6}%, rgba(3,8,15,${Math.min(
              0.92,
              0.62 * vignette,
            )}) 100%)`,
          }}
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
      />
    </div>
  )
}

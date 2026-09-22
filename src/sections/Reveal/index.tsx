import { CyanBar } from '@/components/ui/Dividers'

const ITEMS = [
  {
    title: 'Diagnóstico empresarial completo',
    body: 'Clareza sobre o que realmente está limitando o resultado.',
  },
  {
    title: 'Mapa dos principais gargalos',
    body: 'Identificação dos pontos que mais consomem tempo, energia ou recurso sem avanço proporcional.',
  },
  {
    title: 'Definição de prioridades',
    body: 'O que precisa ser atacado agora e o que pode esperar.',
  },
  {
    title: 'Plano estratégico de 68 dias',
    body: 'Direção clara para conduzir a empresa até o encerramento de 2026.',
  },
  {
    title: 'Prescrição de execução',
    body: 'Ações objetivas para transformar o diagnóstico em movimento.',
  },
]

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-[3px] size-[19px] shrink-0" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#19dbfc" strokeWidth="1.4" />
      <path d="M7.6 12.2l3 3 5.8-6" stroke="#19dbfc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Duas colunas: headline gigante à esquerda, lista com checks à direita. */
export default function Reveal() {
  return (
    <section className="relative bg-dark">
      <div className="mx-auto max-w-[1140px] px-6 pb-20 pt-20 md:pb-24 md:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <h2 className="t-light text-[clamp(2.1rem,5vw,3.9rem)] leading-[1.06]">
            <span className="text-white">O que o </span>
            <span className="t-heavy whitespace-nowrap uppercase text-cy-500">Raio X</span>
            <span className="text-white"> vai revelar sobre </span>
            <span className="t-heavy text-cy-500">o seu negócio</span>
          </h2>

          <ul className="lg:pt-3">
            {ITEMS.map((item, i) => (
              <li
                key={item.title}
                className={`flex gap-4 py-6 ${i === 0 ? 'border-t border-white/12' : ''} border-b border-white/12`}
              >
                <Check />
                <div>
                  <p className="t-bold text-[15px] uppercase tracking-[0.04em] text-cy-500">
                    {item.title}
                  </p>
                  <p className="t-body mt-1.5 text-[15px] text-silver">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <CyanBar className="mt-20" />
      </div>
    </section>
  )
}

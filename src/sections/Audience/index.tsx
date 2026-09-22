import { CyanBar } from '@/components/ui/Dividers'

const YES = [
  'Sua empresa está rodando, mas você sabe que ela pode entregar mais.',
  'Você trabalha muito e ainda não enxerga com clareza o principal gargalo.',
  'Existem várias frentes abertas e pouca definição de prioridade.',
  'Você não quer chegar ao fim de 2026 percebendo que atacou o problema errado.',
  'Você quer entrar nos últimos 68 dias com uma direção clara.',
]

const NO = [
  'Você procura apenas motivação ou conteúdo genérico.',
  'Não pretende rever prioridades.',
  'Não está disposto a olhar para os problemas reais do negócio.',
  'Não pretende executar aquilo que for diagnosticado.',
]

function Mark({ kind }: { kind: 'ok' | 'no' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="pointer-events-none absolute -bottom-4 -right-3 size-[120px] text-black/22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.2" />
      {kind === 'ok' ? (
        <path d="M7 12.4l3.3 3.3L17 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M8.4 8.4l7.2 7.2M15.6 8.4l-7.2 7.2" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  )
}

function Panel({
  kind,
  items,
}: {
  kind: 'ok' | 'no'
  items: readonly string[]
}) {
  const skin =
    kind === 'ok'
      ? 'bg-gradient-to-br from-[#044b1f] via-[#066228] to-[#0a7a31]'
      : 'bg-gradient-to-br from-[#b32535] via-[#9a2337] to-[#872a42]'

  return (
    <div className={`relative flex-1 overflow-hidden rounded-[18px] px-8 py-9 ${skin}`}>
      <ul>
        {items.map((t, i) => (
          <li
            key={t}
            className={`t-bold py-5 text-[15px] leading-[1.42] text-white ${
              i > 0 ? 'border-t border-white/22' : 'pt-0'
            }`}
          >
            {t}
          </li>
        ))}
      </ul>
      <Mark kind={kind} />
    </div>
  )
}

export default function Audience() {
  return (
    <section className="relative bg-deep">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-20 md:pb-28 md:pt-24">
        <h2 className="t-heavy text-center text-[clamp(1.8rem,4.4vw,3.3rem)] uppercase">
          <span className="text-white">Esse evento é </span>
          <span className="text-cy-500">para você?</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          <div className="flex flex-col">
            <p className="t-bold mb-5 text-center text-[clamp(1rem,2vw,1.35rem)] uppercase tracking-[0.04em]">
              <span className="text-white">É para você se:</span>
            </p>
            <Panel kind="ok" items={YES} />
          </div>
          <div className="flex flex-col">
            <p className="t-bold mb-5 text-center text-[clamp(1rem,2vw,1.35rem)] uppercase tracking-[0.04em]">
              <span className="text-white">Não é para você se:</span>
            </p>
            <Panel kind="no" items={NO} />
          </div>
        </div>

        <p className="t-heavy mx-auto mt-16 max-w-[820px] text-center text-[clamp(1.25rem,3vw,2.15rem)] uppercase leading-[1.16]">
          <span className="text-white">Mais do que respostas,</span>
          <br />
          <span className="text-cy-500">você sai com direção.</span>
        </p>

        <CyanBar className="mt-14" />
      </div>
    </section>
  )
}

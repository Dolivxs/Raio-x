import { CyanBar } from '@/components/ui/Dividers'

const ITEMS = [
  'Qual é o gargalo que mais está limitando seu resultado.',
  'O que está roubando energia, tempo ou dinheiro sem gerar avanço proporcional.',
  'O que precisa ser priorizado na reta final de 2026.',
  'O que você precisa parar de fazer.',
  'Qual estratégia vai orientar os próximos 68 dias.',
]

/** Cadeado 3D do PDF à esquerda, lista numerada à direita. */
export default function Takeaways() {
  return (
    <section className="relative bg-deep">
      <div className="mx-auto max-w-[1140px] px-6 pb-20 pt-20 md:pb-24 md:pt-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="t-light text-[clamp(1.9rem,4.4vw,3.3rem)] leading-[1.08]">
              <span className="block text-white">Ao final do dia,</span>
              <span className="t-heavy block uppercase text-cy-500">você sai sabendo:</span>
            </h2>
            <img
              src="/rx/padlock.png"
              alt=""
              aria-hidden="true"
              className="mx-auto mt-10 w-[min(300px,66%)] lg:mx-0"
            />
          </div>

          <ul className="lg:pt-4">
            {ITEMS.map((t, i) => (
              <li
                key={t}
                className={`flex gap-5 py-6 ${i === 0 ? 'border-t border-white/14' : ''} border-b border-white/14`}
              >
                <span className="t-heavy shrink-0 text-[1.35rem] leading-none text-cy-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="t-body text-[15.5px] text-silver">{t}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="t-heavy mx-auto mt-16 max-w-[820px] text-center text-[clamp(1.3rem,3.2vw,2.3rem)] uppercase leading-[1.16]">
          <span className="text-white">Diagnóstico. </span>
          <span className="text-cy-500">Direção. </span>
          <span className="text-white">Execução.</span>
        </p>

        <CyanBar className="mt-14" />
      </div>
    </section>
  )
}

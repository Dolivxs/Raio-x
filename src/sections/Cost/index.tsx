import Cta from '@/components/ui/Cta'
import { Chevron, TitleRule } from '@/components/ui/Dividers'

const QUESTIONS = [
  'Quanto custa passar mais dois meses resolvendo sintomas?',
  'Quanto vale saber exatamente onde concentrar tempo, equipe e recurso antes da reta final?',
  'Quanto do resultado de 2026 ainda depende das decisões que você tomar agora?',
]

export default function Cost() {
  return (
    <section className="relative bg-deep">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-20 text-center md:pb-28 md:pt-24">
        <h2 className="t-heavy text-[clamp(1.7rem,4.2vw,3.1rem)] uppercase leading-[1.1]">
          <span className="text-white">68 dias passam de qualquer jeito.</span>
          <br />
          <span className="text-cy-500">A diferença é a direção.</span>
        </h2>
        <TitleRule className="mx-auto mt-7 w-[min(560px,76%)]" />

        <p className="t-light mx-auto mt-8 max-w-[720px] text-[clamp(1.05rem,2.1vw,1.5rem)] text-silver">
          O ano não vai esperar você descobrir sozinho.
        </p>

        <ul className="mx-auto mt-12 max-w-[820px] text-left">
          {QUESTIONS.map((q, i) => (
            <li
              key={q}
              className={`flex gap-4 py-7 ${i === 0 ? 'border-t border-white/14' : ''} border-b border-white/14`}
            >
              <span className="mt-[9px] size-[9px] shrink-0 bg-cy-500" aria-hidden="true" />
              <p className="t-bold text-[15.5px] leading-[1.45] text-white sm:text-[17px]">{q}</p>
            </li>
          ))}
        </ul>

        <p className="t-heavy mx-auto mt-14 max-w-[900px] text-[clamp(1.2rem,2.8vw,2rem)] uppercase leading-[1.18] [text-wrap:balance]">
          <span className="text-white">Os 68 dias vão passar.</span>
          <br />
          <span className="text-cy-500">A diferença é como você vai conduzi-los.</span>
        </p>

        <Cta className="mt-12" />
      </div>
      <Chevron tone="gold" />
    </section>
  )
}

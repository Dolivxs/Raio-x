import { Chevron } from '@/components/ui/Dividers'

/** 01..04 do PDF: numeral ciano no lugar do ícone, título em dois tons. */
const CARDS = [
  { n: '01', a: 'Trabalhar', b: 'mais' },
  { n: '02', a: 'Cobrar', b: 'mais' },
  { n: '03', a: 'Abrir novas', b: 'frentes' },
  { n: '04', a: 'Apagar', b: 'incêndios' },
]

export default function Cycle() {
  return (
    <section className="relative bg-dark">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-20 md:pb-28 md:pt-24">
        <h2 className="t-heavy text-center text-[clamp(1.9rem,4.4vw,3.35rem)] uppercase">
          <span className="text-white">Você ainda tem </span>
          <span className="text-cy-500">68 dias.</span>
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <li key={c.n} className="card-dark rounded-[14px] px-7 py-8">
              <p className="t-heavy text-[2.4rem] leading-none text-cy-500">{c.n}</p>
              <p className="t-bold mt-5 text-[1.05rem] uppercase leading-[1.2]">
                <span className="text-white">{c.a} </span>
                <span className="text-gd-500">{c.b}</span>
              </p>
            </li>
          ))}
        </ul>

        <p className="t-heavy mx-auto mt-16 max-w-[820px] text-center text-[clamp(1.15rem,2.5vw,1.85rem)] uppercase leading-[1.18]">
          <span className="text-white">Continuar fazendo mais do mesmo</span>
          <br />
          <span className="text-cy-500">não cria direção.</span>
        </p>
      </div>
      <Chevron />
    </section>
  )
}

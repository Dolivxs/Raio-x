import { CyanBar, TitleRule } from '@/components/ui/Dividers'

const CARDS = [
  {
    badge: '/rx/badge-day-1.png',
    photo: '/rx/day-1.jpg',
    title: 'Diagnóstico',
    sub: 'Anamnese + Raio-X',
    body: 'Levantamos os sintomas, entendemos o cenário atual e investigamos onde o resultado está travando.',
  },
  {
    badge: '/rx/badge-day-2.png',
    photo: '/rx/day-2.jpg',
    title: 'Direção',
    sub: 'Laudo + Tratamento',
    body: 'Interpretamos o diagnóstico, identificamos o principal gargalo e definimos a prioridade certa.',
  },
  {
    badge: '/rx/badge-day-3.png',
    photo: '/rx/day-3.jpg',
    title: 'Execução',
    sub: 'Prescrição + Acompanhamento',
    body: 'Transformamos o diagnóstico em uma estratégia executável e definimos como acompanhar o avanço.',
  },
]

/** Três cartões com selo dourado sobreposto, foto no topo e texto abaixo. */
export default function HowDay() {
  return (
    <section className="relative bg-dark">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-20 md:pb-28 md:pt-24">
        <h2 className="text-center">
          <span className="t-light block text-[clamp(1.7rem,4.2vw,3.2rem)] text-white">
            Como o dia
          </span>
          <span className="t-heavy block text-[clamp(2rem,5.4vw,4.1rem)] uppercase text-white">
            vai funcionar
          </span>
        </h2>
        <TitleRule className="mx-auto mt-6 w-[min(620px,78%)]" />

        <ul className="mt-24 grid grid-cols-1 gap-x-6 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <li key={c.title} className="relative">
              <img
                src={c.badge}
                alt=""
                aria-hidden="true"
                className="absolute -top-[52px] left-1/2 z-10 w-[104px] -translate-x-1/2"
              />
              <div className="card-dark h-full overflow-hidden rounded-[18px] pb-9">
                <div className="relative">
                  <img src={c.photo} alt="" aria-hidden="true" className="block w-full" />
                  <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-b from-transparent to-[#0a1424]" />
                </div>
                <div className="relative -mt-7 px-7 text-center">
                  <p className="t-heavy text-[1.35rem] uppercase text-cy-500">{c.title}</p>
                  <TitleRule className="mx-auto mt-3 w-[112px]" />
                  <p className="t-bold mt-4 text-[12px] uppercase tracking-[0.16em] text-gd-500">
                    {c.sub}
                  </p>
                  <p className="t-body mt-4 text-[14.5px] text-muted">{c.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="t-heavy mx-auto mt-20 max-w-[820px] text-center text-[clamp(1.3rem,3vw,2.2rem)] uppercase leading-[1.15]">
          <span className="text-white">Um dia para diagnosticar.</span>
          <br />
          <span className="text-cy-500">68 dias para executar.</span>
        </p>

        <CyanBar className="mt-14" />
      </div>
    </section>
  )
}

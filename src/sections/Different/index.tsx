import { CyanBar, TitleRule } from '@/components/ui/Dividers'

const CARDS = [
  { badge: '/rx/badge-diff-1.png', title: 'Aqui não tem palpite.' },
  { badge: '/rx/badge-diff-2.png', title: 'Não tem teoria genérica.' },
  { badge: '/rx/badge-diff-3.png', title: 'Não tem fórmula mágica.' },
]

export default function Different() {
  return (
    <section className="relative bg-deep">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-20 md:pb-28 md:pt-24">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-24 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <li key={c.title} className="relative">
              <img
                src={c.badge}
                alt=""
                aria-hidden="true"
                className="absolute -top-[56px] left-1/2 z-10 w-[112px] -translate-x-1/2"
              />
              <div className="card-deep flex h-full min-h-[190px] items-center justify-center rounded-[18px] px-8 pb-10 pt-14 text-center">
                <div>
                  <p className="t-heavy text-[clamp(1.15rem,2.2vw,1.5rem)] uppercase leading-[1.18] text-cy-500">
                    {c.title}
                  </p>
                  <TitleRule className="mx-auto mt-4 w-[96px]" />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-24 text-center">
          <h2 className="t-heavy mx-auto max-w-[880px] text-[clamp(1.6rem,4vw,2.9rem)] uppercase leading-[1.12]">
            <span className="text-white">Antes de acelerar,</span>
            <br />
            <span className="text-white">você precisa saber </span>
            <span className="text-cy-500">onde mexer.</span>
          </h2>
          <p className="t-body mx-auto mt-7 max-w-[760px] text-[15px] text-muted sm:text-[17px]">
            O problema de entrar na reta final sem diagnóstico é simples: você pode gastar os
            últimos meses do ano atacando o lugar errado.
          </p>
        </div>

        <CyanBar className="mt-16" />
      </div>
    </section>
  )
}

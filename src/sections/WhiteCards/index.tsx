import { Chevron } from '@/components/ui/Dividers'

const CARDS = [
  'Diagnóstico empresarial completo',
  'Mapa dos principais gargalos',
  'Definição de prioridades',
]

/** Seção clara do PDF, com os cartões escuros sobre o fundo branco. */
export default function WhiteCards() {
  return (
    <section className="relative bg-paper">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-20 md:pb-28 md:pt-24">
        <h2 className="text-center">
          <span className="t-light block text-[clamp(1.5rem,3.6vw,2.7rem)] text-ink">
            Você não sai apenas com uma análise.
          </span>
          <span className="t-heavy mt-2 block text-[clamp(1.85rem,4.6vw,3.4rem)] uppercase text-[#17548f]">
            Você sai com direção.
          </span>
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <li
              key={c}
              className="rounded-[18px] bg-gradient-to-b from-[#12294a] to-[#0a1a2f] px-8 py-10 text-center shadow-[0_22px_46px_rgba(12,32,60,0.28)]"
            >
              <p className="t-heavy text-[1.6rem] leading-none text-cy-500">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="t-bold mt-5 text-[15px] uppercase leading-[1.32] tracking-[0.03em] text-white">
                {c}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Chevron tone="gold" />
    </section>
  )
}

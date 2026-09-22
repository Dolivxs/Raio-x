import { Chevron } from '@/components/ui/Dividers'

const ITEMS = [
  { n: '01', text: 'Sem diagnóstico, esforço vira desgaste.' },
  {
    n: '02',
    text: 'O que parece ser o problema nem sempre é o que realmente está segurando o resultado.',
  },
  { n: '03', text: 'Você pode gastar a reta final atacando o lugar errado.' },
]

/**
 * Bloco 01 / 02 / 03 sobre o fundo com halo ciano e retícula do PDF,
 * fechando com a grande quebra visual que o PDF usa para "MAS NÃO É!".
 */
export default function Truth() {
  return (
    <section className="relative bg-glow">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-24 md:pb-32 md:pt-32">
        <ul className="space-y-14 md:space-y-16">
          {ITEMS.map((item) => (
            <li key={item.n} className="text-center">
              <div className="flex items-center justify-center gap-6">
                <span className="h-px w-[68px] bg-white/25 sm:w-[110px]" aria-hidden="true" />
                <span className="t-heavy text-[2rem] leading-none text-cy-500">{item.n}</span>
                <span className="h-px w-[68px] bg-white/25 sm:w-[110px]" aria-hidden="true" />
              </div>
              <p className="t-light mx-auto mt-6 max-w-[760px] text-[clamp(1.1rem,2.4vw,1.7rem)] text-white">
                {item.text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-24 text-center md:mt-28">
          <h2 className="t-heavy text-[clamp(2rem,6vw,4.6rem)] uppercase leading-[1.02] text-cy-500">
            Não é mais esforço.
            <br />
            É direção.
          </h2>
          <div className="mx-auto mt-8 h-[3px] w-[min(560px,80%)] rounded-full bg-white/85" aria-hidden="true" />
        </div>
      </div>
      <Chevron />
    </section>
  )
}

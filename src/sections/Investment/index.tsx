import Cta from '@/components/ui/Cta'
import { eventData, price } from '@/lib/event'

/**
 * ÚNICO ponto da landing em que o preço aparece. Nenhuma seção anterior
 * exibe valor, parcela ou desconto.
 */
export default function Investment() {
  return (
    <section id="vaga" className="relative bg-deep">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-10 text-center md:pb-28">
        <div className="mx-auto max-w-[620px] rounded-[22px] border border-cy-500/25 bg-gradient-to-b from-[#0c2a48] to-[#071726] px-8 py-12 shadow-[0_28px_60px_rgba(0,0,0,0.5)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-silver">
            De <span className="line-through decoration-cy-500/70">{price.original}</span>
          </p>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.34em] text-cy-500">
            por
          </p>
          <p className="t-heavy mt-2 text-[clamp(2.6rem,8vw,4.4rem)] leading-none text-white">
            {price.subsidized}
          </p>

          <p className="mt-5 text-[13px] uppercase tracking-[0.2em] text-muted">ou</p>
          <p className="t-heavy mt-2 text-[clamp(1.35rem,3.4vw,2rem)] text-cy-500">
            {price.installmentLabel}
          </p>

          <p className="t-body mx-auto mt-8 max-w-[420px] text-[14px] text-silver">
            {eventData.scarcity}
          </p>

          <Cta className="mt-9" />
        </div>
      </div>
    </section>
  )
}

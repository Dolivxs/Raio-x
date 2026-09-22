import Cta from '@/components/ui/Cta'
import { Chevron } from '@/components/ui/Dividers'
import { eventData } from '@/lib/event'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px] shrink-0" fill="none" stroke="#19dbfc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}

function Pill({ children, icon = false }: { children: React.ReactNode; icon?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl border border-cy-500/25 bg-[#0b1a30]/85 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-silver sm:text-[13px]">
      {icon ? <CalendarIcon /> : null}
      {children}
    </span>
  )
}

function Copy() {
  return (
    <div className="max-w-[690px]">
      <p className="t-hero text-[clamp(1.15rem,2.1vw,1.75rem)] tracking-[0.06em] text-white">
        {eventData.brand} {eventData.brandSuffix}
      </p>

      <h1 className="t-hero mt-3 text-[clamp(1.75rem,3.1vw,2.8rem)]">
        <span className="block text-white">Prepare-se para os últimos</span>
        <span className="block text-cy-500">68 dias do ano.</span>
        <span className="mt-[0.28em] block text-white">E garanta o seu resultado</span>
        <span className="block text-cy-500">de 2026.</span>
      </h1>

      <p className="t-body mt-6 max-w-[520px] text-[15px] text-muted sm:text-base">
        Uma imersão presencial de um dia para examinar a sua empresa, identificar o gargalo
        que está segurando o resultado e sair com uma estratégia clara para a reta final do ano.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <Pill icon>
          {eventData.date} · {eventData.city}
        </Pill>
        <Pill>
          {eventData.time} · {eventData.format}
        </Pill>
      </div>

      <Cta className="mt-8" />
    </div>
  )
}

/**
 * HERO — composição do LP-RX.pdf: fundo escuro com o X de luz ciano e a foto
 * da Tudy à direita, coluna de texto à esquerda. A imagem de fundo é o
 * próprio Hero do PDF, com a copy antiga removida. Zero preço aqui.
 */
export default function Hero() {
  return (
    <section className="relative z-10 bg-nv-950" aria-label="Raio X Empresarial">
      {/* ---------- desktop: recorte integral do Hero do PDF ---------- */}
      <div className="relative hidden aspect-[1713/928] w-full md:block">
        <img
          src="/rx/hero.jpg"
          alt="Tudy Vieira, condutora do Raio X Empresarial"
          className="absolute inset-0 size-full object-cover object-right"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1140px] px-6">
            <Copy />
          </div>
        </div>
      </div>

      {/* ---------- mobile: mesma identidade, foto acima da copy ---------- */}
      <div className="md:hidden">
        <div className="relative h-[46vh] min-h-[300px] w-full">
          <img
            src="/rx/hero-portrait.jpg"
            alt="Tudy Vieira, condutora do Raio X Empresarial"
            className="absolute inset-0 size-full object-cover object-[center_18%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-nv-950" />
        </div>
        <div className="bg-dark px-6 pb-14 pt-2">
          <Copy />
        </div>
      </div>
      <Chevron className="hidden md:block" />
    </section>
  )
}

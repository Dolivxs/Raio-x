import { Chevron } from '@/components/ui/Dividers'

/** Somente fatos aprovados do evento. Nenhum número de autoridade. */
const INDICATORS = [
  { value: '1', label: 'dia' },
  { value: '68', label: 'dias' },
  { value: '24', label: 'out' },
  { value: '09h', label: 'às 19h' },
]

export default function Authority() {
  return (
    <section className="relative bg-[#061320]">
      <div className="mx-auto max-w-[1140px] px-6 pb-20 pt-20 md:pb-24 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[186px_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10">
          {/* indicadores */}
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-5">
            {INDICATORS.map((ind) => (
              <li
                key={ind.value + ind.label}
                className="rounded-[14px] border border-cy-500/35 bg-[#081a2e] px-5 py-5 text-center shadow-[0_0_34px_rgba(25,219,252,0.12)]"
              >
                <p className="t-heavy text-[1.9rem] leading-none text-cy-500">{ind.value}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-silver">
                  {ind.label}
                </p>
              </li>
            ))}
          </ul>

          {/* foto grande */}
          <div className="relative mx-auto w-[min(360px,84%)] lg:w-full">
            {/* halo ciano do PDF, que faz a foto se fundir ao fundo da seção */}
            <div
              className="pointer-events-none absolute -inset-10 -z-0"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(52% 40% at 44% 30%, rgba(13,142,184,0.5), transparent 72%)',
                filter: 'blur(34px)',
              }}
            />
            <img
              src="/rx/tudy-auth.png"
              alt="Tudy Vieira, que conduz o Raio X Empresarial"
              className="relative block w-full"
              style={{
                WebkitMaskImage:
                  'radial-gradient(74% 70% at 50% 42%, #000 38%, rgba(0,0,0,0.55) 74%, transparent 100%)',
                maskImage:
                  'radial-gradient(74% 70% at 50% 42%, #000 38%, rgba(0,0,0,0.55) 74%, transparent 100%)',
              }}
            />
          </div>

          {/* texto */}
          <div className="text-center lg:text-left">
            <img
              src="/rx/logo-tudy-gold.png"
              alt="Tudy Vieira"
              className="mx-auto w-[240px] lg:mx-0 lg:w-[280px]"
            />
            <h2 className="t-heavy mt-6 text-[clamp(1.35rem,2.9vw,2.1rem)] uppercase leading-[1.14]">
              <span className="text-white">Um dia para examinar.</span>
              <br />
              <span className="text-cy-500">Uma estratégia para executar.</span>
            </h2>
            <p className="t-body mt-6 text-[15px] text-muted sm:text-[16px]">
              Uma parada estratégica para entender o que está segurando o resultado e definir onde
              concentrar energia, tempo e recurso na reta final do ano.
            </p>
          </div>
        </div>
      </div>
      <Chevron tone="gold" />
    </section>
  )
}

import Facts from '@/components/ui/Facts'
import { TitleRule } from '@/components/ui/Dividers'
import { eventData } from '@/lib/event'

export default function Offer() {
  return (
    <section className="relative bg-dark">
      <div className="mx-auto max-w-[1140px] px-6 pb-16 pt-20 text-center md:pt-24">
        <h2 className="t-heavy text-[clamp(1.7rem,4.2vw,3.1rem)] uppercase leading-[1.1]">
          <span className="text-white">Uma parada estratégica.</span>
          <br />
          <span className="text-cy-500">68 dias de direção.</span>
        </h2>
        <TitleRule className="mx-auto mt-7 w-[min(520px,74%)]" />

        <p className="t-body mx-auto mt-8 max-w-[760px] text-[15px] text-muted sm:text-[17px]">
          {eventData.date} pode ser o dia em que você para de reagir ao negócio e começa a conduzir
          a reta final de {eventData.year} com clareza.
        </p>

        <Facts className="mt-10" />
      </div>
    </section>
  )
}

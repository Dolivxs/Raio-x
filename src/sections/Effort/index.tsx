import { CyanBar } from '@/components/ui/Dividers'
import { Chevron } from '@/components/ui/Dividers'

export default function Effort() {
  return (
    <section className="relative bg-dark">
      <div className="mx-auto max-w-[1140px] px-6 pb-20 pt-20 text-center md:pb-24 md:pt-24">
        <CyanBar />
        <h2 className="t-heavy mt-12 text-[clamp(1.6rem,4vw,3rem)] uppercase leading-[1.1]">
          <span className="text-white">Mais esforço</span>
          <br />
          <span className="text-cy-500">não é o que falta.</span>
        </h2>
        <p className="t-light mx-auto mt-7 max-w-[680px] text-[clamp(1.05rem,2vw,1.4rem)] text-silver">
          Antes de acelerar, você precisa saber onde mexer.
        </p>
      </div>
      <Chevron />
    </section>
  )
}

/**
 * Apresentação do produto. Usa o logo 3D cromado extraído do LP-RX.pdf,
 * seguido pela mesma sequência de blocos de texto do arquivo original.
 */
export default function Product() {
  return (
    <section className="relative bg-[#050f1a]">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-20 text-center md:pb-28 md:pt-24">
        <img
          src="/rx/logo-3d.png"
          alt="Raio X Empresarial"
          className="mx-auto w-[min(660px,88%)]"
        />

        <h2 className="t-heavy mt-6 text-[clamp(1.55rem,3.8vw,2.9rem)] uppercase leading-[1.1]">
          <span className="text-white">Uma parada estratégica.</span>
          <br />
          <span className="text-cy-500">68 dias de direção.</span>
        </h2>

        <p className="t-light mx-auto mt-9 max-w-[720px] text-[clamp(1.1rem,2.3vw,1.6rem)]">
          <span className="block text-white">Um dia para examinar.</span>
          <span className="block text-cy-500">Uma estratégia para executar.</span>
        </p>

        <p className="t-body mx-auto mt-9 max-w-[720px] text-[15px] text-muted sm:text-[17px]">
          O RAIO X Empresarial é uma imersão presencial para examinar o negócio, identificar o
          gargalo que mais interfere no resultado e definir a estratégia que vai orientar a reta
          final de 2026.
        </p>

        <div className="mx-auto mt-10 max-w-[720px] rounded-[18px] border border-cy-500/25 bg-gradient-to-r from-[#0d2544] via-[#12345c] to-[#0d2544] px-8 py-7">
          <p className="t-heavy text-[clamp(1.05rem,2.4vw,1.6rem)] uppercase tracking-[0.02em] text-white">
            Diagnóstico. <span className="text-cy-500">Direção.</span> Execução.
          </p>
        </div>
      </div>
    </section>
  )
}

const PHOTOS = [
  { src: '/rx/photo-1.jpg', alt: 'Tudy Vieira conduzindo uma imersão presencial' },
  { src: '/rx/photo-2.jpg', alt: 'Retrato de Tudy Vieira' },
  { src: '/rx/photo-3.jpg', alt: 'Tudy Vieira em sala, dirigindo-se à turma' },
]

/**
 * Faixa de fotos: respiro visual, exatamente como no PDF. Três retratos com
 * canto arredondado e borda fina, o do meio maior e deslocado para baixo.
 */
export default function PhotoStrip() {
  return (
    <section className="relative bg-[#08203a]" aria-label="Tudy Vieira em imersões presenciais">
      <div className="mx-auto max-w-[1140px] px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 items-center gap-4 sm:gap-6 md:grid-cols-3">
          {PHOTOS.map((p, i) => (
            <figure
              key={p.src}
              className={[
                'overflow-hidden rounded-[20px] border border-[#c8b393]/45 shadow-[0_22px_50px_rgba(0,0,0,0.5)]',
                i === 1 ? 'md:mt-20 md:-mx-4' : '',
                i === 2 ? 'max-md:col-span-2 max-md:mx-auto max-md:w-1/2' : '',
              ].join(' ')}
            >
              <img src={p.src} alt={p.alt} className="block w-full" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

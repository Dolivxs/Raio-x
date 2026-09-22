import { ctaHref, ctaIsPlaceholder, eventData } from '@/lib/event'

type Props = {
  label?: string
  className?: string
  size?: 'md' | 'lg'
}

/**
 * Botão dourado do LP-RX.pdf: pílula com gradiente metálico e um disco
 * escuro à direita com a seta. Sem animação. O único efeito de interação é
 * um brilho estático levemente mais claro no hover, apenas para sinalizar
 * que o elemento é clicável.
 */
export default function Cta({ label, className = '', size = 'lg' }: Props) {
  const text = label ?? eventData.ctaLabel
  const pad =
    size === 'lg'
      ? 'min-h-[58px] py-4 pl-6 pr-[58px] text-[12.5px] tracking-[0.1em] sm:min-h-[62px] sm:pl-8 sm:pr-[70px] sm:text-[15px] sm:tracking-[0.14em]'
      : 'min-h-[52px] py-3.5 pl-5 pr-[52px] text-[12px] tracking-[0.1em] sm:pl-6 sm:pr-[60px] sm:text-[13px]'
  const knob = size === 'lg' ? 'size-[40px] right-2 sm:size-[46px]' : 'size-[36px] right-2 sm:size-[40px]'

  return (
    <a
      href={ctaHref()}
      target={ctaIsPlaceholder ? undefined : '_blank'}
      rel={ctaIsPlaceholder ? undefined : 'noopener noreferrer'}
      className={`btn-gold relative inline-flex max-w-full items-center justify-center rounded-full text-center font-display font-bold uppercase leading-[1.25] text-[#22160a] hover:brightness-[1.06] ${pad} ${className}`}
    >
      {text}
      <span
        className={`btn-gold-knob absolute inset-y-0 my-auto flex items-center justify-center rounded-full ${knob}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="#2b1a08" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h13M12 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  )
}

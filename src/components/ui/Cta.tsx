'use client'

import { ctaHref, ctaIsPlaceholder, eventData } from '@/lib/event'

type Props = { size?: 'sm' | 'lg' | 'xl'; className?: string }

export default function Cta({ size = 'lg', className = '' }: Props) {
  const href = ctaHref()
  const pad =
    size === 'xl'
      ? 'px-10 py-[1.15rem] text-[0.9rem] md:px-[3.4rem] md:py-[1.45rem] md:text-[1.05rem]'
      : size === 'lg'
        ? 'px-9 py-4 text-sm md:px-12 md:py-5 md:text-base'
        : 'px-5 py-2.5 text-xs'

  return (
    <a
      href={href}
      target={ctaIsPlaceholder ? undefined : '_blank'}
      rel={ctaIsPlaceholder ? undefined : 'noopener noreferrer'}
      data-placeholder={ctaIsPlaceholder || undefined}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full
        border border-rx-cyan-500/45 bg-rx-cyan-500/10 font-display font-semibold
        tracking-[0.18em] text-white transition-colors duration-300
        hover:border-rx-cyan-500 hover:bg-rx-cyan-500/20
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-rx-cyan-500 ${pad} ${className}`}
    >
      <span className="relative z-10">
        {size === 'sm' ? eventData.ctaLabelShort : eventData.ctaLabel}
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
          from-transparent via-rx-cyan-500/25 to-transparent transition-transform
          duration-700 ease-out group-hover:translate-x-full"
      />
    </a>
  )
}

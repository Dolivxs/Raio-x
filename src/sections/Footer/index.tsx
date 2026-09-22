import { ctaHref, ctaIsPlaceholder, eventData } from '@/lib/event'

export default function Footer() {
  return (
    <footer className="bg-footer">
      <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row">
        <img src="/rx/logo-tudy.png" alt="Tudy Vieira" className="h-[38px] w-auto" />

        <a
          href={ctaHref()}
          target={ctaIsPlaceholder ? undefined : '_blank'}
          rel={ctaIsPlaceholder ? undefined : 'noopener noreferrer'}
          className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-[#17548f] hover:text-[#0f3c6b]"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9a9.83 9.83 0 0 0-2.9-7A9.83 9.83 0 0 0 12.04 2Zm0 1.8a8.08 8.08 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.03-.2-.31a8.05 8.05 0 0 1-1.24-4.3c0-4.46 3.63-8.09 8.09-8.09Zm-2.5 4.3c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.69 2.65 4.16 3.6 2.05.79 2.47.63 2.92.59.45-.04 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.3 7.3 0 0 1-1.35-1.67c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.4h-.53Z" />
          </svg>
          {eventData.whatsapp ? 'Falar no WhatsApp' : 'Falar conosco'}
        </a>
      </div>
    </footer>
  )
}

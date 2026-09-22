import { eventFacts } from '@/lib/event'

/** Linha de informações práticas do evento, no formato de chips do PDF. */
export default function Facts({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-3 ${className}`}>
      {eventFacts.map((fact) => (
        <li
          key={fact}
          className="rounded-full border border-cy-500/30 bg-nv-900/70 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cy-400 sm:text-xs"
        >
          {fact}
        </li>
      ))}
    </ul>
  )
}

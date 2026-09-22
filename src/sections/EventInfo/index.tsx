import { Chevron } from '@/components/ui/Dividers'
import { eventData } from '@/lib/event'

/**
 * Estética do acordeão branco do PDF, porém com todos os painéis abertos:
 * a página é estática, sem qualquer interação de abrir e fechar.
 * Nenhuma pergunta comercial inventada e nenhum preço aqui.
 */
const ROWS = [
  { q: 'Quando?', a: `${eventData.date}.` },
  { q: 'Onde?', a: `${eventData.city}.` },
  { q: 'Horário?', a: `${eventData.time}.` },
  { q: 'Formato?', a: `${eventData.format}.` },
  { q: 'Condição?', a: eventData.scarcity },
]

export default function EventInfo() {
  return (
    <section className="relative bg-paper">
      <div className="mx-auto max-w-[1140px] px-6 pb-24 pt-20 md:pb-28 md:pt-24">
        <h2 className="t-heavy text-center text-[clamp(1.7rem,4.2vw,3rem)] uppercase text-[#17548f]">
          Informações do evento
        </h2>

        <ul className="mx-auto mt-12 max-w-[880px] space-y-4">
          {ROWS.map((row) => (
            <li key={row.q} className="overflow-hidden rounded-[12px]">
              <p className="t-bold bg-gradient-to-r from-[#0b2444] via-[#10365e] to-[#0b2444] px-8 py-5 text-center text-[clamp(1rem,2vw,1.25rem)] text-white">
                {row.q}
              </p>
              <p className="t-body bg-[#3a4148] px-8 py-5 text-center text-[15px] text-white/90">
                {row.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Chevron tone="gold" />
    </section>
  )
}

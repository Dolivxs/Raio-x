import Hero from '@/sections/Hero'
import Cycle from '@/sections/Cycle'
import Effort from '@/sections/Effort'
import Truth from '@/sections/Truth'
import Product from '@/sections/Product'
import PhotoStrip from '@/sections/PhotoStrip'
import HowDay from '@/sections/HowDay'
import Reveal from '@/sections/Reveal'
import Authority from '@/sections/Authority'
import WhiteCards from '@/sections/WhiteCards'
import Audience from '@/sections/Audience'
import Takeaways from '@/sections/Takeaways'
import Different from '@/sections/Different'
import Cost from '@/sections/Cost'
import EventInfo from '@/sections/EventInfo'
import Offer from '@/sections/Offer'
import Investment from '@/sections/Investment'
import Footer from '@/sections/Footer'

/**
 * Sequência comercial: promessa, problema, diagnóstico, produto, método,
 * valor, entregáveis, qualificação, custo da inação, oferta, preço, CTA.
 * O preço só existe em <Investment />, no fim da página.
 */
export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Cycle />
        <Effort />
        <Truth />
        <Product />
        <PhotoStrip />
        <HowDay />
        <Reveal />
        <Authority />
        <WhiteCards />
        <Audience />
        <Takeaways />
        <Different />
        <Cost />
        <EventInfo />
        <Offer />
        <Investment />
      </main>
      <Footer />
    </>
  )
}

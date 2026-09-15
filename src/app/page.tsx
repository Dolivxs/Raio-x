import SmoothScroll from '@/components/motion/SmoothScroll'
import GlobalAtmosphere from '@/components/stage/GlobalAtmosphere'
import PersistentStage from '@/components/stage/PersistentStage'
import DiagnosticProgress from '@/components/ui/DiagnosticProgress'
import Header from '@/components/ui/Header'

import Hero from '@/sections/Hero'
import Overwork from '@/sections/Overwork'
import Blockage from '@/sections/Blockage'
import Attempts from '@/sections/Attempts'
import Diagnosis from '@/sections/Diagnosis'
import SymptomCause from '@/sections/SymptomCause'
import Product from '@/sections/Product'
import Method from '@/sections/Method'
import Reveal from '@/sections/Reveal'
import Audience from '@/sections/Audience'
import Cost from '@/sections/Cost'
import FinalCTA from '@/sections/FinalCTA'

export default function Page() {
  return (
    <>
      <SmoothScroll />

      {/* Background contínuo e camada mecânica persistente vivem FORA das
          seções — é isso que faz a landing ser uma experiência só. */}
      <GlobalAtmosphere />
      <PersistentStage />

      <Header />
      <DiagnosticProgress />

      <main className="relative z-10">
        {/* travado → diagnosticado → destravado */}
        <Hero />
        <Overwork />
        <Blockage />
        <Attempts />
        <Diagnosis />
        <SymptomCause />
        <Product />
        <Method />
        <Reveal />
        <Audience />
        <Cost />
        <FinalCTA />
      </main>
    </>
  )
}

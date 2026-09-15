'use client'

import { useEffect, useState } from 'react'
import Cta from './Cta'

export default function Header() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'border-b border-white/[0.06] bg-rx-navy-950/72 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3.5 md:px-10 md:py-4">
        <a href="#topo" className="flex items-baseline gap-2 leading-none">
          <span className="rx-display text-base tracking-[-0.02em] md:text-lg">
            <span className="rx-metal">RAIO</span>
            <span className="rx-accent">X</span>
          </span>
          <span className="rx-eyebrow hidden text-rx-silver/55 sm:inline">EMPRESARIAL</span>
        </a>
        <Cta size="sm" />
      </div>
    </header>
  )
}

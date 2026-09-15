---
name: creative-frontend
description: Implementação em código da landing RAIO X — Next.js, TypeScript, Tailwind, GSAP/ScrollTrigger/Lenis. Use ao criar componentes e seções, estruturar pastas, organizar assets, escrever hooks de animação, fazer cleanup de GSAP/ScrollTrigger, ou ao considerar adicionar qualquer dependência nova.
---

# RAIO X — Creative Frontend

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis

## Postura

Isto é **uma landing page de entrega rápida**. Não é um produto, não é um framework,
não é uma plataforma.

- Implementação simples e direta
- Sem abstração especulativa — nada de "camada de configuração" para algo usado uma vez
- Sem arquitetura empresarial, sem design system completo, sem barrel files por toda parte
- Prioridade: velocidade de desenvolvimento + legibilidade

Ao mesmo tempo, o oposto também é erro: **não** fragmentar em dezenas de componentes de
10 linhas só por abstração, e **não** colocar a landing inteira em um arquivo de 2000 linhas.
A unidade natural aqui é **uma seção = um componente**.

## Estrutura

```
src/
├── components/
│   ├── motion/       # utilitários de animação reutilizados de fato
│   └── ui/           # botão, marca, tipografia — poucas peças
│
├── sections/
│   ├── Hero/
│   ├── Overwork/     # "Você trabalha demais"
│   ├── Attempts/     # "Você já tentou de tudo"
│   ├── Blockage/     # sintoma x causa, correntes
│   ├── Diagnosis/    # "Negócio doente não se cura com palpite"
│   ├── Method/       # as 6 etapas clínicas
│   ├── Reveal/       # "O que o seu RAIO X vai revelar"
│   ├── Audience/     # "É para você / não é para você"
│   ├── Cost/         # "Quanto te custa continuar como está"
│   └── FinalCTA/     # Palmas, 24 de junho, Quero minha vaga
│
├── lib/
│   ├── gsap.ts       # registro de plugins, config global
│   └── motion.ts     # helpers de scroll/parallax compartilhados
│
└── styles/
```

Uma seção pode ter arquivos internos quando crescer de verdade
(`Method/index.tsx`, `Method/Stage.tsx`, `Method/useStageScroll.ts`). Não crie a pasta
com 5 arquivos antes de precisar.

## Assets

```
public/raiox/
├── hourglass/
├── chains/
├── gears/
├── ropes/
├── lens/
├── backgrounds/
└── brand/
```

- SVG para o que precisa animar traço, mascarar ou escalar sem perda:
  correntes, cordas, engrenagens, fraturas, linhas
- WebP/AVIF para objetos renderizados e fotografia
- Nomes descritivos e estáveis: `chain-diagonal-lg.svg`, `gear-primary.svg`,
  `hourglass-hero.webp`

## Animação em React

Sempre usar `gsap.context()` com cleanup. Sem exceção — ScrollTrigger vazado em
navegação client-side é a causa nº 1 de bug nesse tipo de página.

```tsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.gear-a', {
      rotation: 180,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
  }, root)

  return () => ctx.revert()   // mata tweens e ScrollTriggers da seção
}, [])
```

Regras:

- `ctx.revert()` no cleanup, sempre
- Um `ScrollTrigger.refresh()` após carregamento de imagens que afetam a altura
- Nada de listeners de `scroll`/`resize` manuais duplicando o que o ScrollTrigger já faz
- Timelines divididas por cena, não uma timeline gigante para a página inteira
- Componentes com GSAP são `'use client'`

## Performance no código

Animar apenas:

- `transform` (`translate`, `scale`, `rotate`)
- `opacity`

Evitar animar `top`, `left`, `width`, `height`, `margin`, `filter` quando `transform`
resolve. Usar `will-change` com parcimônia e apenas no que realmente anima.

`next/image` com `sizes` correto; `priority` só nos assets do primeiro viewport.

## Dependências

Antes de instalar qualquer coisa, verificar se **CSS + SVG + GSAP** já resolvem.
Na prática resolvem quase tudo aqui: masks, clip-path, desenho de traço, parallax,
sticky, reveal, morphing simples.

Não adicionar biblioteca porque parece interessante. Não adicionar biblioteca de UI,
de ícones pesada, de carrossel, de partículas, de 3D sem necessidade comprovada.

## Convenções

- TypeScript sem `any` gratuito; props de seção tipadas mas simples
- Tokens de cor do RAIO X no `tailwind.config` (`rx-navy-900`, `rx-cyan-500`, …),
  não hexadecimais soltos pelos componentes
- Tipografia por `clamp()` em utilitários Tailwind, não tamanhos fixos por breakpoint
- Copy em português, vinda do material oficial — texto direto no componente está ok
  para uma landing; não montar um CMS
- Nada de comentário explicando o óbvio; comentar apenas cálculo de scroll não trivial

## Checagem antes de dar um componente como pronto

1. `gsap.context` + `ctx.revert()` no cleanup?
2. Anima só `transform`/`opacity`?
3. O componente tem tamanho razoável, sem virar arquivo monolítico nem picotado demais?
4. Alguma dependência nova foi adicionada sem necessidade real?
5. Cores vêm dos tokens?
6. Funciona no primeiro paint sem flash de conteúdo não posicionado?

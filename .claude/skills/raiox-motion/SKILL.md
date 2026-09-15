---
name: raiox-motion
description: Sistema de motion e scroll storytelling da landing RAIO X — GSAP, ScrollTrigger, Lenis, sticky scenes, parallax, scrub, masks e clip-path. Use ao animar qualquer elemento, criar transição entre seções, montar cena sticky, animar engrenagens/ampulheta/correntes/lupa, escolher easing ou duração, ou ao decidir como um objeto entra e sai da viewport.
---

# RAIO X — Motion & Scroll Storytelling

## Princípio central

Os objetos **não decoram** a página. Os objetos **constroem** a página durante o scroll.

O usuário deve sentir que está operando a composição — que o mecanismo responde a ele.
Scroll é o controle; a página é a máquina sendo examinada.

Consequência prática: quase toda animação é **scroll-driven** (`scrub`), não `autoplay`.
Animação que roda sozinha em loop quebra essa sensação.

## Stack

- **GSAP + ScrollTrigger** — padrão para tudo que responde ao scroll
- **Lenis** — smooth scroll, sincronizado com o ScrollTrigger
- **Framer Motion** — apenas microinteração simples e local (hover de botão, toggle)
- **Three.js** — apenas se realmente não der para fazer com DOM + CSS + SVG + GSAP.
  Na prática, para esta landing, quase certamente não é necessário.

Setup mínimo de sincronia Lenis ↔ ScrollTrigger:

```ts
const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((t) => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)
```

## Qualidade do movimento

O movimento deve parecer **pesado, elegante, preciso, relativamente lento, físico,
controlado**. É maquinário de precisão, não interface saltitante.

Ritmo da página:

```
movimento → respiro → movimento → pausa → transformação
```

Nunca mover tudo ao mesmo tempo. Em uma cena, no máximo 2–3 elementos se movem
com intenção; o resto sustenta. O respiro entre cenas é tão importante quanto o movimento.

## Priorizar

- scroll-driven animation com `scrub`
- sticky storytelling
- parallax por camada
- masks, `clip-path`, SVG masks
- `transform`, `scale`, `translate`, rotações pequenas
- layering explícito (foreground / middleground / background)
- entrada e saída pelas bordas da viewport

## Evitar

- fade-up repetitivo em toda seção (é o clichê que faz a página parecer template)
- bounce, elastic, back exagerado
- animações infinitas
- objetos flutuando aleatoriamente
- rotação automática contínua
- qualquer movimento sem função narrativa

## Profundidade

Velocidades diferentes por plano criam a profundidade:

| Plano | Deslocamento relativo | Papel |
|---|---|---|
| Foreground | maior (ex.: 100%) | correntes, bordas de ampulheta, objetos cortados |
| Middleground | intermediário (~50–60%) | objeto protagonista, texto |
| Background | menor (~15–25%) | atmosfera, engrenagens distantes, névoa |

Foreground pode e deve passar **na frente do texto** em alguns momentos.

## Comportamento por objeto

### Ampulheta
- Pode ocupar grande parte da viewport e ficar parcialmente fora da tela
- Desloca com o scroll, parallax de plano médio
- Rotação de poucos graus apenas (±3–6°)
- A areia pode escoar conforme o progresso do scroll (mask/clip-path vertical)
- **Nunca** rotação contínua

### Correntes
- Atravessam a viewport na diagonal
- Funcionam no foreground, passando na frente do texto
- Criam profundidade e representam bloqueio
- Podem se afrouxar/sair de cena conforme a narrativa avança para "destravar"

### Cordas
- Fio visual condutor que reaparece entre seções diferentes
- Excelente para `strokeDasharray` / `strokeDashoffset` guiado por scroll,
  desenhando o caminho de uma seção à seguinte
- Tensão visível no início, relaxamento no fim

### Engrenagens
Respondem ao scroll e param quando o scroll para. Rotações proporcionais e em
direções opostas, como um mecanismo real:

```ts
// conceitual
gearA.rotation = scrollProgress *  180
gearB.rotation = scrollProgress * -120
gearC.rotation = scrollProgress *   80
```

Ao voltar o scroll, a direção se inverte naturalmente — isso é o que vende o mecanismo.
Na narrativa: começam dessincronizadas (eixos desalinhados, dentes que não engatam) e
terminam engatadas.

### Lupa
- Instrumento de revelação: SINTOMA → CAUSA
- Revela uma segunda camada por `mask`, SVG mask ou `clip-path` circular
- A camada de baixo é a causa real; a de cima é o sintoma
- Pode ser guiada pelo scroll (varre a composição) ou pelo ponteiro em uma cena específica
- Movimento lento e deliberado, como quem examina

### Fratura / rachadura
- Propaga-se por `strokeDashoffset` conforme o scroll
- Aparece na seção de fratura silenciosa da gestão

## Cenas sticky

Para as cenas importantes:

```
section: 200vh – 400vh   (altura de scroll disponível)
  scene: position: sticky; height: 100vh
```

e usar o progresso do scroll para transformar a composição dentro da cena presa.

Regras:

- **Não** usar sticky em todas as seções — ele perde o efeito e cansa
- Reservar para: o mecanismo travado, a revelação pela lupa, as 6 etapas
- Toda cena sticky precisa de uma transformação clara do estado A ao estado B
- Cena sticky sem transformação real é só uma seção alta e parada

Padrão de implementação:

```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,          // scrub numérico dá o peso; evite scrub: true seco
  },
})
```

## Easings

Preferir:

- `power1.inOut` — deslocamentos longos e contínuos
- `power2.out` — entradas
- `power3.out` — revelações rápidas que precisam assentar

Evitar `bounce`, `elastic`, `back` exagerado. Em animações com `scrub`, o easing entre
keyframes deve ser suave ou linear — o próprio scrub já dá a inércia.

## Durações (fora do scrub)

- Microinteração: 150–250ms
- Entrada de elemento: 600–900ms
- Transformação de cena: 1000–1600ms

Lento é a assinatura. Na dúvida, mais lento.

## Transições entre seções

O fim de uma cena prepara a próxima. Não corte seco entre blocos:

- um objeto sai por uma borda e o próximo entra pela oposta
- a corda atravessa a emenda entre as duas seções
- o fundo desloca de `navy-950` para `navy-900` durante a virada
- o crop de um objeto continua na seção seguinte

## `prefers-reduced-motion`

Sempre respeitar. Quando ativo: manter a narrativa e o conteúdo, remover parallax,
scrub e grandes transformações; trocar por estados finais estáticos ou fades curtos.

```ts
const mm = gsap.matchMedia()
mm.add('(prefers-reduced-motion: no-preference)', () => { /* timeline completa */ })
mm.add('(prefers-reduced-motion: reduce)', () => { /* estados finais, sem scrub */ })
```

## Checagem antes de dar uma animação como pronta

1. Esse movimento tem função narrativa ou é enfeite?
2. É scroll-driven ou está rodando sozinho?
3. As engrenagens param quando o scroll para?
4. Tem respiro antes e depois, ou tudo se move ao mesmo tempo?
5. Os três planos têm velocidades diferentes?
6. O easing é da família power ou escorregou para bounce/elastic?
7. Funciona ao rolar **para trás**?
8. `prefers-reduced-motion` tem um caminho decente?

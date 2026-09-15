---
name: visual-qa-performance
description: QA visual e performance da landing RAIO X — renderizar e conferir a tela de verdade antes de considerar qualquer seção pronta, validar 1440x900 / 1920x1080 / 390x844, adaptar mobile sem matar o storytelling, otimizar assets e respeitar prefers-reduced-motion. Use ao terminar uma seção, ao revisar a landing, ao ajustar mobile ou ao investigar peso/travamento da página.
---

# RAIO X — Visual QA & Performance

## Regra principal

**Nunca considerar uma seção visualmente concluída apenas porque o código está correto.**

Código correto e composição correta são coisas diferentes. Crop errado, texto colidindo
com corrente, objeto cortado no lugar errado, hierarquia invertida — nada disso aparece
no TypeScript.

Fluxo obrigatório:

```
implementar → renderizar → verificar visualmente → corrigir → verificar novamente
```

A segunda verificação não é opcional. Corrigir e assumir que resolveu é o erro comum.

## Como verificar

Rodar o dev server e capturar a tela com Playwright (Chromium já está disponível no
ambiente). Capturar a seção em repouso **e** em pelo menos dois pontos do progresso de
scroll quando ela for animada — uma cena sticky só revela seus problemas no meio da
transformação.

Viewports mínimos:

- **1440 x 900** — desktop padrão, o mais importante
- **1920 x 1080** — desktop grande, onde o espaço negativo costuma se desmanchar
- **390 x 844** — mobile, onde o crop costuma quebrar

## O que olhar em cada tela

- Hierarquia — o olho vai primeiro para onde deveria?
- Crop — o objeto está cortado no lugar certo, ou "quase inteiro"?
- Proporção e escala do objeto em relação à tipografia
- Alinhamento e composição
- Espaço negativo — existe de verdade ou o quadro encheu?
- Clipping indevido, overflow horizontal
- Sobreposição — corrente/objeto cobrindo texto que precisa ser lido
- Contraste e legibilidade (texto prata sobre navy, ciano sobre navy)
- Profundidade — dá para ler os três planos?
- Continuidade com a próxima seção — a emenda funciona?
- Objetos indevidamente cortados
- Textos saindo da viewport
- Estados intermediários da animação, não só início e fim

Verificar também o scroll **para trás**: cenas com scrub frequentemente ficam corretas
descendo e erradas subindo.

## Mobile

Mobile **não é** remover todas as animações. É adaptar.

Pode:

- reduzir a quantidade de elementos em cena
- reduzir deslocamentos e intensidade de parallax
- simplificar sequências sticky (3 estados viram 2)
- trocar composição diagonal ampla por um crop vertical mais fechado

Deve preservar:

- o storytelling e a ordem narrativa
- a direção visual e a atmosfera
- os objetos principais (ampulheta, correntes, engrenagens, lupa)
- a sensação premium

Uma versão mobile "só texto empilhado" é falha de entrega, não simplificação.

Atenção específica no mobile: altura de viewport com barra de navegação
(usar `dvh`), tipografia display que precisa continuar grande, objeto que no desktop
sai pela lateral e no mobile precisa sair por cima ou por baixo.

## Performance

Priorizar:

- WebP como padrão; AVIF onde valer o ganho
- SVG para traço, máscara e formas que escalam
- `preload` apenas dos assets críticos do primeiro viewport
- lazy loading para todo o resto
- animar apenas `transform` e `opacity`
- imagens dimensionadas corretamente (nada de servir 4000px para um slot de 800px)
- uma timeline por cena em vez de dezenas de ScrollTriggers minúsculos

Evitar:

- PNG gigante sem necessidade
- vídeo pesado em background
- blur animado e `filter` caro em elemento grande
- glow em camadas empilhadas
- renders desnecessários em componentes React durante o scroll

Metas razoáveis para esta landing: LCP < 2.5s, CLS < 0.1, scroll estável em 60fps no
desktop e sem travamento perceptível em mobile mediano.

Ao investigar travamento: abrir o performance profile durante o scroll e procurar
long tasks, layout thrashing e paint de área grande — normalmente é `filter`,
imagem superdimensionada ou animação de propriedade não-composta.

## prefers-reduced-motion

Sempre implementado. Quando ativo:

- reduzir parallax
- reduzir grandes transformações
- remover movimentos intensos e scrub
- **preservar** todo o conteúdo
- **preservar** a hierarquia e a composição

Testar de verdade com a media feature emulada, não apenas confiar no código.

## Checagem antes de dar uma seção como entregue

1. Foi renderizada e olhada, não só compilada?
2. Os três viewports foram conferidos?
3. Os estados intermediários da animação foram conferidos?
4. Funciona rolando para trás?
5. Mobile mantém o storytelling ou virou texto empilhado?
6. Há overflow horizontal em algum breakpoint?
7. A emenda com a seção seguinte funciona?
8. Assets estão em formato e tamanho corretos?
9. `prefers-reduced-motion` foi testado?
10. Depois da correção, foi verificado **de novo**?

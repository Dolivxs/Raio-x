---
name: raiox-art-direction
description: Direção de arte, identidade visual, composição, tipografia, uso de imagens, hierarquia e copy da landing page RAIO X EMPRESARIAL. Use SEMPRE antes de criar ou alterar qualquer seção, hero, layout, escolha de cor, escolha de fonte, tratamento de imagem ou texto da landing. Também use ao revisar se uma seção "parece genérica" ou ao decidir entre duas composições.
---

# RAIO X — Direção de Arte

Missão desta skill: impedir que a landing vire mais uma página genérica de SaaS/infoproduto
e manter a identidade do material oficial do RAIO X Empresarial.

## Regra fundamental de fontes

| Fonte | O que ela define | O que ela NÃO define |
|---|---|---|
| **PDF oficial do RAIO X** | Identidade, paleta, símbolos, conteúdo, copy, linguagem | — |
| **Vídeo de referência** | Movimento, ritmo, scroll, composição, comportamento | Identidade visual |

O vídeo de referência é uma landing de estúdio de arquitetura: fundo claro, off-white,
acento laranja, desenhos técnicos de linha fina, tipografia enorme e esparsa,
cenas full-bleed encadeadas por scroll.

**Dela aproveitamos:** cena = uma ideia, tipografia grande com pouquíssimas palavras,
composição editorial assimétrica, precisão técnica, ritmo lento e controlado,
elementos que se constroem durante o scroll, transições entre cenas full-viewport.

**Dela NUNCA aproveitamos:** fundo claro, laranja, estética de blueprint arquitetônico,
tipografia da referência, layout literal das telas.

Se em algum momento a landing começar a parecer aquela referência em vez de parecer
o RAIO X, a direção está errada. A referência é gramática de movimento, não identidade.

## Paleta

Amostrada diretamente do PDF oficial. Base escura, sempre.

```
--rx-navy-950  #050D18   fundo mais profundo, topo/base de seção
--rx-navy-900  #0A1A2C   fundo dominante
--rx-navy-800  #102040   blocos, cards raros, elevação
--rx-navy-700  #103050   transições e degradês
--rx-blue-600  #10557F   azul profundo intermediário
--rx-cyan-500  #10C0E0   ACENTO PRINCIPAL — títulos-chave, destaques, linhas
--rx-cyan-300  #7FDBFF   apoio de ciano, textos de destaque secundário
--rx-white     #FFFFFF   títulos e texto principal
--rx-silver    #C6CED8   texto de apoio, metal, logo
--rx-gold-500  #C9A227   detalhe pontual: correntes, engrenagens, molduras
```

Disciplina de cor:

- Ciano é **acento**, não fundo. Uma landing inteira em ciano mata o ciano.
- Ouro é **detalhe**, aparece no objeto (corrente, engrenagem, aro da lupa), quase nunca em texto.
- Verde e vermelho existem **apenas** no bloco "É para você / Não é para você", como no PDF.
- Nada de gradiente arco-íris, nada de roxo, nada de magenta.
- Profundidade se faz com valor (claro/escuro) e atmosfera, não com saturação.

## Símbolos e o que cada um significa

Os objetos são narrativa, não enfeite. Cada um carrega um significado fixo:

- **Ampulheta** — tempo e esforço se esvaindo. Trabalhar demais sem resultado.
- **Correntes** — bloqueio, o que trava. Douradas, pesadas, atravessam a cena.
- **Cordas** — tensão, o fio que liga as etapas. Reaparecem entre seções.
- **Engrenagens** — o mecanismo da empresa. Dessincronizadas no começo, alinhadas no fim.
- **Lupa** — diagnóstico. Revela a segunda camada: sintoma → causa.
- **Âncora** — o negócio parado, preso no mesmo lugar.
- **Roda de hamster / roda do leme** — correr muito e não sair do lugar / conduzir sem direção.
- **Fratura no vidro / rachadura** — a fratura silenciosa da gestão.
- **Peças metálicas, prata, escovado** — precisão, exame, instrumento clínico.

Um objeto sem função narrativa na cena em que aparece deve ser removido.

## Conceito central

A landing é uma **máquina empresarial travada** sendo diagnosticada.

Início: mecanismos fora de sincronia, correntes prendendo, ampulheta escorrendo,
engrenagens que não engatam, tensão nas cordas.

Meio: o RAIO X entra. A lupa revela o que está por baixo da superfície.

Ao longo das 6 etapas — ANAMNESE → RAIO-X → LAUDO → TRATAMENTO → PRESCRIÇÃO →
ACOMPANHAMENTO — o mecanismo passa a fazer sentido: engrenagens engatam, correntes
se soltam, a composição se organiza.

Final: precisão, clareza, decisão. Não euforia.

Essa progressão é a espinha dorsal da página. Toda seção deve saber em que ponto
dessa curva ela está.

## Composição

Priorizar:

- Composição editorial, não grid de produto
- Elementos grandes — objeto pode ocupar 60–80% da viewport
- Assimetria controlada
- Objetos parcialmente fora da viewport (crop intencional é assinatura do projeto)
- Três planos declarados: foreground / middleground / background
- Espaço negativo generoso — o vazio é parte da composição
- Tipografia grande, poucas palavras por cena
- Atmosfera cinematográfica: névoa azul, luz direcional, vinheta sutil
- Precisão e sensação premium

Evitar:

- Layout SaaS, grid de 3 colunas com ícone-título-parágrafo
- Card para tudo
- Hero 50/50
- Texto à esquerda + imagem à direita como padrão repetido
- Cyberpunk, estética gamer, neon excessivo, glow em tudo
- Partículas aleatórias
- UI futurista gratuita (HUDs, scanlines, brackets decorativos)
- Ilustrações genéricas, 3D sem propósito
- Emoji, ícones de biblioteca genérica como protagonista

Se uma seção puder ser trocada pela seção de outro produto qualquer sem alteração,
ela está genérica. Reescreva a composição.

## Tipografia

- Uma família sans geométrica/grotesca de peso alto para display, uma para texto.
  Pode ser a mesma família em pesos diferentes.
- Display: peso 700–800, tracking levemente negativo, caixa alta ou sentence case
  conforme o PDF. Tamanhos de verdade — `clamp()` chegando a 5–9rem no desktop.
- O padrão do PDF é **título em duas camadas**: linha em branco/prata + linha em ciano.
  Exemplo: "O QUE O SEU RAIO X" (branco) / "VAI REVELAR!" (ciano).
  Use esse recurso, é assinatura da marca.
- Corpo: 16–20px, leading confortável, largura máxima ~60ch, prata em vez de branco puro.
- Nunca centralizar blocos longos de texto.
- Poucas palavras por cena. Se a cena precisa de um parágrafo grande, provavelmente
  são duas cenas.

## Imagens e objetos

- Objeto renderizado sobre fundo escuro, com luz coerente entre as cenas
  (a luz vem majoritariamente de cima/lateral, fria).
- Preferir PNG/WebP com alfa para objetos que precisam de crop e sobreposição,
  SVG para correntes, cordas, engrenagens e linhas que precisam animar ou mascarar.
- Objeto cortado pela borda: corte no lugar certo, nunca "quase inteiro".
- Fotografia de pessoas apenas onde o PDF usa (hero/autoridade), sempre integrada
  ao ambiente azul, nunca recorte flutuante.

## Linguagem e copy

O vocabulário do projeto é **clínico**:

diagnóstico · sintoma · causa · exame · raio-x · laudo · tratamento · prescrição ·
anamnese · acompanhamento · fratura · bloqueio · destravar · auto-medicar ·
consulta · protocolo

Proibido:

- "revolucione seu negócio"
- "alcance novos patamares"
- "desbloqueie seu potencial"
- "transforme sua jornada"
- "solução inovadora"
- "experiência única"
- qualquer variação de hype motivacional

Preservar sempre que possível a copy original do PDF. Banco de copy oficial:

**Abertura**
"Sua empresa continua girando. Mas será que ainda está indo na direção certa?"
"A imersão presencial de 1 dia que vai revelar com diagnóstico real o que está travando
o crescimento do seu negócio."

**Excesso de trabalho**
"VOCÊ TRABALHA DEMAIS. E O RESULTADO NÃO CHEGA."
· A equipe não entrega como deveria.
· As metas não batem como deveriam.
· Você está em todas as frentes da operação, gestão, time, cliente e mesmo assim sente
  que o negócio anda no mesmo lugar.

**Tentativas**
"VOCÊ JÁ TENTOU DE TUDO:" Já fez cursos. Já contratou consultoria. Já leu livro, assistiu
mentoria. Já trocou pessoas, mudou processos.
"E mesmo assim... a sensação é a mesma: você corre, e o negócio não acompanha."

**Diagnóstico**
"O problema não é falta de esforço. É falta de DIAGNÓSTICO."
"Você está tratando sintomas e nunca olhou o RAIO X do seu negócio."
A equipe não entrega? → Você cobra mais.
As metas não batem? → Você contrata mais.
O resultado não chega? → Você trabalha mais.
"VOCÊ ESTÁ TRATANDO O SINTOMA. NÃO A CAUSA."
"E é por isso que, mesmo fazendo tudo, o problema sempre volta."

**Cura**
"NEGÓCIO DOENTE NÃO SE CURA COM PALPITE. SE CURA COM DIAGNÓSTICO."
"Palpite não cura. Motivação não cura. Mais esforço não cura. Diagnóstico da real causa
te dá possibilidades de mudar o jogo da sua empresa."
CTA: "E DIAGNÓSTICO EXIGE RAIO X"

**O método**
"UM DIA. UM DIAGNÓSTICO. UMA ROTA."
"Aqui não tem palpite. · Não tem teoria genérica. · Não tem fórmula mágica."
"TEM EXAME. TEM LAUDO. TEM PRESCRIÇÃO."
"Enxergando o que o olho nu não mostra: as obstruções, as fraturas, os pontos cegos
que estão sangrando o resultado em silêncio."

**As 6 etapas** — "Do sintoma ao tratamento, em 6 etapas clínicas."
1. ANAMNESE — Coletando os sintomas
2. RAIO-X — Enxergando o que trava
3. LAUDO — Interpretando o exame
4. TRATAMENTO — O protocolo certo
5. PRESCRIÇÃO — Seu plano para destravar
6. ACOMPANHAMENTO — Quem cuida da recuperação
"Diagnóstico sem acompanhamento volta a adoecer."

**Revelação** — "O QUE O SEU RAIO X VAI REVELAR!" / "As 5 descobertas que vão mudar
como você olha para o seu negócio." (inclui "Onde está a fratura silenciosa da sua gestão")

**Público** — "ESSE EVENTO É PARA VOCÊ?" com "É para você se" / "NÃO é para você se"
("Você quer remédio sem exame." · "Você espera motivação no lugar de método.")

**Custo** — "QUANTO TE CUSTA CONTINUAR COMO ESTÁ?"
"Um mês a mais sem diagnóstico é um mês a mais sangrando resultado em silêncio."
"FAZ A CONTA:"
"Continuar como está custa muito mais, só que parcelado em meses, em anos, em saúde,
em noites mal dormidas."

**Fechamento** — "PALMAS · 24 DE JUNHO · sua virada!"
"Turma única. Vagas limitadas."
"Quem entra, sai com diagnóstico, laudo e prescrição. Quem fica de fora, continua
tratando sintoma."
"PRONTO PARA PARAR DE TENTAR NO ESCURO?"
CTA: "QUERO MINHA VAGA"
"Você pode passar mais um ano tentando consertar o que não entende. Ou pode passar um
dia, em 24 de junho, finalmente enxergando o que estava ali o tempo todo.
A ESCOLHA É SUA."

Marca do apresentador: **TUDY VIEIRA**.

## Checagem antes de dar uma seção como pronta

1. Essa seção poderia ser de qualquer outro produto? → refazer
2. O objeto presente tem função narrativa nessa cena específica?
3. Onde essa cena está na curva travado → diagnosticado → destravado?
4. A tipografia é grande e as palavras são poucas?
5. Ciano foi usado como acento ou virou fundo?
6. Existe espaço negativo de verdade ou o quadro está cheio?
7. A copy é clínica ou escorregou para hype?

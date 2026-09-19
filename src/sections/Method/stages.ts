export type Stage = {
  n: string
  name: string
  headline: string
  text: string
}

/** Conteúdo literal do material oficial — 6 etapas clínicas. */
export const STAGES: Stage[] = [
  {
    n: '01',
    name: 'ANAMNESE',
    headline: 'COLETANDO OS SINTOMAS',
    text: "Levantamos os sintomas e entendemos o cenário atual da empresa.",
  },
  {
    n: '02',
    name: 'RAIO-X',
    headline: 'ENXERGANDO O QUE TRAVA',
    text: "Investigamos onde o resultado está travando e quais pontos exigem atenção.",
  },
  {
    n: '03',
    name: 'LAUDO',
    headline: 'INTERPRETANDO O EXAME',
    text: "Interpretamos o diagnóstico e identificamos o gargalo que mais interfere no resultado.",
  },
  {
    n: '04',
    name: 'TRATAMENTO',
    headline: 'O PROTOCOLO CERTO',
    text: "Definimos a prioridade certa para a reta final do ano.",
  },
  {
    n: '05',
    name: 'PRESCRIÇÃO',
    headline: 'SEU PLANO PARA DESTRAVAR',
    text: "Transformamos o diagnóstico em uma estratégia executável para os próximos 68 dias.",
  },
  {
    n: '06',
    name: 'ACOMPANHAMENTO',
    headline: 'QUEM CUIDA DA RECUPERAÇÃO',
    text: "Definimos como acompanhar a execução, medir o avanço e ajustar a rota.",
  },
]

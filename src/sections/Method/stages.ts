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
    text: "Toda consulta séria começa ouvindo o paciente. Vamos mapear o que você sente: onde dói, há quanto tempo, em que situações piora. É aqui que o que parece 'normal' começa a aparecer como sintoma.",
  },
  {
    n: '02',
    name: 'RAIO-X',
    headline: 'ENXERGANDO O QUE TRAVA',
    text: 'O momento da verdade. Você vai fazer, com a minha condução, o exame profundo do próprio negócio. O que está por baixo da superfície. O que você sentia mas não conseguia nomear.',
  },
  {
    n: '03',
    name: 'LAUDO',
    headline: 'INTERPRETANDO O EXAME',
    text: 'Exame sem laudo é só imagem. Aqui a gente lê o resultado juntos. Por que sua equipe não executa? Por que o resultado não chega? Causa raiz, não sintoma.',
  },
  {
    n: '04',
    name: 'TRATAMENTO',
    headline: 'O PROTOCOLO CERTO',
    text: 'Diagnóstico errado leva a tratamento errado. Com o laudo na mão, você constrói o protocolo certo para o SEU caso, não a receita genérica que serve a todos e cura ninguém.',
  },
  {
    n: '05',
    name: 'PRESCRIÇÃO',
    headline: 'SEU PLANO PARA DESTRAVAR',
    text: 'O entregável. Você sai daqui com o passo a passo construído por você, pronto para começar a executar a partir de segunda-feira.',
  },
  {
    n: '06',
    name: 'ACOMPANHAMENTO',
    headline: 'QUEM CUIDA DA RECUPERAÇÃO',
    text: 'No fechamento, apresento as soluções para te acompanhar na execução — porque diagnóstico sem acompanhamento volta a adoecer.',
  },
]

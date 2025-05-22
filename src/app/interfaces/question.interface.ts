export interface Question {
  id: number,
  question: string,
  options: string[],
  correctOptionIndex: number,
  category: string,
  currentAnswer: number | null,
}
//inserire campo currentAnswer per tenere traccia della risposta corrente
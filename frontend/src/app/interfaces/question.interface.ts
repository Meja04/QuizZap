export interface Question {
  id: number,
  question: string,
  options: string[],
  correctOptionIndex: number,
  category: string,
  currentAnswer: number | null,
}
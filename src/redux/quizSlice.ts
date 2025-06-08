import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "../interfaces/question.interface";

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  currentCategoryId: number | null;
  selectedCategory: string;
  correctAnswers: number;
  finalScore: number;
  remainingTime: number;
  isQuizCompleted: boolean;
  allQuestionsAnswered: boolean;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  currentCategoryId: null,
  selectedCategory: "",
  correctAnswers: 0,
  finalScore: 0,
  remainingTime: 120,
  isQuizCompleted: false,
  allQuestionsAnswered: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    // Imposta le domande (chiamato dal useEffect del componente)
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.currentQuestionIndex = 0;
      state.allQuestionsAnswered = false;
    },

    // Imposta categoria corrente
    setCurrentCategory: (state, action: PayloadAction<{ name: string; id: number }>) => {
      state.selectedCategory = action.payload.name;
      state.currentCategoryId = action.payload.id;
    },

    // Navigazione tra domande
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },

    // Selezione risposte
    selectAnswer: (state, action: PayloadAction<{ questionIndex: number; answerIndex: number }>) => {
      const { questionIndex, answerIndex } = action.payload;
      if (state.questions[questionIndex] && !state.isQuizCompleted) {
        state.questions[questionIndex].currentAnswer = answerIndex;
        // Controlla se tutte le domande hanno una risposta
        state.allQuestionsAnswered = state.questions.every(q => q.currentAnswer !== null);
      }
    },

    // Gestione timer
    updateRemainingTime: (state, action: PayloadAction<number>) => {
      state.remainingTime = action.payload;
    },

    // Fine quiz
    finishQuiz: (state) => {
      if (state.isQuizCompleted) return;

      state.isQuizCompleted = true;

      // Calcola risultati
      state.correctAnswers = state.questions.filter(
        q => q.currentAnswer === q.correctOptionIndex
      ).length;

      // Calcola punteggio (stesso calcolo del componente Angular)
      const correctnessPoints = state.correctAnswers * 70;
      const timeBonus = Math.max(0, state.remainingTime) * state.correctAnswers * 0.3;
      state.finalScore = correctnessPoints > 0 ? Math.round(correctnessPoints + timeBonus) : 0;
    },

    // Reset quiz (quando si cambia categoria)
    resetQuiz: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.isQuizCompleted = false;
      state.allQuestionsAnswered = false;
      state.correctAnswers = 0;
      state.finalScore = 0;
      state.remainingTime = 120;
    },
  },
});

export const {
  setQuestions,
  setCurrentCategory,
  setCurrentQuestionIndex,
  selectAnswer,
  updateRemainingTime,
  finishQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
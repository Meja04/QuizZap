import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getQuestionsByCategory } from "../../services/quiz.service";
import type { Question as QuestionType } from "../../interfaces/question.interface";
import type { Category as CategoryType } from "../../interfaces/category.interface";
import Paginator from "../paginator/Paginator";

import "./Quiz.css";
import Timer from "../timer/Timer"

function Quiz() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  useEffect(() => {
    if (!category) return;

    setSelectedCategory(category);

    getCategories().then((cats: CategoryType[]) => {
      const found = cats.find((c) => c.name === category);
      if (found) setCurrentCategoryId(found.id);
    });

    getQuestionsByCategory(category).then((data: QuestionType[]) => {
      const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 10);
      shuffled.forEach((q) => (q.currentAnswer = null));
      setQuestions(shuffled);
    });
  }, [category]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelect = (index: number) => {
    if (!isQuizCompleted && currentQuestion) {
      const updated = [...questions];
      updated[currentQuestionIndex].currentAnswer = index;
      setQuestions(updated);
      checkAllAnswered(updated);
    }
  };

  const onPageChange = (index: number): void => {
    setCurrentQuestionIndex(index);
  };


  const checkAllAnswered = (qs: QuestionType[]) => {
    setAllQuestionsAnswered(qs.every((q) => q.currentAnswer !== null));
  };

  const getAnsweredQuestionsIndices: () => number[] = (): number[] => {
    return questions
      .map((question: QuestionType, index: number) => question.currentAnswer !== null ? index : -1)
      .filter((index: number) => index !== -1);
  };

  const finishQuiz = () => {
    if (isQuizCompleted) return;

    const correct = questions.filter(
      (q) => q.currentAnswer === q.correctOptionIndex
    ).length;

    setCorrectAnswers(correct);

    const timeLeft = 60; // tempo simulato (timer da integrare)
    const score = correct * 70 + timeLeft * correct * 0.3;
    setFinalScore(Math.round(score));
    setIsQuizCompleted(true);

    navigate(`/results/${category}`, {
      state: {
        questions,
        correctAnswers: correct,
        finalScore: Math.round(score),
        remainingTime: timeLeft,
        selectedCategory: category,
        currentCategoryId,
      },
    });
  };

  return (
    <div className="quiz-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card quiz-main-card shadow border-0">

              <div className="quiz-header">
                <h1>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Quiz</h1>
              </div>

              <Timer></Timer>

              {currentQuestion && (
                <div className="quiz-question-container">
                  <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
                  <p className="question-text">{currentQuestion.question}</p>

                  <div className="options-container">
                    {currentQuestion.options.map((option, i) => (
                      <div
                        key={i}
                        className={`card option-card ${currentQuestion.currentAnswer === i ? "selected" : ""} option-card-${currentCategoryId && currentCategoryId % 6}`}
                        onClick={() => handleSelect(i)}
                      >
                        <div className="card-body">{option}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Paginator
                total={questions.length}
                current={currentQuestionIndex}
                categoryId={currentCategoryId ?? 0}
                answeredQuestions={getAnsweredQuestionsIndices()}
                onChange={onPageChange}
              />

              {currentQuestion && (
                <div className="quiz-actions mt-4">
                  <button
                    className="btn btn-light"
                    onClick={finishQuiz}
                    disabled={!allQuestionsAnswered}
                  >
                    Finish Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;

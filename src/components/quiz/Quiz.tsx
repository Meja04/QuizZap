import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import {
  setQuestions,
  setCurrentCategory,
  setCurrentQuestionIndex,
  selectAnswer,
  updateRemainingTime,
  finishQuiz,
  resetQuiz,
} from '../../redux/quizSlice';
import { getCategories, getQuestionsByCategory } from '../../services/quiz.service';
import type { Question as QuestionType } from '../../interfaces/question.interface';
import { formatTitleCase } from '../../utils/format';
import Paginator from '../paginator/Paginator';
import Timer from '../timer/Timer';
import './Quiz.css';
import Tooltip from '@mui/material/Tooltip';
import Timeout from '../timeout/Timeout';

function Quiz() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [timerDuration, setTimerDuration] = useState(120);
  const [quizFinished, setQuizFinished] = useState(false);

  // Prende i dati dallo store redux
  const {
    questions,
    currentQuestionIndex,
    currentCategoryId,
    selectedCategory,
    isQuizCompleted,
    allQuestionsAnswered,
    finalScore,
    remainingTime,
  } = useSelector((state: RootState) => state.quiz);

  // useEffect per caricare i dati iniziali
  useEffect(() => {
    if (!category) return;

    // Reset del quiz quando cambia categoria
    dispatch(resetQuiz());
    setQuizFinished(false);
    setShowTimeoutModal(false);

    // Carica categorie e trova quella corrente
    getCategories().then((data) => {
      const found = data.find((c) => c.name === category);
      if (found) {
        dispatch(setCurrentCategory({ name: category, id: found.id }));
      }
    });

    // Carica domande e randomizza array
    getQuestionsByCategory(category).then((data: QuestionType[]) => {
      const shuffled = shuffleArray([...data]).slice(0, 10);
      shuffled.forEach((q) => (q.currentAnswer = null));
      dispatch(setQuestions(shuffled));
    });
  }, [category, dispatch]);

  // Reset timer duration quando cambia categoria
  useEffect(() => {
    if (category) {
      setTimerDuration(120); // resetta il timer solo quando cambi categoria
    }
  }, [category]);

  function shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Gestione selezione risposta
  function handleSelect(answerIndex: number) {
    if (!isQuizCompleted && !quizFinished && currentQuestion) {
      dispatch(
        selectAnswer({
          questionIndex: currentQuestionIndex,
          answerIndex,
        })
      );
    }
  }

  // Gestione accessibilità per le option card
  function handleOptionKeyDown(e: React.KeyboardEvent<HTMLDivElement>, i: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(i);
    }
  }

  // Gestione cambio pagina
  function handlePageChange(index: number) {
    if (!quizFinished) {
      dispatch(setCurrentQuestionIndex(index));
    }
  }

  // Gestione aggiornamento timer - usa useCallback per stabilizzare
  const handleTimeUpdate = useCallback((seconds: number) => {
    dispatch(updateRemainingTime(seconds));
  }, [dispatch]);

  // Gestione fine tempo - usa useCallback per stabilizzare
  const handleTimeExpired = useCallback(() => {
    if (!quizFinished) {
      setQuizFinished(true);
      setShowTimeoutModal(true);
    }
  }, [quizFinished]);

  // Calcola indici domande risposte
  function getAnsweredQuestionsIndices(): number[] {
    return questions
      .map(function (question: QuestionType, index: number) {
        return question.currentAnswer !== null ? index : -1;
      })
      .filter(function (index: number) {
        return index !== -1;
      });
  }

  // Gestione fine quiz
  function handleFinishQuiz() {
    if (isQuizCompleted || quizFinished) return;

    setQuizFinished(true);
    dispatch(finishQuiz());

    // Salva tutte le info necessarie
    const resultData = {
      category,
      correctAnswers: questions.filter((q) => q.currentAnswer === q.correctOptionIndex).length,
      totalQuestions: questions.length,
      finalScore: finalScore,
      questions,
      remainingTime,
      selectedCategory,
      isQuizCompleted: true,
    };

    sessionStorage.setItem(`quiz_result_${category}`, JSON.stringify(resultData));
    navigate(`/results/${category}`);
  }

  // Gestione chiusura modale timeout
  const handleCloseTimeoutModal = () => {
    setShowTimeoutModal(false);
    
    // Finalizza il quiz quando chiudi il modale
    if (!isQuizCompleted) {
      dispatch(finishQuiz());
      
      const resultData = {
        category,
        correctAnswers: questions.filter((q) => q.currentAnswer === q.correctOptionIndex).length,
        totalQuestions: questions.length,
        finalScore: finalScore,
        questions,
        remainingTime: 0,
        selectedCategory,
        isQuizCompleted: true,
        timedOut: true,
      };

      sessionStorage.setItem(`quiz_result_${category}`, JSON.stringify(resultData));
      navigate(`/results/${category}`);
    }
  };

  function getOptionClass(currentAnswer: number | null, i: number, currentCategoryId: number | null) {
    return `card option-card${currentAnswer === i ? ' selected' : ''} option-card-${currentCategoryId && (currentCategoryId % 6)}`;
  }

  return (
    <div className="quiz-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card quiz-main-card shadow border-0">
              <div className="quiz-header">
                <h2>{formatTitleCase(selectedCategory)} Quiz</h2>
              </div>

              <div className="quiz-content">
                {questions.length > 0 && !quizFinished && (
                  <div className="quiz-timer">
                    <Timer
                      key={selectedCategory}
                      duration={timerDuration}
                      categoryId={currentCategoryId || 0}
                      onTimeExpired={handleTimeExpired}
                      onTimeUpdate={handleTimeUpdate}
                    />
                  </div>
                )}

                {currentQuestion && !quizFinished && (
                  <div className="quiz-question-container">
                    <h3>
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h3>
                    <p className="question-text">{currentQuestion.question}</p>

                    <div className="options-container">
                      {currentQuestion.options.map((option, i) => {
                        return (
                          <div
                            key={i}
                            className={getOptionClass(currentQuestion.currentAnswer, i, currentCategoryId)}
                            onClick={() => handleSelect(i)}
                            tabIndex={0}
                            role="button"
                            aria-pressed={currentQuestion.currentAnswer === i}
                            aria-label={option}
                            onKeyDown={(e) => handleOptionKeyDown(e, i)}
                          >
                            <div className="card-body">{option}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {questions.length > 0 && !quizFinished && (
                  <div className="quiz-paginator">
                    <Paginator
                      total={questions.length}
                      current={currentQuestionIndex}
                      categoryId={currentCategoryId || 0}
                      answeredQuestions={getAnsweredQuestionsIndices()}
                      onChange={handlePageChange}
                    />
                  </div>
                )}
              </div>

              {currentQuestion && !quizFinished && (
                <div className="quiz-actions">
                  {allQuestionsAnswered ? (
                    <button className="btn btn-light" onClick={handleFinishQuiz} disabled={false}>
                      Finish Quiz
                    </button>
                  ) : (
                    <Tooltip title="You must answer all questions before finishing the quiz" followCursor>
                      <div className="button-tooltip">
                        <button className="btn btn-light" onClick={handleFinishQuiz} disabled>
                          Finish Quiz
                        </button>
                      </div>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modale per il timeout */}
      <Timeout 
        open={showTimeoutModal} 
        onClose={handleCloseTimeoutModal} 
      />
    </div>
  );
}

export default Quiz;
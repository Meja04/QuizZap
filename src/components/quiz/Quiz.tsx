import { useEffect, useState } from 'react';
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

// Definisci l'interfaccia per le props del componente Quiz
interface QuizProps {
  // Se il componente Quiz riceve delle props, definiscile qui
}

// Definisci l'interfaccia per lo stato del modale
interface ModalState {
  show: boolean;
  message: string;
}

function Quiz({ }: QuizProps) {
  const { category } = useParams<{ category: string }>(); // prendo categoria da url
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Stato locale per il modale
  const [modal, setModal] = useState<ModalState>({ show: false, message: '' });

  // prende i dati dallo store redux
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

  // useEffect per caricare i dati (come nel componente Home)
  useEffect(() => {
    if (!category) return;

    // Reset del quiz quando cambia categoria
    dispatch(resetQuiz());

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
    if (!isQuizCompleted && currentQuestion) {
      dispatch(
        selectAnswer({
          questionIndex: currentQuestionIndex,
          answerIndex,
        })
      );
    }
  }

  // Gestione cambio pagina
  function handlePageChange(index: number) {
    dispatch(setCurrentQuestionIndex(index));
  }

  // Gestione aggiornamento timer
  function handleTimeUpdate(seconds: number) {
    dispatch(updateRemainingTime(seconds));
  }

  // Gestione fine tempo (mostra il modale)
  const handleTimeExpired = () => {
    setModal({ show: true, message: 'Time expired!' });
    handleFinishQuiz(); // Chiama handleFinishQuiz anche quando il tempo scade
  };

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
    if (isQuizCompleted) return;

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

  // Gestione chiusura modale
  const handleCloseModal = () => {
    setModal({ show: false, message: '' });
  };

  return (
    <div className="quiz-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card quiz-main-card shadow border-0">
              <div className="quiz-header">
                <h1>{formatTitleCase(selectedCategory)} Quiz</h1>
              </div>

              <div className="quiz-content">
                {questions.length > 0 && (
                  <div className="quiz-timer">
                    <Timer
                      duration={120}
                      categoryId={currentCategoryId || 0}
                      onTimeExpired={handleTimeExpired}
                      onTimeUpdate={handleTimeUpdate}
                      onShowModal={(show) => setModal({ show, message: 'Time expired!' })} // Mostra il modale quando il tempo scade
                    />
                  </div>
                )}

                {currentQuestion && (
                  <div className="quiz-question-container">
                    <h2>
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <p className="question-text">{currentQuestion.question}</p>

                    <div className="options-container">
                      {currentQuestion.options.map((option, i) => {
                        const optionClass = `card option-card ${currentQuestion.currentAnswer === i ? 'selected' : ''
                          }
                          option-card-${currentCategoryId && (currentCategoryId % 6)}`;
                        return (
                          <div key={i} className={optionClass} onClick={() => handleSelect(i)}>
                            <div className="card-body">{option}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {questions.length > 0 && (
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
              {currentQuestion && (
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
      {modal.show && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modal.message}</h2>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
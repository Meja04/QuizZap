import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { resetQuiz, setQuestions, setCurrentCategory, finishQuiz, updateRemainingTime } from "../../redux/quizSlice";
import { saveScore } from "../../services/score.service";
import type { Question } from "../../interfaces/question.interface";
import { formatTitleCase } from "../../utils/format";
import { formatTime } from "../../utils/format";
import "./Results.css";

function Results() {
  const { category } = useParams<{ category: string }>(); // prendo categoria da url
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // prende i dati dallo store redux
  const {
    questions,
    correctAnswers,
    finalScore,
    remainingTime,
    selectedCategory,
    isQuizCompleted
  } = useSelector((state: RootState) => state.quiz);

  const playerName = useSelector((state: RootState) => state.player.name);

  const scoreKey = `${playerName}_${category}_${finalScore}`;

  // Inizializza scoreSaved leggendo dal localStorage
  const [scoreSaved, setScoreSaved] = useState(() => {
    return localStorage.getItem(scoreKey) === "saved";
  });

  useEffect(function restoreResultsFromSession() {
    if (isQuizCompleted && questions.length > 0) {
      // Caso normale - dati nello store
      return;
    }

    // Caso refresh - prova a recuperare da sessionStorage
    const savedResult = sessionStorage.getItem(`quiz_result_${category}`);
    if (savedResult) {
      const resultData = JSON.parse(savedResult);

      // Ripopola lo store Redux con i dati recuperati
      dispatch(setQuestions(resultData.questions));
      dispatch(setCurrentCategory({ name: resultData.selectedCategory, id: resultData.currentCategoryId }));
      dispatch(updateRemainingTime(resultData.remainingTime));
      dispatch(finishQuiz());
      return;
    }

    // Se non ci sono dati validi, vai alla home
    navigate("/");
  }, [category, isQuizCompleted, questions.length, dispatch, navigate]);

  function getScoreMessage(): string {
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 70) return "Great job!";
    if (percentage >= 50) return "Good result!";
    return "Keep going!";
  }

  function handleSaveScore(): void {
    if (scoreSaved) return;

    const scoreData = {
      username: playerName,
      category: category || "",
      score: finalScore,
      date: new Date(),
    };

    saveScore(scoreData)
      .then(() => {
        console.log("Score saved successfully");
        setScoreSaved(true);
        localStorage.setItem(scoreKey, "saved");
      })
      .catch((error) => {
        console.error("Error saving score:", error);
      });
  }

  function isAnswerCorrect(question: Question): boolean {
    return question.currentAnswer === question.correctOptionIndex;
  }

  function handleRestartQuiz(): void {
    // reset dello stato redux prima di riavviare il quiz
    dispatch(resetQuiz());
    navigate(`/quiz/${category}`);
    window.scrollTo(0, 0);
  }

  function handleViewLeaderboard(): void {
    navigate(`/leaderboard/${category}`);
    window.scrollTo(0, 0);
  }

  function handleBackToCategories(): void {
    // reset dello stato redux quando si torna alla home
    dispatch(resetQuiz());
    navigate("/");
    window.scrollTo(0, 0);
  }

  // Se non ci sono dati del quiz, non renderizzare nulla
  if (!isQuizCompleted || questions.length === 0) {
    return null;
  }

  return (
    <div className="result-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card result-main-card shadow border-0">

              <div className="result-header">
                <h1>{formatTitleCase(selectedCategory)} Quiz Results</h1>
              </div>

              <div className="result-content">
                <div className="quiz-results">
                  <h3>{getScoreMessage()}</h3>

                  <div className="score-summary mb-0 mt-0">
                    <div className="score-item">
                      <strong>Correct Answers:</strong> {correctAnswers} / {questions.length}
                    </div>
                    <div className="score-item">
                      <strong>Final Score:</strong> {finalScore} points
                    </div>
                    <div className="score-item">
                      <strong>Remaining Time:</strong> {formatTime(remainingTime)}
                    </div>
                    <div className="score-actions">
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleSaveScore}
                        disabled={scoreSaved}
                      >
                        {scoreSaved ? 'Score Saved!' : 'Save Score'}
                      </button>
                    </div>
                  </div>

                  <div className="answers-review mt-4 mb-0">
                    <h2>Answers review:</h2>
                    {questions.map((question, i) => (
                      <div key={question.id} className="question-review">
                        <h4>Question {i + 1}: {question.question}</h4>

                        <div className="review-options">
                          {question.options.map((option, optionIndex) => {
                            const isCorrect = optionIndex === question.correctOptionIndex;
                            const isUserAnswer = optionIndex === question.currentAnswer;
                            const isWrongAnswer = isUserAnswer && !isAnswerCorrect(question);

                            return (
                              <div
                                key={optionIndex}
                                className={`review-option ${isCorrect ? 'correct' : ''} ${isWrongAnswer ? 'wrong' : ''}`}
                              >
                                {option}
                                {isCorrect && (
                                  <span className="correct-label"> (Correct)</span>
                                )}
                                {isWrongAnswer && (
                                  <span className="wrong-label"> (Your answer)</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Azioni Finali */}
                  <div className="final-actions">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleViewLeaderboard}
                    >
                      {formatTitleCase(selectedCategory)} Leaderboard
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleRestartQuiz}
                    >
                      Restart Quiz
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleBackToCategories}
                    >
                      Back to Categories
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
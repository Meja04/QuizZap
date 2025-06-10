import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getScoresByCategory } from "../../services/quiz.service";
import type { Category as CategoryType } from "../../interfaces/category.interface";
import type { Score } from "../../interfaces/score.interface";
import "./Leaderboard.css";
import { formatTitleCase } from "../../utils/format";

function Leaderboard() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "");
  const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);

  // Carica categorie e aggiorna categoria selezionata
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      if (selectedCategory) {
        const found = data.find((c) => c.name === selectedCategory);
        if (found) setCurrentCategoryId(found.id);
      }
    });
  }, [selectedCategory]);

  // Aggiorna categoria selezionata quando cambia il parametro nell'URL
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
      const found = categories.find((c) => c.name === category);
      if (found) setCurrentCategoryId(found.id);
    }
  }, [category, categories]);

  // Carica punteggi quando cambia la categoria selezionata
  useEffect(() => {
    if (selectedCategory) {
      getScoresByCategory(selectedCategory).then((data) => {
        setScores([...data].sort((a, b) => b.score - a.score));
      });
    }
  }, [selectedCategory]);

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    navigate(`/leaderboard/${newCategory}`);
    window.scrollTo(0, 0);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const badgeClass = `badge score-badge badge-${currentCategoryId % 6}`;

  return (
    <div className="leaderboard-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card leaderboard-main-card shadow border-0">

              {/* Leaderboard Header */}
              <div className="leaderboard-header">
                <h1>Leaderboard: {formatTitleCase(selectedCategory)}</h1>
              </div>

              <div className="leaderboard-content">
                {/* Category Selector */}
                {categories.length > 0 && (
                  <div className="category-selector">
                    <label htmlFor="category">Select a category:</label>
                    <select
                      id="category"
                      className="form-select"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {formatTitleCase(category.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Leaderboard Table */}
                {scores.length > 0 && (
                  <div className="table-container">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col" className="text-center">Player</th>
                            <th scope="col" className="text-center">Score</th>
                            <th scope="col" className="text-center">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scores.map((score, i) => (
                            <tr key={score.id}>
                              <td className="position-cell text-center">{i + 1}</td>
                              <td className="username-cell text-center"><strong>{score.username}</strong></td>
                              <td className="text-center">
                                <span className={badgeClass}>
                                  {score.score}
                                </span>
                              </td>
                              <td className="date-cell text-center">
                                {new Date(score.date).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="back-to-top mt-4">
                  <button type="button" className="btn btn-light" onClick={scrollToTop}>
                    <i className="material-icons">keyboard_arrow_up</i>
                    Back to top
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
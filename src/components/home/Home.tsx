import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../services/quiz.service";
import Category from "../category/Category";
import "./Home.css";

import type { RootState } from "../../redux/store";
import { setPlayerName } from "../../redux/playerSlice";
import type { Category as CategoryType } from "../../interfaces/category.interface";

function Home() {
  const dispatch = useDispatch();
  const playerName = useSelector((state: RootState) => state.player.name);
  const [inputName, setInputName] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  function saveName() {
    const trimmed = inputName.trim();
    if (trimmed) {
      dispatch(setPlayerName(trimmed)); // aggiorna stato globale
      setInputName("");
    }
  }

  return (
    <div className="page-container">
      <main className="container-fluid">
        <div className="container">
          {!playerName && (
            <div className="row justify-content-center mb-4">
              <div className="col-12 col-lg-8">
                <div className="card shadow border-0">
                  <div className="card-body text-center py-5">
                    <h2 className="form-title text-center mb-4">Choose a nickname to start playing:</h2>
                    <div className="mb-3 text-center">
                      <label className="form-label">Your name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveName()}
                        placeholder="Insert your name"
                      />
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary px-4"
                        onClick={saveName}
                        disabled={!inputName.trim()}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {playerName && (
            <>
              <div className="row justify-content-center mb-4">
                <div className="col-12 col-lg-8">
                  <div className="card shadow border-0">
                    <div className="card-body text-center py-5">
                      <div className="mb-4">
                        <h2 className="welcome-title mb-4">
                          Welcome, <span className="player-name">{playerName}</span>!
                        </h2>
                        <p className="welcome-subtitle mb-2">Test your knowledge with QuizZap.</p>
                      </div>
                      <p className="welcome-subsubtitle mb-0">Choose a category and start your adventure:</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="row">
                    {categories.map((category) => (
                      <div key={category.id} className="col-12 col-md-6 col-lg-4 category-item">
                        <Category category={category} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
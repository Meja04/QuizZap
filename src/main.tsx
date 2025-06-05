import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App"; // layout principale
import Home from "./components/home/Home";
import Quiz from "./components/quiz/Quiz";
import Results from "./components/results/Results";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Page from "./components/Page"; // per i titoli dinamici

import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              element={<Page title="Home Page - QuizZap"><Home /></Page>}
            />
            <Route
              path="quiz/:category"
              element={<Page title="Quiz Game - QuizZap"><Quiz /></Page>}
            />
            <Route
              path="results/:category"
              element={<Page title="Quiz Results - QuizZap"><Results /></Page>}
            />
            <Route
              path="leaderboard/:category"
              element={<Page title="Leaderboard - QuizZap"><Leaderboard /></Page>}
            />
            <Route
              path="leaderboard"
              element={<Navigate to="/leaderboard/videogames" replace />}
            />
            <Route
              path="*"
              element={<Page title="404 - QuizZap"><h2>404 - Page Not Found</h2></Page>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
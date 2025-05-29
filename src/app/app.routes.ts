import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page - QuizZap'
  },
  {
    path: 'results/:category',
    component: ResultsComponent,
    title: 'Quiz Results - QuizZap'
  },
  {
    path: 'quiz/:category',
    component: QuizComponent,
    title: 'Quiz Game - QuizZap'
  },
  {
    path: 'leaderboard/:category',
    component: LeaderboardComponent,
    title: 'Leaderboard - QuizZap'
  },
  {
    path: 'leaderboard',
    redirectTo: 'leaderboard/videogames',
    pathMatch: 'full'
  },
];

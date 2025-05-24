import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {
    path: 'quiz/:category',
    component: QuizComponent,
    title: 'Quiz Game'
  },
  {
    path: 'leaderboard', // /:category da aggiungere
    component: LeaderboardComponent,
    title: 'Classifica'
  }
];

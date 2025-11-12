import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ResultsComponent } from './components/results/results.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - QuizZap',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register - QuizZap',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'Home - QuizZap',
  },
  {
    path: 'quiz/:category',
    component: QuizComponent,
    canActivate: [authGuard],
    title: 'Quiz Game - QuizZap',
  },
  {
    path: 'results/:category',
    component: ResultsComponent,
    canActivate: [authGuard],
    title: 'Quiz Results - QuizZap',
  },
  {
    path: 'leaderboard/:category',
    component: LeaderboardComponent,
    canActivate: [authGuard],
    title: 'Leaderboard - QuizZap',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../interfaces/question.interface';
import { ScoreService } from '../../services/score.service';

interface QuizResults {
  questions: Question[];
  correctAnswers: number;
  finalScore: number;
  remainingTime: number;
  selectedCategory: string;
  currentCategoryId: number;
}

@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
  imports: [
    CommonModule
  ],
})
export class ResultsComponent implements OnInit {
  questions: Question[] = [];
  correctAnswers = 0;
  finalScore = 0;
  remainingTime = 0;
  selectedCategory = '';
  currentCategoryId = 0;
  playerName = '';
  scoreSaved = false;

  constructor(
    private scoreService: ScoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.playerName = localStorage.getItem('playerName') || '';

    this.route.params.subscribe(params => {
      this.selectedCategory = params['category'];
    });

    // Recupera i dati dai parametri di navigazione
    const state = history?.state as QuizResults;

    if (state) {
      this.questions = state.questions;
      this.correctAnswers = state.correctAnswers;
      this.finalScore = state.finalScore;
      this.remainingTime = state.remainingTime;
      this.currentCategoryId = state.currentCategoryId;

      // Controlla se questo specifico punteggio è già stato salvato
      this.scoreSaved = localStorage.getItem(this.getScoreKey()) === 'saved';
    } else {
      // Se non ci sono dati, reindirizza alla home
      this.router.navigate(['/']);
    }
  }

  private getScoreKey(): string {
    return `${this.playerName}_${this.selectedCategory}_${this.finalScore}`;
  }

  getScoreMessage(): string {
    const percentage = Math.round((this.correctAnswers / this.questions.length) * 100);
    if (percentage >= 90) return 'Excellent!';
    if (percentage >= 70) return 'Great job!';
    if (percentage >= 50) return 'Good result!';
    return 'Keep going!';
  }

  saveScore(): void {
    if (this.scoreSaved) return;

    const scoreData = {
      username: this.playerName,
      category: this.selectedCategory,
      score: this.finalScore,
      date: new Date()
    };

    this.scoreService.saveScore(scoreData).subscribe({
      next: () => {
        console.log('Score saved successfully');
        this.scoreSaved = true;

        // Salva nel localStorage per prevenire salvataggi futuri dello stesso punteggio
        localStorage.setItem(this.getScoreKey(), 'saved');
      },
      error: (error) => {
        console.error('Error saving score:', error);
        // Non modificare scoreSaved in caso di errore per permettere un nuovo tentativo
      }
    });
  }

  isAnswerCorrect(questionIndex: number): boolean {
    const question = this.questions[questionIndex];
    return question.currentAnswer === question.correctOptionIndex;
  }

  restartQuiz(): void {
    this.router.navigate(['/quiz', this.selectedCategory]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  viewCategoryLeaderboard(): void {
    this.router.navigate(['/leaderboard', this.selectedCategory]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  goBackToCategories(): void {
    this.router.navigate(['/']).then(() => {
      window.scrollTo(0, 0);
    });
  }
  
}
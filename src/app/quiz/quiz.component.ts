import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { PaginatorComponent } from '../paginator/paginator.component';
import { TimerComponent } from '../timer/timer.component';

import { Question } from '../interfaces/question.interface';
import { Score } from '../interfaces/score.interface';

import { QuizService } from '../services/quiz.service';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
  imports: [
    CommonModule,
    PaginatorComponent,
    TimerComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
})
export class QuizComponent implements OnInit {
  @ViewChild('quizTimer') timerComponent!: TimerComponent;

  // Proprietà esistenti
  questions: Question[] = [];
  showResult = false;
  selectedCategory: string = '';
  currentQuestionIndex = 0;
  currentCategoryId!: number;

  // Proprietà per il punteggio
  correctAnswers = 0;
  finalScore = 0;
  remainingTime = 0;
  isQuizCompleted = false;
  allQuestionsAnswered = false;

  // Proprietà per il salvataggio del punteggio
  playerName!: string;
  scoreSaved = false;


  constructor(
    private quizService: QuizService,
    private scoreService: ScoreService, // Inietta il nuovo servizio
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.playerName = localStorage.getItem('playerName') || '';

    this.quizService.getCategories().subscribe((categories) => {
      this.route.paramMap.subscribe(params => {
        const categoryName = params.get('category');
        if (categoryName) {
          this.selectedCategory = categoryName;
          const foundCategory = categories.find(c => c.name === categoryName);
          if (foundCategory) {
            this.currentCategoryId = foundCategory.id;
          }
          this.loadCategory(this.selectedCategory);
        }
      });
    });
  }

  loadCategory(category: string): void {
    this.quizService.getQuestionsByCategory(category).subscribe((data) => {
      const shuffled = this.shuffleArray([...data]);
      this.questions = shuffled.slice(0, 2);
      this.questions.forEach(q => q.currentAnswer = null);
    });
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  get currentQuestion(): Question | null {
    return this.questions[this.currentQuestionIndex] ?? null;
  }

  onPageChange(index: number): void {
    this.currentQuestionIndex = index;
  }

  selectAnswer(optionIndex: number): void { //seleziona la risposta
    if (this.currentQuestion && !this.isQuizCompleted) {
      this.currentQuestion.currentAnswer = optionIndex;
      this.checkAllQuestionsAnswered(); //controlla se tutte le domande hanno una risposta
    }
  }

  checkAllQuestionsAnswered(): void {
    this.allQuestionsAnswered = this.questions.every(q => q.currentAnswer !== null);  //verifica che per ogni domanda q nell'array questions la proprietà currentAnswer non sia null
  }

  updateRemainingTime(seconds: number): void {
    this.remainingTime = seconds;
  }

  handleTimeExpired(): void { //chiamata quando il timer scade
    this.finishQuiz();
  }

  finishQuiz(): void { // chiamata direttamente dal pulsante termina quiz
    if (this.isQuizCompleted) return;

    this.isQuizCompleted = true;
    this.timerComponent?.stopTimer();
    this.calculateScore();
    this.showResult = true;
  }

  calculateScore(): void {
    this.correctAnswers = this.questions.filter(q =>
      q.currentAnswer === q.correctOptionIndex
    ).length;

    this.finalScore = this.scoreService.calculateScore(
      this.correctAnswers,
      Math.max(0, this.remainingTime)
    );

    console.log(`Risposte corrette: ${this.correctAnswers}`);
    console.log(`Tempo rimanente: ${this.remainingTime} secondi`);
    console.log(`Punteggio finale: ${this.finalScore}`);
  }

  getScoreMessage(): string {
    const percentage = Math.round((this.correctAnswers / this.questions.length) * 100);
    if (percentage >= 90) return 'Eccellente!';
    if (percentage >= 70) return 'Ottimo lavoro!';
    if (percentage >= 50) return 'Buon risultato!';
    return 'Continua così!';
  }

  // Salva il punteggio usando il ScoreService
  saveScore(): void {

    this.scoreSaved = true;

    const scoreData = {
      
      username: this.playerName,
      category: this.selectedCategory,
      score: this.finalScore,
      date: new Date()
    };

    this.scoreService.saveScore(scoreData).subscribe({
      next: () => {
        this.scoreSaved = true;
      },
    });
  }
  
  isAnswerCorrect(questionIndex: number): boolean {
    const question = this.questions[questionIndex];
    return question.currentAnswer === question.correctOptionIndex;
  }

  getOptionClass(questionIndex: number, optionIndex: number): string {
    const question = this.questions[questionIndex];

    // durante il quiz mostra solo la selezione
    if (!this.showResult) {
      return question.currentAnswer === optionIndex ? 'selected' : '';
    }

    // nella revisione finale mostra corretta/sbagliata
    if (optionIndex === question.correctOptionIndex) {
      return 'correct';
    }
    if (optionIndex === question.currentAnswer && !this.isAnswerCorrect(questionIndex)) {
      return 'wrong';
    }
    return '';
  }




  //pulsanti finali

  restartQuiz(): void { //reset di tutte le proprietà
    this.questions = []
    this.showResult = false;
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.finalScore = 0;
    this.remainingTime = 0;
    this.isQuizCompleted = false;
    this.allQuestionsAnswered = false;
    this.scoreSaved = false;

    // Ricarica le domande
    this.loadCategory(this.selectedCategory);

    // Riavvia il timer se necessario
    this.timerComponent?.resetTimer();
  }

  viewCategoryLeaderboard(): void {
    this.router.navigate(['/leaderboard']);
  }

  goBackToCategories(): void {
    this.router.navigate(['/']);
  }
}


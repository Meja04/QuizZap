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

import { Question } from '../../interfaces/question.interface';
import { QuizService } from '../../services/quiz.service';
import { ScoreService } from '../../services/score.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TimeoutDialogComponent } from '../timeout/timeout.component';




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
    FormsModule, MatDialogModule
  ],
})
export class QuizComponent implements OnInit {
  @ViewChild('quizTimer') timerComponent!: TimerComponent;

  questions: Question[] = [];
  currentQuestionIndex = 0;
  currentCategoryId!: number;
  selectedCategory: string = '';
  
  // Proprietà per il calcolo del punteggio
  correctAnswers = 0;
  finalScore = 0;
  remainingTime = 0;
  isQuizCompleted = false;
  allQuestionsAnswered = false;

  showModal: boolean = false;

  constructor(
    private quizService: QuizService,
    private scoreService: ScoreService,
    private route: ActivatedRoute,
    private router: Router,
      private dialog: MatDialog // aggiunto
  ) { }

  ngOnInit(): void {
    this.quizService.getCategories().subscribe((data) => {
      this.route.paramMap.subscribe(params => {
        const categoryName = params.get('category');
        if (categoryName) {
          this.selectedCategory = categoryName;
          const foundCategory = data.find(c => c.name === categoryName);
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
      this.questions = shuffled.slice(0, 10);
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

  selectAnswer(optionIndex: number): void {
    if (this.currentQuestion && !this.isQuizCompleted) {
      this.currentQuestion.currentAnswer = optionIndex;
      this.checkAllQuestionsAnswered();
    }
  }

  checkAllQuestionsAnswered(): void {
    this.allQuestionsAnswered = this.questions.every(q => q.currentAnswer !== null);
  }


getAnsweredQuestionsIndices(): number[] {
  return this.questions
    .map((question, index) => question.currentAnswer !== null ? index : -1)
    .filter(index => index !== -1);
}

  updateRemainingTime(seconds: number): void {
    this.remainingTime = seconds;
  }

  handleTimeExpired(): void {
  this.finishQuiz();

  this.dialog.open(TimeoutDialogComponent, {
    width: '400px',
    disableClose: true
  });
}


  finishQuiz(): void {console.log('Finishing quiz...');
    if (this.isQuizCompleted) return;

    this.isQuizCompleted = true;
    this.timerComponent?.stopTimer();
    this.calculateScore();
    this.navigateToResults();
  }

  calculateScore(): void {
    this.correctAnswers = this.questions.filter(q =>
      q.currentAnswer === q.correctOptionIndex
    ).length;

    this.finalScore = this.scoreService.calculateScore(
      this.correctAnswers,
      Math.max(0, this.remainingTime)
    );
  }

  navigateToResults(): void {
    // Naviga alla pagina dei risultati passando i dati necessari
    this.router.navigate(['/results', this.selectedCategory], {
      state: {
        questions: this.questions,
        correctAnswers: this.correctAnswers,
        finalScore: this.finalScore,
        remainingTime: this.remainingTime,
        selectedCategory: this.selectedCategory,
        currentCategoryId: this.currentCategoryId
      }
    });
  }



}
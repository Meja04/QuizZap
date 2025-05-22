import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../interfaces/question.interface';
import { QuizService } from '../services/quiz.service';
import { MatCardModule } from '@angular/material/card';
import { PaginatorComponent } from '../paginator/paginator.component';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
  imports: [CommonModule, PaginatorComponent, TimerComponent, MatCardModule],
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  showResult = false;
  selectedCategory: string = '';
  currentQuestionIndex = 0;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.selectedCategory = category;
        this.loadCategory(this.selectedCategory);
      }
    });
  }

  loadCategory(category: string): void {
    this.quizService.getQuestionsByCategory(category).subscribe((data) => {
      const shuffled = this.shuffleArray([...data]); // copia + shuffle
      this.questions = shuffled.slice(0, 10); // prendi le prime 10
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

}


import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Question } from '../interfaces/question.interface';
import { Score } from '../interfaces/score.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private dataService: DataService) {}

  getCategories(): Observable<Category[]> {
    return this.dataService.getData().pipe(map((data) => data.categories));
  }

  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.dataService
      .getData()
      .pipe(
        map((data) => data.questions.filter((q) => q.category === category)),
      );
  }

  getScoresByCategory(category: string): Observable<Score[]> {
    return this.dataService
      .getData()
      .pipe(map((data) => data.scores.filter((s) => s.category === category)));
  }
}

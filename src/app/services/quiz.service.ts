import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Question } from '../interfaces/question.interface';
import { Score } from '../interfaces/score.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // Stoplight
  private apiUrl = 'https://stoplight.io/mocks/rubino/test/861759111';

  // JSON server
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`);
  }

  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.url}/questions?category=${category}`);
  }

  getScoresByCategory(category: string): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.url}/scores?category=${category}`);
  }



}

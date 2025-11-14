import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Question } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // Backend Spring
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // andrebbero divise in un category.service e question.service

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`);
  }

  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(
      `${this.url}/questions?category=${category}`
    );
  }
}

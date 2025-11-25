import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Question } from '../interfaces/question.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // Backend Spring
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // andrebbero divise in un category.service e question.service

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(
      `${this.apiUrl}/questions?category=${category}`
    );
  }
}

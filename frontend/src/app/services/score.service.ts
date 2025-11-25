import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from '../interfaces/score.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  // Backend Spring
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.apiUrl}/scores`);
  }

  saveScore(scoreData: Omit<Score, 'id'>): Observable<Score> {
    return this.http.post<Score>(`${this.apiUrl}/scores`, scoreData);
  }

  getScoresByCategory(category: string): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.apiUrl}/scores?category=${category}`);
  }
}

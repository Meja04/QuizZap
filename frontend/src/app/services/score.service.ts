import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from '../interfaces/score.interface';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  // Backend Spring
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.url}/scores`);
  }

  saveScore(scoreData: Omit<Score, 'id'>): Observable<Score> {
    return this.http.post<Score>(`${this.url}/scores`, scoreData);
  }

  getScoresByCategory(category: string): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.url}/scores?category=${category}`);
  }
}

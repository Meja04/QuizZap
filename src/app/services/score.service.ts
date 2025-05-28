import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Score } from '../interfaces/score.interface';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  // Stoplight
  private apiUrl = 'https://stoplight.io/mocks/rubino/test/861759111';

  // JSON server
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  saveScore(scoreData: Omit<Score, 'id'>): Observable<Score> {
    return this.http.post<Score>(`${this.url}/scores`, scoreData);
  }

  getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.url}/scores`);
  }

  calculateScore(
    correctAnswers: number,
    remainingTime: number
  ): number {
    // Punteggio per correttezza (0-70 punti)
    const correctnessPoints = correctAnswers * 70;

    // Bonus tempo (0-30 punti)
    const timeBonus = remainingTime * correctAnswers * 0.3;

    // Punteggio totale arrotondato
    if (correctnessPoints > 0) {
      return Math.round(correctnessPoints + timeBonus);
    }
    else {
      return 0;
    }
  }
}
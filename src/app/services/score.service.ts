import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from '../interfaces/score.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  // JSON server
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  saveScore(scoreData: Omit<Score, 'id'>): Observable<Score> {
    return this.http.post<Score>(`${this.url}/scores`, scoreData);
  }

  getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.url}/scores`);
  }
}

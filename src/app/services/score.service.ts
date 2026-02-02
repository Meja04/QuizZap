import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Score } from '../interfaces/score.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private dataService: DataService) {}

  saveScore(scoreData: Omit<Score, 'id'>): Observable<Score> {
    // Simulazione POST: ritorna lo score con ID finto
    const newScore: Score = {
      ...scoreData,
      id: Date.now(), // ID temporaneo
    };

    return new Observable((observer) => {
      observer.next(newScore);
      observer.complete();
    });
  }

  getAllScores(): Observable<Score[]> {
    return this.dataService.getData().pipe(map((data) => data.scores));
  }
}

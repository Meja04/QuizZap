import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject, combineLatest } from 'rxjs';
import { Score } from '../interfaces/score.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private STORAGE_KEY = 'quizzap_scores';
  private sessionScores$ = new BehaviorSubject<Score[]>(
    this.getSessionScores(),
  );

  constructor(private dataService: DataService) {}

  saveScore(scoreData: Omit<Score, 'id'>): Observable<Score> {
    const newScore: Score = {
      ...scoreData,
      id: Date.now(),
    };

    // Salva in sessionStorage
    const savedScores = this.getSessionScores();
    savedScores.push(newScore);
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedScores));

    // Emetti nuovi scores
    this.sessionScores$.next(savedScores);

    return new Observable((observer) => {
      observer.next(newScore);
      observer.complete();
    });
  }

  getAllScores(): Observable<Score[]> {
    return combineLatest([
      this.dataService.getData().pipe(map((data) => data.scores || [])),
      this.sessionScores$,
    ]).pipe(
      map(([dbScores, sessionScores]) => [...dbScores, ...sessionScores]),
    );
  }

  private getSessionScores(): Score[] {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}

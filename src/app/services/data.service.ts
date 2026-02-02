import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Question } from '../interfaces/question.interface';
import { Score } from '../interfaces/score.interface';
import { environment } from '../environments/environment';

interface DbData {
  categories: Category[];
  questions: Question[];
  scores: Score[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data$: Observable<DbData>;

  constructor(private http: HttpClient) {
    // Carica db.json UNA sola volta
    this.data$ = this.http.get<DbData>(environment.apiUrl).pipe(shareReplay(1));
  }

  getData(): Observable<DbData> {
    return this.data$;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
  username: string;
}

interface AuthRequest {
  username: string;
  email?: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  constructor(private readonly http: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    const body: AuthRequest = { username, email, password };
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, body)
      .pipe(tap((res) => this.saveToken(res.token)));
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const body: AuthRequest = { username, password };
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, body)
      .pipe(tap((res) => this.saveToken(res.token)));
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub; // sub è il campo standard JWT per lo username
    } catch (error) {
      console.error('Errore decodifica token:', error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

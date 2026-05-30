import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface UserResponse {
  id: number;
  nome: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = `${environment.apiUrl}/user`;
  private readonly STORAGE_KEY = 'clinicare_user';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.api}/login`, request).pipe(
      tap(user => localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user)))
    );
  }

  register(request: RegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.api}/register`, request).pipe(
      tap(user => localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user)))
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  getCurrentUser(): UserResponse | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8081'

  constructor(private http: HttpClient) {}

  loginWithGoogle(): void {
    window.location.href = `${this.baseUrl}/oauth2/authorization/google`
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(`/api/user-details`, {
      withCredentials: true
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.getUserDetails().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}

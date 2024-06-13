import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password,
    });
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

    return;
  }

  isUserLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return !(token === null);
  }

  getToken(): string{
    return localStorage.getItem('token')||'';
  }
  
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['/admin']);
    return;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:8000/api/files';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private router: Router) {}

  create(data: any): Observable<any> {
    return this.http.post<any>(AUTH_API, {
      ...data
    });
  }
  fetchFiles(): Observable<any> {
    return this.http.get<any>(AUTH_API);
  }

  fetchFileById(id: number): Observable<any> {
    return this.http.get<any>(`${AUTH_API}/${id}`);
  }

  updateFileById(id: number, type: string, value: boolean): Observable<any> {
    return this.http.put<any>(`${AUTH_API}/${id}`, {
      type: type,
      value: value
    });
  }
}

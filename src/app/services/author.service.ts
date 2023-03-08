import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iauthor } from '../models/iauthor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}
  getAllAuthors(): Observable<Iauthor[]> {
    return this.http.get<Iauthor[]>(`${environment.APIBaseURL}/authors`);
  }
  addAuthor(author: Iauthor): Observable<Iauthor> {
    return this.http.post<Iauthor>(
      `${environment.APIBaseURL}/authors`,
      JSON.stringify(author),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  deleteAuthor(id: string): Observable<Iauthor> {
    return this.http.delete<Iauthor>(
      `${environment.APIBaseURL}/authors/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

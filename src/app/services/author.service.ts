import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iauthor } from '../models/iauthor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  httpHeaders = {};
  constructor(private http: HttpClient) {
    this.httpHeaders = {
      headers: {
        'x-token': `${localStorage.getItem('token')}`,
      },
    };
  }
  getAllAuthors(): Observable<Iauthor[]> {
    return this.http.get<Iauthor[]>(`${environment.APIBaseURL}/authors/`, { headers: { 'Content-Type': 'application/json' } });
  }
  getAuthorById(id: string): Observable<Iauthor> {
    return this.http.get<Iauthor>(`${environment.APIBaseURL}/authors/${id}`);
  }
  addAuthor(form: FormData): Observable<Iauthor> {
    return this.http.post<Iauthor>(
      `${environment.APIBaseURL}/authors`,
      form,
      this.httpHeaders
    );
  }
  updateAuthor(id: string, form: FormData): Observable<Iauthor> {
    return this.http.patch<Iauthor>(`${environment.APIBaseURL}/authors/${id}`, form, this.httpHeaders);
  }
  deleteAuthor(id: string): Observable<Iauthor> {
    return this.http.delete<Iauthor>(
      `${environment.APIBaseURL}/authors/${id}`,
      this.httpHeaders
    );
  }
}

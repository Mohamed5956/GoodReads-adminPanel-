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
    return this.http.get<Iauthor[]>(`${environment.APIBaseURL}/authors/`);
  }
  addAuthor(form: FormData): Observable<Iauthor> {
    return this.http.post<Iauthor>(
      `${environment.APIBaseURL}/authors`,
      form,
      this.httpHeaders
    );
  }
  deleteAuthor(id: string): Observable<Iauthor> {
    return this.http.delete<Iauthor>(
      `${environment.APIBaseURL}/authors/${id}`,
      this.httpHeaders
    );
  }
}

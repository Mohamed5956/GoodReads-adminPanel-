import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Ibook } from '../models/ibook';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpHeaders = {};
  constructor(private http: HttpClient) {
    this.httpHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'x-token': `${localStorage.getItem('token')}`,
      },
    };
  }
  getAllBooks(): Observable<Ibook[]> {
    return this.http.get<Ibook[]>(`${environment.APIBaseURL}/books`);
  }
  addBook(book: Ibook): Observable<Ibook> {
    return this.http.post<Ibook>(
      `${environment.APIBaseURL}/books`,
      JSON.stringify(book),
      this.httpHeaders
    );
  }
  deleteBook(id: string): Observable<Ibook> {
    return this.http.delete<Ibook>(`${environment.APIBaseURL}/books/${id}`, this.httpHeaders);
  }
}

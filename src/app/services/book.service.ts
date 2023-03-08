import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Ibook } from '../models/ibook';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  getAllBooks(): Observable<Ibook[]> {
    return this.http.get<Ibook[]>(`${environment.APIBaseURL}/books`);
  }
  addBook(cat: Ibook): Observable<Ibook> {
    return this.http.post<Ibook>(
      `${environment.APIBaseURL}/books`,
      JSON.stringify(cat),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  deleteBook(id: string): Observable<Ibook> {
    return this.http.delete<Ibook>(`${environment.APIBaseURL}/books/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

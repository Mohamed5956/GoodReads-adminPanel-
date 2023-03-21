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
        'x-token': `${localStorage.getItem('token')}`,
      },
    };
  }

  // return this.Http.get<any>(`${environment.baseUrl}/home/all/page/1/`/*userid*/, {
  //  headers : new HttpHeaders().set('Authorization', 'secrt token')
  // })
  getAllBooks(): Observable<Ibook[]> {
    return this.http.get<Ibook[]>(`${environment.APIBaseURL}/books/`);
  }
  getBookById(id: string): Observable<Ibook> {
    return this.http.get<Ibook>(`${environment.APIBaseURL}/books/${id}`);
  }
  addBook(form: FormData): Observable<Ibook> {
    return this.http.post<Ibook>(
      `${environment.APIBaseURL}/books/`,
      form,
      this.httpHeaders
    );
  }
  deleteBook(id: string): Observable<Ibook> {
    return this.http.delete<Ibook>(
      `${environment.APIBaseURL}/books/${id}`,
      this.httpHeaders
    );
  }
  updateBook(id: string, form: FormData) {
    return this.http.patch<Ibook>(
      `${environment.APIBaseURL}/books/${id}`,
      form,
      this.httpHeaders
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  httpHeaders = {};
  constructor(private http: HttpClient) {
    this.httpHeaders = {
      headers: {
        'x-token': `${localStorage.getItem('token')}`,
      },
    };
  }

  getAllCategories(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(`${environment.APIBaseURL}/categories`);
  }
  addCategory(form: FormData): Observable<Icategory> {
    return this.http.post<Icategory>(
      `${environment.APIBaseURL}/categories`,
      form,
      this.httpHeaders
    );
  }
  deleteCategory(id: string): Observable<Icategory> {
    return this.http.delete<Icategory>(
      `${environment.APIBaseURL}/categories/${id}`,
      this.httpHeaders
    );
  }
}

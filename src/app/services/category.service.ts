import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getAllCategories(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(`${environment.APIBaseURL}/categories`);
  }
  addCategory(cat: Icategory): Observable<Icategory> {
    return this.http.post<Icategory>(
      `${environment.APIBaseURL}/categories`,
      JSON.stringify(cat),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  deleteCategory(id: string): Observable<Icategory> {
    return this.http.delete<Icategory>(
      `${environment.APIBaseURL}/categories/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

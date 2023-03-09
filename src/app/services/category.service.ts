import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpHeaders = {};
  constructor(private http: HttpClient) {
    this.httpHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'x-token': `${localStorage.getItem('token')}`
      }
    }
  }
  getAllCategories(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(`${environment.APIBaseURL}/categories`);
  }
  addCategory(cat: Icategory): Observable<Icategory> {
    return this.http.post<Icategory>(`${environment.APIBaseURL}/categories`, JSON.stringify(cat), this.httpHeaders);
  }
}

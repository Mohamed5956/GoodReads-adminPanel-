import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PopularService {

  constructor(private http: HttpClient) { }
  getPopular(): Observable<any> {
    return this.http.get(`${environment.APIBaseURL}/popular`);
  }
}

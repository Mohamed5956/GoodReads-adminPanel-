import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ireview } from '../models/ireview';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) {

   }
  getAllReviews():Observable<Ireview[]>{
    return this.http.get<Ireview[]>(`${environment.APIBaseURL}/reviews/allReviews`);
  }
}

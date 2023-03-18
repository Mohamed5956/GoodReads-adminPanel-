import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iuser } from '../models/iuser';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedSubject: BehaviorSubject<boolean>
  constructor(
    private http: HttpClient
  ) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(false);
  }


  login(data: Iuser): Observable<Iuser> {
    return this.http.post<Iuser>(`${environment.APIBaseURL}/login`, data);
  }
  loggedIn() {
    if (localStorage.getItem('token') && localStorage.getItem('isAdmin') && localStorage.getItem('isAdmin') != 'false')
      return true;

    return false;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('image')
    localStorage.removeItem('isAdmin');
    this.isLoggedSubject.next(false);
  }

  admin() {
    if (localStorage.getItem('isAdmin') == 'true')
      return true;

    return false;

  }
}

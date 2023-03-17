import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSide = new EventEmitter();
  image = `${environment.APIBaseURL}/assets/uploads/user/${localStorage.getItem('image')}`;
  userName = localStorage.getItem('name');
  constructor(
    private authService: AuthService,
    private route: Router
  ) {

  }
  toggleSideBar() {
    this.toggleSide.emit()
  }
  logOut() {
    this.authService.isLoggedSubject.subscribe(isLogged => {
      if (!isLogged) {
        this.route.navigate(['/login']);
      }
    });
  }
}

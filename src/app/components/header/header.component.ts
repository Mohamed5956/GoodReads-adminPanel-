import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSide = new EventEmitter();
  constructor(
    private authService: AuthService
  ) {

  }
  toggleSideBar() {
    this.toggleSide.emit()
  }
  logOut() {
    this.authService.logOut();
  }
}

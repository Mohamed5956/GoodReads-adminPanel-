import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({});
  login_user: any = localStorage.getItem('login');
  vaild_login: number = 1;
  hide = true;
  constructor(private router: Router, private authservice: AuthService) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
  }
  login() {
    if (this.formGroup.valid) {
      this.authservice.login(this.formGroup.value).subscribe
        ({
          next: (data) => {
            console.log(data);
            if (data != null && data.isAdmin != false) {
              this.vaild_login = 1;
              localStorage.setItem('token', data.token!);
              localStorage.setItem("email", data.email!);
              localStorage.setItem("isAdmin", data.isAdmin!.toString());
              this.router.navigate(['/home']);
            } else {

              this.vaild_login = 0;

            }
          },
          error: () => {

            this.vaild_login = 0;

          }

        });
    }
  }
}


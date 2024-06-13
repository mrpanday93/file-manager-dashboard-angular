import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  serveError = '';
  loginForm = this.formBuilder.group({
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required])],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authSrvc: AuthenticationService
  ) {}
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onSubmit() {
    this.serveError = '';
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      if (username && password) {
        let res = this.authSrvc.login(username, password).subscribe({
          next: (v: any) => {
            if (v.token) this.authSrvc.setToken(v.token);
          },
          error: (e: any) => {
            if (e.error.message) {
              this.serveError = e.error.message;
            } else {
              this.serveError = 'Something went wrong';
            }
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    }
  }
}

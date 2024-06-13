import { Component } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hide = true;
  serveError = '';
  registerForm = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(180),
        Validators.email,
        Validators.minLength(6),
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(6),
      ]),
    ],
    username: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(255)]),
    ],
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
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      if (email && password && username) {
        this.authSrvc.register(username, email, password).subscribe({
          next: (v: any) => {
            if (!v.error) {
              this.login(username, password);
            } else {
              this.serveError = 'Something went wrong';
            }
          },
          error: (e: any) => {
            if (e.error.message) {
              this.serveError = e.error.message;
            } else {
              this.serveError = 'Something went wrong';
            }
          },
        });
      }
    }
  }

  login(username: string, password: string) {
    let res = this.authSrvc.login(username, password).subscribe({
      next: (v: any) => {
        if (v.token) this.authSrvc.setToken(v.token);
      },
      error: (e: any) => {
        if (e.error.message) {
          this.serveError = e.error.message;
        } else {
          this.serveError = 'Registered Successfully. Error while Login';
        }
      },
    });
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error : string = null;

  loginForm : FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.email, Validators.required]),
    'password' : new FormControl(null, [Validators.minLength(6), Validators.required])
  });

  constructor(private authService : AuthService, private router : Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const pw = this.loginForm.value.password;
    this.isLoading = true;

    let authObs : Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, pw);
    } else {
      authObs = this.authService.signup(email, pw);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg
        this.isLoading = false;
        
      }
    )

    this.loginForm.reset();
  }

}

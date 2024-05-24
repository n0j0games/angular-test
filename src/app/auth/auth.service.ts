import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router : Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIkey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        return;
    }
    const parsedData = JSON.parse(userData); 
    const loadedUser = new User(
        parsedData.email,
        parsedData.id,
        parsedData._token,
        new Date(parsedData._tokenExpirationDate)
    )

    if (loadedUser.token) {
        this.user.next(loadedUser);
        this.autoLogout(new Date(parsedData._tokenExpirationDate).getTime() - new Date().getTime());
    }
  }

  private tokenExpirationTimer: any;

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.user.next(null);
    localStorage.removeItem('userData')
    this.router.navigate(['/auth']);
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIkey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'Unknown error occured idk really';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Someone already used this e-mail adress';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid password or e-mail address';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password or e-mail address';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid password or e-mail address';
        break;
    }
    return throwError(errorMessage);
  }
}

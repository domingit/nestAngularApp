import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginSuccess, loginFailure, logout } from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
        ofType('[Login] User Login'),
        switchMap(({ username, password }) =>
            this.authService.login(username, password).pipe(
            map(user => loginSuccess({ token: user.authJwtToken })),
            catchError(error => of(loginFailure({ error })))
            )
        )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
        ofType('[Auth] Logout'),
        switchMap(() =>
            this.authService.logout().pipe(
            map(() => logout()),
            catchError(error => of(loginFailure({ error })))
            )
        )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  error: string;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: State = {
  token: null,
  error: null,
  isLoading: false,
  isLoggedIn: false
};

export const loginReducer = createReducer(initialState,
  on(AuthActions.login, state => ({ ...state, isLoading: true })),
  on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, token, isLoading: false, isLoggedIn: true })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error, isLoading: false, isLoggedIn: false })),
  on(AuthActions.logout, state => ({ ...state, ...initialState }))
);
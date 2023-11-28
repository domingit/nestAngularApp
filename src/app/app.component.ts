import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Store } from '@ngrx/store';
import { State } from './pages/auth/store/auth.reducer';
import { loginSuccess, logout } from './pages/auth/store/auth.actions';
import { MENU_ACTION } from './components/main-menu/menu-actions.enum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean> = of(true);
  authState$: Observable<any>;

  menuItems = [
    { label: 'Home', link: '/home', icon: 'home' },
    { label: 'Courses', link: '/courses', icon: 'info' }
  ];

  constructor(private router: Router, private breakpointObserver: BreakpointObserver,
    private store: Store) {
    this.isLoggedIn$ = this.store.select((state: {auth: State}) => state.auth?.isLoggedIn);
    
    const token = localStorage.getItem("authJwtToken");
    token ? this.store.dispatch(loginSuccess({token})): this.store.dispatch(logout());
  }

  menuAction(action: MENU_ACTION) {
    console.log('action>> ', action);
    if (action === MENU_ACTION.LOGOUT) {
      this.onLogout();
    }
  }

  onLogout() {
    this.store.dispatch(logout());
  }

}

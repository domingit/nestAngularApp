import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map, tap } from 'rxjs/operators';
import { MOBILE_DEVICES } from 'src/constants';
import { MENU_ACTION } from './menu-actions.enum';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  @Input() menuItems;
  @Input() isLoggedIn$: Observable<boolean>;

  @Output() menuAction: EventEmitter<MENU_ACTION> = new EventEmitter<MENU_ACTION>();

  @ViewChild('sidenav') sidenav: MatSidenav;
  isMobile$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {}

  onLogout() {
    this.menuAction.emit(MENU_ACTION.LOGOUT);
  }

  onProfile() {
    this.menuAction.emit(MENU_ACTION.PROFILE);
  }

  // Use BreakpointObserver to determine if the screen is small (responsive behavior)
  isSmallScreen$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
    tap(() => this.setIsMobile()),
    map((result) => result.matches)
  );

  // Use devices names aliases to determine if the screen is small (responsive behavior)
  setIsMobile() {
    this.isMobile$ = of(MOBILE_DEVICES.test(navigator.userAgent));
  }

  toggleMenu(): void {
    this.sidenav.toggle();
  }

  onMenuOpened() {
    // Handle actions when the menu is opened
    console.log('opened');
  }

  onMenuClosed() {
    // Handle actions when the menu is closed
    console.log('closed');
  }

}

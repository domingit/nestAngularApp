import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { UserData } from "./model/user.model";
import { AuthApi } from "./auth.api";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {

    constructor(private api: AuthApi,
        private router: Router) {}

    login(email:string, password:string): Observable<UserData> {
        return this.api.login(email, password)
            .pipe(
                tap(user => localStorage.setItem("authJwtToken", user.authJwtToken)),
                tap(() => this.router.navigateByUrl('/courses'))
                );
    }

    logout(): Observable<null> {
        localStorage.removeItem("authJwtToken");
        this.router.navigateByUrl('/login');
        return of();
    }

}

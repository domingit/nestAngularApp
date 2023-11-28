import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserData } from "./model/user.model";


@Injectable()
export class AuthApi {

    constructor(private http:HttpClient) {}

    login(email:string, password:string): Observable<UserData> {
        return this.http.post<UserData>('/api/login', {email,password});
    }

}

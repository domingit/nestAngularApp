import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

import { LoginComponent } from './login/login.component';
import { AuthApi } from "./auth.api";
import { AuthService } from './auth.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([{path: '', component: LoginComponent}]),

    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})

export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
              AuthApi, AuthService
            ]
        }
    }
}

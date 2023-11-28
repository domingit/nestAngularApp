import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { login } from 'src/app/pages/auth/store/auth.actions';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    isLoading = false;

    constructor(
        private fb:FormBuilder,
        private store: Store) {

        this.form = this.fb.group({
            email: ['student@angular-university.io', [Validators.required]],
            password: ['password', [Validators.required]]
        });

    }

    ngOnInit() {}

    onLogin() {
        const val = this.form.value;
        this.store.dispatch(login({ username: val.email, password: val.password }));
    }

}


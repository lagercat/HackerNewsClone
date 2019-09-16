import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(null, {validators: [Validators.required]}),
            password: new FormControl(null, {validators: [Validators.required]}),
        });
    }

    onLogin() {
        if (this.form.invalid) {
            return;
        }
        this.authService.loginUser(this.form.value.username, this.form.value.password);
    }
}

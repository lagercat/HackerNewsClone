import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ConfirmValidParentMatcher, validatePassword } from './password.validator';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.components.css'],
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    confirmValidParentMatcher = new ConfirmValidParentMatcher();

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(null, {validators: [Validators.required]}),
            password: new FormControl(null, {validators: [Validators.required,
                      Validators.minLength(8), Validators.maxLength(100),
                      Validators.pattern('^[a-zA-Z0-9]*$')]}),
            passwordCheck: new FormControl(null, {validators: [Validators.required]}),
        }, validatePassword);
    }

    onSaveUser() {
        if (this.form.invalid) {
            return;
        }
        this.authService.createUser(this.form.value.username, this.form.value.password);
    }
}

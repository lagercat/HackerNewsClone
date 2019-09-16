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

    constructor(private authservice: AuthService) {}

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(null, {validators: [Validators.required]}),
            password: new FormControl(null, {validators: [Validators.required]}),
            passwordCheck: new FormControl(null, {validators: [Validators.required]}),
        }, validatePassword);
    }

    onSaveUser() {
        if (this.form.invalid) {
            return;
        }
        console.log('Valid bai!');
    }
}

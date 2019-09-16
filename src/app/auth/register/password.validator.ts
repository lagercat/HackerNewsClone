import { AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material';

export const validatePassword = (registerForm: AbstractControl)
: {[key: string]: boolean} => {
    const password = registerForm.value.password;
    const passwordCheck = registerForm.value.passwordCheck;
    if (password !== passwordCheck) {
        registerForm.setErrors({invalidPasswords: true}, {emitEvent: true});
        console.log(registerForm.setErrors({invalidPasswords: true}));
        return {invalidPasswords: true};
    }
    return null;
};

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null)
    : boolean {
        return control.parent.invalid && control.touched;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from './user.model';

const BACKEND_URL = environment.apiURL + '/users/';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private httpClient: HttpClient, private router: Router) {}

    createUser(formUsername: string, formPassword: string) {
        const payload = {
            username: formUsername,
            password: formPassword,
        };
        this.httpClient.post<{message: string, user: User}>(BACKEND_URL + 'create/', payload)
        .subscribe((response) => {
            console.log('Account created');
        });
    }
}

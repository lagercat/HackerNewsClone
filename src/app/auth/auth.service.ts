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
    private token: string = null;
    private username: string = null;
    private isAuthenticated = false;

    constructor(private httpClient: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getUsername() {
        return this.username;
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    createUser(formUsername: string, formPassword: string) {
        const payload = {
            username: formUsername,
            password: formPassword,
        };
        this.httpClient.post<{message: string, user: User}>(BACKEND_URL + 'create/', payload)
        .subscribe((response) => {
            this.loginUser(formUsername, formPassword);
        });
    }

    loginUser(formUsername: string, formPassword: string) {
        const payload = {
            username: formUsername,
            password: formPassword,
        };
        this.httpClient.post<{message: string, token: string, user: User}>
        (BACKEND_URL + 'authenticate/', payload)
        .subscribe((response) => {
            if (response.token != null) {
                const token = response.token;
                const username = response.user.username;
                this.token = token;
                this.username = username;
                this.isAuthenticated =  true;
                this.setAuthData(token, username);
            }
            this.router.navigate(['/']);
        });
    }

    autoAuthUser() {
        const authData = this.getAuthData();
        const token = authData.token;
        const username = authData.username;
        if (token && username) {
            this.isAuthenticated = true;
            this.token = token;
            this.username = username;
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.token = null;
        this.username = null;
        this.deleteAuthData();
        this.router.navigate(['/']);
    }

    private setAuthData(token, username) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    }

    private getAuthData() {
        const localToken = localStorage.getItem('token');
        const localUsername = localStorage.getItem('username');
        if (!(localUsername && localToken)) {
            return;
        }
        return {
            token: localToken,
            username: localUsername,
        };
    }

    private deleteAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
}

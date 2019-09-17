import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

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
    private timerToken: any;
    private authStatusListener = new Subject<boolean>();

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

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
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
                const expiresInDuration = 3600;
                this.token = token;
                this.username = username;
                this.isAuthenticated =  true;
                this.authStatusListener.next(true);
                this.setAuthTimer(expiresInDuration);
                const now = new Date();
                const expiration = new Date(now.getTime() + expiresInDuration * 1000);
                this.setAuthData(token, expiration, username);
            }
            this.router.navigate(['/']);
        });
    }

    autoAuthUser() {
        const authData = this.getAuthData();
        const token = authData.token;
        const expiration = new Date(authData.expiration);
        const username = authData.username;

        const now = new Date();
        const expiresIn = expiration.getTime() - now.getTime();
        if (token && username && expiresIn > 0) {
            this.isAuthenticated = true;
            this.token = token;
            this.username = username;
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.token = null;
        this.username = null;
        this.deleteAuthData();
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
    }

    private setAuthTimer(seconds: number) {
        this.timerToken = setTimeout(() => {
            this.logout();
        }, seconds * 1000);
    }


    private setAuthData(token: string, expiration: Date, username: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration.toISOString());
        localStorage.setItem('username', username);
    }

    private getAuthData() {
        const localToken = localStorage.getItem('token');
        const localExpiration = localStorage.getItem('expiration');
        const localUsername = localStorage.getItem('username');
        if (!(localUsername && localToken && localExpiration)) {
            return;
        }
        return {
            token: localToken,
            expiration: localExpiration,
            username: localUsername,
        };
    }

    private deleteAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('username');
    }
}

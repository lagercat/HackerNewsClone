import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { AuthService } from './auth.service';

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        console.log(authToken);
        const authRequest = req.clone({
            headers: req.headers.set('Authorizations', 'Bearer ' + authToken),
        });
        console.log(authRequest);
        return next.handle(authRequest);
    }
}

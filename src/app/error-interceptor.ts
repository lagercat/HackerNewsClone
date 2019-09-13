import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
} from '@angular/common/http';

import { MatSnackBar } from '@angular/material';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorComponent } from './error/error-component';

export class ErrorInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
       return next.handle(req).pipe(
           catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknow error has occured';
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                this.snackBar.openFromComponent(ErrorComponent,
                                                {data: {message: errorMessage}});
                return throwError(error);
           })
       );
    }
}

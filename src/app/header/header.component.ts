import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    authStatus: boolean;
    authStatusSubscription: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authStatus = this.authService.getIsAuthenticated();
        this.authStatusSubscription = this.authService.getAuthStatusListener()
        .subscribe((authStatus) => {
            this.authStatus = authStatus;
        });
    }

    ngOnDestroy() {
        this.authStatusSubscription.unsubscribe();
    }
}

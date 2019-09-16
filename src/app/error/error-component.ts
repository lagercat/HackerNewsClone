import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
})
export class ErrorComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) {}
}
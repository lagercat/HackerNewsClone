import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../angular-material.module';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        RegisterComponent,
    ],
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        AuthRoutingModule,
    ]
})
export class AuthModule {}

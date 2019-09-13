import { NgModule } from '@angular/core';
import { MatToolbarModule,
         MatExpansionModule,
         MatButtonModule,
         MatCardModule,
         MatFormFieldModule,
         MatInputModule,
         MatSelectModule,
         MatSnackBarModule,
} from '@angular/material';

@NgModule({
    exports: [
              MatToolbarModule,
              MatExpansionModule,
              MatButtonModule,
              MatCardModule,
              MatFormFieldModule,
              MatInputModule,
              MatSelectModule,
              MatSnackBarModule,
            ],
})
export class MaterialModule {}

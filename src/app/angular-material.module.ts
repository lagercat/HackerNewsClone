import { NgModule } from '@angular/core';
import { MatToolbarModule,
         MatExpansionModule,
         MatButtonModule,
         MatCardModule,
         MatFormFieldModule,
         MatInputModule,
         MatSelectModule,
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
            ],
})
export class MaterialModule {}

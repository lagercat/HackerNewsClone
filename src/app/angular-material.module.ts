import { NgModule } from '@angular/core';
import { MatToolbarModule,
         MatExpansionModule,
         MatButtonModule,
         MatCardModule,
} from '@angular/material';

@NgModule({
    exports: [
              MatToolbarModule,
              MatExpansionModule,
              MatButtonModule,
              MatCardModule
            ],
})
export class MaterialModule {}

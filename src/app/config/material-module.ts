import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({

  exports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ]
})

export class MaterialModule {}

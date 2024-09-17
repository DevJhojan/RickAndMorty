import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DetailCharacterComponent,
  DialogAllCharactersComponent,
  MenuComponent,
} from './components';
import { ErrorComponent } from './components/error/error.component';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PictureComponent } from './components/picture/picture.component';
import { CardCharacterComponent } from './components/card-character/card-character.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    MenuComponent,
    ErrorComponent,
    ErrorMessageDirective,
    DetailCharacterComponent,
    DialogAllCharactersComponent,
    PictureComponent,
    CardCharacterComponent,
    SearchComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [
    MenuComponent,
    ErrorComponent,
    ErrorMessageDirective,
    DetailCharacterComponent,
    DialogAllCharactersComponent,
    PictureComponent,
    CardCharacterComponent,
    SearchComponent,
  ],
})
export class SharedModule {}

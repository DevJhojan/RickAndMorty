import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  DetailCharacterComponent, DialogAllCharactersComponent, MenuComponent } from './components';
import { ErrorComponent } from './components/error/error.component';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    MenuComponent,
    ErrorComponent,
    ErrorMessageDirective,
    DetailCharacterComponent,
    DialogAllCharactersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuComponent,
    ErrorComponent,
    ErrorMessageDirective,
    DetailCharacterComponent,
    DialogAllCharactersComponent
  ]
})
export class SharedModule { }

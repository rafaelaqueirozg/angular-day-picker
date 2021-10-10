import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDayPickerComponent } from './ng-day-picker.component';

@NgModule({
  declarations: [
    NgDayPickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgDayPickerComponent
  ]
})
export class NgDayPickerModule { }

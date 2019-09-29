import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe],
  imports: [
    CommonModule
  ]
})
export class HelperModule { }

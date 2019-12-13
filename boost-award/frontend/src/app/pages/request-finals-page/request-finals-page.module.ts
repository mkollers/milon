import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { RequestFinalsPageRoutingModule } from './request-finals-page-routing.module';
import { RequestFinalsPageComponent } from './request-finals-page.component';

@NgModule({
  declarations: [RequestFinalsPageComponent],
  imports: [
    CommonModule,
    RequestFinalsPageRoutingModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatInputModule
  ]
})
export class RequestFinalsPageModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { RequestAccessPageRoutingModule } from './request-access-page-routing.module';
import { RequestAccessPageComponent } from './request-access-page.component';

@NgModule({
  declarations: [RequestAccessPageComponent],
  imports: [
    CommonModule,
    RequestAccessPageRoutingModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatInputModule
  ]
})
export class RequestAccessPageModule { }

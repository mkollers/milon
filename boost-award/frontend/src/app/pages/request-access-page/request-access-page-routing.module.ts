import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestAccessPageComponent } from './request-access-page.component';

const routes: Routes = [
  { path: '', component: RequestAccessPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestAccessPageRoutingModule { }

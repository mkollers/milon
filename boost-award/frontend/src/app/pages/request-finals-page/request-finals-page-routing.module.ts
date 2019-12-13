import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestFinalsPageComponent } from './request-finals-page.component';

const routes: Routes = [
  { path: '', component: RequestFinalsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestFinalsPageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/request-access-page/request-access-page.module').then(m => m.RequestAccessPageModule) },
  { path: 'vote', loadChildren: () => import('./pages/voting-page/voting-page.module').then(m => m.VotingPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

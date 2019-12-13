import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/request-access-page/request-access-page.module').then(m => m.RequestAccessPageModule) },
  { path: 'vote', loadChildren: () => import('./pages/voting-page/voting-page.module').then(m => m.VotingPageModule) },
  { path: 'statistics', loadChildren: () => import('./pages/statistics-page/statistics-page.module').then(m => m.StatisticsPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenResolver } from '@pages/voting-page/resolvers/token.resolver';
import { ValidTokenGuard } from '@shared/vote/guards/valid-token.guard';

import { FinalVotingPageComponent } from './final-voting-page.component';
import { FinalistsResolver } from './resolvers/finalists.resolver';

const routes: Routes = [
  {
    path: '', component: FinalVotingPageComponent, canActivate: [ValidTokenGuard], resolve: {
      token: TokenResolver,
      participants: FinalistsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalVotingPageRoutingModule { }

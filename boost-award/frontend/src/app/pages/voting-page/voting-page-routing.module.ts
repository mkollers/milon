import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParticipantsResolver } from './resolvers/participants.resolver';
import { TokenResolver } from './resolvers/token.resolver';
import { VotingPageComponent } from './voting-page.component';

const routes: Routes = [
  {
    path: '', component: VotingPageComponent, resolve: {
      token: TokenResolver,
      participants: ParticipantsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotingPageRoutingModule { }

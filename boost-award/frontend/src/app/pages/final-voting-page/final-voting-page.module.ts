import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VoteModule } from '@shared/vote/vote.module';

import { FinalVotingPageRoutingModule } from './final-voting-page-routing.module';
import { FinalVotingPageComponent } from './final-voting-page.component';

@NgModule({
  declarations: [FinalVotingPageComponent],
  imports: [
    CommonModule,
    FinalVotingPageRoutingModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,

    // Custom
    VoteModule
  ]
})
export class FinalVotingPageModule { }

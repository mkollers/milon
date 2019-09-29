import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VoteModule } from '@shared/vote/vote.module';

import { VotingPageRoutingModule } from './voting-page-routing.module';
import { VotingPageComponent } from './voting-page.component';

@NgModule({
  declarations: [VotingPageComponent],
  imports: [
    CommonModule,
    VotingPageRoutingModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,

    // Custom
    VoteModule
  ]
})
export class VotingPageModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HelperModule } from '@shared/helper/helper.module';

import { ParticipantEntryComponent } from './components/participant-entry/participant-entry.component';

@NgModule({
  declarations: [ParticipantEntryComponent],
  exports: [ParticipantEntryComponent],
  imports: [
    CommonModule,
    HelperModule,

    // Material
    MatSlideToggleModule
  ]
})
export class VoteModule { }

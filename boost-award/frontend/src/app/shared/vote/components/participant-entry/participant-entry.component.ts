import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Participant } from '@shared/data-access/models/participant';
import findKey from 'lodash/findKey';

@Component({
  selector: 'milon-participant-entry',
  templateUrl: './participant-entry.component.html',
  styleUrls: ['./participant-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantEntryComponent implements OnChanges {
  @Input('milon-participant') participant: Participant;
  @Input('milon-votes') votes: { [points: number]: string };
  @Output('milon-vote') vote$ = new EventEmitter<number>();
  value: number;

  @ViewChild(MatButtonToggleGroup, { static: true }) buttonToggleGroup: MatButtonToggleGroup;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.votes && this.buttonToggleGroup) {
      // const value = this.buttonToggleGroup.value;
      this.value = +findKey(this.votes, v => v === this.participant.id);

      // if another participant takes the same place, reset the value
      // if (this.votes[value] !== this.participant.id) {
      //   this.buttonToggleGroup.writeValue(undefined);
      // }
    }
  }
}

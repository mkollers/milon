import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Participant } from '@shared/data-access/models/participant';

@Component({
  selector: 'milon-participant-entry',
  templateUrl: './participant-entry.component.html',
  styleUrls: ['./participant-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantEntryComponent {
  @Input('milon-participant') participant: Participant;
  @Input('milon-vote') selected: string;
  @Output('milon-vote') vote$ = new EventEmitter<boolean>();

  constructor() { }
}

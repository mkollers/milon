import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Participant } from '@shared/data-access/models/participant';

@Component({
  selector: 'milon-participant-entry',
  templateUrl: './participant-entry.component.html',
  styleUrls: ['./participant-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantEntryComponent {
  @Input('milon-participant') participant: Participant;

  constructor() { }
}

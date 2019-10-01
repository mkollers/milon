import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Participant } from '@shared/data-access/models/participant';
import { ParticipantService } from '@shared/data-access/services/participant.service';
import { StatisticsService } from '@shared/data-access/services/statistics.service';
import keyBy from 'lodash/keyBy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Statistic } from '@shared/data-access/models/statistic';

@Component({
  selector: 'milon-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsPageComponent {
  participants$: Observable<{ [id: string]: Participant }>;
  statistics$: Observable<Statistic[]>;

  constructor(
    participantService: ParticipantService,
    statisticsService: StatisticsService
  ) {
    this.participants$ = participantService.getAll().pipe(
      map(participants => keyBy(participants, p => p.id))
    );
    this.statistics$ = statisticsService.getAll();
  }

}

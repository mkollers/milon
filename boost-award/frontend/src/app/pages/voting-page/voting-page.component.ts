import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Participant } from '@shared/data-access/models/participant';
import { Token } from '@shared/data-access/models/token';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';
import { ParticipantService } from '@shared/data-access/services/participant.service';
import { merge, Observable } from 'rxjs';
import { first, map, skip, startWith, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'milon-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingPageComponent {
  participants$: Observable<Participant[]>;
  token$: Observable<Token>;
  voted$: Observable<boolean>;
  votes$: Observable<{ [id: number]: string }>;
  finished = false;

  constructor(
    private _accessTokenService: AccessTokenService,
    private _participantService: ParticipantService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar
  ) {
    this.token$ = this._queryToken();
    this.participants$ = this._queryParticipants();
    this.votes$ = this._queryVotes();
    this.voted$ = this._queryVoted();
  }

  async vote(participant: Participant, points: number) {
    const votes = await this.votes$.pipe(first()).toPromise();
    for (let i = 1; i <= 3; i++) {
      if (i === points) {
        votes[i] = participant.id;
      } else if (votes[i] === participant.id) {
        delete votes[i];
      }
    }
    console.log(votes);
    const token = localStorage.getItem('token');
    await this._accessTokenService.vote(token, votes);
  }

  private _queryToken() {
    const token = localStorage.getItem('token');
    const token$ = this._route.data.pipe(map(data => data.token));
    const hotToken$ = this._accessTokenService.getByToken(token).pipe(skip(1));
    return merge(token$, hotToken$);
  }

  private _queryParticipants() {
    const participants$ = this._route.data.pipe(map(data => data.participants));
    const hotParticipants$ = this._participantService.getAll();
    return merge(participants$, hotParticipants$);
  }

  private _queryVotes = () => this.token$.pipe(
    filter(data => !!data),
    map(data => data.votes || {})
  )

  private _queryVoted() {
    const points$ = this.votes$.pipe(
      map(votes => Object.keys(votes)),
      map(keys => keys.reduce((a, b) => +a + +b, 0)),
      startWith(0)
    );

    return points$.pipe(
      map(p => p >= 6)
    );
  }

  finish() {
    this._snackbar.open('Vielen Dank für deine Teilnahme am BOOST Award');
  }
}

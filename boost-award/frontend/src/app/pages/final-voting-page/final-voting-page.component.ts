import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Participant } from '@shared/data-access/models/participant';
import { Observable } from 'rxjs';
import { Token } from '@shared/data-access/models/token';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';
import { ParticipantService } from '@shared/data-access/services/participant.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'milon-final-voting-page',
  templateUrl: './final-voting-page.component.html',
  styleUrls: ['./final-voting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinalVotingPageComponent {
  finalists$: Observable<Participant[]>;
  token$: Observable<Token>;
  voted$: Observable<boolean>;
  vote$: Observable<string>;
  finished = false;

  constructor(
    private _accessTokenService: AccessTokenService,
    private _participantService: ParticipantService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar
  ) {
    this.token$ = this._queryToken();
    this.finalists$ = this._queryFinalists();
    this.vote$ = this._queryVote();
    this.voted$ = this._queryVoted();
  }

  async vote(participant: Participant) {
    const token = localStorage.getItem('token');
    await this._accessTokenService.voteFinal(token, participant);
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
    (window as any).ga('send', 'event', 'finish_final_voting');
  }
}

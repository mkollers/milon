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
  vote$: Observable<string | undefined>;
  finished = false;

  constructor(
    private _accessTokenService: AccessTokenService,
    private _participantService: ParticipantService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar
  ) {
    this.token$ = this._queryToken();
    this.participants$ = this._queryParticipants();
    this.vote$ = this._queryVote();
    this.voted$ = this._queryVoted();
  }

  async vote(participant: Participant, checked: boolean) {
    const token = localStorage.getItem('token');
    if (checked) {
      await this._accessTokenService.vote(token, participant.id);
    } else {
      await this._accessTokenService.vote(token, null);
    }
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

  private _queryVote = () => this.token$.pipe(
    filter(data => !!data),
    map(data => data.vote)
  )

  private _queryVoted() {
    return this.vote$.pipe(
      map(vote => !!vote),
      startWith(false)
    );
  }

  finish() {
    this._snackbar.open('Vielen Dank für deine Teilnahme am BOOST Award');
    (window as any).ga('send', 'event', 'finish_voting');
  }
}

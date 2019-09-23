import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Token } from '@shared/data-access/models/token';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';
import { merge, Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';

@Component({
  selector: 'milon-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingPageComponent {
  // participants$: Observable<Participant[]>;
  token$: Observable<Token>;
  voted$: Observable<boolean>;
  votes$: Observable<{ [id: string]: number }>;
  finished = false;

  constructor(
    private _accessTokenService: AccessTokenService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar
  ) {
    this.token$ = this._queryToken();
    this._queryParticipants();
    this._queryVotes();
    this._queryVoted();
  }

  private _queryToken() {
    const token = localStorage.getItem('token');
    const tokenData$ = this._route.data.pipe(map(data => data.token));
    const hotTokenData$ = this._accessTokenService.getByToken(token).pipe(skip(1));
    return merge(tokenData$, hotTokenData$);
  }

  private _queryParticipants() {
    // const companies$ = route.data.pipe(map(data => data.companies));
    //     const hotCompanies$ = companyService.getAll();
    //     this.companies$ = merge(companies$, hotCompanies$);
  }

  private _queryVotes() {
    // this.votes$ = this.token$.pipe(
    //   map(data => data.votes || {})
    // );
  }

  private _queryVoted() {
    // const points$ = this.votes$.pipe(
    //   map(votes => Object.values(votes)),
    //   map(values => values.reduce((a, b) => a + b, 0)),
    //   startWith(0)
    // );

    // this.voted$ = points$.pipe(
    //   map(p => p >= 6)
    // );
  }

  finish() {
    // this._snackbar.openFromComponent(FinishSnackComponent);
    this.finished = true;
  }
}

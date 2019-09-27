import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidTokenGuard implements CanActivate {
  constructor(
    private _accessTokenService: AccessTokenService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) { }

  async canActivate(next: ActivatedRouteSnapshot) {
    const token = this._parseToken(next);

    if (!token) {
      this._snackbar.open('Es konnte kein gültiger Token gefunden werden. Bitte lassen Sie sich eine neue E-Mail zuschicken.', '',
        { duration: 20000 }
      );
      this._router.navigate(['/']);
      return false;
    }

    const data = await this._accessTokenService.getByToken(token).pipe(
      first()
    ).toPromise();

    if (!data) {
      this._snackbar.open('Es konnte kein gültiger Token gefunden werden. Bitte lassen Sie sich eine neue E-Mail zuschicken.', '',
        { duration: 20000 }
      );
      this._router.navigate(['/']);
      return false;
    }

    const now = new Date();
    const created = new Date(data.created);
    const hoursDif = (now.getTime() - created.getTime()) / 1000 / 60 / 60;

    if (hoursDif > 4) {
      this._snackbar.open('Ihr Link ist leider abgelaufen. Bitte lassen Sie sich eine neue E-Mail zuschicken.', '', { duration: 20000 });
      this._router.navigate(['/']);
      return false;
    }

    return true;
  }

  private _parseToken(route: ActivatedRouteSnapshot): string {
    if (route.queryParams.token) {
      localStorage.setItem('token', route.queryParams.token);
    }
    return localStorage.getItem('token');
  }
}

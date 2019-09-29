import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';
import { first } from 'rxjs/operators';
import { Token } from '@shared/data-access/models/token';

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

    let data: Token;
    try {
      data = await this._accessTokenService.getByToken(token).pipe(
        first()
      ).toPromise();
    } catch (err) {
      let msg = 'Es konnte kein gültiger Token gefunden werden. Bitte lassen Sie sich eine neue E-Mail zuschicken.';
      switch (err.code) {
        case 'permission-denied':
          msg = 'Ihr Link ist leider abgelaufen. Bitte lassen Sie sich eine neue E-Mail zuschicken.';
          break;
      }
      this._snackbar.open(msg, '', { duration: 20000 });
      this._router.navigate(['/']);
      return false;
    }

    if (!data) {
      this._snackbar.open('Es konnte kein gültiger Token gefunden werden. Bitte lassen Sie sich eine neue E-Mail zuschicken.', '', {
        duration: 20000
      });
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

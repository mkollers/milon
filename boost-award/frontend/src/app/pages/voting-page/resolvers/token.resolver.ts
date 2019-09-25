import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first } from 'rxjs/operators';
import { Token } from '@shared/data-access/models/token';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';

@Injectable({
    providedIn: 'root'
})
export class TokenResolver implements Resolve<Promise<Token>> {

    constructor(
        private _accessTokenService: AccessTokenService
    ) { }

    async resolve() {
        try {
            const token = localStorage.getItem('token');
            return await this._accessTokenService.getByToken(token).pipe(
                first()
            ).toPromise();
        } catch (err) {
            return null;
        }
    }
}

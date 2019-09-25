import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Participant } from '@shared/data-access/models/participant';
import { ParticipantService } from '@shared/data-access/services/participant.service';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ParticipantsResolver implements Resolve<Promise<Participant[]>> {

    constructor(
        private _participantService: ParticipantService
    ) { }

    async resolve() {
        try {
            return await this._participantService.getAll().pipe(
                first()
            ).toPromise();
        } catch (err) {
            return null;
        }
    }
}

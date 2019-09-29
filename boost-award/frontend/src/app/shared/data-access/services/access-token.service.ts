import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Map } from 'immutable';
import { map } from 'rxjs/operators';

import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {
  constructor(
    private _db: AngularFirestore
  ) { }

  register(email: string) {
    return this._db
      .collection('registrations')
      .doc(email)
      .set({ url: 'https://www.boostaward.de/abstimmung/' });
  }

  getByToken(token: string) {
    return this._db.doc<Token>(`access_tokens/${token}`)
      .snapshotChanges().pipe(
        map(snapshot => {
          if (!snapshot.payload.exists) {
            return undefined;
          }
          return { key: snapshot.payload.id, ...snapshot.payload.data() };
        })
      );
  }

  async vote(token: string, votes: { [points: number]: string }) {
    return this._db
      .collection('access_tokens')
      .doc(token)
      .update({
        votes
      });
  }
}

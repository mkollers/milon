import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {
  constructor(
    private _db: AngularFirestore
  ) { }

  register(email: string, url = 'https://www.boostaward.de/abstimmung/') {
    return this._db
      .collection('registrations')
      .doc(email)
      .set({ url })
      .then(() => {
        (window as any).ga('send', 'event', 'request access');
      });
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
      })
      .then(() => {
        (window as any).ga('send', 'event', 'single_vote');
      });
  }
}

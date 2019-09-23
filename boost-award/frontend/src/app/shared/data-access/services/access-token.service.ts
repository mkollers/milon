import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
      .set({ url: `${window.location.origin}/vote` });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import shuffle from 'lodash/shuffle';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Participant } from '../models/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(
    private _db: AngularFirestore
  ) { }

  getAll(): Observable<Participant[]> {
    return this._db.collection('participants')
      .snapshotChanges().pipe(
        map<any[], Participant[]>(snapshots => snapshots.map(s => ({ id: s.payload.doc.id, ...s.payload.doc.data() }))),
        map(participants => shuffle(participants))
      );
  }

  getFinalists(): Observable<Participant[]> {
    return this._db.collection('participants', ref => ref.where('finalist', '==', true))
      .snapshotChanges().pipe(
        map<any[], Participant[]>(snapshots => snapshots.map(s => ({ id: s.payload.doc.id, ...s.payload.doc.data() }))),
        map(participants => shuffle(participants))
      );
  }
}

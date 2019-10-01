import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import orderBy from 'lodash/orderBy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Statistic } from '../models/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private _db: AngularFirestore
  ) { }

  getAll(): Observable<Statistic[]> {
    return this._db.collection('statistics')
      .snapshotChanges().pipe(
        map<any[], Statistic[]>(snapshots => snapshots.map(s => ({ participantId: s.payload.doc.id, ...s.payload.doc.data() }))),
        map(statistics => orderBy(statistics, s => s.value, 'desc'))
      );
  }
}

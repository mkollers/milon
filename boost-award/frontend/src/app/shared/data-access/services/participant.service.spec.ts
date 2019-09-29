import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreMock } from '@mocks/angular-firestore.mock';

import { ParticipantService } from './participant.service';

describe('ParticipantService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useClass: AngularFirestoreMock }
    ]
  }));

  it('should be created', () => {
    const service: ParticipantService = TestBed.get(ParticipantService);
    expect(service).toBeTruthy();
  });
});

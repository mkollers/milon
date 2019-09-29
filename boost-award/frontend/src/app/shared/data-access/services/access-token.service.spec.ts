import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreMock } from '@mocks/angular-firestore.mock';

import { AccessTokenService } from './access-token.service';

describe('AccessTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useClass: AngularFirestoreMock }
    ]
  }));

  it('should be created', () => {
    const service: AccessTokenService = TestBed.get(AccessTokenService);
    expect(service).toBeTruthy();
  });
});

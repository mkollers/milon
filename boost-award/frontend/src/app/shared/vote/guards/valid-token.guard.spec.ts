import { TestBed, async, inject } from '@angular/core/testing';

import { ValidTokenGuard } from './valid-token.guard';

describe('ValidTokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidTokenGuard]
    });
  });

  it('should ...', inject([ValidTokenGuard], (guard: ValidTokenGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { inject, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackbarMock } from '@mocks/mat-snackbar.mock';

import { ValidTokenGuard } from './valid-token.guard';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';
import { AccessTokenServiceMock } from '@mocks/access-token-service.mock';

describe('ValidTokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ValidTokenGuard,
        { provide: MatSnackBar, useClass: MatSnackbarMock },
        { provide: AccessTokenService, useClass: AccessTokenServiceMock }
      ]
    });
  });

  it('should ...', inject([ValidTokenGuard], (guard: ValidTokenGuard) => {
    expect(guard).toBeTruthy();
  }));
});

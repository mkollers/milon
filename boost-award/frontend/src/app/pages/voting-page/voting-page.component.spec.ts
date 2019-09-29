import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessTokenServiceMock } from '@mocks/access-token-service.mock';
import { MatSnackbarMock } from '@mocks/mat-snackbar.mock';
import { ParticipantServiceMock } from '@mocks/participant-service.mock';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';
import { ParticipantService } from '@shared/data-access/services/participant.service';

import { VotingPageComponent } from './voting-page.component';

describe('VotingPageComponent', () => {
  let component: VotingPageComponent;
  let fixture: ComponentFixture<VotingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotingPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        { provide: AccessTokenService, useClass: AccessTokenServiceMock },
        { provide: ParticipantService, useClass: ParticipantServiceMock },
        { provide: MatSnackBar, useClass: MatSnackbarMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

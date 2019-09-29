import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccessTokenServiceMock } from '@mocks/access-token-service.mock';
import { MatSnackbarMock } from '@mocks/mat-snackbar.mock';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';

import { RequestAccessPageComponent } from './request-access-page.component';

describe('RequestAccessPageComponent', () => {
  let component: RequestAccessPageComponent;
  let fixture: ComponentFixture<RequestAccessPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestAccessPageComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AccessTokenService, useClass: AccessTokenServiceMock },
        { provide: MatSnackBar, useClass: MatSnackbarMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

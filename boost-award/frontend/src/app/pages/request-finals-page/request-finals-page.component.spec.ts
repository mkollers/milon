import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessTokenServiceMock } from '@mocks/access-token-service.mock';
import { AccessTokenService } from '@shared/data-access/services/access-token.service';

import { RequestFinalsPageComponent } from './request-finals-page.component';

describe('RequestFinalsPageComponent', () => {
  let component: RequestFinalsPageComponent;
  let fixture: ComponentFixture<RequestFinalsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFinalsPageComponent ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AccessTokenService, useClass: AccessTokenServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFinalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

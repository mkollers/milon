import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantEntryComponent } from './participant-entry.component';
import { SafePipe } from '@shared/helper/pipes/safe.pipe';

describe('ParticipantEntryComponent', () => {
  let component: ParticipantEntryComponent;
  let fixture: ComponentFixture<ParticipantEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantEntryComponent, SafePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantEntryComponent } from './participant-entry.component';

describe('ParticipantEntryComponent', () => {
  let component: ParticipantEntryComponent;
  let fixture: ComponentFixture<ParticipantEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantEntryComponent ]
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

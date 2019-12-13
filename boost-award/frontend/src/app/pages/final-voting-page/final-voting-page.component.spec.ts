import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalVotingPageComponent } from './final-voting-page.component';

describe('FinalVotingPageComponent', () => {
  let component: FinalVotingPageComponent;
  let fixture: ComponentFixture<FinalVotingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalVotingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalVotingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

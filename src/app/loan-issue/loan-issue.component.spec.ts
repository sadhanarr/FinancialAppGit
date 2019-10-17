import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanIssueComponent } from './loan-issue.component';

describe('LoanIssueComponent', () => {
  let component: LoanIssueComponent;
  let fixture: ComponentFixture<LoanIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanReqSearchComponent } from './loan-req-search.component';

describe('LoanReqSearchComponent', () => {
  let component: LoanReqSearchComponent;
  let fixture: ComponentFixture<LoanReqSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanReqSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanReqSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

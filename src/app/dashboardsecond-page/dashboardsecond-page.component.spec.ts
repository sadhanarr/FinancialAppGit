import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsecondPageComponent } from './dashboardsecond-page.component';

describe('DashboardsecondPageComponent', () => {
  let component: DashboardsecondPageComponent;
  let fixture: ComponentFixture<DashboardsecondPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardsecondPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsecondPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

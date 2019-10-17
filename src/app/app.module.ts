import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { HomeLoanComponent } from './home-loan/home-loan.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { LoanReqSearchComponent } from './loan-req-search/loan-req-search.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoanIssueComponent } from './loan-issue/loan-issue.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanRequestComponent,
    HomeLoanComponent,
    LoanReqSearchComponent,
    DashboardPageComponent,
    LoanIssueComponent,
    CustomerSearchComponent
  ],
  imports: [
    DatePickerModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: 'LoanRequest',component:LoanRequestComponent},
      { path: 'HomeLoan',component:HomeLoanComponent},
      {path: 'LoanReqSearch',component:LoanReqSearchComponent},
      {path: 'CustomerSearch',component:CustomerSearchComponent},
      {path: 'LoanIssue',component:LoanIssueComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

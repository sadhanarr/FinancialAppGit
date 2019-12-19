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
import { CustomerSearchComponent } from './customer-search/customer-search.component';import { MasterScreenComponent } from './master-screen/master-screen.component';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';
import * as _ from 'underscore'
import { PagerService } from './pager.service';
import {NumericDirective} from './number.directive';
import { CustomerVerificationComponent } from './customer-verification/customer-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanRequestComponent,
    HomeLoanComponent,
    LoanReqSearchComponent,
    DashboardPageComponent,
    LoanIssueComponent,
    CustomerSearchComponent,
    MasterScreenComponent,
    NumericDirective,
    CustomerVerificationComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    DatePickerModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'App', pathMatch: 'full'},
      { path: '**', redirectTo: 'Welcome', pathMatch: 'full'},
      { path: 'LoanRequest',component:LoanRequestComponent},
      { path: 'HomeLoan',component:HomeLoanComponent},
      {path: 'LoanReqSearch',component:LoanReqSearchComponent},
      {path: 'CustomerSearch',component:CustomerSearchComponent},
      {path: 'LoanIssue',component:LoanIssueComponent},
      {path: 'MasterData',component:MasterScreenComponent},
      {path: 'DashboardPage',component:DashboardPageComponent},
      {path:'App',component:AppComponent},
      {path:'Verification',component:CustomerVerificationComponent},
    ])
  ],
  providers: [AppService,PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

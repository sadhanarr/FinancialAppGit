import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { HomeLoanComponent } from './home-loan/home-loan.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    AppComponent,
    LoanRequestComponent,
    HomeLoanComponent
  ],
  imports: [
    DatePickerModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: 'LoanRequest',component:LoanRequestComponent},
      { path: 'HomeLoan',component:HomeLoanComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

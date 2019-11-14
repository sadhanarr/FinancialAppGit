import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import {AppService} from '../app.service'
import { ActivatedRoute, Router} from '@angular/router';
import {Dashboard} from './Dashboard';
import { observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  constructor(
    private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router
  ) { }
    AllDetails:Dashboard[]=[];
    dateValue1 :Date;
  
  ngOnInit() {
   this.dateValue1 = new Date();

   this.getDetails(this.dateValue1,this.dateValue1)
  }
  getDetails(StartDate:Date,EndDate:Date)
  {
    if(StartDate==null)StartDate=this.dateValue1
    if(EndDate==null)EndDate=this.dateValue1
    let formatedDate = new DatePipe("en-US").transform(StartDate,"yyyy-MM-dd")
    let formatEndDate = new DatePipe("en-US").transform(EndDate,"yyyy-MM-dd")
    this._appService.getDashboardDetails(formatedDate,formatEndDate).subscribe(res=> 
    this.AllDetails=res)
  }
}

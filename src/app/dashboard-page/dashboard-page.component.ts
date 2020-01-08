import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import {AppService} from '../app.service'
import { ActivatedRoute, Router} from '@angular/router';
import {Dashboard} from './Dashboard';
import { observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DatepickerOptions } from 'ng2-datepicker';
import {PendingDashboard} from './pendingdashbrd'

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
    Values:PendingDashboard[]=[];
    isApprRej:boolean;
    isRequest:boolean;
    isCollClosed:boolean;
    isIssued:boolean;
    dateValue1 :Date;
    public format:string = "dd/MM/yyyy";
    AllDetails1:Dashboard[]=[];
    Values1:PendingDashboard[]=[];
    isApproved:boolean;
    isRequest1:boolean;
    isEnd:boolean;
    type:string;

  ngOnInit() {
   this.dateValue1 = new Date();
   console.log(new Date())
   this.getDetails(this.dateValue1,this.dateValue1)
   this._appService.getSecondDashboardDetails().subscribe(res=> 
    this.AllDetails1=res)
  }
  getDetails(StartDate:Date,EndDate:Date)
  {
    if(StartDate==null)StartDate=this.dateValue1
    if(EndDate==null)EndDate=this.dateValue1
    let formatedDate = new DatePipe("en-US").transform(StartDate,"yyyy-MM-dd")
    let formatEndDate = new DatePipe("en-US").transform(EndDate,"yyyy-MM-dd")
    console.log(formatedDate)
    this._appService.getDashboardDetails(formatedDate,formatEndDate).subscribe(res=> 
    this.AllDetails=res)
  }
  getSummaryValues(type,startDate,endDate)
  { 
    this.type=type;
    if(type=="Loan Request")
    {
  this.isRequest=true;
  this.isApprRej=false;
  this.isCollClosed= false;
  this.isIssued=false;
    }
  else if (type=="Approved"|| type=="Rejected")
  {
    this.isRequest=false;
  this.isApprRej=true;
  this.isCollClosed= false;
  this.isIssued=false;
  }  else if(type=="Issued")
  {this.isRequest=false;
    this.isApprRej=false;
    this.isCollClosed= false;
    this.isIssued=true;}
    else if(type=="Closed"|| type=="Collection")
    {
      this.isRequest=false;
  this.isApprRej=false;
  this.isCollClosed= true;
  this.isIssued=false;
    }
    let formatedDate = new DatePipe("en-US").transform(startDate,"yyyy-MM-dd")
    let formatEndDate = new DatePipe("en-US").transform(endDate,"yyyy-MM-dd")
    this._appService.getSummaryDashboardValues(type,formatedDate,formatEndDate).subscribe(res=> {
      console.log(res);
      this.Values=res})
  }
  getPendingDetails(type)
  { 
    this.type=type;
    if(type=="Request"|| type=="Waitlist")
    {
  this.isRequest1=true;
  this.isApproved=false;
  this.isEnd=false;
    }
  else if (type=="Approved")
  {
    this.isRequest1=false;
    this.isApproved=true;
    this.isEnd=false;
  }  else if(type=="End")
  {this.isRequest1=false;
    this.isApproved=false;
    this.isEnd=true;}
    this._appService.getPendingDashboardValues(type).subscribe(res=> 
      this.Values1=res)
  }
}


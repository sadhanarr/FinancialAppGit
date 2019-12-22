import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'
import { ActivatedRoute, Router} from '@angular/router';
import {Dashboard} from '../dashboard-page/Dashboard';
import { PendingDashboard } from './pendingdashbrd';

@Component({
  selector: 'app-dashboardsecond-page',
  templateUrl: './dashboardsecond-page.component.html',
  styleUrls: ['./dashboardsecond-page.component.css']
})
export class DashboardsecondPageComponent implements OnInit {

  constructor(
    private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router
  ) { }
    AllDetails:Dashboard[]=[];
    Values:PendingDashboard[]=[];
    isApproved:boolean;
    isRequest:boolean;
    isEnd:boolean;

  ngOnInit() {
    this.getDetails();
  }
  getDetails()
  {
    this._appService.getSecondDashboardDetails().subscribe(res=> 
    this.AllDetails=res)
  }
  getPendingDetails(type)
  { 
    if(type=="Request"|| type=="Waitlist")
    {
  this.isRequest=true;
  this.isApproved=false;
  this.isEnd=false;
    }
  else if (type=="Approved")
  {
    this.isRequest=false;
    this.isApproved=true;
    this.isEnd=false;
  }  else if(type=="End")
  {this.isRequest=false;
    this.isApproved=false;
    this.isEnd=true;}
    this._appService.getPendingDashboardValues(type).subscribe(res=> 
      this.Values=res)
  }
}

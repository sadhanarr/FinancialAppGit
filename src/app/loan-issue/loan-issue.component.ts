import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'
import {Agent} from '../master-screen/agent'
import {Area} from '../master-screen/area'
import {Request} from '../loan-request/request';
import { ActivatedRoute, Router} from '@angular/router';
import { LoanSearch} from '../loan-req-search/LoanSearch'
import {ICompany} from '../master-screen/Company'


@Component({
  selector: 'app-loan-issue',
  templateUrl: './loan-issue.component.html',
  styleUrls: ['./loan-issue.component.css']
})
export class LoanIssueComponent implements OnInit {

  LoanCategory: ICompany[]=[];
  AllArea:Area[]=[];
  AllSagent:Agent[]=[];
  requestSearch:LoanSearch={} as any;
  requestAll:Request[]=[]

  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data
     });
     this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
     this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data})
  }
  Search(form)
  {
    console.log(this.requestSearch)
    this.requestSearch["Status"]="Approved"
    this._appService.getLoanRequestSearch(this.requestSearch).subscribe((res:any[])=> {
     this.requestAll=res;
     console.log(this.requestAll)
    
   })
   form.resetForm();
  }
  NavigateIssueDetail(CustID,RequestID)
  {
    console.log("customer"+CustID)
    this._appService.changeCUstID(CustID);
    this._appService.changeReqID(RequestID);
    this._router.navigate(['/HomeLoan'])
  }

}

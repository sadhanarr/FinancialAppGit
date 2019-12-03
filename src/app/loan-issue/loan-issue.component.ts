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
      this.LoanCategory=data;
      this.requestSearch.FromDate=new Date();
      this.requestSearch.ToDate= new Date();
      this.requestSearch.Status="All";
      this.Search(null);
     });
     this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
     this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data})
    
     
  }
  Search(form)
  {
    console.log(this.requestSearch)
    if(  this.requestSearch.CustName != null  || this.requestSearch.CustID!= null  || this.requestSearch.OtherName!= null  ||
    this.requestSearch.ContactList!= null  || this.requestSearch.IDProof!= null  || this.requestSearch.RequestID!= null  || this.requestSearch.Area!= null  || this.requestSearch.LoanCategory!= null  ||this.requestSearch.AgentName!= null  ||
    this.requestSearch.Address!= null  || this.requestSearch.KeywordSearch!= null || this.requestSearch.FromDate !=null
    || this.requestSearch.ToDate != null)
    {
     this._appService.getLoanIssueRequestSearch(this.requestSearch).subscribe((res:any[])=> {
     this.requestAll=res;
     console.log(this.requestAll)
    
   })
    }
    else{
      this.Search(null);
    }
  }
  NavigateIssueDetail(CustID,RequestID)
  {
    console.log("customer"+CustID)
    this._appService.changeCUstID(CustID);
    this._appService.changeReqID(RequestID);
    this._router.navigate(['/HomeLoan'])
  }
Clear(form)
{
  form.resetForm();
}
}

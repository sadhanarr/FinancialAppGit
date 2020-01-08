import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'
import {Agent} from '../master-screen/agent'
import {Area} from '../master-screen/area'
import {Request} from '../loan-request/request';
import { ActivatedRoute, Router} from '@angular/router';
import { LoanSearch} from '../loan-req-search/LoanSearch'
import {ICompany} from '../master-screen/Company'
import * as moment from 'moment';

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
  fromDate:any;
  toDate:any

  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data;
      
   
     });
     this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
     this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data})
    
     this._appService.LoanIssueSearch.subscribe(res=>{this.requestSearch=res;
      this.fromDate= new Date(res.FromDate)
     this.toDate= new Date(res.ToDate)
    })
    this.Search(null)
  }
  Search(form)
  {
  console.log(this.requestSearch)
  if(this.fromDate != null && this.fromDate != '' )  this.requestSearch.FromDate= moment(this.fromDate,'DD/MM/YYYY').format('YYYY-MM-DD');
  else this.requestSearch.FromDate='';
  if(this.toDate != null && this.toDate != '')   this.requestSearch.ToDate= moment(this.toDate,'DD/MM/YYYY').format('YYYY-MM-DD');
  else this.requestSearch.ToDate='';
     this._appService.getLoanIssueRequestSearch(this.requestSearch).subscribe((res:any[])=> {
     this.requestAll=res;
     console.log(this.requestAll)
    
   })
   this._appService.changeLoanIssueSearch(this.requestSearch)
  }
  NavigateIssueDetail(CustID,RequestID,ReqStatus)
  {
    console.log("customer"+CustID)
    this._appService.changeCUstID(CustID);
    this._appService.changeReqID(RequestID);
    this._appService.changeStatus(ReqStatus)
    this._router.navigate(['/HomeLoan'])
  }
Clear(form)
{
  form.resetForm();
  this.requestSearch={ Status  :'',
  FromDate:'',
  ToDate:'',
  RequestID:'',
  CustName  :'', 
  OtherName  :'', 
  Address   :'',
  CustID   :'',
  IDProof   :'',
  ContactList  :'', 
  Line   :'',
  Area  :'',
  AgentName:'',
  LoanCategory:'',
  KeywordSearch:''}
  this._appService.changeReqSearch(this.requestSearch)
}
}

import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'
import {Agent} from '../master-screen/agent'
import {Area} from '../master-screen/area'
import {Request} from '../loan-request/request';
import { ActivatedRoute, Router} from '@angular/router';
import { LoanSearch} from './LoanSearch'
import {ICompany} from '../master-screen/Company'
import {IUpdate} from './UpdateStatus'

@Component({
  selector: 'app-loan-req-search',
  templateUrl: './loan-req-search.component.html',
  styleUrls: ['./loan-req-search.component.css']
})
export class LoanReqSearchComponent implements OnInit {

  LoanCategory: ICompany[]=[];
  AllArea:Area[]=[];
  AllSagent:Agent[]=[];
  requestSearch:LoanSearch={} as any;
  requestAll:Request[]=[];
 
   update:IUpdate={}as any
  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.requestSearch.Status="Request";

    this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data
     });
     this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
     this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data})
  }
  Search(form)
  {
    console.log(this.requestSearch)
    this._appService.getLoanRequestSearch(this.requestSearch).subscribe((res:any[])=> {
     this.requestAll=res;
     console.log(this.requestAll)
    this.requestSearch={Status:'',FromDate:'',ToDate:'',RequestID:'',CustName:'',CustID:'',Address:'',OtherName:'',ContactList:'',Line:'',Area:'',AgentName:'',LoanCategory:'',KeywordSearch:'',IDProof:''}
   })
  
  }

  SaveRequestID(ID)
  {
    this.update.RequestID=ID;
  }
  SaveStatus()
  {
   console.log(this.update)
    this._appService.UpdateLoanStatus(this.update)
    document.getElementById("close").click();
  }
  NavigateLoan(ID)
  {
    this._appService.changeReqID(ID);
    this._router.navigate(["/LoanRequest"]);
  }
}

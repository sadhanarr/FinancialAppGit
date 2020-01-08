import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'
import {Branch} from '../master-screen/branch'
import {Taluk} from '../master-screen/taluk'
import {Area} from '../master-screen/area'
import {CustSearch} from '../customer-search/CustSearch'
import {Request} from '../loan-request/request';
import {Loan} from '../home-loan/loan';
import {Agent} from '../master-screen/agent'
import { ICompany } from '../master-screen/Company';
import { ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-customer-verification',
  templateUrl: './customer-verification.component.html',
  styleUrls: ['./customer-verification.component.css']
})
export class CustomerVerificationComponent implements OnInit {

  AllArea:Area[]=[];
  tabName:string="";
  AllLine:Taluk[]=[];
  AllBranch:Branch[]=[];
  search:CustSearch={} as any;
   requestAll:Request[]=[];
   Loan:Loan[]=[];
   request:Request[]=[];
   CustomerID:Number=0;
   LoanCategory:ICompany[]=[];
   AllSagent:Agent[]=[];

  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._appService.getLine().subscribe((data:any[])=>{this.AllLine=data})
    this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
    this._appService.getBranch().subscribe((data:any[])=>{this.AllBranch=data})
    this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data;})
    this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data
     });
     this._appService.VerfSearch.subscribe(
      res=> this.search=res)
      if( this.search.Status!="" || this.search.CustName!="" ||
      this.search.CustID!="" || this.search.OtherName!="" ||
      this.search.ContactList!="" || this.search.IDProof!="" ||
      this.search.Line!="" || this.search.Area!="" ||
      this.search.Address!="" || this.search.KeywordSearch!="" )
    this.Search(null)
  }
  getCustomerID(ID)
  {
   this.CustomerID=ID;
   this._appService.getCustomer(ID,0).subscribe((data:any)=> 
      {
        this.tabName =data.CustomerID+'-'+data.CustName+' '+data.Initial
      });
   this._appService.getRequestbyCustomer(ID).subscribe((data:any[])=>{this.request=data;
    this._appService.getLoanbyCustomer(ID).subscribe((data:any[])=>{this.Loan=data;console.log(data)})
    // $('.nav-tabs a[href="#Request"]').tab('show');
    // $('.nav-tabs a[href="#Loan"]').tab('show');
  })

  }
  Search(form)
  {
 console.log(this.search)
 this._appService.changeVerificationSearch(this.search)
   this._appService.getCustomerVerfication(this.search).subscribe((res:any[])=> {
    this.requestAll=res;
    console.log(this.requestAll)

  })

  
  }

  Clear(form){
    form.resetForm();
    this.search.Status="";
    this.search.CustName="";
    this.search.CustID="";
    this.search.OtherName="";
    this.search.ContactList="";
    this.search.IDProof="";
    this.search.Line="";
    this.search.Area="";
    this.search.Address="";
    this.search.KeywordSearch="";
    this._appService.changeVerificationSearch(this.search)
  }
}

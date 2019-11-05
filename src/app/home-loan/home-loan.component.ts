import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import {AppService} from '../app.service'
import { ActivatedRoute, Router} from '@angular/router';
import {Customer} from './Customer'
import {Branch} from '../master-screen/branch'
import {Area} from '../master-screen/area'
import {Taluk} from '../master-screen/taluk'
import {Loan} from './loan'
import {Agent} from '../master-screen/agent'
import { ICompany } from '../master-screen/Company';
import {ROI} from '../loan-request/ROI'

@Component({
  selector: 'app-home-loan',
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.css']
})
export class HomeLoanComponent implements OnInit {

  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) { }
    AllSagent:Agent[]=[];
    LoanCategory: ICompany[]=[];
customer:Customer= new Customer(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
AllSarea:Taluk[]=[];
AllLine:Taluk[]=[];
AllArea:Area[]=[];
Allbranch: Branch[];
ROI:ROI[]=[];
CustID:Number
loandetail:Loan= new Loan(0,0,0,new Date(),'',0,'','','',null,false,false,false,false,false,false,null,null,null,null,null,null,null,null,null,null,'',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'','','','','','');
RequestID:Number
formSubmit:boolean=false;
 roundoff5:boolean=false;
  ngOnInit() {
    this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data
     });
    this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data})
    this._appService.getLine().subscribe((data:any[])=>{this.AllLine=data})
    this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
    this._appService.getSArea().subscribe((data:any[])=>{this.AllSarea=data})
    this._appService.currentCustID.subscribe(res=> this.CustID= res)
    this._appService.getCustomer(this.CustID).subscribe((data:any)=> 
    {this.customer=data ; console.log(data)})
    this._appService.getBranch().subscribe((data:any[])=>{
      this.Allbranch=data
    
    }) 
    this.loandetail["LoanDate"] = new Date();
    this._appService.currentReqID.subscribe(res=>{ this.RequestID= res;
      console.log(this.RequestID)
    this._appService.getDetailforLoanIssue(this.RequestID).subscribe((data:any)=> 
    {this.loandetail=data ; console.log(data)})
    this.OnChange();
    });
  }
  SaveLoan(form)
  {
    console.log(this.customer)
    if(form != '')
  {
  if (form.invalid ) {
    this.formSubmit=true; 
    return;
 }
}
    this._appService.InsertIssuedLoanDetails(this.customer,this.loandetail);
    form.resetForm();
  }
  changeLoanStatus(event)
  {
  if(event=="Consider")
  {
    $('#consider').show();
  }
  else{
    $('#consider').hide();
  }
}
 OnChange()
  {
    var incentive=0;
    var scheme=0;
    var DocCharge=0;
    this.loandetail["TotLoanAmt"]= this.loandetail["DocCharge"].toString() != ""? parseInt(this.loandetail["DocCharge"].toString())+parseInt(this.loandetail["LoanAmt"].toString()):parseInt(this.loandetail["LoanAmt"].toString());
    this.loandetail["InterestAmt"]= Math.round( (parseInt(this.loandetail["TotLoanAmt"].toString())* parseInt(this.loandetail["Instalments"].toString())* parseFloat(this.loandetail["IntRate"].toString()) )/100)
    this.loandetail["TotAmount"]= parseInt( this.loandetail["TotLoanAmt"].toString())  +  parseInt(this.loandetail["InterestAmt"].toString())
    this.loandetail["InstalmentAmt"]= parseInt( this.loandetail["TotAmount"].toString())/ parseInt(this.loandetail["Instalments"].toString())
 
 if(this.roundoff5)
 {
  this.loandetail["InstalmentAmt"]=Math.ceil(parseFloat(this.loandetail["InstalmentAmt"].toString())/5)*5;
  this.loandetail["TotAmount"]= parseInt(this.loandetail["InstalmentAmt"].toString())*parseInt(this.loandetail["Instalments"].toString());
  this.loandetail["InterestAmt"]= parseInt( this.loandetail["TotAmount"].toString())-parseInt(this.loandetail["TotLoanAmt"].toString())
 }
 if(this.loandetail["IncentiveRatio"]!= null){
    if(this.loandetail["IncentiveRatio"].toString()!="")
 {
  this.loandetail["IncentiveAmt"]= this.loandetail["DocCharge"].toString() != ""? parseInt(this.loandetail["IncentiveRatio"].toString())*(parseInt(this.loandetail["DocCharge"].toString())/100):0
 }
}
 if(this.loandetail["IncentiveType"] != null && this.loandetail["IncentiveType"].toString()=="Every Loan Incentive")
 {
   if( this.loandetail["SplIncentiveAmt"] != null && this.loandetail["SplIncentiveAmt"].toString()!="")
{ 
  incentive= parseInt(this.loandetail["IncentiveAmt"].toString())+parseInt(this.loandetail["SplIncentiveAmt"].toString())}
   else
   incentive= parseInt(this.loandetail["IncentiveAmt"].toString()) }
 
   if(this.loandetail["SchemeAmt"]!=null && this.loandetail["SchemeAmtReceived"].toString() !="Received By Showroom" && this.loandetail["SchemeAmt"].toString() != "" )
   {
     scheme= parseInt(this.loandetail["SchemeAmt"].toString())
   }
   if(this.loandetail["DocChargeReceived"]!=null && this.loandetail["DocChargeReceived"].toString() =="Received By Showroom" && this.loandetail["DocCharge"]!= null)
   {
     DocCharge=parseInt(this.loandetail["DocCharge"].toString())
   }
   this.loandetail["NetAmt"]= parseInt(this.loandetail["LoanAmt"].toString())+incentive-DocCharge-scheme;
  }
 
}

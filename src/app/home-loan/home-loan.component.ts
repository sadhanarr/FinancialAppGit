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
import {IProof} from './Proof'
import { Collection } from './collection';
import { Followup } from './Followup';

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
//customer:Customer= new Customer(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
AllSarea:Taluk[]=[];
AllLine:Taluk[]=[];
AllArea:Area[]=[];
Allbranch: Branch[];
ROI:ROI[]=[];
loan:Loan[]=[];
loanCust:Loan[]=[];
isscheme:boolean=false;
CustID:Number
loandetail:Loan= new Loan(0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',0,0,0,new Date(),'',	0,	'',	'',	'',	'',	false,	false,	'',	false,	false,	false,	false,	'',	0,	'',	0,	'',	new Date(),	0,	0,	0,	'',	'',	0,	0,	'',	0,	'',	0,	0,	'',	0,	0,	0,	new Date(),	new Date(),	0,	0,	0,	new Date(),	0,	0,	false,	'',	'',	'',	'',	'',	'');	
RequestID:Number
formSubmit:boolean=false;
 roundoff5:boolean=false;
proof:string;
proofNumber:string;
selectedFile:File;
proof1:string;
proofNumber1:string;
selectedFile1:File;
CustProof:IProof;
GuaranProof:IProof;
LoanID:Number=0;
collection:Collection= new Collection(null,null,new Date(),'',null,null,null,null,null,null,null);
followup:Followup= new Followup(0,0,new Date(),new Date(),'','','');
  ngOnInit() {
    this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data
     });
    this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data})
    this._appService.getLine().subscribe((data:any[])=>{this.AllLine=data})
    this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
    this._appService.getSArea().subscribe((data:any[])=>{this.AllSarea=data})
    this._appService.currentCustID.subscribe(res=> {this.CustID= res;
      this._appService.getLoanbyCustomer(this.CustID).subscribe(res=> this.loanCust=res)
    })
    this._appService.getProof(this.CustID,'Customer').subscribe(res=>this.CustProof=res);
    this._appService.getProof(this.CustID,'Guarantor').subscribe(res=>this.GuaranProof=res);
    this._appService.getLoanDetails().subscribe(res=> this.loan= res)
    this._appService.currentReqID.subscribe(res=>{ this.RequestID= res;
      console.log(this.RequestID)
      
      this._appService.getCustomer(this.CustID,this.RequestID).subscribe((data:any)=> 
      {
        this.loandetail=data ; 
     this.OnChange();
      })
    });
    
    this._appService.getBranch().subscribe((data:any[])=>{
      this.Allbranch=data
    
    }) 
   
    
  }
  SaveFile(value)
  {
    if(value=='Customer')
    {
    this._appService.InsertProof(this.CustID,this.proof1,this.proofNumber1,this.selectedFile1,'Customer').subscribe(res =>{console.log(res);
      this._appService.getProof(this.CustID,'Customer').subscribe(res=>this.CustProof=res);
    }) 
    }
    else
    {
    this._appService.InsertProof(this.CustID,this.proof,this.proofNumber,this.selectedFile,'Guarantor').subscribe(res =>{console.log(res);
    this._appService.getProof(this.CustID,'Guarantor').subscribe(res=>this.GuaranProof=res);
    });
    }
  }
  OpenFile(url:string)
  {
     console.log(url)
     
     window.open(url.replace('D:\\Tech\\','http://103.110.236.177/'))
  }
  AddEntry()
  {
    this._appService.addCollection(this.collection)
  }
  DeleteProof(ProofType,Type)
  {
    console.log('delete')
    this._appService.deleteProof(this.CustID,ProofType,Type).subscribe(res=>{console.log(res);
    this._appService.getProof(this.CustID,'Customer').subscribe(res=>this.CustProof=res);
    this._appService.getProof(this.CustID,'Guarantor').subscribe(res=>this.GuaranProof=res);
  })
  }
  AddFollowup()
  {
    this._appService.InsertLoanFollowupDetail(this.followup)
  }
  
  SaveLoan(form)
  {
    
    if(form != '')
  {
  if (form.invalid ) {
    this.formSubmit=true; 
    return;
 }
}
console.log(this.loandetail)
    this._appService.InsertIssuedLoanDetails(this.loandetail).subscribe(res =>
      { console.log('res'+res);form.resetForm();
      this._appService.getLoanbyCustomer(this.CustID).subscribe(res=> this.loanCust=res);
      this._appService.getCustomer(this.CustID,this.RequestID).subscribe((data:any)=> 
      {
        this.loandetail=data ;});
     });
   // 
  }
  getLoanDetail(LoanID: Number)
  {
    this.LoanID=LoanID;
    this._appService.getLoanDetail(LoanID).subscribe(res=> {
      console.log(res);this.loandetail=res})
      this._appService.getCollection(0,LoanID).subscribe(res=>{this.collection=res})
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
onFileChanged(event) {
  this.selectedFile = event.target.files[0]
}
onFileChanged1(event) {
  this.selectedFile1 = event.target.files[0]
}
 OnChange()
  {
    console.log(this.loan)
    if(this.loandetail["LoanID"] ==0){
    if(this.loandetail["LoanCatID"]==1)
      this.loandetail["LoanNo"]= 100000+1+  this.loan.filter(x=>x.LoanCatID==this.loandetail["LoanCatID"]).length
      if(this.loandetail["LoanCatID"]==2)
      this.loandetail["LoanNo"]= 200000+1+  this.loan.filter(x=>x.LoanCatID==this.loandetail["LoanCatID"]).length
      if(this.loandetail["LoanCatID"]==3)
      this.loandetail["LoanNo"]= 300000+1+  this.loan.filter(x=>x.LoanCatID==this.loandetail["LoanCatID"]).length
      if(this.loandetail["LoanCatID"]==4)
      this.loandetail["LoanNo"]= 400000+1+  this.loan.filter(x=>x.LoanCatID==this.loandetail["LoanCatID"]).length
      if(this.loandetail["LoanCatID"]==5)
      this.loandetail["LoanNo"]= 500000+1+  this.loan.filter(x=>x.LoanCatID==this.loandetail["LoanCatID"]).length
      if(this.loandetail["LoanCatID"]==6)
      this.loandetail["LoanNo"]= 600000+1+  this.loan.filter(x=>x.LoanCatID==this.loandetail["LoanCatID"]).length
      if(this.loandetail["LoanCatID"]==7)
      this.loandetail["LoanNo"]= 700000+1+  this.loan.filter(x=>x.LoanCatID==this.loandetail["LoanCatID"]).length
      if(this.loandetail["LoanCatID"]==8)
      this.loandetail["LoanNo"]= 800000+1+  this.loan.filter(x=>x.LoanCatID==this.loandetail["LoanCatID"]).length
      this.loandetail["LoanDate"] = new Date();
    }
   
   
         
    var FirstDueDt= new Date();
    FirstDueDt.setMonth(new Date().getMonth()+1);
    FirstDueDt.setDate(10);
    var LastDueDt= new Date();
    LastDueDt.setMonth(new Date().getMonth()+1);
    LastDueDt.setDate(10);
      this.loandetail["FirstDueDt"]= FirstDueDt;
      LastDueDt.setMonth(LastDueDt.getMonth()+ this.loandetail["Instalments"])
      this.loandetail["LastDueDt"]=LastDueDt;
    if(!this.isscheme)
    {
      $('#SchemeAmt').attr("disabled","disabled");
      $('#SchemeAmtReceived').attr("disabled","disabled");
      $('#schemeTxt').attr("disabled","disabled");
      $('#schemeCalcTxt').attr("disabled","disabled");
      
    }
    else{
      $('#SchemeAmt').removeAttr("disabled");
      $('#SchemeAmtReceived').removeAttr("disabled");
      $('#schemeTxt').removeAttr("disabled");
      $('#schemeCalcTxt').removeAttr("disabled");
    }
    if(this.loandetail["DueType"]=="Interest")
    {


      $('#intAmt').attr("disabled","disabled");
      $('#totAmt').attr("disabled","disabled");
      $('#installmentAmt').attr("disabled","disabled");
      $('#netAmt').attr("disabled","disabled");
      this.loandetail["InterestAmt"]=null;
      this.loandetail["TotAmount"]=null;
      this.loandetail["InstalmentAmt"]=null;
      this.loandetail["NetAmt"]=null;
    }
    else{
      $('#intAmt').removeAttr("disabled");
      $('#totAmt').removeAttr("disabled");
      $('#installmentAmt').removeAttr("disabled");
      $('#netAmt').removeAttr("disabled");
      this.loandetail["InterestAmt"]=null;
      this.loandetail["TotAmount"]=null;
      this.loandetail["InstalmentAmt"]=null;
      this.loandetail["NetAmt"]=null;
    }
    var incentive=0;
    var scheme=0;
    var DocCharge=0;
    if(this.loandetail["DueType"]=="EMI"){
    this.loandetail["TotLoanAmt"]= this.loandetail["DocCharge"] != null? parseInt(this.loandetail["DocCharge"].toString())+parseInt(this.loandetail["LoanAmt"].toString()):parseInt(this.loandetail["LoanAmt"].toString());
    this.loandetail["InterestAmt"]= Math.round( (parseInt(this.loandetail["TotLoanAmt"].toString())* parseInt(this.loandetail["Instalments"].toString())* parseFloat(this.loandetail["IntRate"].toString()) )/100)
    this.loandetail["TotAmount"]= parseInt( this.loandetail["TotLoanAmt"].toString())  +  parseInt(this.loandetail["InterestAmt"].toString())
    this.loandetail["InstalmentAmt"]= parseInt( this.loandetail["TotAmount"].toString())/ parseInt(this.loandetail["Instalments"].toString())
 
 if(this.loandetail["RoundedOff"])
 {
  this.loandetail["InstalmentAmt"]=Math.ceil(parseFloat(this.loandetail["InstalmentAmt"].toString())/5)*5;
  this.loandetail["TotAmount"]= parseInt(this.loandetail["InstalmentAmt"].toString())*parseInt(this.loandetail["Instalments"].toString());
  this.loandetail["InterestAmt"]= parseInt( this.loandetail["TotAmount"].toString())-parseInt(this.loandetail["TotLoanAmt"].toString())
 }
 if(this.loandetail["IncentiveRatio"]!= null ){
    if(this.loandetail["IncentiveRatio"].toString()!="")
 {
  this.loandetail["IncentiveAmt"]= this.loandetail["DocCharge"] != null? parseInt(this.loandetail["IncentiveRatio"].toString())*(parseInt(this.loandetail["DocCharge"].toString())/100):0
 }
}
 if(this.loandetail["IncentiveType"] != null && this.loandetail["IncentiveAmt"] != null  && this.loandetail["IncentiveType"].toString()=="Every Loan Incentive")
 {
   if( this.loandetail["SplIncentiveAmt"] != null && this.loandetail["SplIncentiveAmt"].toString()!="")
{ 
  incentive= parseInt(this.loandetail["IncentiveAmt"].toString())+parseInt(this.loandetail["SplIncentiveAmt"].toString())}
   else
   incentive= parseInt(this.loandetail["IncentiveAmt"].toString()) }
 
   if(this.loandetail["SchemeAmt"]!=null && this.loandetail["SchemeAmtReceived"] !=null && this.loandetail["SchemeAmtReceived"].toString() =="Received By Showroom" && this.loandetail["SchemeAmt"].toString() != "" )
   {
     scheme= parseInt(this.loandetail["SchemeAmt"].toString())
   }
   if(this.loandetail["DocCharge"]!= null && this.loandetail["DocChargeReceived"]!=null && this.loandetail["DocChargeReceived"].toString() =="Received By Showroom" )
   {
     DocCharge=parseInt(this.loandetail["DocCharge"].toString())
   }
   this.loandetail["NetAmt"]= parseInt(this.loandetail["LoanAmt"].toString())+incentive-DocCharge-scheme;
  }
  }
 
}

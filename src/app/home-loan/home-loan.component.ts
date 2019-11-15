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
import {LoanStatus} from './LoanStatus';
import {DueDate} from './duedate'
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

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
Sagent:Agent[]=[];
Sarea:Taluk[]=[];
Line:Taluk[]=[];
Area:Area[]=[];
branch: Branch[];
ROI:ROI[]=[];
loan:Loan[]=[];
loanCust:Loan[]=[];
isscheme:boolean=false;
CustID:Number
Customerdetail:Loan=new Loan(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',0,0,0,new Date(),'',	0,	'',	'',	'',	'',	false,	false,	'',	false,	false,	false,	false,	'',	0,	'',	0,	'',	new Date(),	0,	0,	0,	'',	'',	0,	0,	'',	0,	'',	0,	0,	'',	0,	0,	0,	new Date(),	new Date(),	0,	0,	0,	new Date(),	0,	0,	false,	'',	'',	'',	'',	'',	'');	
loandetail:Loan= new Loan(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',0,0,0,new Date(),'',	0,	'',	'',	'',	'',	false,	false,	'',	false,	false,	false,	false,	'',	0,	'',	0,	'',	new Date(),	0,	0,	0,	'',	'',	0,	0,	'',	0,	'',	0,	0,	'',	0,	0,	0,	new Date(),	new Date(),	0,	0,	0,	new Date(),	0,	0,	false,	'',	'',	'',	'',	'',	'');	
RequestID:Number
formSubmit:boolean=false;
 roundoff5:boolean=false;
proof:string;
due:DueDate
proofNumber:string;
selectedFile:File;
proof1:string;
proofNumber1:string;
selectedFile1:File;
CustProof:IProof;
GuaranProof:IProof;
ECustProof:IProof;
EGuaranProof:IProof;
LoanID:Number=0;
DueType:string='';
collection:Collection= new Collection(null,null,new Date(),'',null,null,null,null,null,null,null,null,null,null,null);
AllCollection:Collection[];
 penaltyBal:Number=0;
 dueBal:Number=0;
 TotalBal:Number=0;

FollowupDetails:Followup[];
followup:Followup= new Followup(0,0,0,new Date(),new Date(),'','','Running');
loanStat:LoanStatus= new LoanStatus(0,'','','','','','',0);
  ngOnInit() {
    this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data
     });
    this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data;this.Sagent=data;})
    this._appService.getLine().subscribe((data:any[])=>{this.AllLine=data;this.Line=data;})
    this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data;this.Area=data;})
    this._appService.getSArea().subscribe((data:any[])=>{this.AllSarea=data;this.Sarea=data;})
    this._appService.currentCustID.subscribe(res=> {this.CustID= res;
      this._appService.getLoanbyCustomer(this.CustID).subscribe(res=> this.loanCust=res)
    })
    this._appService.getProof(this.CustID,'Customer',0).subscribe(res=>this.CustProof=res);
    this._appService.getProof(this.CustID,'Guarantor',0).subscribe(res=>this.GuaranProof=res);
    this._appService.getLoanDetails().subscribe(res=> this.loan= res)
    this._appService.currentReqID.subscribe(res=>{ this.RequestID= res;
      console.log(this.RequestID)
      
      this._appService.getCustomer(this.CustID,this.RequestID).subscribe((data:any)=> 
      {
        this.Customerdetail=data ; 
        this.DueType=this.loandetail.DueType;
     this.OnChange();
      })
    });
    
    this._appService.getBranch().subscribe((data:any[])=>{
      this.Allbranch=data
    this.branch=data;
    }) 
   
    
  }
  SaveFile(value)
  {
    if(value=='Customer')
    {
    this._appService.InsertProof(this.CustID,this.proof1,this.proofNumber1,this.selectedFile1,'Customer').subscribe(res =>{console.log(res);
      this._appService.getProof(this.CustID,'Customer',this.LoanID).subscribe(res=>this.CustProof=res);
    }) 
    }
    else
    {
    this._appService.InsertProof(this.CustID,this.proof,this.proofNumber,this.selectedFile,'Guarantor').subscribe(res =>{console.log(res);
    this._appService.getProof(this.CustID,'Guarantor',this.LoanID).subscribe(res=>this.GuaranProof=res);
    });
    }
  }
  OpenFile(url:string)
  {
     console.log(url)
     
     window.open(url.replace('D:\\Tech\\','http://103.110.236.177/'))
  
    }
    AddLoanStatus(form)
    {
      this.loanStat.LoanId=this.LoanID
      console.log(this.loanStat)
      this._appService.insertLoanIssueStatus(this.loanStat).subscribe(res=>{console.log(res);
      form.resetForm(form);})
    }
  AddFollowup(form)
  {
    this.followup.LoanID=this.LoanID
    console.log(this.followup)
    this._appService.InsertLoanFollowupDetail(this.followup).subscribe(res=>{console.log(res);
    this._appService.getFollowup(this.LoanID).subscribe(res=>{this.FollowupDetails=res});
    form.resetForm(form);})
  }
  DeleteFollowup(followupId:Number)
  {
    this._appService.DeleteLoanFollowupDetail(followupId).subscribe(res=>{console.log(res);
    this._appService.getFollowup(this.LoanID).subscribe(res=>{this.FollowupDetails=res});})
  }
  AddEntry(form)
  {

    if(new Date(this.collection.Date)>new Date())
    {
    this.formSubmit=true; 
    return;
    }
    this.collection.LoanID=this.LoanID;
   console.log(this.collection)
    this._appService.addCollection(this.collection).subscribe(res=>{ console.log(res);
      this._appService.getCollection(this.LoanID).subscribe(res=>{this.AllCollection=res});
      form.resetForm();})
   
  }

  filterdrop()
  {
    
    if(this.Customerdetail["BranchID"]!= undefined)
    {
     this.Line= this.AllLine.filter(x=> x.DistrictID== this.Customerdetail["BranchID"])
    }
    if(this.Customerdetail["LineID"]!= undefined)
    {
     this.Area= this.AllArea.filter(x=> x.LineID== this.Customerdetail["LineID"])
    }
    if(this.Customerdetail["AreaID"]!= undefined)
    {
     this.Sarea= this.AllSarea.filter(x=> x.DistrictID== this.Customerdetail["AreaID"])
    }
    
  }
  removeCollection(EMMID:Number)
  {
    this._appService.DeleteCollection(EMMID,this.LoanID).subscribe(res=>{
      console.log(res);
      this._appService.getCollection(this.LoanID).subscribe(res=>{this.AllCollection=res});
    })

  }
  DeleteProof(ProofType,Type)
  {
    console.log('delete')
    this._appService.deleteProof(this.CustID,ProofType,Type).subscribe(res=>{console.log(res);
    this._appService.getProof(this.CustID,'Customer',this.LoanID).subscribe(res=>this.CustProof=res);
    this._appService.getProof(this.CustID,'Guarantor',this.LoanID).subscribe(res=>this.GuaranProof=res);
  })
  }
  
  SaveLoan()
  {

    this._appService.InsertIssuedLoanDetails(this.loandetail).subscribe(res =>
      { console.log(this.loandetail);
        this.LoanID=parseInt(res.toString())
    
      this._appService.getLoanbyCustomer(this.CustID).subscribe(res=> this.loanCust=res);
      this._appService.getCustomer(this.CustID,this.RequestID).subscribe((data:any)=> 
      {
        this.loandetail=data ;
        ;});
     });
   // 
  }

  getLoanDetail(LoanID: Number,form)
  {
     
  
    console.log(this.Customerdetail)
    this._appService.UpdateCustomer(this.Customerdetail).subscribe(res=>{console.log(res);
    this.LoanID=LoanID;
    
    if(LoanID>0)
    {
    this._appService.getLoanDetail(LoanID).subscribe(res=> {
      console.log(res);this.loandetail=res;
      this.DueType=this.loandetail.DueType
      
      this.EmiDisable()})
      
      this._appService.getCollection(LoanID).subscribe(res=>{this.AllCollection=res});
      this._appService.getProof(this.CustID,'Customer',LoanID).subscribe(res=>this.ECustProof=res);
      this._appService.getProof(this.CustID,'Guarantor',LoanID).subscribe(res=>this.EGuaranProof=res);
      this._appService.getFollowup(LoanID).subscribe(res=>{this.FollowupDetails=res});
      this._appService.getIssueLoanStatus(LoanID).subscribe(res=>{
        console.log(res);
        this.loanStat=res;
        this.changeLoanStatus(this.loanStat.LoanStatus);});
      
    }
    else{
      this._appService.getCustomer(this.CustID,this.RequestID).subscribe((data:any)=> 
   
      {
        this.LoanID=0;
        this.loandetail=data ; 
        this.DueType=this.loandetail.DueType
        this.loandetail.IntType='Daily'
        this.loandetail.LoanDate= new Date()
        
     this.OnChange();
      })
       this.AllCollection=[];
       this.FollowupDetails=[];
    }
      this._appService.getCollectionValue(0,LoanID,(new Date().toLocaleDateString()).replace('/','-').replace('/','-')).subscribe(res=>{ console.log(res)
      if(res != null)
      {this.collection=res;
   
        this.penaltyBal=this.collection.penaltyBal;
  this.dueBal= this.collection.dueBal;
  this.TotalBal=this.collection.TotalBal
   }})
    })

  }
  DateChange()
  {
   
    this._appService.getCollectionValue(0,this.LoanID,(new Date(this.collection.Date).toLocaleDateString()).replace('/','-').replace('/','-')).subscribe(res=>{
      if(res != null){
      this.collection=res;
  this.penaltyBal=this.collection.penaltyBal;
  this.dueBal= this.collection.dueBal;
  this.TotalBal=this.collection.TotalBal
      }
    })
  
  }
  CollectionCal()
  {this.collection.penaltyBal=this.penaltyBal;
    this.collection.dueBal= this.dueBal;
    this.collection.TotalBal=this.TotalBal;
        
    if(this.collection.Penaltyreciept != null && this.collection.Penaltyreciept.toString() !='')
    {
      this.collection.penaltyBal= parseFloat( this.collection.penaltyBal.toString())-parseFloat( this.collection.Penaltyreciept.toString());
    }
    if(this.collection.Duereciept != null && this.collection.Duereciept.toString() !='')
    {
      this.collection.dueBal= parseFloat( this.collection.dueBal.toString())-parseFloat( this.collection.Duereciept.toString());
      if(this.DueType=='EMI')
      this.collection.TotalBal= parseFloat( this.collection.TotalBal.toString())-parseFloat( this.collection.Duereciept.toString());
    }
    if(this.collection.Principalreciept != null && this.collection.Principalreciept.toString() !='')
    {
      this.collection.TotalBal= parseFloat( this.collection.TotalBal.toString())-parseFloat( this.collection.Principalreciept.toString());
    }
    if(this.collection.LoanAmount != null && this.collection.LoanAmount.toString() !='')
    {
      this.collection.TotalBal= parseFloat( this.collection.TotalBal.toString())+parseFloat( this.collection.LoanAmount.toString());
    }
  }
  changeLoanStatus(event)
  {
    console.log("Status :"+event);
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
EmiDisable()
{
  this.DueType=this.loandetail.DueType
  if(this.DueType !="EMI")
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

  }
}
 OnChange()
  {
this.EmiDisable();
console.log("calleed");    
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
    }
   if(this.loandetail["LoanCatID"] !=null)
   {
     this.Sagent=this.AllSagent.filter(x=>x.LoanCategory==this.loandetail["LoanCatID"].toString())
   }
   
   this._appService.getDueDate(new Date(this.loandetail.LoanDate).toLocaleDateString().replace('/','-').replace('/','-'),this.loandetail.DueType,this.loandetail.Instalments).subscribe(res=>
    {
      this.due= res;
      this.loandetail.LoanDate=this.due.loandate;
      this.loandetail.FirstDueDt=this.due.firstdue;
      this.loandetail.LastDueDt=this.due.lastdue;
    })
   
   
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
    console.log(this.loandetail["DueType"])
  
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
 if(this.loandetail["IncentiveType"] != null   && this.loandetail["IncentiveType"].toString()=="Every Loan Incentive")
 {
   if( this.loandetail["SplIncentiveAmt"] != null && this.loandetail["SplIncentiveAmt"].toString()!="")
{ 
  incentive= parseInt(this.loandetail["IncentiveAmt"].toString())+parseInt(this.loandetail["SplIncentiveAmt"].toString())}
   else if( this.loandetail["IncentiveAmt"] != null && this.loandetail["IncentiveAmt"].toString() != "")
  { incentive= parseInt(this.loandetail["IncentiveAmt"].toString()) }
}
   if(this.loandetail["SchemeAmt"]!=null && this.loandetail["SchemeAmtReceived"] !=null && this.loandetail["SchemeAmtReceived"].toString() =="Received By Showroom" && this.loandetail["SchemeAmt"].toString() != "" )
   {
     scheme= parseInt(this.loandetail["SchemeAmt"].toString())
   }
   if(this.loandetail["DocCharge"]!= null && this.loandetail["DocChargeRecvd"]!=null && this.loandetail["DocChargeRecvd"].toString() =="Received By Showroom" && this.loandetail["DocCharge"].toString() !="")
   {
     DocCharge=parseInt(this.loandetail["DocCharge"].toString())
   }
   this.loandetail["NetAmt"]= parseInt(this.loandetail["LoanAmt"].toString())+incentive-DocCharge-scheme;
  }
  if(this.loandetail["DueType"]=="Interest"){
    if(this.loandetail["LoanAmt"]!=null && this.loandetail["Instalments"] != null && this.loandetail["IntRate"]!=null &&this.loandetail["LoanAmt"].toString()!="" && this.loandetail["Instalments"].toString() !="" && this.loandetail["IntRate"].toString()!="")
    {
      var days=30;
     // this.loandetail.IntType=='Daily'?days=30: days=new Date(parseInt(this.loandetail.LoanDate.getFullYear.toString()),parseInt( this.loandetail.LoanDate.getMonth.toString()) + 1, 0).getDate()
    this.loandetail["InterestAmt"]=(parseFloat(this.loandetail["LoanAmt"].toString())*days*parseFloat(this.loandetail["IntRate"].toString())/days)/100

}
  
}

  }
 
}

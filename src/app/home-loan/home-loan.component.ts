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
import {GlobalPermissionsService} from '../global.service'
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-home-loan',
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.css']
})
export class HomeLoanComponent implements OnInit {

  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router,private globalPermission : GlobalPermissionsService ) {
      this.collectionPermission = this.globalPermission.getCollectionPermission();
     }
    collectionPermission:boolean;
    AllSagent:Agent[]=[];
    LoanCategory: ICompany[]=[];
    LoanNo:string
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
//loandetail:Loan=new Loan(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',0,0,0,new Date(),'',	0,	'',	'',	'',	'',	false,	false,	'',	false,	false,	false,	false,	'',	0,	'',	0,	'',	new Date(),	0,	0,	0,	'',	'',	0,	0,	'',	0,	'',	0,	0,	'',	0,	0,	0,	new Date(),	new Date(),	0,	0,	0,	new Date(),	0,	0,	false,	'',	'',	'',	'',	'',	'');	
loandetail:Loan= new Loan(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',0,0,0,new Date(),'',	0,	'',	'',	'',	'',	false,	false,	'',	false,	false,	false,	false,	'',	0,	'',	0,	'',	new Date(),	0,	0,	0,	'',	'',	0,	0,	'',	0,	'',	0,	0,	'',	0,	0,	0,	new Date(),	new Date(),	0,	0,	0,	new Date(),	0,	0,	false,	'',	'',	'',	'',	'',	'',0);	
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
CustProof:IProof[]=[];
GuaranProof:IProof[]=[];
ECustProof:IProof[]=[];
EGuaranProof:IProof[]=[];
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
        this.loandetail=data ; 
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
   // this._appService.InsertProof(this.CustID,this.proof1,this.proofNumber1,this.selectedFile1,'Customer',this.LoanID).subscribe(res =>{console.log(res)});
    //  this._appService.getProof(this.CustID,'Customer',this.LoanID).subscribe(res=>this.ECustProof=res);
    this.ECustProof.push({ID:this.CustID,CustType:'Customer',ProofType:this.proof1,ProofNumber:this.proofNumber1,File:this.selectedFile1})
    this.proof1=''; this.proofNumber1=''; $('#file1').val('')
    }
    else
    {
    // this._appService.InsertProof(this.CustID,this.proof,this.proofNumber,this.selectedFile,'Guarantor').subscribe(res =>{console.log(res);
    // this._appService.getProof(this.CustID,'Guarantor',this.LoanID).subscribe(res=>this.EGuaranProof=res);
    this.EGuaranProof.push({ID:this.CustID,CustType:'Guarantor',ProofType:this.proof,ProofNumber:this.proofNumber,File:this.selectedFile})
    this.proof=''; this.proofNumber=''; $('#file').val('')
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

  filterdrop(value)
  {
   
    if(this.loandetail["SubAreaID"]== undefined || value=='')
    {
      console.log("Anu")
    if(this.loandetail["BranchID"]!= undefined)
    {
     this.Line= this.AllLine.filter(x=> x.DistrictID== this.loandetail["BranchID"])
    }
    if(this.loandetail["LineID"]!= undefined)
    {
     this.Area= this.AllArea.filter(x=> x.LineID== this.loandetail["LineID"])
    }
    if(this.loandetail["AreaID"]!= undefined)
    {
     this.Sarea= this.AllSarea.filter(x=> x.DistrictID== this.loandetail["AreaID"])
    }
  }
    else
    {
      var Area= this.AllSarea.filter(x=>x.TalukID== this.loandetail["SubAreaID"])[0].DistrictID
      console.log(Area)
      if(Area!= null){
        this.Area=this.AllArea
      this.loandetail.AreaID=Area;
      this.Line=this.AllLine
      console.log(this.Area)
      this.loandetail.LineID= this.Area.filter(x=>x.AreaID== this.loandetail.AreaID)[0].LineID;
     // this.loandetail.LineID=1010
      console.log(this.loandetail.LineID)
      this.branch= this.Allbranch;
      this.loandetail.BranchID=this.Line.filter(x=>x.TalukID==this.loandetail.LineID)[0].DistrictID
      }
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
    console.log(ProofType)
    // this._appService.deleteProof(this.CustID,ProofType,Type).subscribe(res=>{console.log(res);
    // this._appService.getProof(this.CustID,'Customer',this.LoanID).subscribe(res=>this.ECustProof=res);
    // this._appService.getProof(this.CustID,'Guarantor',this.LoanID).subscribe(res=>this.EGuaranProof=res);
    if(Type=='Customer')
    {
    var value=this.ECustProof.indexOf( this.ECustProof.filter(x=>x.ProofType== ProofType)[0])
    //this.deleteCustProof.push(this.ECustProof.filter(x=>x.ProofType== ProofType)[0])
    this.ECustProof.splice(value,1)
   if(ProofType=='AADHAR')
   {
     this.loandetail.CustAadhar=''
   }
    this._appService.deleteProof(this.CustID,ProofType,Type,this.LoanID).subscribe(res=>{console.log(res);})
    }
    else
    {
      var value=this.EGuaranProof.indexOf( this.EGuaranProof.filter(x=>x.ProofType== ProofType)[0])
     // this.deleteGuaranProof.push( this.EGuaranProof.filter(x=>x.ProofType== ProofType)[0])
    this.EGuaranProof.splice(value,1)
    if(ProofType=='AADHAR')
   {
     this.loandetail.GAadhar=''
   }
    this._appService.deleteProof(this.CustID,ProofType,Type,this.LoanID).subscribe(res=>{console.log(res);})
    }
 
  }
  
  SaveLoan()
  {
    var CustID= this.loandetail.CustomerID
    var length=0
    console.log('loanid'+this.LoanID)
   this._appService.DeleteFileLoc(CustID,this.LoanID).subscribe(res=>{
     this.loandetail.RequestID=this.RequestID;
    this._appService.InsertIssuedLoanDetails(this.loandetail).subscribe(res =>
      { console.log(this.loandetail);
        this.LoanID=parseInt(res.toString().split(',')[0])
        this.LoanNo=res.toString().split(',')[1]
   for(var i=0;i<this.ECustProof.length;i++)
   {
     length+=1;
     var value= this.ECustProof[i];

     if(value.CustType!=null)
     this._appService.InsertProof(CustID,value.ProofType,value.ProofNumber,value.File,value.CustType,this.LoanID).subscribe(res=>console.log(res))
     this._appService.getProof(this.CustID,'Customer',this.LoanID).subscribe(res=>this.ECustProof=res);
     this._appService.getProof(this.CustID,'Customer',0).subscribe(res=>this.CustProof=res);
    }
   for(var i=0;i<this.EGuaranProof.length;i++)
   {
    length+=1;
     var value= this.EGuaranProof[i];

     if(value.CustType!=null)
     {
      console.log(value.File.name)
     this._appService.InsertProof(CustID,value.ProofType,value.ProofNumber,value.File,value.CustType,this.LoanID).subscribe(res=>console.log(res))
   }
   this._appService.getCollection(this.LoanID).subscribe(res=>{this.AllCollection=res});
    this._appService.getProof(this.CustID,'Guarantor',this.LoanID).subscribe(res=>this.EGuaranProof=res);
    this._appService.getProof(this.CustID,'Guarantor',0).subscribe(res=>this.GuaranProof=res);
  }
 


      this._appService.getLoanbyCustomer(this.CustID).subscribe(res=> this.loanCust=res);
      this._appService.getCustomer(this.CustID,this.RequestID).subscribe((data:any)=> 
      {
        this.loandetail=data ;
        this.loandetail.LoanDate= new Date();
        this.OnChange();
        ;});
        alert("The LoanNo "+this.LoanNo+" has been created/updated successfully")
     });
  
    })
   /// 
  }

  getLoanDetail(LoanID: Number,form)
  {
     
  $('#modal-content').height(window.innerHeight-60).css({'overflow-y':'auto'})
    console.log(this.loandetail)
    //this._appService.UpdateCustomer(this.loandetail).subscribe(res=>{console.log(res);
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
        this.loandetail=data ; 
        this.loandetail.CustStatus="Running"
        this.LoanID=0;
        this.DueType=this.loandetail.DueType
       this.DueType='Interest'? this.loandetail.IntType='Daily': this.loandetail.IntType=''
        this.loandetail.LoanDate= new Date()
        
     this.OnChange();
      })
      this._appService.getProof(this.CustID,'Customer',0).subscribe(res=>this.ECustProof=res);
      this._appService.getProof(this.CustID,'Guarantor',0).subscribe(res=>this.EGuaranProof=res);
    
      
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
    

  }
  print(value:Collection)
  {
    var string=`<html>
    <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css'>
    <style>
    .logo
    {
        width: 80px;
        padding: 5px;
    }
    label,.algn
    {
    text-align:right !important;
    }
    </style>
    <script>
    function myFunction() {
      document.getElementById('btn').style.visibility = 'hidden';
      window.print();
     
    }
    </script>
    </head>
    <body>
           <div class='row'>
    
                        <div class=' form-horizontal col-md-6'>
              <div class='form-group' style='margin-left:20px'>
                         <img class='col-sm-2 algn' src='assets/Logo.jpg' style='height:10%;'>
                        <label class='control-label col-sm-5' style='text-align:left !important'>Sri Navaladi Marudham Capitals,Cheyyar</label>
            
                          </div>
                <div class='form-group'>
                 
                          
                 </div>
                            <div class='form-group'>
                                <label class='control-label col-sm-3' style='text-align:right !important; width:250px!important'>Receipt No :</label>`
                  +value.BillBook+
                  ` </div>
                             
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Date/Time :</label>`
                  + new Date() +`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Line/Area :</label>
                   `+ this.AllLine.filter(x=> x.TalukID== this.loandetail.LineID)[0].TalukName+`/`+this.AllArea.filter(x=>x.AreaID== this.loandetail.AreaID)[0].AreaName+
                  ` </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Customer ID :</label>
                   `+ this.loandetail.CustomerID+`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='text-align:right !important; width:250px!important'>Customer Name :</label>
                  `+this.loandetail.CustName+`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Loan Category :</label>
                   `+ this.LoanCategory.filter(x=>x.dropdownKey== this.loandetail.LoanCatID)[0].dropdownName +`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Loan No :</label>
                   `+ this.loandetail.LoanNo+`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Due Receipt :</label>
                  `+value.Duereciept+`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Penalty :</label>
                                `+value.Penaltyreciept+`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='text-align:right !important; width:250px!important'>Net Received :</label>
                   `+value.Duereciept+value.Penaltyreciept +`
                   </div>
                    <div class='form-group'>
   
                    <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Due Balance :</label>
                    `+value.dueBal +`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Loan Balance :</label>
                                `+value.TotalBal +`
                   </div>
                   </div>
                   </div>

    </body>
    </html>`
    var wnd = window.open("", "_blank");
wnd.document.write(string);
wnd.print();
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
  console.log(this.selectedFile)
}
onFileChanged1(event) {
  this.selectedFile1 = event.target.files[0]
  console.log(this.selectedFile1)
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
    $('#IntType').removeAttr("disabled");
  }
  else{
    $('#IntType').attr("disabled","disabled");
    $('#intAmt').removeAttr("disabled");
    $('#totAmt').removeAttr("disabled");
    $('#installmentAmt').removeAttr("disabled");
    $('#netAmt').removeAttr("disabled");

  }
}
 OnChange()
  {
this.EmiDisable();

   if(this.loandetail["LoanCatID"] !=null)
   {
     this.Sagent=this.AllSagent.filter(x=>x.LoanCategory==this.loandetail["LoanCatID"].toString())
   }
   this.loandetail.TotLoanAmt= this.loandetail.LoanAmt
   this._appService.getDueDate(new Date(this.loandetail.LoanDate).toLocaleDateString().replace('/','-').replace('/','-'),this.loandetail.DueType,this.loandetail.Instalments).subscribe(res=>
    {
      this.due= res;
      console.log(this.due)
      this.loandetail.LoanDate=this.due.loandate;
      this.loandetail.FirstDueDt=this.due.firstdue;
      this.loandetail.LastDueDt=this.due.lastdue;
      if(this.AllCollection != undefined && this.AllCollection !=null && this.AllCollection.length>0)
      {
      if(new Date() >= new Date(this.collection[1].Date))
      {
        $('#loanSave').attr('disabled','disabled')
      }
      else
      {
        $('#loanSave').removeAttr('disabled')
      }
    }
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
   // this.loandetail["TotLoanAmt"]= this.loandetail["DocCharge"] != null? parseInt(this.loandetail["DocCharge"].toString())+parseInt(this.loandetail["LoanAmt"].toString()):parseInt(this.loandetail["LoanAmt"].toString());
    this.loandetail["InterestAmt"]= Math.round( (parseInt(this.loandetail["TotLoanAmt"].toString())* parseInt(this.loandetail["Instalments"].toString())* parseFloat(this.loandetail["IntRate"].toString()) )/100)
    this.loandetail["TotAmount"]= parseInt( this.loandetail["TotLoanAmt"].toString())  +  parseInt(this.loandetail["InterestAmt"].toString())
    this.loandetail["InstalmentAmt"]= parseInt( this.loandetail["TotAmount"].toString())/ parseInt(this.loandetail["Instalments"].toString())
    if(this.loandetail["DocCharge"]!= null && this.loandetail["DocCharge"].toString()!= "" && this.loandetail["DocChargeRecvd"]!=null && this.loandetail["DocChargeRecvd"].toString() =="Add with Loan Amount" && this.loandetail["DocCharge"].toString() !="")
    {
      this.loandetail["TotLoanAmt"]= this.loandetail["DocCharge"] != null? parseInt(this.loandetail["DocCharge"].toString())+parseInt(this.loandetail["LoanAmt"].toString()):parseInt(this.loandetail["LoanAmt"].toString());
    }
 if(this.loandetail["RoundedOff"])
 {
  this.loandetail["InstalmentAmt"]=Math.ceil(parseFloat(this.loandetail["InstalmentAmt"].toString())/5)*5;
  this.loandetail["TotAmount"]= parseInt(this.loandetail["InstalmentAmt"].toString())*parseInt(this.loandetail["Instalments"].toString());
  this.loandetail["InterestAmt"]= parseInt( this.loandetail["TotAmount"].toString())-parseInt(this.loandetail["TotLoanAmt"].toString())
 }
 if(this.loandetail["IncentiveRatio"]!= null ){
    if(this.loandetail["IncentiveRatio"].toString()!="") 
 {
  if(this.loandetail["IncentiveCalBy"] != null   && this.loandetail["IncentiveCalBy"].toString()=="Document Charge"){
  this.loandetail["IncentiveAmt"]= this.loandetail["DocCharge"] != null? parseInt(this.loandetail["IncentiveRatio"].toString())*(parseInt(this.loandetail["DocCharge"].toString())/100):0
 }
 else if(this.loandetail["IncentiveCalBy"] != null   && this.loandetail["IncentiveCalBy"].toString()=="Loan Amount")
 {
  this.loandetail["IncentiveAmt"]= this.loandetail["LoanAmt"] != null? parseInt(this.loandetail["IncentiveRatio"].toString())*(parseInt(this.loandetail["LoanAmt"].toString())/100):0
 }
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

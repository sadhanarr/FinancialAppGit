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
import { DatePipe } from '@angular/common';
import {IProof} from './Proof'
import { Collection } from './collection';
import { addCollection } from './addcollection';
import { Followup } from './Followup';
import {LoanStatus} from './LoanStatus';
import {DueDate} from './duedate'
import {LocalStorageService} from 'ngx-webstorage';
import * as moment from 'moment';

@Component({
  selector: 'app-home-loan',
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.css']
})
export class HomeLoanComponent implements OnInit {

  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router,private storage:LocalStorageService ) {
      this.addPermission = this.storage.retrieve('addCollection');
      this.deletePermission = this.storage.retrieve('deleteCollection');
     }
     addPermission:boolean;
    deletePermission:boolean;
    AllSagent:Agent[]=[];
    LoanCategory: ICompany[]=[];
    LoanNo:string
//customer:Customer= new Customer(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
AllSarea:Taluk[]=[];
intRate:Number=0;
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
imagePreview:any
//loandetail:Loan=new Loan(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',0,0,0,new Date(),'',	0,	'',	'',	'',	'',	false,	false,	'',	false,	false,	false,	false,	'',	0,	'',	0,	'',	new Date(),	0,	0,	0,	'',	'',	0,	0,	'',	0,	'',	0,	0,	'',	0,	0,	0,	new Date(),	new Date(),	0,	0,	0,	new Date(),	0,	0,	false,	'',	'',	'',	'',	'',	'');	
loandetail:Loan= new Loan(0,0,0,0,0,0,0,0,0,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',0,0,0,moment().toDate(),'',	0,	'',	'',	'',	'',	false,	false,	'',	false,	false,	false,	false,	'',	0,	'',	0,	'',	new Date(),	0,	0,	0,	'',	'',	0,	0,	'',	0,	'',	0,	0,	'',	0,	0,	0,	new Date(),	new Date(),	0,	0,	0,	new Date(),	0,	0,	false,	'',	'',	'',	'',	'',	'',0,'',null,null,'');	
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
addcollection:addCollection= new addCollection(0,0,'','',0,0,0,0,0,0,0,0,0,0,0,0,'');
collection:Collection= new Collection(0,0,new Date(),'',0,0,0,0,0,0,0,0,0,0,0,0,'');
col:Collection= new Collection(0,0,new Date(),'',0,0,0,0,0,0,0,0,0,0,0,0,'');
AllCollection:Collection[];
 penaltyBal:Number=0;
 dueBal:Number=0;
 TotalBal:Number=0;
 Status:string='';
username:string='';

FollowupDetails:Followup[];
followup:Followup= new Followup(0,0,0,new Date(),new Date(),'','','Current','',null);
loanStat:LoanStatus= new LoanStatus(0,'','','','','','','0');
  ngOnInit() {
    setInterval(function(){
      if($('#myModal').hasClass("in"))
      {
        
        $('#back').attr('disabled','disabled');
      }
      else
      {
     
       $('#back').removeAttr('disabled');
      }
     }, 3000);
    this.col= new Collection(0,0,new Date(),'',0,0,0,0,0,0,0,0,0,0,0,0,'');
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
    this._appService.Status.subscribe(res=>this.Status=res)
    this._appService.getProof(this.CustID,'Customer',0).subscribe(res=>this.CustProof=res);
    this._appService.getProof(this.CustID,'Guarantor',0).subscribe(res=>this.GuaranProof=res);
    this._appService.getLoanDetails().subscribe(res=> this.loan= res)
    this._appService.currentReqID.subscribe(res=>{ this.RequestID= res;
      console.log(this.RequestID) 
      this._appService.getCustomer(this.CustID,this.RequestID).subscribe((data:any)=> 
      {
        this.loandetail=data ; 
        this.intRate=this.loandetail.IntRate
        this.imagePreview=this.loandetail.PhotoLoc.replace(this._appService.filepath,location.origin+"/");
        console.log(this.imagePreview)
        this.DueType=this.loandetail.DueType;
     this.OnChange();
      })
    });
    this._appService.UserName.subscribe(res=>this.username=res)
    this._appService.getBranch().subscribe((data:any[])=>{
      this.Allbranch=data
    this.branch=data;
    }) 
   
    
  }
  ngAfterViewChecked()
  {

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
     
     window.open(url.replace(this._appService.filepath,location.origin+"/"))
  
    }
    AddLoanStatus(form)
    {
      this.loanStat.LoanId=this.LoanID
      console.log(this.loanStat)
      this._appService.insertLoanIssueStatus(this.loanStat).subscribe(res=>{console.log(res);
        this._appService.getFollowup(this.LoanID).subscribe(res=>{this.FollowupDetails=res});
        this._appService.getIssueLoanStatus(this.LoanID).subscribe(res=>{
          this.loanStat=res;
          this._appService.getLoanDetail(this.LoanID).subscribe(res=> 
            this.loandetail=res);
          
          this._appService.getLoanbyCustomer(this.CustID).subscribe(res=> this.loanCust=res)
      form.resetForm(form);})
          });
    }
  AddFollowup(form)
  {
    this.followup.LoanID=this.LoanID
    this.followup.CreatedBy=this.storage.retrieve('User')
    console.log(this.followup)
    this._appService.InsertLoanFollowupDetail(this.followup).subscribe(res=>{console.log(res);
    this._appService.getFollowup(this.LoanID).subscribe(res=>{this.FollowupDetails=res});
    this._appService.getIssueLoanStatus(this.LoanID).subscribe(res=>{

      console.log(res);
      this.loanStat=res;
      this.changeLoanStatus(this.loanStat.LoanStatus);});
      this.followup= new Followup(0,0,0,new Date(),new Date(),'','','Current','',null)
  
    form.resetForm(form);})
  }
  DeleteFollowup(followupId:Number)
  {
    this._appService.DeleteLoanFollowupDetail(followupId).subscribe(res=>{console.log(res);
    this._appService.getFollowup(this.LoanID).subscribe(res=>{this.FollowupDetails=res});})
  }
  AddEntry(form)
  {
    this._appService.UserName.subscribe(res=>this.col.CreatedBy=res)
   this.col.CreatedBy=this.storage.retrieve('User')
    if(new Date(this.col.Date)>new Date())
    {
    this.formSubmit=true; 
    return;
    }
    
    this.col.LoanID=this.LoanID;
   console.log(this.col)
   
   
   this.addcollection={      SNO :this.col.SNO,
    LoanID:this.col.LoanID,
     Date:new DatePipe("en-US").transform(this.col.Date,"yyyy-MM-dd"),
     BillBook :this.col.BillBook,
    EMIID:this.col.EMIID,
     DueNo :this.col.DueNo,
     DueAmt :this.col.DueAmt,
     Duereciept :this.col.Duereciept,
    PenaltyAmount:this.col.PenaltyAmount,
     Penaltyreciept :this.col.Penaltyreciept,
     penaltyBal :this.col.penaltyBal,
     dueBal :this.col.dueBal,
     TotalBal :this.col.TotalBal,
     Principalreciept :this.col.Principalreciept,
     LoanAmount :this.col.LoanAmount,
    MachineID:this.col.MachineID,
    CreatedBy:this.col.CreatedBy}
    this._appService.addCollection(this.addcollection).subscribe(res=>{ console.log(res);
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
  
  SaveLoan(form1,form2)
  {
    if (form1.invalid || form2.invalid) {
      this.formSubmit=true; 
      console.log("not valid")
      return;
   }
    this.loandetail.UserNme=this.storage.retrieve('User')
    var CustID= this.loandetail.CustomerID
    var length=0
    var time= moment().format('HH:mm:ss')
    this.loandetail.LoanDate=moment(this.loandetail.LoanDate).format('YYYY-MM-DD')+ ' '+time
    this.loandetail.FirstDueDt=moment(this.loandetail.FirstDueDt).format('YYYY-MM-DD')+' 00:00:00'
    this.loandetail.LastDueDt=moment(this.loandetail.LastDueDt).format('YYYY-MM-DD')+' 00:00:00'
    this.loandetail.PhotoLoc=null;
    console.log(this.loandetail)
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
        this.OnDateChange();
        this.OnChange();
        ;});
        alert("The LoanNo "+this.LoanNo+" has been created/updated successfully")
        document.getElementById("loanbtn").click();
     });
  
    })
   /// 
  }

  getLoanDetail(LoanID: Number,form)
  {
    
    this.followup= new Followup(0,0,0,new Date(),new Date(),'','','Current','',null)
  
  $('#modal-content').height(window.innerHeight-60).css({'overflow-y':'auto'})
    console.log(this.loandetail)
    //this._appService.UpdateCustomer(this.loandetail).subscribe(res=>{console.log(res);
    this.LoanID=LoanID;
    
    if(LoanID>0)
    {
    this._appService.getLoanDetail(LoanID).subscribe(res=> {
      console.log(res);this.loandetail=res;
      this.intRate=this.loandetail.IntRate
      this.DueType=this.loandetail.DueType
      
      this.EmiDisable()})
      
      this._appService.getCollection(LoanID).subscribe(res=>{this.AllCollection=res});
      this._appService.getProof(this.CustID,'Customer',LoanID).subscribe(res=>this.ECustProof=res);
      this._appService.getProof(this.CustID,'Guarantor',LoanID).subscribe(res=>this.EGuaranProof=res);
      this._appService.getFollowup(LoanID).subscribe(res=>{this.FollowupDetails=res});
      this._appService.getIssueLoanStatus(LoanID).subscribe(res=>{
        
        this.OnChange();
        console.log(res);
        this.loanStat=res;
        this.changeLoanStatus(this.loanStat.LoanStatus);});
      
    }
    else{
      this._appService.getCustomer(this.CustID,this.RequestID).subscribe((data:any)=> 
      {
        this.loandetail=data ; 
        this.loandetail.CustStatus="Current"
        this.LoanID=0;
        this.DueType=this.loandetail.DueType
       this.DueType='Interest'? this.loandetail.IntType='Daily': this.loandetail.IntType=''
        this.loandetail.LoanDate= new Date()
        this.FollowupDetails["FollowupDate"]= new Date();
     this.OnChange();
     this.OnDateChange();
      })
      this._appService.getProof(this.CustID,'Customer',0).subscribe(res=>this.ECustProof=res);
      this._appService.getProof(this.CustID,'Guarantor',0).subscribe(res=>this.EGuaranProof=res);
    
      
       this.AllCollection=[];
       this.FollowupDetails=[];
    }
      this._appService.getCollectionValue(0,LoanID,(new Date().toLocaleDateString()).replace('/','-').replace('/','-')).subscribe(res=>{ console.log(res)
      if(res != null)
      {this.col=res;
   
        this.penaltyBal=this.col.penaltyBal;
  this.dueBal= this.col.dueBal;
  this.TotalBal=this.col.TotalBal
   }})
    

  }
  print(value:Collection)
  {
    var netamt=parseInt(value.Duereciept.toString())+parseInt(value.Penaltyreciept.toString())
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
    .form-horizontal .control-label
    {
      padding-top:0px !important;
    }
    </style>
    <script>
    function myFunction() {
      document.getElementById('btn').style.visibility = 'hidden';
      window.print();
      document.getElementById('btn').style.visibility = 'visible';
    }
    </script>
    </head>
    <body>
           <div class='row'>
    
                        <div class=' form-horizontal col-md-6'>
              <div class='form-group' style='margin-left:20px'>
                         <img class='col-sm-2 algn' src='assets/Logo.jpg' style='height:10%;'>
                        <label class='control-label col-sm-5' style='text-align:left !important;margin-top:20px'>Sri Navaladi Marudham Capitals,`+this.Allbranch.filter(x=>x.BranchID==this.loandetail.BranchID)[0].BranchName+`</label>
                <button class=" col-sm-2" style='margin-top:20px' id='btn' onclick="myFunction()">Print </button>
                          </div>
              
                            <div class='form-group'>
                                <label class='control-label col-sm-3' style='text-align:right !important; width:250px!important'>Receipt No :</label>`
                  +value.BillBook+
                  ` </div>
                             
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Date/Time :</label>`
                  + this.formatAMPM( new Date() )+`
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
                   `+ netamt +`
                   </div>
                    <div class='form-group'>
   
                    <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Due Balance :</label>
                    `+value.dueBal +`
                   </div>
                    <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'>Loan Balance :</label>
                                `+value.TotalBal +`
                   </div>
                   <div class='form-group'>
                                <label class='control-label col-sm-3' style='font-weight: 100;text-align:right !important; width:250px!important'></label>
                               <i> Collected By: `+this.username +`</i>
                   </div>
                   </div>
                   </div>

    </body>
    </html>`
    var wnd = window.open("", "_blank");
wnd.document.write(string);

  }
   formatAMPM(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return month + '/' + day + '/' + year+ ' '+ strTime;
  }
  transformDate(date)
  {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var sec= date.getSeconds();
    return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+sec;
  }
  DateChange()
  {
   
     this._appService.getCollectionValue(0,this.LoanID,(new Date(this.col.Date).toLocaleDateString()).replace('/','-').replace('/','-')).subscribe(res=>{
      if(res != null){
      this.col=res;
  this.penaltyBal=this.col.penaltyBal;
  this.dueBal= this.col.dueBal;
  this.TotalBal=this.col.TotalBal
      }
    })
  
  }
  CollectionCal()
  {this.col.penaltyBal=this.penaltyBal;
    this.col.dueBal= this.dueBal;
    this.col.TotalBal=this.TotalBal;
        
    if(this.col.Penaltyreciept != null && this.col.Penaltyreciept.toString() !='')
    {
      this.col.penaltyBal= parseFloat( this.col.penaltyBal.toString())-parseFloat( this.col.Penaltyreciept.toString());
    }
    if(this.col.Duereciept != null && this.col.Duereciept.toString() !='')
    {
      this.col.dueBal= parseFloat( this.col.dueBal.toString())-parseFloat( this.col.Duereciept.toString());
      if(this.DueType=='EMI')
      this.col.TotalBal= parseFloat( this.col.TotalBal.toString())-parseFloat( this.col.Duereciept.toString());
    }
    if(this.col.Principalreciept != null && this.col.Principalreciept.toString() !='')
    {
      this.col.TotalBal= parseFloat( this.col.TotalBal.toString())-parseFloat( this.col.Principalreciept.toString());
    }
    if(this.col.LoanAmount != null && this.col.LoanAmount.toString() !='')
    {
      this.col.TotalBal= parseFloat( this.col.TotalBal.toString())+parseFloat( this.col.LoanAmount.toString());
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
OnDateChange()
{
  this._appService.getDueDate(new Date(this.loandetail.LoanDate).toLocaleDateString().replace('/','-').replace('/','-'),this.loandetail.DueType,this.loandetail.Instalments).subscribe(res=>
    {
      this.due= res;
      console.log(this.due)
    // this.loandetail.LoanDate=this.due.loandate;
      this.loandetail.FirstDueDt=this.due.firstdue;
      this.loandetail.LastDueDt=this.due.lastdue;
    })
}
 OnChange()
  {
this.EmiDisable();

   if(this.loandetail["LoanCatID"] !=null)
   {
     this.Sagent=this.AllSagent.filter(x=>x.LoanCategory==this.loandetail["LoanCatID"].toString())
   }
   this.loandetail.TotLoanAmt= this.loandetail.LoanAmt

      if(this.AllCollection != undefined && this.AllCollection !=null && this.AllCollection.length>0)
      {
        console.log(new Date(this.AllCollection[0].Date))
      if(this.loandetail.LoanID>0 && ((this.loandetail.DueType=='EMI' && new Date() >= new Date(this.AllCollection[0].Date)) || (this.loandetail.DueType=='Interest' && this.AllCollection.length>1)) )
      {
        $('#loanSave').attr('disabled','disabled')
      }
      else
      {
        $('#loanSave').removeAttr('disabled')
      }
    }
   var date = new Date(this.loandetail.FirstDueDt)
    date.setMonth( date.getMonth()+this.loandetail.Instalments-1)
    this.loandetail.LastDueDt=date;
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
    if(this.loandetail.LoanCatID == 1 || this.loandetail.LoanCatID == 2 || this.loandetail.LoanCatID == 3)
    {
      $('#ProdAdvAmt').removeAttr("disabled");
      $('#ProdTotAmt').removeAttr("disabled");
      $('#loanamt').attr("disabled","disabled");
      if(this.loandetail.ProdTotAmt != null && this.loandetail.ProdTotAmt>0  && this.loandetail.ProdAdvAmt != null)
    {
      this.loandetail.LoanAmt= parseInt(this.loandetail.ProdTotAmt.toString())-parseInt(this.loandetail.ProdAdvAmt.toString())
    }
    }
    else{
      $('#ProdAdvAmt').attr("disabled","disabled");
      $('#ProdTotAmt').attr("disabled","disabled");
      $('#loanamt').removeAttr("disabled");
    }
    
    if(this.loandetail["DueType"]=="EMI"){
   // this.loandetail["TotLoanAmt"]= this.loandetail["DocCharge"] != null? parseInt(this.loandetail["DocCharge"].toString())+parseInt(this.loandetail["LoanAmt"].toString()):parseInt(this.loandetail["LoanAmt"].toString());
   if(this.isscheme)
   {
   this.loandetail["InterestAmt"]=0
   this.loandetail['IntRate']=0;
   }
   else
   {
    this.loandetail["IntRate"]= this.intRate
   this.loandetail["InterestAmt"]= Math.round( (parseInt(this.loandetail["TotLoanAmt"].toString())* parseInt(this.loandetail["Instalments"].toString())* parseFloat(this.loandetail["IntRate"].toString()) )/100)
 
  }
   this.loandetail["TotAmount"]=Math.round( parseInt( this.loandetail["TotLoanAmt"].toString())  +  parseInt(this.loandetail["InterestAmt"].toString()))
    this.loandetail["InstalmentAmt"]=Math.round( parseInt( this.loandetail["TotAmount"].toString())/ parseInt(this.loandetail["Instalments"].toString()))
    if(this.loandetail["DocCharge"]!= null && this.loandetail["DocCharge"].toString()!= "" && this.loandetail["DocChargeRecvd"]!=null && this.loandetail["DocChargeRecvd"].toString() =="Add with Loan Amount" && this.loandetail["DocCharge"].toString() !="")
    {
      this.loandetail["TotLoanAmt"]= this.loandetail["DocCharge"] != null? parseInt(this.loandetail["DocCharge"].toString())+parseInt(this.loandetail["LoanAmt"].toString()):parseInt(this.loandetail["LoanAmt"].toString());
    }
 if(this.loandetail["RoundedOff"])
 {
  this.loandetail["InstalmentAmt"]=Math.ceil(parseFloat(this.loandetail["InstalmentAmt"].toString())/5)*5;
  this.loandetail["TotAmount"]=Math.round( parseInt(this.loandetail["InstalmentAmt"].toString())*parseInt(this.loandetail["Instalments"].toString()));
 if(this.isscheme)
 this.loandetail["InterestAmt"]=0
 else
  this.loandetail["InterestAmt"]=Math.round( parseInt( this.loandetail["TotAmount"].toString())-parseInt(this.loandetail["TotLoanAmt"].toString()))
 }
 if(this.loandetail["IncentiveRatio"]!= null ){
    if(this.loandetail["IncentiveRatio"].toString()!="") 
 {
  if(this.loandetail["IncentiveCalBy"] != null   && this.loandetail["IncentiveCalBy"].toString()=="Document Charge"){
  this.loandetail["IncentiveAmt"]= this.loandetail["DocCharge"] != null?Math.round( parseInt(this.loandetail["IncentiveRatio"].toString())*(parseInt(this.loandetail["DocCharge"].toString())/100)):0
 }
 else if(this.loandetail["IncentiveCalBy"] != null   && this.loandetail["IncentiveCalBy"].toString()=="Loan Amount")
 {
  this.loandetail["IncentiveAmt"]= this.loandetail["LoanAmt"] != null? Math.round( parseInt(this.loandetail["IncentiveRatio"].toString())*(parseInt(this.loandetail["LoanAmt"].toString())/100)):0
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
   if(this.isscheme && this.loandetail["SchemeAmtReceived"] !=null && this.loandetail["SchemeAmtReceived"].toString() =="Add with Loan Amount" && this.loandetail["SchemeAmt"].toString() != ""  )
   {
    this.loandetail["TotAmount"]=Math.round( parseInt( this.loandetail["TotLoanAmt"].toString())  +  parseInt(this.loandetail["SchemeAmt"].toString()))
   }
  }
  if(this.loandetail["DueType"]=="Interest"){
    if(this.loandetail["LoanAmt"]!=null && this.loandetail["Instalments"] != null && this.loandetail["IntRate"]!=null &&this.loandetail["LoanAmt"].toString()!="" && this.loandetail["Instalments"].toString() !="" && this.loandetail["IntRate"].toString()!="")
    {
      var days=30;
     // this.loandetail.IntType=='Daily'?days=30: days=new Date(parseInt(this.loandetail.LoanDate.getFullYear.toString()),parseInt( this.loandetail.LoanDate.getMonth.toString()) + 1, 0).getDate()
    this.loandetail["InterestAmt"]=Math.round((parseFloat(this.loandetail["LoanAmt"].toString())*days*parseFloat(this.loandetail["IntRate"].toString())/days)/100)

}
  
}

  }
 
}

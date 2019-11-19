import { Component, OnInit, ViewChild, } from '@angular/core';
import * as $ from 'jquery'
import { DatepickerOptions } from 'ng2-datepicker';
import {AppService} from '../app.service'
import { ICompany } from '../master-screen/Company';
import {Branch} from '../master-screen/branch'
import {State} from '../master-screen/State'
import {District} from '../master-screen/district'
import {Taluk} from '../master-screen/taluk'
import {Area} from '../master-screen/area'
import {Agent} from '../master-screen/agent'
import {Request} from './request'
import {ROI} from './ROI'
import { ActivatedRoute, Router} from '@angular/router';
import { Form ,NgForm,Validators} from '@angular/forms';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})
export class LoanRequestComponent implements OnInit {

  
  dateValue: Date;
  loanCatReq:boolean=false;
  selectedFile:File;
  AllCompany:ICompany[]=[];
  LoanCategory: ICompany[]=[];
  Allbranch: Branch[]=[];
  AllState: State[]=[];
  AllDistrict:District[]=[];
  AllTaluk:Taluk[]=[];
  AllArea:Area[]=[];
  AllSagent:Agent[]=[];
  branch: Branch[]=[];
 District:District[]=[];
  Taluk:Taluk[]=[];
  Area:Area[]=[];
  Sagent:Agent[]=[];
  ROI:ROI[]=[];
  showImage:boolean=false;
  formSubmit:boolean=false;
  valfromChild:Request;
  imagePreview:any;
  URL:string;
  request:Request= new Request(null,new Date(),0,0,0,0,0,0,0,null,'','','','','','','','','','','','','','','','',0,0,'','',null,null
  ,null,null,null,null,null,null,null,null,'','','','','')
  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) {
   }

  ngOnInit() {
     this.request["RequestDate"] = new Date()
     this.request["DueType"]="EMI";
     this.request["ReqStatus"]="";
     this.request["ReqStatus"]="Request"
     this.request["CompanyID"]=1;
     this._appService.getCompany().subscribe((data:any[])=>{
      this.AllCompany=data
     });
     this._appService.getBranch().subscribe((data:Branch[])=>{
      this.Allbranch=data
     
    })
     this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data
     });
     this._appService.getState().subscribe((data:any[])=>{this.AllState=data})
     this._appService.getDistrict().subscribe((data:any[])=>{this.AllDistrict=data; this.District=data;})
     this._appService.getTaluk().subscribe((data:any[])=>{this.AllTaluk=data; this.Taluk=data;})
     this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data;this.Area=data;})
     this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data;this.Sagent=data;})
     this._appService.currentReqID.subscribe(ID=> 
      {this.request["RequestID"]=ID;  
      console.log(ID) 
      if(ID>0)
      this._appService.getLoanRequest(ID).subscribe((data:any)=> {this.request=data;
        console.log(URL)
      this.URL=this.request.PhotoLoc.replace('D:\\Tech\\','http://103.110.236.177/')  
      this.filterDropEMI();});
      })
    
  }
  
  filterDrop()
  {
    if(this.request["MaritalStatus"]!= undefined)
    {
      if(this.request["MaritalStatus"]!= "Married")
      {
        console.log(this.request["MaritalStatus"])
        $("#spouseName").attr("disabled","disabled")
      }
      else
      {
        $("#spouseName").removeAttr("disabled")
      }
    }
    if(this.request["StateID"]!= undefined)
    {
     this.District= this.AllDistrict.filter(x=> x.StateID== this.request["StateID"])
    }
    console.log(this.AllTaluk)
    if(this.request["DistrictID"]!= undefined && this.request["DistrictID"] != 0)
    {
      console.log(this.request["DistrictID"])
     this.Taluk= this.AllTaluk.filter(x=> x.DistrictID== this.request["DistrictID"])
    }
    if(this.request["TalukID"]!= undefined)
    {
     this.Area= this.AllArea.filter(x=> x.TalukID== this.request["TalukID"])
    }
    if(this.request["LoanCatID"]!=undefined)
    {
      this.Sagent=this.AllSagent.filter(x=>x.LoanCategory==this.request["LoanCatID"].toString())
    }
   
  }
  filterDropEMI()
  {
    console.log(this.request["DueType"])
    if(this.request["DueType"]=='EMI')
      {
        $('#interest').hide();
        $('#emi').show();
      
      }
      else
      {
   
      $('#emi').hide();
      $('#interest').show();

      }
      if(this.request["RequestID"]==0){
    this.request["LoanAmt"]=null;
    this.request["RateOfInt"]=null;
    this.request["LoanPeriod"]=null;
    this.request["AdvRatio"]=null;
    this.request["AdvanceAmt"]=null;
    this.request["TotalAmt"]=null;
    this.request["IntAmount"]=null;
    this.request["SecRatio"]=null;
    this.request["TotalDue"]=null;
      }
  }
  receiveMessage($event) {
    console.log($event)
    this.valfromChild= $event;
    this.request["CustomerID"]=this.valfromChild["CustomerID"];
    this.request["CompanyID"]=this.valfromChild["CompanyID"];
    this.request["CustomerName"]=this.valfromChild["CustomerName"];
    this.request["BranchID"]= this.valfromChild["BranchID"];
    this.request["FatherName"]= this.valfromChild["FatherName"];
    this.request["MotherName"]=this.valfromChild["MotherName"];
    this.request["SpouseName"]=this.valfromChild["SpouseName"];
    this.request["StateID"]=this.valfromChild["StateID"];
	 this.request["DistrictID"]= this.valfromChild["DistrictID"]; 
    this.request["TalukID"]=this.valfromChild["TalukID"];  
    this.request["AreaID"]=this.valfromChild["AreaID"];  
    this.request["Initial"]= this.valfromChild["Initial"];
    this.request["Gender"]=this.valfromChild["Gender"];
    this.request["MaritalStatus"]= this.valfromChild["MaritalStatus"];
    this.request["CommunicationAddress"]=this.valfromChild["CommunicationAddress"];
    this.request["CustPrimaryContact"]=this.valfromChild["CustPrimaryContact"];
    this.request["CustSecondaryContact"]=this.valfromChild["CustSecondaryContact"];
    this.request["CustAadhar"]=this.valfromChild["CustAadhar"];
    this.request["GuarantorName"]=this.valfromChild["GuarantorName"];
    this.request["Relationship"]=this.valfromChild["Relationship"];
    this.request["GContact1"]=this.valfromChild["GContact1"];
    this.request["GContact2"]=this.valfromChild["GContact2"];
    this.request["GAadhar"]=this.valfromChild["GAadhar"];
    this.request["ReferedBy"]=this.valfromChild["ReferedBy"];
    this.request["PhotoLoc"]=this.valfromChild["PhotoLoc"];
    if(this.request.PhotoLoc != null){
    this.URL=this.request.PhotoLoc.replace('D:\\Tech\\','http://103.110.236.177/')  
    }
  document.getElementById("close").click();
  }
  preview()
  {
    if($('#file').val()!= '')
    {
   this.showImage= !this.showImage;
   if(this.showImage){
    const reader = new FileReader();
reader.onload = () => {
this.imagePreview = reader.result;
};
reader.readAsDataURL(this.selectedFile);
   }
  }
  else{
    window.open(this.URL);
  }
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  SaveRequest(form)
  {
    console.log(this.request)
    if(this.request.DueType=='EMI'&& this.request.LoanCatID==0)
    {
      this.loanCatReq=true;
      return;
    }
    else
    {
      this.loanCatReq=false;
    }
    if(form != '')
  {
  if (form.invalid ) {
    this.formSubmit=true; 
    console.log("not valid")
    return;
 }
}

if(this.selectedFile !=null){
this.request.PhotoLoc=this.selectedFile.name;
}
    this._appService.InsertLoanRequest(this.request,this.selectedFile)
    form.resetForm();
    $('#file').val('')
  }

  OnChange()
  {
   var ROIscheme:any
  
        if(this.request["TotalAmt"]!= null && this.request["AdvanceAmt"] != null)
    {
      this.request["LoanAmt"]= parseInt(this.request["TotalAmt"].toString())-parseInt(this.request["AdvanceAmt"].toString())
      this.request["AdvRatio"]=parseInt(((parseInt(this.request["AdvanceAmt"].toString())/ parseInt(this.request["TotalAmt"].toString()))*100).toFixed());
      if(this.request["LoanPeriod"]!= null){
        this._appService.getROI().subscribe((data:any[])=>{this.ROI=data;
         
         ROIscheme=  this.ROI.filter(x=> ( new Date( this.request["RequestDate"].toDateString()) >= new Date(x.FROMDATE) 
          && new Date( this.request["RequestDate"].toDateString()) <= new Date( x.TODATE)    
             &&  this.request["LoanPeriod"]>= x.DUEMIN && this.request["LoanPeriod"]<= x.DUEMAX && this.request["LoanCatID"]== x.LoanCatID && x.STATUS==1) ).map(x=> ({ROICODE:x.ROICODE, LoanCatID:x.LoanCatID,
            DueMax: x.DUEMAX,DUESTEPS: x.DUESTEPS, DUEMIN: x.DUEMIN, DUEROI: x.DUEROI, ROIMAX:x.ROIMAX, ROIMIN: x.ROIMIN, ADVMIN:x.ADVMIN, ADVSTEPS:x.ADVSTEPS,
            ADVMAX:x.ADVMAX,ADVROI:x.ADVROI, SECMIN:x.SECMIN,SECSTEPS:x.SECSTEPS,SECMAX:x.SECMAX,SECROI:x.SECROI, FROMDATE:x.FROMDATE,TODATE:x.TODATE,STATUS:x.STATUS              }))
         console.log(ROIscheme)
            var DUEROI:any= parseFloat( ROIscheme[0].DUEROI.toString())*( parseInt(this.request["LoanPeriod"].toString())/ parseInt( ROIscheme[0].DUESTEPS.toString()));
          console.log(DUEROI)
          
            var ADVROIper= this.request["AdvRatio"] >= ROIscheme[0].ADVMIN && this.request["AdvRatio"]<= ROIscheme[0].ADVMAX ? this.request["AdvRatio"]: ( this.request["AdvRatio"]>ROIscheme[0].ADVMAX ? ROIscheme[0].ADVMAX : ROIscheme[0].ADVMIN )
            var ADVROI = parseFloat(ROIscheme[0].ADVROI.toString())* parseFloat(Math.floor(ADVROIper/ROIscheme[0].ADVSTEPS).toFixed(0));
            console.log( parseFloat(Math.floor(ADVROIper/ROIscheme[0].ADVSTEPS).toFixed(0)))
            console.log(ADVROI)
            if(this.request["SecRatio"] != null){
            var SECROIper= ( this.request["SecRatio"] >= ROIscheme[0].SECMIN && this.request["SecRatio"]<= ROIscheme[0].SECMAX ? this.request["SecRatio"]: ( this.request["SecRatio"]>ROIscheme[0].SECMAX ? ROIscheme[0].SECMAX : ROIscheme[0].SECMIN ))
           var SECROI =  parseFloat(ROIscheme[0].SECROI.toString())* parseInt((SECROIper.toString()/ROIscheme[0].SECSTEPS.toString()).toString())
           console.log(SECROI)
           var netROI= parseFloat((ROIscheme[0].ROIMAX-DUEROI-ADVROI-SECROI).toFixed(3)).toFixed(2);
            this.request["RateOfInt"]=( netROI>= ROIscheme[0].ROIMIN && netROI<= ROIscheme[0].ROIMAX ? netROI: ( netROI>ROIscheme[0].ROIMAX ? ROIscheme[0].ROIMAX : ROIscheme[0].ROIMIN ))
          this.request["IntAmount"]= Math.ceil( (parseInt(this.request["LoanAmt"].toString())* parseInt(this.request["LoanPeriod"].toString())* parseFloat(this.request["RateOfInt"].toString()) )/100)
          this.request["TotalDue"]=Math.ceil( ( parseInt(this.request["LoanAmt"].toString())+ parseInt(this.request["IntAmount"].toString()))/ parseInt(this.request["LoanPeriod"].toString()))
          }
          });
        } 
    }
  
    // var DUEROI:any= parseFloat( ROIscheme[0].DUEROI.toString())*( this.request["LoanPeriod"]/ parseInt( ROIscheme[0].DUESTEPS.toString()));
    
  }
  Cancel(form)
  {
    form.resetForm();
    $('#newCustomer').prop('checked',true)
     $('#file').val('')
     $('#dueType').val('EMI')
     $('#status').val('Request')
     this.request["RequestDate"] = new Date()
  }
}

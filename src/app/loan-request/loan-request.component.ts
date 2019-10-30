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
import {CustomerSearchComponent} from '../customer-search/customer-search.component'
import { Form ,NgForm,Validators} from '@angular/forms';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})
export class LoanRequestComponent implements OnInit {
  @ViewChild('form',{static:true}) myForm: NgForm;
  
  dateValue: Date;
  selectedFile:File;
  AllCompany:ICompany[]=[];
  LoanCategory: ICompany[]=[];
  Allbranch: Branch[]=[];
  AllState: State[]=[];
  AllDistrict:District[]=[];
  AllTaluk:Taluk[]=[];
  AllArea:Area[]=[];
  AllSagent:Agent[]=[];
  ROI:ROI[]=[];
  showImage:boolean=false;
  formSubmit:boolean=false;
  valfromChild:Request;
  imagePreview:any;
  request:Request= new Request(null,new Date(),0,0,0,0,0,0,0,null,'','','','','','','','','','','','','','','','',0,0,'','',null,null
  ,null,null,null,null,null,null,null,null,'','','','')
  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) {
   }

  ngOnInit() {
     this.request["RequestDate"] = new Date ();
     this.request["DueType"]="EMI";
     this.request["ReqStatus"]="";
     
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
     this._appService.getDistrict().subscribe((data:any[])=>{this.AllDistrict=data})
     this._appService.getTaluk().subscribe((data:any[])=>{this.AllTaluk=data})
     this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
     this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data})
     this._appService.currentReqID.subscribe(ID=> 
      {this.request["RequestID"]=ID;  
      console.log(ID) 
      if(ID>0)
      this._appService.getLoanRequest(ID).subscribe((data:any)=> this.request=data);
      })
    
  }
  ngAfterViewChecked()
  {
    $('#dueType').on('change',function()
    {
      if(this.value=='EMI')
      {
        $('#interest').hide();
        $('#emi').show();
       
      }
      else
      {
   
      $('#emi').hide();
      $("#emi input").removeAttr("required")
      $('#interest').show();
    //  this.myForm.form.get("tAmt").setValidators()
    
      }
    })
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
  document.getElementById("close").click();
  }
  preview()
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
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  SaveRequest(form)
  {
    console.log(this.request)
    if(form != '')
  {
  if (form.invalid ) {
    this.formSubmit=true; 
    return;
 }
}
    this._appService.InsertLoanRequest(this.request,this.selectedFile)
    form.resetForm();
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
            var ADVROIper= this.request["AdvRatio"] >= ROIscheme[0].ADVMIN && this.request["AdvRatio"]<= ROIscheme[0].ADVMAX ? this.request["AdvRatio"]: ( this.request["AdvRatio"]>ROIscheme[0].ADVMAX ? ROIscheme[0].ADVMAX : ROIscheme[0].ADVMIN )
            var ADVROI = parseFloat(ROIscheme[0].ADVROI.toString())* (ADVROIper/ROIscheme[0].ADVSTEPS)
            if(this.request["SecRatio"] != null){
            var SECROIper= ( this.request["SecRatio"] >= ROIscheme[0].SECMIN && this.request["SecRatio"]<= ROIscheme[0].SECMAX ? this.request["SecRatio"]: ( this.request["SecRatio"]>ROIscheme[0].SECMAX ? ROIscheme[0].SECMAX : ROIscheme[0].SECMIN ))
           var SECROI =  parseFloat(ROIscheme[0].SECROI.toString())* parseInt((SECROIper/ROIscheme[0].SECSTEPS).toPrecision())
            var netROI= (ROIscheme[0].ROIMAX-DUEROI-ADVROI-SECROI).toFixed(2);
            this.request["RateOfInt"]=( netROI>= ROIscheme[0].ROIMIN && netROI<= ROIscheme[0].ROIMAX ? netROI: ( netROI>ROIscheme[0].ROIMAX ? ROIscheme[0].ROIMAX : ROIscheme[0].ROIMIN ))
          this.request["IntAmount"]= Math.round( (parseInt(this.request["LoanAmt"].toString())* parseInt(this.request["LoanPeriod"].toString())* parseFloat(this.request["RateOfInt"].toString()) )/100)
          this.request["TotalDue"]= parseInt(this.request["LoanAmt"].toString())+ parseInt(this.request["IntAmount"].toString())
          }
          });
        }
    }
  
    // var DUEROI:any= parseFloat( ROIscheme[0].DUEROI.toString())*( this.request["LoanPeriod"]/ parseInt( ROIscheme[0].DUESTEPS.toString()));
    
  }
  Cancel(form)
  {
    form.resetForm();
  }
}

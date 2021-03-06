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
import * as moment from 'moment';
import {LocalStorageService} from 'ngx-webstorage';
import { ActivatedRoute, Router} from '@angular/router';
import { Form ,NgForm,Validators} from '@angular/forms';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})
export class LoanRequestComponent implements OnInit {

  invalid:boolean
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
  AllLine:Taluk[]=[];
  AllHow:Taluk[]=[];
  Line:Taluk[]=[];
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
  request:Request= new Request(null,moment().format('DD/MM/YYYY'),0,0,0,0,0,0,0,null,'','','','','','','','','','','','','','','','',0,0,'','',null,null
  ,null,null,null,null,null,null,null,null,'','','','','','',0)
  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router,private storage:LocalStorageService) {
   }

  ngOnInit() {
     this.request["RequestDate"] = moment().format('DD/MM/YYYY')
     console.log(new Date())
     this.request["DueType"]="EMI";
     this.request["ReqStatus"]="Request"
     this.request["CompanyID"]=1;
     this._appService.getCompany().subscribe((data:any[])=>{
      this.AllCompany=data
     });
     this._appService.getBranch().subscribe((data:Branch[])=>{
      this.Allbranch=data
     
    })
    this._appService.GetHowtoKno().subscribe((data:any[])=>{
      this.AllHow=data
     })
     this._appService.getLoanCategory().subscribe((data:any[])=>{
      this.LoanCategory=data
     });
     this._appService.getState().subscribe((data:any[])=>{this.AllState=data})
     this._appService.getDistrict().subscribe((data:any[])=>{this.AllDistrict=data; this.District=data;})
     this._appService.getTaluk().subscribe((data:any[])=>{this.AllTaluk=data; this.Taluk=data;})
     this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data;this.Area=data;})
     this._appService.getLine().subscribe((data:any[])=>{this.AllLine=data;this.Line=data;})
     this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data;this.Sagent=data;})
     this._appService.currentReqID.subscribe(ID=> 
      {this.request["RequestID"]=ID;  
      console.log(ID) 
      if(ID>0)
      this._appService.getLoanRequest(ID).subscribe((data:any)=> {this.request=data;
        console.log(URL)
      this.URL=this.request.PhotoLoc.replace(this._appService.filepath,location.origin+"/")  
      this.filterDropEMI();});
      })
     
  }
  
  filterDrop()
  {
    if(this.request.LoanCatID != undefined || this.request.LoanCatID != null){
    if(this.request.LoanCatID== 1 || this.request.LoanCatID== 2 || this.request.LoanCatID== 3 )
    {
      this.request.DueType='EMI'
    }}
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
    if(this.request["DistrictID"]!= undefined )
    {
      console.log(this.request["DistrictID"])
     this.Taluk= this.AllTaluk.filter(x=> x.DistrictID== this.request["DistrictID"])
    }
    if(this.request["TalukID"]!= undefined)
    {
    
     this.Area= this.AllArea.filter(x=> x.TalukID== this.request["TalukID"])
    }
    if(this.request["AreaID"]!= undefined)
    {
      var LineID=this.AllArea.filter(x=> x.AreaID== this.request["AreaID"])[0].LineID
     this.request.LineID= LineID;
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
    this.URL=this.request.PhotoLoc.replace(this._appService.filepath,location.origin+"/")  
    }
  document.getElementById("close").click();
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
    this.request.User= this.storage.retrieve('User').toString();
    var time= moment().format('HH:mm:ss')
  this.request.RequestDate=moment(this.request.RequestDate).format('YYYY-MM-DD')+ ' '+time
 this.invalid=false;
    if(this.request.DueType=='EMI'&& this.request.LoanCatID==0)
    {
     this.invalid=true
    }
    if((this.selectedFile != null && this.URL !='' ) || this.request.StateID ==0 || this.request.TalukID ==0 || this.request.AgentID ==0 || this.request.AreaID ==0 || this.request.BranchID==0 || this.request.DistrictID ==0 || this.request.StateID ==undefined || this.request.TalukID ==undefined || this.request.AreaID ==undefined || this.request.BranchID==undefined || this.request.DistrictID ==undefined || this.request.AgentID ==undefined )
    {
      this.invalid== true
    }
 
  if (form.invalid || this.invalid== true) {
    this.formSubmit=true;
    console.log(this.invalid) 
    console.log("not valid")
    return;
 }

if(this.selectedFile !=null){
this.request.PhotoLoc=this.selectedFile.name;
}
this.formSubmit=false;
var ID='';
this._appService.UserName.subscribe(res=>this.request.User=res)
    this._appService.InsertLoanRequest(this.request,this.selectedFile).subscribe(res =>
      { ID=res.toString();
        console.log('res'+res)
         form.resetForm();
        $('#file').val('')

    this._appService.InsertPhoto(parseInt(res.toString().split(",")[0]),this.selectedFile).subscribe(res=>{
     alert("The RequestID "+ID.toString().split(",")[1]+" and CustomerID "+ID.toString().split(",")[0]+" has been created/updated successfully")
     form.resetForm();
     this.request["RequestDate"] =  moment().format('DD/MM/YYYY')
     this.request["DueType"]="EMI";
     this.request["ReqStatus"]="Request";
     $('#file').val('')
     this.filterDropEMI();
    });
    });
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
         
         ROIscheme=  this.ROI.filter(x=> ( new Date( this.request["RequestDate"]) >= new Date(x.FROMDATE) 
          && new Date( this.request["RequestDate"]) <= new Date( x.TODATE)    
             && this.request["LoanCatID"]== x.LoanCatID && x.STATUS==1) ).map(x=> ({ROICODE:x.ROICODE, LoanCatID:x.LoanCatID,
            DUEMAX: x.DUEMAX,DUESTEPS: x.DUESTEPS, DUEMIN: x.DUEMIN, DUEROI: x.DUEROI, ROIMAX:x.ROIMAX, ROIMIN: x.ROIMIN, ADVMIN:x.ADVMIN, ADVSTEPS:x.ADVSTEPS,
            ADVMAX:x.ADVMAX,ADVROI:x.ADVROI, SECMIN:x.SECMIN,SECSTEPS:x.SECSTEPS,SECMAX:x.SECMAX,SECROI:x.SECROI, FROMDATE:x.FROMDATE,TODATE:x.TODATE,STATUS:x.STATUS              }))
        
         this.request["LoanPeriod"]= (parseInt(this.request["LoanPeriod"].toString())>= parseInt(ROIscheme[0].DUEMIN) && parseInt(this.request["LoanPeriod"].toString())<=parseInt( ROIscheme[0].DUEMAX)) ? this.request["LoanPeriod"]: ( parseInt(this.request["LoanPeriod"].toString())>ROIscheme[0].DUEMAX ? ROIscheme[0].DUEMAX : ROIscheme[0].DUEMIN ) 
            var DUEROI:any= parseFloat( ROIscheme[0].DUEROI.toString())*(( parseInt(ROIscheme[0].DUEMAX)-parseInt(this.request["LoanPeriod"].toString()))/ parseInt( ROIscheme[0].DUESTEPS.toString()));
          
          
            var ADVROIper= this.request["AdvRatio"] >= ROIscheme[0].ADVMIN && this.request["AdvRatio"]<= ROIscheme[0].ADVMAX ? this.request["AdvRatio"]: ( this.request["AdvRatio"]>ROIscheme[0].ADVMAX ? ROIscheme[0].ADVMAX : ROIscheme[0].ADVMIN )
            var ADVROI = parseFloat(ROIscheme[0].ADVROI.toString())* parseFloat(Math.floor(ADVROIper/ROIscheme[0].ADVSTEPS).toFixed(0));
           
            if(this.request["SecRatio"] != null){
            var SECROIper= ( this.request["SecRatio"] >= ROIscheme[0].SECMIN && this.request["SecRatio"]<= ROIscheme[0].SECMAX ? this.request["SecRatio"]: ( this.request["SecRatio"]>ROIscheme[0].SECMAX ? ROIscheme[0].SECMAX : ROIscheme[0].SECMIN ))
           var SECROI =  parseFloat(ROIscheme[0].SECROI.toString())* parseInt((SECROIper.toString()/ROIscheme[0].SECSTEPS.toString()).toString())
          
           var netROI= parseFloat((ROIscheme[0].ROIMAX-DUEROI-ADVROI-SECROI).toFixed(2));
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
     this.request["RequestDate"] =moment().format('DD/MM/YYYY')
  }
 
  ResetCustomerFields()
  {
    $('#customerID').val('')
    this.request["CustomerName"]=""
    this.request["Initial"]=""
    this.request["FatherName"]=""
    this.request["MotherName"]=""
    this.request["Gender"]=""
    this.request["MaritalStatus"]=""
    this.request["SpouseName"]=""
    this.request["CommunicationAddress"]=""
    this.request["CustPrimaryContact"]=""
    this.request["CustSecondaryContact"]=""
    this.request["CustAadhar"]=""
    this.request["GuarantorName"]=""
    this.request["Relationship"]=""
    this.request["GContact1"]=""
    this.request["GContact2"]=""
    this.request["GAadhar"]=""
    this.request["StateID"]=0
    this.request["DistrictID"]=0
    this.request["TalukID"]=0
    this.request["AreaID"]=0
  }
}

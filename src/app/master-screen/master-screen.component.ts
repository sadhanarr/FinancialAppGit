import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppService} from '../app.service'
import {PagerService} from '../pager.service'
import {ICompany} from './Company'
import {Branch} from './branch'
import {State} from './State'
import {District} from './district'
import * as $ from 'jquery'
import { Form } from '@angular/forms';
import {Taluk} from './taluk'
import {Area} from './area'
import {Agent} from './agent'
import {User} from './user'
import {Machine} from './machine'
import {MLine} from './MLine'

@Component({
  selector: 'app-master-screen',
  templateUrl: './master-screen.component.html',
  styleUrls: ['./master-screen.component.css']
})
export class MasterScreenComponent implements OnInit {

   // pager object
   pager: any = {};
   // paged items
   pagedItems: any[];
   Company:ICompany[]=[];
   branch= new Branch(0,'',0,'','','','','')
   Allbranch: Branch[];
   masterScreen:string="branch";
   saveCall:Number=0;
   formSubmit=false;
   state= new State(0,'')
   Allstate:State[]=[];
   AllDistrict:District[]=[];
   district= new District(0,'',0);
   AllTaluk:Taluk[]=[];
   taluk=new Taluk(0,'',0,'')
   AllLine:Taluk[]=[];
   line=new Taluk(0,'',0,'')
   AllArea:Area[]=[];
   area= new Area(0,'',0,0,'')
   sarea=new Taluk(0,'',0,'')
   AllSarea:Taluk[]=[];
   sagent= new Agent(0,'',0,'','','','','','')
   AllSagent:Agent[]=[];
   user= new User(0,'','','','',0,'',0,'')
   AllUser:User[]=[];
   userrole= new Taluk(0,'',0,'')
   AllUserRole:Taluk[]=[];
   machinee= new Machine(0,'','',0,'')
   AllMachine: Machine[]=[];
   mline= new MLine(0,0,0,'')
   AllMLine:MLine[]=[];
   Pagerdata:any

  constructor(private _appService:AppService, private _pagerService:PagerService) { }

  ngOnInit() {
    this._appService.getCompany().subscribe((data:any[])=>{
     this.Company=data
    });
   this._appService.getBranch().subscribe((data:Branch[])=>{
     this.Allbranch=data
     this.setPage(1);
   })
   this._appService.getState().subscribe((data:any[])=>{this.Allstate=data})
   this._appService.getDistrict().subscribe((data:any[])=>{this.AllDistrict=data})
   this._appService.getTaluk().subscribe((data:any[])=>{this.AllTaluk=data})
   this._appService.getLine().subscribe((data:any[])=>{this.AllLine=data})
   this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
   this._appService.getSArea().subscribe((data:any[])=>{this.AllSarea=data})
   this._appService.getSAgent().subscribe((data:any[])=>{this.AllSagent=data})
   this._appService.getUser().subscribe((data:any[])=>{this.AllUser=data})
   this._appService.getUserRole().subscribe((data:any[])=>{this.AllUserRole=data})
   this._appService.getMachine().subscribe((data:any[])=>{this.AllMachine=data})
   this._appService.getMachineLine().subscribe((data:any[])=>{this.AllMLine=data})
   this.saveCall=1;
  }
 
  ngAfterViewChecked()
  {
    if(this.saveCall==1)
    {
      if(this.masterScreen=="branch")
      {
    this._appService.getBranch().subscribe((data:Branch[])=>{
      this.Allbranch=data;    
      this.setPage(1); 
    })
  }
  if(this.masterScreen=="state")
  {
    
    this._appService.getState().subscribe((data:any[])=>
    {
      this.Allstate=data;
     this.setPage(1)
    })
  }
  if(this.masterScreen=="district")
  {
    
    this._appService.getDistrict().subscribe((data:any[])=>
    {
      this.AllDistrict=data;
      this.setPage(1)
    })
  }
  if(this.masterScreen=="taluk")
  {
    
    this._appService.getTaluk().subscribe((data:any[])=>
    {
      this.AllTaluk=data;
      this.setPage(1)
    })
  }
  if(this.masterScreen=="line")
  {
    
    this._appService.getLine().subscribe((data:any[])=>
    {
      this.AllLine=data;
      this.setPage(1)
    })
  }
  if(this.masterScreen=="area")
  {
    
    this._appService.getArea().subscribe((data:any[])=>
    {
      this.AllArea=data;
      this.setPage(1)
    })
  }
  if(this.masterScreen=="sarea")
  {
    
    this._appService.getSArea().subscribe((data:any[])=>
    {
      this.AllSarea=data;
      this.setPage(1)
    })
  }
  if(this.masterScreen=="agent")
  {
    
    this._appService.getSAgent().subscribe((data:any[])=>
    {
      this.AllSagent=data;
      this.setPage(1)
    })
  }
  if(this.masterScreen=="user")
  {
    
    this._appService.getUser().subscribe((data:any[])=>
    {
      this.AllUser=data;
      this.setPage(1)
    })
  }
  if(this.masterScreen=="urole")
  {
    
    this._appService.getUserRole().subscribe((data:any[])=>
    {
      this.AllUserRole=data;
      this.setPage(1)
    })
  }
  if(this.masterScreen=="machine")
  {
    
    this._appService.getMachine().subscribe((data:any[])=>
    {
      this.AllMachine=data;
      console.log('mac'+this.AllMachine)
      this.setPage(1)
    })
  }
  if(this.masterScreen=="mline")
  {
    
    this._appService.getMachineLine().subscribe((data:any[])=>
    {
      this.AllMLine=data;
      this.setPage(1)
    })
  }

  this.formSubmit=false;
    this.saveCall=0;
 
  }
  }
  Delete(ID:Number)
  {
    this.saveCall=1;
    if(this.masterScreen=="branch")
    this._appService.DeleteBranch(ID).subscribe();
    if(this.masterScreen=="state")
    this._appService.DeleteState(ID).subscribe();
    if(this.masterScreen=="district")
    this._appService.DeleteDistrict(ID).subscribe();
    if(this.masterScreen=="taluk")
    this._appService.DeleteTaluk(ID).subscribe();
    if(this.masterScreen=="line")
    this._appService.DeleteLine(ID).subscribe();
    if(this.masterScreen=="area")
    this._appService.DeleteArea(ID).subscribe();
    if(this.masterScreen=="sarea")
    this._appService.DeleteSArea(ID).subscribe();
    if(this.masterScreen=="agent")
    this._appService.DeleteSAgent(ID).subscribe();
    if(this.masterScreen=="user")
    this._appService.DeleteUser(ID).subscribe();
    if(this.masterScreen=="urole")
    this._appService.DeleteUserRole(ID).subscribe();
    if(this.masterScreen=="machine")
    this._appService.DeleteMachine(ID).subscribe();
    if(this.masterScreen=="mline")
    this._appService.DeleteMachineLine(ID).subscribe();
  }
Save(BranchID:Number,index:Number,form)
{
  console.log('form'+form)
  if(form != '')
  {
  if (form.invalid ) {
    this.formSubmit=true; 
    return;
 }
}
   if(this.masterScreen=="branch")
   {
     this.saveBranch(BranchID,index)
     form!=''? form.resetForm(): this.branch=new Branch(0,'',0,'','','','','') ;
   }

  if(this.masterScreen =="state" )
  {
    this.saveState(BranchID,index);
   form!=''? form.resetForm(): this.state=new State(0,'') ;
  }

  if(this.masterScreen =="district" )
  {
    this.saveDistrict(BranchID,index);
   form!=''? form.resetForm(): this.district=new District(0,'',0) ;
  }

  if(this.masterScreen =="taluk" )
  {
    this.saveTaluk(BranchID,index);
   form!=''? form.resetForm(): this.taluk=new Taluk(0,'',0,'') ;
  }
  
  if(this.masterScreen =="line" )
  {
    this.saveLine(BranchID,index);
   form!=''? form.resetForm(): this.line=new Taluk(0,'',0,'') ;
  }
  if(this.masterScreen =="area" )
  {
    this.saveArea(BranchID,index);
   form!=''? form.resetForm(): this.area=new Area(0,'',0,0,'') ;
  }
  if(this.masterScreen =="sarea" )
  {
    this.saveSArea(BranchID,index);
   form!=''? form.resetForm(): this.sarea=new Taluk(0,'',0,'') ;
  }
  if(this.masterScreen =="agent" )
  {
    this.saveSAgent(BranchID,index);
   form!=''? form.resetForm(): this.sagent=new Agent(0,'',0,'','','','','','') ;
  }
  if(this.masterScreen =="user" )
  {
    this.saveUser(BranchID,index);
   form!=''? form.resetForm(): this.user=new User(0,'','','','',0,'',0,'') ;
  }
  if(this.masterScreen =="urole" )
  {
    this.saveUserRole(BranchID,index);
   form!=''? form.resetForm(): this.userrole=new Taluk(0,'',0,'',) ;
  }
  if(this.masterScreen =="machine" )
  {
    this.saveMachine(BranchID,index);
   form!=''? form.resetForm(): this.machinee=new Machine(0,'','',0,'') ;
  }
  if(this.masterScreen =="mline" )
  {
    this.saveMachineLine(BranchID,index);
   form!=''? form.resetForm(): this.mline=new MLine(0,0,0,'',) ;
  }
  this.saveCall=1;
  }
 
  Cancel(form)
  {
    this.formSubmit=false
    form.resetForm();
  }

  saveBranch(BranchID,index)
  {
   this.branch["BranchID"]=BranchID;
  this.branch["CompanyName"]="";
   if(BranchID>0)
    {
  this.branch= {BranchID: BranchID,BranchName: $('#bname'+index).text(),CompanyID: Number($( "#bCID"+index+" option:selected" ).val()),CompanyName:'',Address:$('#baddress'+index).text(),
  PhoneCOntact: $('#bphone'+index).text(),WhatsappContact: $('#bwphone'+index).text(),EmailID: $('#bemail'+index).text()}
   }
   this._appService.InsertBranch(this.branch) 
  }
  saveSAgent(BranchID,index)
  {
   this.sagent["AgentID"]=BranchID;
   if(BranchID>0)
    {
  this.sagent= {AgentID: BranchID,AgentName: $('#sagname'+index).text(),AreaID: Number($( "#sagarea"+index+" option:selected" ).val()),ContactPerson:$('#sagCPerson'+index).text(),Address:$('#sagaddress'+index).text(),
  PrimaryContact: $('#sagPContact'+index).text(),SecondaryContact: $('#sagSContact'+index).text(),LoanCategory:$( "#sagloan"+index+" option:selected" ).text(),User:''}
   }
   console.log('agent'+this.sagent)
   this._appService.InsertSAgent(this.sagent) 
  }
  saveMachine(BranchID,index)
  {
   this.machinee["MachineID"]=BranchID;
   if(BranchID>0)
    {
  this.machinee= {MachineID: BranchID,MachineName: $('#ma'+index).text(),MachineType: $( "#ty"+index+" option:selected" ).text(),AgentID:parseInt( $('#maa'+index+" option:selected" ).val()),User:''}
   }
   this._appService.InsertMachine(this.machinee) 
  }
  saveMachineLine(BranchID,index)
  {
   this.mline["MachineLineID"]=BranchID;
   if(BranchID>0)
    {
  this.mline= {MachineLineID: BranchID,MachineID:parseInt( $( "#macl"+index+" option:selected" ).val()),LineID:parseInt( $('#macline'+index+" option:selected" ).val()),User:''}
   }
   this._appService.InsertMachineLine(this.mline) 
  }
  saveUser(BranchID,index)
  {
    console.log(this.user)
   this.user["UserID"]=BranchID;
   if(BranchID>0)
    {
  this.user= {UserID: BranchID,UserName: $('#uuname'+index).text(),Password: $( "#upwd"+index ).text(),Name:$('#uname'+index).text(),Designation:$('#udesign'+index).text(),
  CompanyID: Number( $( "#ucid"+index+" option:selected" ).val()),UserType: $('#uutype'+index+" option:selected").text(),AgentID:Number($( "#uaid"+index+" option:selected" ).val()),User:''}
   }
   this._appService.InsertUser(this.user) 
  }
  saveState(BranchID,index)
  {
    this.state["dropdownKey"]=BranchID;
    if( BranchID>0)
    {
      this.state={dropdownKey:BranchID,dropdownName:$('#sname'+index).text()}
    }
  this._appService.InsertState(this.state);
 
  }
  saveDistrict(BranchID,index)
  {
    this.district["DistrictID"]=BranchID;
    if( BranchID>0)
    {
      this.district={DistrictID:BranchID,DistrictName:$('#dname'+index).text(),StateID: Number($( "#sid"+index+" option:selected" ).val())}
    }
  this._appService.InsertDistrict(this.district);
 
  }
  saveTaluk(BranchID,index)
  {
    this.taluk["TalukID"]=BranchID;
    if( BranchID>0)
    {
      this.taluk={TalukID:BranchID,TalukName:$('#tname'+index).text(),DistrictID:Number($( "#did"+index+" option:selected" ).val()),User:''}
    }
  this._appService.InsertTaluk(this.taluk);
 
  }
  saveUserRole(BranchID,index)
  {
    this.taluk["TalukID"]=BranchID;
    if( BranchID>0)
    {
      this.userrole={TalukID:BranchID,TalukName:$('#uruid'+index+" option:selected" ).text(),DistrictID:Number($( "#urname"+index+" option:selected" ).val()),User:''}
    }
  this._appService.InsertUserRole(this.userrole);
 
  }
  saveLine(BranchID,index)
  {
    this.line["TalukID"]=BranchID;
    if( BranchID>0)
    {
      this.line={TalukID:BranchID,TalukName:$('#lname'+index).text(),DistrictID:Number($( "#bid"+index+" option:selected" ).val()),User:''}
    }
  this._appService.InsertLine(this.line);
 
  }
  saveArea(BranchID,index)
  {
    this.area["AreaID"]=BranchID;
    if( BranchID>0)
    {
      this.area={AreaID:BranchID,AreaName:$('#aname'+index).text(),LineID:Number($( "#lid"+index+" option:selected" ).val()),TalukID:Number($( "#tid"+index+" option:selected" ).val()),User:''}
    }
  this._appService.InsertArea(this.area);
 
  }
  saveSArea(BranchID,index)
  {

    this.sarea["TalukID"]=BranchID;
    if( BranchID>0)
    {
      this.sarea={TalukID:BranchID,TalukName:$('#saname'+index).text(),DistrictID:Number($( "#aId1"+index+" option:selected" ).val()),User:''}
    }
    console.log(this.sarea)
  this._appService.InsertSArea(this.sarea);
 
  }
   changeDisplay(value)
   {
     this.masterScreen=value;
   for(var i=0; i<document.getElementsByName("formMaster").length;i++)
   {
    document.getElementsByName("formMaster")[i].style.display="none"
    document.getElementsByName("divTable")[i].style.display="none"
   }
   document.getElementById(value).style.display="block"
   document.getElementById(value+"table").style.display="block"
   this.saveCall=1;
}
setPage(page: number) {

  $("#pager").removeClass();
  var classname= $("#"+this.masterScreen+"table").attr('class')
  $("#pager").addClass(classname)
  if(this.masterScreen=='branch' ){this.Pagerdata=this.Allbranch}
  this.masterScreen=='state'? this.Pagerdata=this.Allstate:null
  this.masterScreen=='district'? this.Pagerdata=this.AllDistrict:null
  this.masterScreen=='taluk'? this.Pagerdata=this.AllTaluk:null
  this.masterScreen=='line'? this.Pagerdata=this.AllLine:null
  this.masterScreen=='area'? this.Pagerdata=this.AllArea:null
  this.masterScreen=='sarea'? this.Pagerdata=this.AllSarea:null
  this.masterScreen=='agent'? this.Pagerdata=this.AllSagent:null
  this.masterScreen=='user'? this.Pagerdata=this.AllUser:null
  this.masterScreen=='urole'? this.Pagerdata=this.AllUserRole:null
  this.masterScreen=='machine'? this.Pagerdata=this.AllMachine:null
  this.masterScreen=='mline'? this.Pagerdata=this.AllMLine:null
console.log(this.Allbranch)
  if (page < 1 || page > this.pager.totalPages) {
    this.pagedItems=this.Pagerdata
      return;
  }

  // get pager object from service
  this.pager = this._pagerService.getPager(this.Pagerdata.length, page);
  // get current page of items
  this.pagedItems = this.Pagerdata.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}

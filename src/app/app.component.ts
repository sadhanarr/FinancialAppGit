import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Role } from './role';
import { from } from 'rxjs';
import { ILogin } from './login';
import {LocalStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router,private storage:LocalStorageService) { 
    }
  title = 'FinanceApp';
  encryptText: string; 
  login:ILogin={} as any
  userID : Number;
  roles:string[];
  formSubmit:boolean=false;
  loginPage:boolean=true;
  loanReqPage:boolean=false;
  loanReqViewPage:boolean=false;
  loanissuePage:boolean=false;
  masterData:boolean=false;
  Reports:boolean=false;
  collection:boolean=false;
  addcollection:boolean=false;
  deletecollection:boolean=false;
  hashPswd:string='';
 
  error=''
  ngOnInit() {
    
    this._appService.currentUserID.subscribe(res=>this.userID=res);
    
    if(this.storage.retrieve('UserID')>0)
    {
    this.loginPage=false;
    this.Reports=this.storage.retrieve('Reports');
    this.loanReqPage=this.storage.retrieve('LoanRequest');
    this.loanReqViewPage=this.storage.retrieve('LoanView');
    this.loanissuePage=this.storage.retrieve('LoanIssue');
    this.masterData=this.storage.retrieve('MasterData')
    }
  } 
  resetRequest()
  {
    this._appService.changeReqID(0);
  }
  ValidateLogin(userName:string,password:string,form)
  {
	  if(form.invalid)
	  {
		  this.formSubmit=true;
    }
   // var bcrypt = require('bcryptjs');
   // var salt = bcrypt.genSaltSync(10);
   // var hash = bcrypt.hashSync(password, salt);

    this._appService.getUserCredentials(userName).subscribe(res=>{
      console.log(res)
      var cred = res;
      this.hashPswd=cred[1];
      if(this.hashPswd=='')
      {
        this.error="Invalid UserName";
      }
      else if(!(this.hashPswd==password))
      {
        this.error="Invalid Password";
      }
      else
      {
       this.storage.store('User',userName);
       this.userID= Number(cred[0]);
       this.storage.store('UserID',this.userID);
       this._appService.changeUserName(userName);
       this._appService.changeUserID(this.userID);
       if(this.userID>0)
       {
         this._appService.getUserRoles(this.userID).subscribe(res=>{
           this.roles=res;
           console.log(this.roles)
           if(this.roles.indexOf(Role.LoanRequest)>0)
           this.loanReqPage=true;
           if(this.roles.indexOf(Role.MasterDetails)>0)
           this.masterData=true;
           if(this.roles.indexOf(Role.Reports)>0)
            this.Reports=true
           if(this.roles.indexOf(Role.LoanRequestView)>0)
           this.loanReqViewPage=true;
           if(this.roles.indexOf(Role.LoanIssue)>0)
           this.loanissuePage=true;
           if(this.roles.indexOf(Role.Collection)>0)
           this.collection =(true);
           if(this.roles.indexOf(Role.addCollection)>0)
           this.addcollection =(true);
           if(this.roles.indexOf(Role.deleteCollection)>0)
           this.deletecollection =(true);
           this.storage.store('LoanRequest',this.loanReqPage);
           this.storage.store('MasterData',this.masterData);
           this.storage.store('LoanIssue',this.loanissuePage);
           this.storage.store('LoanView',this.loanReqViewPage);
           this.storage.store('Collection',this.collection);
           this.storage.store('Reports',this.Reports);
           this.storage.store('addCollection',this.addcollection);
           this.storage.store('deleteCollection',this.deletecollection);
          })
        this.loginPage =false;
        this._router.navigate(["/DashboardPage"])
       }
      }
    })
    
    }
  
    logout() {

      this.error=''
      this.loginPage=true;
      this.login.username="";
      this.login.password="";
      this.storage.clear('User')
      this.storage.clear('UserID')
      this.storage.clear('Reports')
      this.storage.clear('MasterData')
      this.storage.clear('Collection')
      this.storage.clear('LoanView')
      this.storage.clear('LoanIssue')
      this.storage.clear('LoanRequest')
      this.storage.clear('addCollection')
      this.storage.clear('deleteCollection')
      this._router.navigate(['/App']);
  }

  
  }

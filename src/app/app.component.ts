import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from './role';
import { from } from 'rxjs';
import { ILogin } from './login';
import {GlobalPermissionsService} from './global.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router,private globalPermission : GlobalPermissionsService) { 
      this.globalPermission.setCollectionPermission(false);
    }
  title = 'FinanceApp';
  login:ILogin={} as any
  userID : Number;
  roles:string[];
  formSubmit:boolean=false;
  loginPage:boolean=true;
  loanReqPage:boolean=false;
  loanReqViewPage:boolean=false;
  loanissuePage:boolean=false;
  masterData:boolean=false;
  Reports:boolean=false
  error=''
  ngOnInit() {
    
    this._appService.currentUserID.subscribe(res=>this.userID=res);
    console.log(this.userID);
    if(this.userID>0)
    this.loginPage=false;
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
     this._appService.validateUserLogin(userName,password).subscribe(res=>{
       this.userID=res;
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
           this.Reports=true;
           if(this.roles.indexOf(Role.LoanRequestView)>0)
           this.loanReqViewPage=true;
           if(this.roles.indexOf(Role.LoanIssue)>0)
           this.loanissuePage=true;
           if(this.roles.indexOf(Role.Collection)>0)
           this.globalPermission.setCollectionPermission(true);
          })
        this.loginPage =false;
        this._router.navigate(["/DashboardPage"])
       }
       else
       {this.error="Invalid UserName/Password"
      }
    })
    
    }
  
    logout() {

      this.error=''
      this.globalPermission.setCollectionPermission(false);
      this.loginPage=true;
      this.login.username="";
      this.login.password="";
      this._router.navigate(['/App']);
  }

  
  }

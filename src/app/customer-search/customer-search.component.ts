import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import {AppService} from '../app.service'
import {Taluk} from '../master-screen/taluk'
import {Area} from '../master-screen/area'
import {CustSearch} from './CustSearch'
import {Request} from '../loan-request/request';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

  AllArea:Area[]=[];
  AllLine:Taluk[]=[];
  search:CustSearch={} as any;
   requestAll:Request[]=[];
   request:Request;
   @Output() messageEvent = new EventEmitter<Request>();

  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.search.Status="";
    this.search.CustName="";
    this.search.CustID="";
    this.search.OtherName="";
    this.search.ContactList="";
    this.search.IDProof="";
    this.search.Line="";
    this.search.Area="";
    this.search.Address="";
    this.search.KeywordSearch="";
    this._appService.getLine().subscribe((data:any[])=>{this.AllLine=data})
    this._appService.getArea().subscribe((data:any[])=>{this.AllArea=data})
    console.log("customercomponent loaded")
  }
  Search(form)
  {
   console.log(this.search)
   this._appService.getCustomerSearch(this.search).subscribe((res:any[])=> {
    this.requestAll=res
  })
  form.resetForm();
  }
  NavigatetoLoan(req:Request)
  {
    this.requestAll=[];
    this.messageEvent.emit(req)
    
  }
}

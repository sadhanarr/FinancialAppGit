import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import {AppService} from '../app.service'
import {Taluk} from '../master-screen/taluk'
import {Area} from '../master-screen/area'
import {CustSearch} from './CustSearch'
import {Request} from '../loan-request/request';
import { ActivatedRoute, Router} from '@angular/router';
import {PagerService} from '../pager.service'

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
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    Pagerdata:any
   @Output() messageEvent = new EventEmitter<Request>();

  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router, private _pagerService:PagerService) { }

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
    this._appService.custSearch.subscribe(
      res=> this.search=res)
      if( this.search.Status!="" || this.search.CustName!="" ||
      this.search.CustID!="" || this.search.OtherName!="" ||
      this.search.ContactList!="" || this.search.IDProof!="" ||
      this.search.Line!="" || this.search.Area!="" ||
      this.search.Address!="" || this.search.KeywordSearch!="" )
    this.Search(null)
    this.setPage(1)
    console.log("customercomponent loaded")
  }
  Search(form)
  {
    this._appService.changeCustSearch(this.search)
   if(this.search.Status=='All')this.search.Status='';
   if(this.search.Area=='All')this.search.Area='';
   if(this.search.Line=='All')this.search.Line='';
   this._appService.getCustomerSearch(this.search).subscribe((res:any[])=> {
    this.requestAll=res;
    this.setPage(1)
    console.log(this.requestAll)

  })
  }
  setPage(page: number) {

  
    this.Pagerdata=this.requestAll
     
      if (page < 1 || page > this.pager.totalPages) {
        this.pagedItems=this.Pagerdata
          return;
      }
    
      // get pager object from service
      this.pager = this._pagerService.getPager(this.Pagerdata.length, page);
      // get current page of items
      this.pagedItems = this.Pagerdata.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  Clear(form){
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
    this._appService.changeCustSearch(this.search)
  }
  NavigatetoLoan(req:Request)
  {
    this.requestAll=[];
    this.messageEvent.emit(req)
    
  }
}

import { Component, OnInit } from '@angular/core';
import { DatePickerComponent, CalendarView} from '@syncfusion/ej2-angular-calendars';
import {AppService} from '../../app.service'
import {IDueList} from './DueList'
import { ExcelExportService} from '../Excel.service'
import { DatePipe } from '@angular/common';
import { IReportPost} from '../postReport'
import {IReportDrop} from '../ReportDrop'
import * as $ from 'jquery';

@Component({
  selector: 'app-due-list',
  templateUrl: './due-list.component.html',
  styleUrls: ['./due-list.component.css']
})
export class DueListComponent implements OnInit {

  constructor(private _appService:AppService,private _excelService:ExcelExportService) { }
  public start: CalendarView = 'Year';
  public depth: CalendarView = 'Year';
  public format: string = 'MMMM y'
  report:IDueList[]=[];
  post:IReportPost
  fromDate:Date;
  rline:string;
  ragent:string
  AllLine:IReportDrop[]=[];
  AllAgent:IReportDrop[]=[];
  Line:string[]=[]
  Agent:string[]=[]
  dropdownSettings = {};
 dropdownSettings1 = {};
  ngOnInit() {
    this._appService.getReportLine().subscribe(res=>this.AllLine=res);
    this._appService.getReportAgent().subscribe(res=>this.AllAgent=res);
  }
  ngDoCheck(){
   
   
    // $(".c-list").hide()
    $(".pure-checkbox").removeClass("pure-checkbox")
    $(".c-btn").css("border","1px solid #ccc ")
    $(".c-btn>span").css("font-size","12px")
    $(".c-btn>span").css("color","#bbb")
    this.dropdownSettings1 = { 
      singleSelection: false, 
      text:"Select Agent",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit:2,
      disabled: this.Line.length>0? true:false
    }; 
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select Line",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit:2,
      disabled: this.Agent.length>0? true:false
    }; 
    }
  Export()
  {
    let formatedDate =(this.fromDate != null && this.fromDate !=undefined)? new DatePipe("en-US").transform(this.fromDate,"yyyy-MM-dd"):'1900-01-01'
    var line="";
    for(var i=0;i<this.Line.length;i++)
    {
      if(i==this.Line.length-1)
      line+=this.Line[i]
      else
      line+= this.Line[i]+",";
    }
    var agent=""
    for(var i=0;i<this.Agent.length;i++)
    {
      if(i==this.Agent.length-1)
      agent+=this.Agent[i]
      else
      agent+= this.Agent[i]+",";
    }
  this.post={StartDate:formatedDate,EndDate:null,Line:line,Agent:agent,MachineID:null}
    this._appService.getDueList(this.post).subscribe(res=>{ this.report=res; console.log(res);
      this._excelService.exportAsExcelFile(this.report,"DueListReport.xlsx")})
  }
  onItemSelect(item:any,variable:string){
    if(variable=='line')
   this.Line.push(item["itemName"])
   if(variable=='agent')
   this.Agent.push(item["itemName"])
 }
 OnItemDeSelect(item:any,variable:string){
   if(variable=='line')
   this.Line.splice(this.Line.indexOf(item["itemName"]),1)
   if(variable=='agent')
   this.Agent.splice(this.Agent.indexOf(item["itemName"]),1)
 }
 onSelectAll(items: any,variable:string){
   if(variable=='line'){
   this.Line=[]
   for(var i=0;i<items.length;i++)
   {
   this.Line.push(items[i]["itemName"]);
   }
 }
 if(variable=='agent'){
   this.Agent=[]
   for(var i=0;i<items.length;i++)
   {
   this.Agent.push(items[i]["itemName"]);
   }
 } 
 }
 onDeSelectAll(items: any,variable:string){
   if(variable=='line')
  this.Line=[];
  if(variable=='agent')
  this.Agent=[];
 }
  Clear()
{
  this.onDeSelectAll(null,'line')
  this.onDeSelectAll(null,'agent')

 this.fromDate=null;
 
}
}

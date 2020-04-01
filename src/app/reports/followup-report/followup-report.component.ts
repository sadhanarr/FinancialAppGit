import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service'
import {IFollow} from './followReport'
import { ExcelExportService} from '../Excel.service'
import { DatePipe } from '@angular/common';
import { IReportPost} from '../postReport'
import {IReportDrop} from '../ReportDrop'
import * as $ from 'jquery';

@Component({
  selector: 'app-followup-report',
  templateUrl: './followup-report.component.html',
  styleUrls: ['./followup-report.component.css']
})
export class FollowupReportComponent implements OnInit {

  report:IFollow[]=[];
  fromDate:Date;
  toDate:Date;
  rline:string;
  ragent:string
  AllLine:IReportDrop[]=[];
  AllAgent:IReportDrop[]=[];
  Line:string[]=[]
  Agent:string[]=[]
  dropdownSettings = {};
 dropdownSettings1 = {};
  MachineID:string
  post: IReportPost
  constructor(private _appService:AppService,private _excelService:ExcelExportService) { }

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
    let formatEndDate =(this.toDate != null && this.toDate !=undefined)?  new DatePipe("en-US").transform(this.toDate,"yyyy-MM-dd"): new DatePipe("en-US").transform(new Date(),"yyyy-MM-dd")
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
  this.post={StartDate:formatedDate,EndDate:formatEndDate,Line:line,Agent:agent,MachineID:null}
    this._appService.getFollowupReport(this.post).subscribe(res=>{ this.report=res; console.log(res);
      this._excelService.exportAsExcelFile(this.report,"FollowupReport.xlsx")})
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
   this.toDate=null;
  }
}


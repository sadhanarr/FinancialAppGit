import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service'
import {IEnd} from './End'
import { ExcelExportService} from '../Excel.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-end-report',
  templateUrl: './end-report.component.html',
  styleUrls: ['./end-report.component.css']
})
export class EndReportComponent implements OnInit {

  report:IEnd[]=[];
  fromDate:Date;
  toDate:Date;
  Line:string
  Agent:string
  MachineID:string
  constructor(private _appService:AppService,private _excelService:ExcelExportService) { }

  ngOnInit() {
  }

  Export()
  {
    let formatedDate =(this.fromDate != null && this.fromDate !=undefined)? new DatePipe("en-US").transform(this.fromDate,"yyyy-MM-dd"):'1900-01-01'
    let formatEndDate =(this.toDate != null && this.toDate !=undefined)?  new DatePipe("en-US").transform(this.toDate,"yyyy-MM-dd"): new DatePipe("en-US").transform(new Date(),"yyyy-MM-dd")
  let line =(this.Line !=null && this.Line!= undefined && this.Line !='')? this.Line: 'All' 
  let Agent =(this.Agent !=null && this.Agent!= undefined && this.Agent !='')? this.Agent: 'All' 

  
    this._appService.getEndReport(formatedDate,formatEndDate,line,Agent).subscribe(res=>{ this.report=res; console.log(res);
      this._excelService.exportAsExcelFile(this.report,"EndReport.xlsx")})
  }
  Clear()
  {
   this.Line='';
   this.Agent='';
   this.fromDate=null;
   this.toDate=null;
  }
}


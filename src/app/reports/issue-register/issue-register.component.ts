import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service'
import {IIRequest} from './IssueReport'
import { ExcelExportService} from '../Excel.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-issue-register',
  templateUrl: './issue-register.component.html',
  styleUrls: ['./issue-register.component.css']
})
export class IssueRegisterComponent implements OnInit {

  constructor(private _appService:AppService,private _excelService:ExcelExportService) { }
  report:IIRequest[]=[];
  fromDate:Date;
  toDate:Date
  ngOnInit() {
  }
  Export()
  {
   let formatedDate =(this.fromDate != null && this.fromDate !=undefined)? new DatePipe("en-US").transform(this.fromDate,"yyyy-MM-dd"):'1900-01-01'
   let formatEndDate =(this.toDate != null && this.toDate !=undefined)?  new DatePipe("en-US").transform(this.toDate,"yyyy-MM-dd"): new DatePipe("en-US").transform(new Date(),"yyyy-MM-dd")
   this._appService.getIssueReport(formatedDate,formatEndDate).subscribe(res=>{ this.report=res; console.log(res);
     this._excelService.exportAsExcelFile(this.report,"IssueRegister.xlsx")})
   
  }
}

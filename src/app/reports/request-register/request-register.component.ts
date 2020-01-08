import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service'
import {IRRequest} from './ReqReport'
import { ExcelExportService} from '../Excel.service'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-request-register',
  templateUrl: './request-register.component.html',
  styleUrls: ['./request-register.component.css']
})
export class RequestRegisterComponent implements OnInit {


  
  constructor(private _appService:AppService,private _excelService:ExcelExportService) { }
  report:IRRequest[]=[];
  fromDate:Date;
  toDate:Date
  ngOnInit() {
   
  }
 Export()
 {
  let formatedDate =(this.fromDate != null && this.fromDate !=undefined)? new DatePipe("en-US").transform(this.fromDate,"yyyy-MM-dd"):'1900-01-01'
  let formatEndDate =(this.toDate != null && this.toDate !=undefined)?  new DatePipe("en-US").transform(this.toDate,"yyyy-MM-dd"): new DatePipe("en-US").transform(new Date(),"yyyy-MM-dd")
  this._appService.getRequestReport(formatedDate,formatEndDate).subscribe(res=>{ this.report=res; console.log(res);
    this._excelService.exportAsExcelFile(this.report,"RequestRegister.xlsx")})
  
 }
}

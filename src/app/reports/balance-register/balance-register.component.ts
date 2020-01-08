import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service'
import {IBalance} from './BalReport'
import { ExcelExportService} from '../Excel.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-balance-register',
  templateUrl: './balance-register.component.html',
  styleUrls: ['./balance-register.component.css']
})
export class BalanceRegisterComponent implements OnInit {

  report:IBalance[]=[];
  fromDate:Date;
  Line:string
  Agent:string
 
  constructor(private _appService:AppService,private _excelService:ExcelExportService) { }

  ngOnInit() {
  }
 Export()
 {
  let formatedDate =(this.fromDate != null && this.fromDate !=undefined)? new DatePipe("en-US").transform(this.fromDate,"yyyy-MM-dd"):new DatePipe("en-US").transform(new Date(),"yyyy-MM-dd")

let line =(this.Line !=null && this.Line!= undefined && this.Line !='')? this.Line: 'All' 
let Agent =(this.Agent !=null && this.Agent!= undefined && this.Agent !='')? this.Agent: 'All' 


  this._appService.getBalanceReport(formatedDate,line,Agent).subscribe(res=>{ this.report=res; console.log(res);
    this._excelService.exportAsExcelFile(this.report,"BalanceRegister.xlsx")})

 }
 Clear()
 {

 }
}

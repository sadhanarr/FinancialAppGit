import { Component, OnInit } from '@angular/core';
import { DatePickerComponent, CalendarView} from '@syncfusion/ej2-angular-calendars';
import {AppService} from '../../app.service'
import {IDueList} from './DueList'
import { ExcelExportService} from '../Excel.service'
import { DatePipe } from '@angular/common';


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
  fromDate:Date;
  ngOnInit() {
  }

  Export()
  {
    let formatedDate =(this.fromDate != null && this.fromDate !=undefined)? new DatePipe("en-US").transform(this.fromDate,"yyyy-MM-dd"):'1900-01-01'
  
  
    this._appService.getDueList(formatedDate,'All','All').subscribe(res=>{ this.report=res; console.log(res);
      this._excelService.exportAsExcelFile(this.report,"DueListReport.xlsx")})
  }
}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})
export class LoanRequestComponent implements OnInit {

  dateValue: Date;

  constructor() { }

  ngOnInit() {
     this.dateValue = new Date ();
   
  }
  ngAfterViewChecked()
  {
    $('#dueType').on('change',function()
    {
      if(this.value=='EMI')
      {
        $('#interest').hide();
        $('#emi').show();
      }
      else
      {
      $('#emi').hide();
      $('#interest').show();
      }
    })
  }

}

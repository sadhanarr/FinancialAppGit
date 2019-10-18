import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-home-loan',
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.css']
})
export class HomeLoanComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  changeLoanStatus(event)
  {
  if(event=="Consider")
  {
    $('#consider').show();
  }
  else{
    $('#consider').hide();
  }
  }
}

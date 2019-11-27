import { Component } from '@angular/core';
import {AppService} from './app.service'
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinanceApp';
  constructor(private _appService:AppService,private _route: ActivatedRoute,
    private _router: Router) { }
    ngOnInit()
    {

    }
    resetRequest()
    {
      this._appService.changeReqID(0);
    }
}

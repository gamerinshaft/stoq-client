import {Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {HeaderComponent} from '../layouts/header/header.component';
import {SidebarComponent} from '../layouts/sidebar/sidebar.component';
import {ApiService} from '../api.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css'],
  directives: [HeaderComponent, SidebarComponent],
  providers: [ApiService]
})

export class DashboardComponent implements OnInit {
  public jwt: string;
  public decodedJwt: string;
  public response: any;
  public api: string;
  public title = 'コース一覧';
  public modal = 'signup';

  constructor(private _router: Router, private _api: ApiService) {
      // console.log(_api.getCourses());
  }

  ngOnInit() {
    this._api.getCourses().subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log("getCourses")
    );
  }
}


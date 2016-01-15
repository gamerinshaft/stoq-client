import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from '../../api.service';

@Component({
    selector: 'header',
    templateUrl: 'app/layouts/header/header.component.html',
    styleUrls: ['app/layouts/header/header.component.scss'],
    providers: [ApiService]
})

export class HeaderComponent {
  public title = 'Stoq'
  constructor(private _router: Router, private _api: ApiService) { }

  logout() {
      this._api.deleteLogout().subscribe(
          data => console.log("logout"),
          err => alert("error"),
          () => console.log('signup success')
      );
  }
}


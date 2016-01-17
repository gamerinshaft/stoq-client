import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'header',
    templateUrl: 'app/layouts/header/header.component.html',
    styleUrls: ['app/layouts/header/header.component.scss'],
    providers: [ApiService]
})

export class HeaderComponent {
  public title = 'Stoq'
  constructor(private _router: Router, private _api: ApiService) { }

  createCourse() {
    this._router.parent.navigate(['Courses', {}]);
  }

  logout() {
      this._api.deleteLogout().subscribe(
          data => {
              localStorage.clear();
              this._router.parent.navigate(['Login', {}]);
          },
          err => console.log(err),
          () => console.log('signup success')
      );
  }
}


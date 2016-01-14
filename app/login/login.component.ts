import {Component} from 'angular2/core';
import {Router} from 'angular2/router'
@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css']
})
export class LoginComponent {
  constructor(private _router: Router) {}

  goSignup() {
      this._router.navigate(['Signup', {}]);
  }

  hoge() {
  }
}




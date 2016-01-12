import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
@Component({
  selector: 'signup',
  templateUrl: 'app/signup/signup.component.html',
  styleUrls: ['app/signup/signup.component.css'],
  inputs: ['modal']
})

export class SignupComponent {
  constructor(private _router: Router){}

  goLogin() {
      this._router.navigate(['Login', {}]);
  }

  hoge() {
      this.modal = 'login';
      console.log(this.modal);
  }
}


import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from '../api.service';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
    providers: [ApiService],
    inputs: ['email', 'password']
})
export class LoginComponent {
  private email: string;
  private password: string;

  constructor(private _router: Router, private _api: ApiService) {}

  navigateToSignup() {
      this._router.navigate(['Signup', {}]);
  }

  submit() {
    this._api.postLogin({ email: this.email, password: this.password }).subscribe(
      data => this._router.navigate(['Dashboard', {}]),
      err => alert("error"),
      () => console.log('login success')
    );
  }
}




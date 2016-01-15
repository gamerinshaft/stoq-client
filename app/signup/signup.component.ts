import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'signup',
  templateUrl: 'app/signup/signup.component.html',
  styleUrls: ['app/signup/signup.component.css'],
  providers: [ApiService],
  inputs: ['email', 'password']
})

export class SignupComponent {
  private email: string;
  private password: string;
  private password_confirmation: string;
  constructor(private _router: Router, private _api: ApiService){}

  navigateToLogin() {
      this._router.navigate(['Login', {}]);
  }

  submit() {
    this._api.postSignup({ email: this.email, password: this.password, password_confirmation: this.password_confirmation }).subscribe(
      data => this._router.navigate(['Dashboard', {}]),
      err => alert("error"),
      () => console.log('Random Quote Complete')
    );
  }
}


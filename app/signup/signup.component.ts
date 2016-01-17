import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'signup',
  templateUrl: 'app/signup/signup.component.html',
  styleUrls: ['app/signup/signup.component.css'],
  providers: [ApiService],
  inputs: ['email', 'password', 'password_confirmation']
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
      data => {
        console.log(data.headers),
          localStorage.setItem('Access-Token', data.headers.get('Access-Token'));
          localStorage.setItem('Client', data.headers.get('Client'));
          localStorage.setItem('Uid', this.email);
          this._router.navigate(['Dashboard', {}]);
      },
      err => alert("error"),
      () => console.log('signup success')
    );
  }
}


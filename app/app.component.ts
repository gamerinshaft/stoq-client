import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ApiService} from './api.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.scss'],
    directives: [ROUTER_DIRECTIVES, LoginComponent, SignupComponent, DashboardComponent],
    providers: [ApiService]
})

@RouteConfig([
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: false },
    { path: '/login', name: 'Login', component: LoginComponent, useAsDefault: false },
    { path: '/signup', name: 'Signup', component: SignupComponent, useAsDefault: false }
  // { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])

export class AppComponent implements OnInit {
  // public title = 'コース一覧';
  // public modal = 'signup';
  // public heroes: Hero[];
  // public selectedHero: Hero;

  constructor(private _router: Router, private _api: ApiService) { }

  // getHeroes() {
  //     this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  // }

  ngOnInit() {
    this._api.getCourses().subscribe(
      data => this._router.navigate(['Dashboard', {}]),
      err => {
        localStorage.clear();
        this._router.navigate(['Login', {}]);
      },
      () => console.log('Random Quote Complete')
    );
    // this.getHeroes();
    // if(!localStorage.getItem("auth_token")){
    //   console.log("nothing auth_token");
    //   this._router.navigate(['Login', { }]);
    // }
  }

  // onSelect(hero: Hero) { this.selectedHero = hero; }
}

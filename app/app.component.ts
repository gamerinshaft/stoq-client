import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {HeaderComponent} from './layouts/header/header.component';
import {SidebarComponent} from './layouts/sidebar/sidebar.component';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent, HeroDetailComponent, LoginComponent],
    providers: [HeroService]
})

@RouteConfig([
    { path: '/login', name: 'Login', component: LoginComponent, useAsDefault: false },
    { path: '/signup', name: 'Signup', component: SignupComponent, useAsDefault: false }
  // { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])

export class AppComponent implements OnInit {
  public title = 'Tour of Heros';
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(private _heroService: HeroService, private _router: Router) { }

  getHeroes() {
      this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
    // if(!localStorage.getItem("auth_token")){
    //   console.log("nothing auth_token");
    //   this._router.navigate(['Login', { }]);
    // }
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}

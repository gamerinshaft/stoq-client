import {Component} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import {HTTP_PROVIDERS, Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';
import {HeaderComponent} from 'app/layouts/header/header.component';
import {SidebarComponent} from 'app/layouts/sidebar/sidebar.component';
import {Hero} from 'app/hero';
import {HeroDetailComponent} from 'app/hero-detail.component';
import {HeroService} from 'app/hero.service';
@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css'],
  directives: [CORE_DIRECTIVES, HeaderComponent, SidebarComponent, HeroDetailComponent],
  providers: [HeroService, HTTP_PROVIDERS]
})

export class DashboardComponent implements OnInit {
  public jwt: string;
  public decodedJwt: string;
  public response: string;
  public api: string;
  public title = 'コース一覧';
  public modal = 'signup';
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(private _heroService: HeroService, private _router: Router, private _http: Http) {
      console.log(this.callGetAnonymousApi('http://api.stoq.jp/api/v1/courses', { hoge: "wa", huga: "ho" }))
    console.log(this.response)
  }


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

  callGetAnonymousApi(url: string, params?: any) {
    if(params) {
      this._callGetApi('Anonymous', url, params);
    }else {
      this._callGetApi('Anonymous', url);
    }
  }

  callGetSecuredApi() {
    this._callGetApi('Secured', 'http://localhost:3001/api/protected/random-quote');
  }

  _callGetApi(type: string, url: string, params?: any) {
    console.log(params)
    if (params) {
      log = Object.keys(params).map(function(value, index) {
          return params[value]
      });
      console.log("kiteru");
      console.log(log);
    }
    this.response = null;
    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this._http.get(url)
        .subscribe(
          data => console.log(data),
          err => console.log(err),
          () => console.log('Random Quote Complete')
      );
    }
    // if (type === 'Secured') {
    //   // For protected routes, use AuthHttp
    //   this._authHttp.get(url)
    //     .subscribe(
    //     response => this.response = response.text(),
    //     error => this.response = error.text()
    //   );
    // }
  }
}


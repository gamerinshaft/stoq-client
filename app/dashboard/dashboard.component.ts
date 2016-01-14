import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {HeaderComponent} from 'app/layouts/header/header.component';
import {SidebarComponent} from 'app/layouts/sidebar/sidebar.component';
import {Hero} from 'app/hero';
import {HeroDetailComponent} from 'app/hero-detail.component';
import {HeroService} from 'app/hero.service';
import {ApiService} from 'app/api.service';
@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css'],
  directives: [HeaderComponent, SidebarComponent, HeroDetailComponent],
  providers: [HeroService,ApiService]
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

  constructor(private _heroService: HeroService, private _router: Router, private _http: ApiService) {
      console.log(_http.callGetAnonymousApi('http://api.stoq.jp/api/v1/courses', { hoge: "wa", huga: "ho" }))
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
}


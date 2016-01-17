import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {ApiService} from '../api.service';
import {CoursesNewComponent} from './new.component';

@Component({
  selector: 'courses',
  template: `
    <div>base</div>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [ApiService]
})

@RouteConfig([
    { path: '/new', as: 'Dashboard', component: CoursesNewComponent, useAsDefault: true }
  // { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])

export class CoursesComponent {
  constructor(private _router: Router, private _api: ApiService) { }
}


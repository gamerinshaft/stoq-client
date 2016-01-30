import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {ApiService} from '../services/api.service';
import {CoursesNewComponent} from './new/new.component';
import {HeaderComponent} from '../layouts/header/header.component';
import {SidebarComponent} from '../layouts/sidebar/sidebar.component';

@Component({
  selector: 'courses',
  styleUrls: ['app/courses/base.component.css'],
  template: `
    <header></header>
    <sidebar></sidebar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent],
  providers: [ApiService]
})

@RouteConfig([
    { path: '/new', as: 'Dashboard', component: CoursesNewComponent, useAsDefault: true }
  // { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])

export class CoursesComponent {
  constructor(private _router: Router, private _api: ApiService) { }
}


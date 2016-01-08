import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
@Component({
    selector: 'header',
    templateUrl: 'app/layouts/header/header.component.html',
    styleUrls: ['app/layouts/header/header.component.scss']
})

export class HeaderComponent {
  public title = 'Stoq'
  constructor(private _router: Router) { }
}


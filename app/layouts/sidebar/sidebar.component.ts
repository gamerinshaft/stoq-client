import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
@Component({
    selector: 'sidebar',
    templateUrl: 'app/layouts/sidebar/sidebar.component.html',
    styleUrls: ['app/layouts/sidebar/sidebar.component.scss']
})

export class SidebarComponent {
    constructor(private _router: Router) { }
}


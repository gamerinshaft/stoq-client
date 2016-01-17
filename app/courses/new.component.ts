import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from '../services/api.service';

@Component({
    selector: 'courses-new',
    templateUrl: 'app/courses/new.component.html',
    styleUrls: ['app/courses/new.component.css'],
    providers: [ApiService]
})

export class CoursesNewComponent {
    constructor(private _router: Router, private _api: ApiService) { }
}


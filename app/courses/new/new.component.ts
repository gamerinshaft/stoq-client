import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'courses-new',
    templateUrl: 'app/courses/new/new.component.html',
    styleUrls: ['app/courses/new/new.component.css'],
    providers: [ApiService],
    inputs: [
      'name',
      'course_type',
      'description',
      'question_attributes__text',
      'question_attributes__hint',
      'question_attributes__type',
      'question_attributes__answer_value',
      'question_attributes__is_dummy'
     ]
})

export class CoursesNewComponent {
    constructor(private _router: Router, private _api: ApiService) { }
}


import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import {HTTP_PROVIDERS, Http, Headers } from 'angular2/http';

@Component({
  directives: [CORE_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})

@Injectable()

export class ApiService {

    public api_path = 'http://api.stoq.jp/api/v1';
    constructor(private _http: Http) {}


    // ユーザー登録 email, password, password_confirmation
    postSignup(params: any) {
        this._callPostApi('Anonymous', '/auth', params);
    }

    // ログイン email, password
    postLogin(params: any) {
        this._callPostApi('Anonymous', '/auth/sign_in', params);
    }

    deleteLogout() {
        this._callDeleteApi('Anonymous', '/auth/sign_out');
    }

    // コース一覧を取得 引数:なし
    getCourses() {
        this._callGetApi('Anonymous', '/courses');
    }

    // コースを作成, title, description, allow_training, allow_test, allow_show_answer, is_private, questions_attributes, text, hint, questiontype, answer_attributes, value, is_dummy
    postCreateCourse(params: any) {
        this._callPostApi('Anonymous', '/courses/new', params);
    }

    postEditCourse(id: string, params: any) {
        this._callPostApi('Anonymous', '/courses/' + id + 'edit', params);
    }

    getCourseDetail(id: string) {
        this._callGetApi('Anonymous', '/courses/' + id);
    }

    _callGetApi(type: string, url: string, params?: any) {
        // if (params) {
        //     params = JSON.stringify(params)
        //     console.log(params)
        //     // log = Object.keys(params).map(function(value, index) {
        //     //     return params[value]
        //     // });
        // }
        url = this.api_path + this._urlWithQuery(url, params);
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
    _callPostApi(type: string, url: string, params?: any) {
        url = this.api_path + this._urlWithQuery(url, params);
        if (type === 'Anonymous') {
            if (this.params) {
                url += this.params;
            }
            this._http.post(url)
                .subscribe(
                    data => console.log(data),
                    err => console.log(err),
                    () => console.log('Random Quote Complete')
                )
        }
    }
    _callDeleteApi(type: string, url: string, params?: any) {
        url = this.api_path + this._urlWithQuery(url, params);
        if (type === 'Anonymous') {
            if (this.params) {
                url += this.params;
            }
            this._http.delete(url)
                .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log('Random Quote Complete')
                )
        }
    }

    _urlWithQuery(url: string, params: any) {
        if (params) {
            Object.keys(params).forEach((value, index) =>
                if (index == 0) {
                    url += "?" + value + "=" + params[value];
                } else {
                    url += "&" + value + "=" + params[value];
                }
            });
        }
        return url;
    }
}

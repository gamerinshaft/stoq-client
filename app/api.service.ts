import {Component} from 'angular2/core';
import {Injectable} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import {HTTP_PROVIDERS, Http, Headers } from 'angular2/http';
import { contentHeaders } from './common/headers';

@Component({
  directives: [CORE_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})

@Injectable()

export class ApiService {
    public api_path = 'http://api.stoq.jp/api/v1';
    private status: number;
    constructor(private _http: Http) {}


    // ユーザー登録 email, password, password_confirmation
    postSignup(params: any) {
        return this._callPostApi('Anonymous', '/auth', params);
    }

    // ログイン email, password
    postLogin(params: any) {
        return this._callPostApi('Anonymous', '/auth/sign_in', params);
    }

    deleteLogout() {
        return this._callDeleteApi('Anonymous', '/auth/sign_out');
    }

    // コース一覧を取得 引数:なし
    getCourses() {
        return this._callGetApi('Anonymous', '/courses');
    }

    // コースを作成, title, description, allow_training, allow_test, allow_show_answer, is_private, questions_attributes, text, hint, questiontype, answer_attributes, value, is_dummy
    postCreateCourse(params: any) {
        return this._callPostApi('Anonymous', '/courses/new', params);
    }

    postEditCourse(id: string, params: any) {
        return this._callPostApi('Anonymous', '/courses/' + id + '/edit', params);
    }

    getCourseDetail(id: string) {
        return this._callGetApi('Anonymous', '/courses/' + id);
    }

    _callGetApi(type: string, url: string, params?: any) {
        this._setHeader();
        url = this.api_path + this._urlWithQuery(url, params);
        if (type === 'Anonymous') {
            // For non-protected routes, just use Http
            console.log(contentHeaders);
            return this._http.get(url, { headers: contentHeaders });
                // .subscribe(res => {
                //     this.status = res.status;
                //    this .body = res.json();
                // });
        }
        // if (type === 'Secured') {
        //   // For protected routes, use AuthHttp
        //   this._authHttp.get(url)
        //     .subscribe(
        //     response => this.result = response.text(),
        //     error => this.result = error.text()
        //   );
        // }
    }
    _callPostApi(type: string, url: string, params?: any) {
        this._setHeader();
        let body = JSON.stringify(params);
        url = this.api_path + url
        if (type === 'Anonymous') {
            return this._http.post(url, body, { headers: contentHeaders });
        }
    }
    _callDeleteApi(type: string, url: string, params?: any) {
        this._setHeader();
        url = this.api_path + this._urlWithQuery(url, params);
        if (type === 'Anonymous') {
            return this._http.delete(url, { headers: contentHeaders });
        }
    }

    _urlWithQuery(url: string, params?: any) {
        this._setHeader();
        if (params) {
            Object.keys(params).forEach((value, index) => {
                if (index == 0) {
                    url += "?" + value + "=" + params[value];
                } else {
                    url += "&" + value + "=" + params[value];
                }
            });
        }
        return url;
    }

    _setHeader() {
        if(localStorage.getItem('Access-Token') && localStorage.getItem('Client') && localStorage.getItem('Uid')){
            contentHeaders.set('Access-Token', localStorage.getItem('Access-Token'));
            contentHeaders.set('Client', localStorage.getItem('Client'));
            contentHeaders.set('Uid', localStorage.getItem('Uid'));
        }else{
            contentHeaders.delete('Access-Token');
            contentHeaders.delete('Client');
            contentHeaders.delete('Uid');
        }
    }
}

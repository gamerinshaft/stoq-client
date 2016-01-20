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
    private status: number;
    public headers: Headers;
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
            console.log(this.headers);
            return this._http.get(url, { headers: this.headers });
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
        // this._setHeader();
        this._setHeader();
        params = JSON.stringify(params);
        console.log(params)
        url = this.api_path + url
        if (type === 'Anonymous') {
            return this._http.post(url, params, { headers: this.headers });
        }
    }
    _callDeleteApi(type: string, url: string, params?: any) {
        this._setHeader();
        url = this.api_path + this._urlWithQuery(url, params);
        if (type === 'Anonymous') {
            return this._http.delete(url, { headers: this.headers });
        }
    }

    _urlWithQuery(url: string, params?: any) {
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

    _setHeader(method?: string) {
        this.headers = new Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
        this.headers.append('Cache-Control', 'no-chache');
        if(localStorage.getItem('Access-Token') && localStorage.getItem('Client') && localStorage.getItem('Uid')){
            console.log("set_header");
            this.headers.append('Access-Token', localStorage.getItem('Access-Token'));
            this.headers.append('Client', localStorage.getItem('Client'));
            this.headers.append('Uid', localStorage.getItem('Uid'));
        }

        // console.log(this.headers);
    }
}

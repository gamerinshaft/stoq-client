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
    private params: string;
    constructor(private _http: Http) {}


    // ユーザー登録
    postSignup(params: any) {
        this._callPostApi('Anonymous', this.api_path + '/auth', params);
    }
    // コース一覧を取得 引数:なし
    getCourses() {
        this._callGetApi('Anonymous', this.api_path + '/courses');
    }


    callGetAnonymousApi(url: string, params?: any) {
        if (params) {
            this._callGetApi('Anonymous', url, params);
        } else {
            this._callGetApi('Anonymous', url);
        }
    }

    callGetSecuredApi() {
        this._callGetApi('Secured', 'http://localhost:3001/api/protected/random-quote');
    }

    _callGetApi(type: string, url: string, params?: any) {
        // if (params) {
        //     params = JSON.stringify(params)
        //     console.log(params)
        //     // log = Object.keys(params).map(function(value, index) {
        //     //     return params[value]
        //     // });
        // }
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
        this.params = null;
        if (params) {
            Object.keys(params).forEach((value, index) =>
                if (index == 0) {
                    this.params = "?" + value + "=" + params[value];
                } else {
                    this.params += "&" + value + "=" + params[value];
                }
            });
        }
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
}

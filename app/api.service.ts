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
    public api_path = 'http://api.stoq.jp/api/v1'
    constructor(private _http: Http) { }


    // コース一覧を取得
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
        console.log(params)
        if (params) {
            log = Object.keys(params).map(function(value, index) {
                return params[value]
            });
            console.log("kiteru");
            console.log(log);
        }
        this.response = null;
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
}

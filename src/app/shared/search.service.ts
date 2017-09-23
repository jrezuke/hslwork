import { Injectable } from '@angular/core';
import { SearchResult } from './search-result.class';
import { SearchCriteria } from './search-criteria.class';
import { AppConfig } from '../app.config';
import { OAuthService } from '../security/o-auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {
    results: SearchResult[];
    results$: Observable<any>;

    constructor(private _appConfig: AppConfig,
        private _oAuth: OAuthService, private _http: Http ) { }

    getMembersInfo(names: string[]):Observable<any> {

            let headers = new Headers();
            headers.append('Content-type', 'application/json');
            let requestOpts = new RequestOptions();
            requestOpts.headers = headers;

            let aObs: any[] = new Array();
            for (let i = 0; i < names.length; i++){
                let url = this._appConfig.apiBaseUrl + "Users/search?" + "username" + "=" + names[i];

                let obs = this._http.get(url, requestOpts).map(res => res.json())
                aObs.push(obs);
            }
            return Observable.forkJoin(aObs);

        //return Observable.throw("Invalid parameter, names");
    }

    getSearchResult(searchCriteria: SearchCriteria): Observable<any> {
        console.log("getSearchResult-searchContact", searchCriteria);
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        //console.log("token", token);
        headers.append('Authorization', 'Bearer ' + token);
        let url = this._appConfig.apiBaseUrl + "Users/search?" + searchCriteria.searchField + "=" + searchCriteria.searchFor;
        //let url = this._appConfig.apiBaseUrl + "Users/search?firstName=joe";
        console.log("url", url);
        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        return this.results$ = this._http.get(url, requestOpts)
            .map(res => res.json())
            .catch(this.handleError);


        // this.results = [{ userName: "jrezuke", email: "j.rezuke@mail.com", selected: false },
        //     { userName: "jrightmyer", email: "j.rightmyer@mail.com", selected: false },
        //     { userName: "jsmith", email: "j.smith@mail.com", selected: false }];
        // return this.results;
    }

    handleError(error: any) {
        console.log('sever error:', error);  // debug
        // if(err instanceof Response) {
        //   //return Observable.throw(err.json().error || 'backend server error');
        //   // if you're using lite-server, use the following line
        //   // instead of the line above:
        //   return Observable.throw(err.text() || 'backend server error');
        // }
        // return Observable.throw(err || 'backend server error');
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
             console.error(errMsg); // log to console instead
             return Observable.throw(errMsg);
    }
}

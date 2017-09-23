import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { AccountService, ProfileInfo, GenericUser } from '../security/account.service'
import { OAuthService } from '../security/o-auth.service';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {
    results$: Observable<any>;

    constructor(private _appConfig: AppConfig, private _accountService:AccountService,
        private _oAuth: OAuthService, private _http: Http) {

    }

    getAccountInfo():Observable<GenericUser> {
        console.log("getAccountInfo");
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);

        let url = this._appConfig.apiBaseUrl + "Users/"
            + this._accountService.tokenInfo.userName;
        console.log("url", url);

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        return this.results$ = this._http.get(url, requestOpts)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


    }

    changePassword(password: string, userName: string): Observable<any> {
        console.log("changePassword");
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-type', 'application/json');

        let url = this._appConfig.apiBaseUrl + "Users/"
            + this._accountService.tokenInfo.userName + "/password";
        console.log("url", url);

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        let data = JSON.stringify(password);
        console.log("data:", data);

        return this.results$ = this._http.put(url, data, requestOpts)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateProfile(profileInfo: ProfileInfo) {
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-type', 'application/json');

        let url = this._appConfig.apiBaseUrl + "Users/"
            + this._accountService.tokenInfo.userName + "/profile";

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        console.log("url", url);

        let data = JSON.stringify(profileInfo);
        console.log("data:", data);

        return this.results$ = this._http.post(url, data, requestOpts)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            //const err = body.error || JSON.stringify(body);
            //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            errMsg = body;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error('accountService handleError', errMsg);
        return Observable.throw(errMsg);
    }
}
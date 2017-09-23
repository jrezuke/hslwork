import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Group } from '../groups/groups.service';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export enum UserType {
  Employee,
  Affiliate
}

export class TokenInfo {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  displayName: string;
  role: string[];
  constructor() { }
}

export class ProfileInfo {
  profileType: string;
  firstName: string;
  lastName: string;
  displayName: string;
  emailAddress: string;

  constructor() { }
}

export class DisplayValue {
  display: string;
  value: string;

  constructor() { }

}

export class AccountInfo {
  isEnabled: boolean;
  userName: string;
  providerType: string;
  dateCreated: string;
  dateLoggedIn: string;
  datePasswordExpires: string;
  dateLastLogin: string;
  dateLastModified: string;
  userType: string;

  constructor() { }
}

export class GenericUser {
  username: string;
  password: string;
  profile: ProfileInfo;
  account: AccountInfo;
  groups: Group[];

  constructor() {
    this.account = new AccountInfo();
    this.profile = new ProfileInfo();
    this.groups = new Array();
  }
}

export class ProfileReturn {
  firstName: string;
  lastName: string;
  displayName: string;
  emailAddress: string;
}

export class AccountReturn {
  providerType: string;
  isEnabled: boolean;
  dateCreated: string;
  datePasswordExpires: string;
  dateLastModified: string;
  dateLastLogin: string;
  properties: any;

  constructor() { }
}

// export class UserReturn {
//   userType: string;
//   username: string;
//   password: string;
//   profile: ProfileReturn;
//   account: AccountReturn;
//   groups: Group[];

//   constructor() {
//       this.account = new AccountReturn();
//       this.profile = new ProfileReturn();
//       this.groups = new Array();
//   }
// }

@Injectable()
export class AccountService {
  private _isAuthenticated = false;
  public tokenInfo: TokenInfo = new TokenInfo();
  public accountInfo: AccountInfo;
  public profileInfo: ProfileInfo;
  public _showSpinner: boolean = false;
  public results$: Observable<string>;
  _redirectUrl: string;
  // showSpinner = new BehaviorSubject<boolean>(false);
  // showSpinner$ = this.showSpinner.asObservable();

  constructor(private _appConfig: AppConfig,
    private _http: Http) { }

  // setSpinner(newState: boolean) {
  //   this.showSpinner.next(newState);
  // }

  setShowSpinner(state: boolean, source: string){
    console.log("AccountService.setShowSpinner current state", this._showSpinner);
    console.log("AccountService.setShowSpinner new state", state);
    console.log("AccountService.setShowSpinner source", source);
    this._showSpinner = state;
  }
  setRedirectUrl(url: string) {
      console.log("AccountService.setRedirecUrl:", this._redirectUrl);
      this._redirectUrl = url;
  }

  getRedirectUrl() {
      return this._redirectUrl;
  }

  registerNewUser(newUser: GenericUser): Observable<any> {
      let url = this._appConfig.apiBaseUrl + "Users";
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let requestOpts = new RequestOptions();
      requestOpts.headers = headers;
      return this._http.post(url, JSON.stringify(newUser), requestOpts)
          .map(res => { res.json(), console.log("resp:", res) })
          .catch(this.handleError);
  }

  isUserAuthenticated() {
    return this._isAuthenticated;
  }

  setUserAuthorized(state: boolean) {
    this._isAuthenticated = state;
  }

  getUserType(email: string) {
    let url = this._appConfig.apiBaseUrl + "Users/type?emailAddress=" + email;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let requestOpts = new RequestOptions();
    requestOpts.headers = headers;

    return this.results$ = this._http.get(url, requestOpts)
      .map(res => res['_body'])
      .catch(this.handleError);
  }

  getUserFromDN(list: string[]) {
    let url = this._appConfig.apiBaseUrl + "Users/list";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let requestOpts = new RequestOptions();
    requestOpts.headers = headers;

    return this.results$ = this._http.post(url, JSON.stringify(list), requestOpts)
      .map(res => res.json())
      .catch(this.handleError);
  }

  resetPassword(email: string) {
    let url = this._appConfig.apiBaseUrl + "Users/password/reset?emailAddress=" + email;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let requestOpts = new RequestOptions();
    requestOpts.headers = headers;

    return this.results$ = this._http.post(url, "", requestOpts)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error: Response | any) {
    // let errMsg: string;
    // if (error instanceof Response) {
    //     const body = error.json() || '';
    //     const err = body.error || JSON.stringify(body);
    //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     errMsg = body;
    // } else {
    //     errMsg = error.message ? error.message : error.toString();
    // }
    // console.error('accountService handleError',errMsg);
    // return Observable.throw(errMsg);
    return Observable.throw(error.json().error || 'Server error');
  }
}

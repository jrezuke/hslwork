"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_config_1 = require('../app.config');
var account_service_1 = require('../security/account.service');
var o_auth_service_1 = require('../security/o-auth.service');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var ProfileService = (function () {
    function ProfileService(_appConfig, _accountService, _oAuth, _http) {
        this._appConfig = _appConfig;
        this._accountService = _accountService;
        this._oAuth = _oAuth;
        this._http = _http;
    }
    ProfileService.prototype.getAccountInfo = function () {
        console.log("getAccountInfo");
        var headers = new http_1.Headers();
        var token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        var url = this._appConfig.apiBaseUrl + "Users/"
            + this._accountService.tokenInfo.userName;
        console.log("url", url);
        var requestOpts = new http_1.RequestOptions();
        requestOpts.headers = headers;
        return this.results$ = this._http.get(url, requestOpts)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ProfileService = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [app_config_1.AppConfig, account_service_1.AccountService, o_auth_service_1.OAuthService, http_1.Http])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map
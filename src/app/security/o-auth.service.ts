import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
//import { Router } from '@angular/router';
import { AccountService } from './account.service'

@Injectable()
export class OAuthService {
    public IsAuthorized: boolean = false;
    private storage: any;

    constructor(private _appConfig: AppConfig, private _accountService: AccountService) {
        console.log("oauth service constructor", );
        this.storage = sessionStorage; //localStorage

        if (this.retrieve("IsAuthorized") !== "") {
            this.IsAuthorized = this.retrieve("IsAuthorized");
        }
        console.log("oauth service ctor - IsAuthorized", this.IsAuthorized)

    }

    public GetToken(): any {
        return this.retrieve("authorizationData");
    }

    public ResetAuthorizationData() {
        this.store("authorizationData", "");
        this.store("authorizationDataIdToken", "");
        this.IsAuthorized = false;
        this.store("IsAuthorized", false);
    }

    public SetAuthorizationData(token: any, id_token:any) {
        if (this.retrieve("authorizationData") !== "") {
            this.store("authorizationData", "");
        }

        this.store("authorizationData", token);
        this.store("authorizationDataIdToken", id_token);
        this.IsAuthorized = true;
        this.store("IsAuthorized", true);

        var data: any = this.getDataFromToken(id_token);
    }

    Authorize() {
        console.log("Authorize");

        var authorizationUrl = this._appConfig.authorizationUrl;
        var client_id = this._appConfig.client_id;
        var redirect_uri = this._appConfig.redirect_uri;
        var response_type = this._appConfig.response_type;
        var scope = this._appConfig.scope;
        var nonce = this._appConfig.nonce;
        var state = this._appConfig.state;

        this.store("authStateControl", state);
        this.store("authNonce", nonce);
        console.log("AuthorizedControl created. adding myautostate: " + this.retrieve("authStateControl"));


        var url =
            authorizationUrl + "?" +
            "response_type=" + encodeURI(response_type) + "&" +
            "client_id=" + encodeURI(client_id) + "&" +
            "redirect_uri=" + encodeURI(redirect_uri) + "&" +
            "scope=" + encodeURI(scope) + "&" +
            "nonce=" + encodeURI(nonce) + "&" +
            "state=" + encodeURI(state);
        console.log("url:", url);

        window.location.href = url;
    }

    ServerCallback() {
        console.log("ServerCallback");
        this.ResetAuthorizationData();

        var hash = window.location.hash.substr(1);
        var result: any = hash.split('&').reduce(function (result, item) {
            var parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        //console.log("hash:",result);
        console.log("AuthorizedCallback created, begin token validation");

        var token = "";
        var id_token = "";
        var authResponseIsValid = false;
        if (!result.error) {

            if (result.state !== this.retrieve("authStateControl")) {
                console.log("AuthorizedCallback incorrect state");
            }
            else {

                token = result.access_token;
                id_token = result.id_token

                var dataIdToken: any = this.getDataFromToken(id_token);
                console.log(dataIdToken);
                this._accountService.tokenInfo.email = dataIdToken.email;
                this._accountService.tokenInfo.firstName = dataIdToken.given_name;
                this._accountService.tokenInfo.lastName = dataIdToken.family_name;
                this._accountService.tokenInfo.displayName = dataIdToken.name;
                this._accountService.tokenInfo.role = dataIdToken.role;
                this._accountService.tokenInfo.userName = dataIdToken.sub;

                console.log("tokeInfo:", JSON.stringify(this._accountService.tokenInfo));


                // validate nonce
                if (dataIdToken.nonce !== this.retrieve("authNonce")) {
                    console.log("AuthorizedCallback incorrect nonce");
                }
                else {
                    this.store("authNonce", "");
                    this.store("authStateControl", "");

                    authResponseIsValid = true;
                    console.log("AuthorizedCallback state and nonce validated, returning access token");
                }
            }
        }

        if (authResponseIsValid) {
            this.SetAuthorizationData(token, id_token);
            //console.log(this.retrieve("authorizationData"));
            //this._router.navigate(['/search']);
        }
        else {
            this.ResetAuthorizationData();
        }
    }

    public Logoff() {
        // /connect/endsession?id_token_hint=...&post_logout_redirect_uri=https://myapp.com
        console.log("BEGIN Authorize, no auth data");

        var authorizationUrl = this._appConfig.authorizationEndSessionUrl;

        var id_token_hint = this.retrieve("authorizationDataIdToken");
        var post_logout_redirect_uri = this._appConfig.redirectPostLogout_uri;

        var url =
            authorizationUrl + "?" +
            "id_token_hint=" + encodeURI(id_token_hint) + "&" +
            "post_logout_redirect_uri=" + encodeURI(post_logout_redirect_uri);

        this.ResetAuthorizationData();

        window.location.href = url;
    }

    private urlBase64Decode(str: string) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }

        return window.atob(output);
    }

    private getDataFromToken(token: string) {
        var data = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            data = JSON.parse(this.urlBase64Decode(encoded));
        }

        return data;
    }

    private retrieve(key: string): any {
        var item = this.storage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }

        return;
    }

    private store(key: string, value: any) {
        this.storage.setItem(key, JSON.stringify(value));
    }
}
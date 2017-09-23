import { Injectable }     from '@angular/core';
import { CanActivate, Router, NavigationExtras,
  ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { AccountService }  from './account.service';
import { OAuthService } from '../security/o-auth.service';


@Injectable()

export class AuthGuardService implements CanActivate {

    constructor(private _accountService: AccountService, private _router: Router
        ,private _oauthService: OAuthService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        console.log("AuthGuard url", url);

        console.log('AuthGuard.canActivate called');
        if (this._accountService.isUserAuthenticated()) {
            return true;
        }
        else {
            localStorage.setItem("ifar-redirecturl", url);
            this._oauthService.Authorize();
            // Create a dummy session id
            //let sessionId = 123456789;

            // Set our navigation extras object
            // that contains our global query params and fragment
            // let navigationExtras: NavigationExtras = {
            //     queryParams: { 'session_id': sessionId },
            //     fragment: 'anchor'
            // };

            //this._router.navigate(['/login'], navigationExtras);
        }
    }
}

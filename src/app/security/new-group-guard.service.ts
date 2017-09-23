import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "app/security/account.service";

@Injectable()

export class NewGroupGuardService implements CanActivate {
    constructor(private _accountService: AccountService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        console.log("NewGroupGuardService url", url);

        console.log('NewGroupGuardService.canActivate called');
        if (this._accountService.tokenInfo.role.indexOf("administrator") !== -1) {
            return true;
        }
        else {
            //return false;
            this._router.navigate(['/home']);
        }
    }
}
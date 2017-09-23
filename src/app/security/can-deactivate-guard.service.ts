import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';
import { AccountService } from './account.service'
export interface CanComponentDeactivate {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

    constructor(private _accountService: AccountService) { }

    canDeactivate(component: CanComponentDeactivate) {
        if (component.canDeactivate) {
            if (!component.canDeactivate()) {
                //this._accountService.canDeactivate = false;
                return false;
            }

        }
        //this._accountService.canDeactivate = true;
        return  true;
  }
}
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ProfileService } from './profile.service';
import { GenericUser } from '../security/account.service'

import 'rxjs/add/operator/map';

@Injectable()
export class ProfileResolver implements Resolve<any> {
    constructor(private profileService: ProfileService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<GenericUser>{
        console.log("ProfileResolver.resolve");
        return this.profileService.getAccountInfo();

    }
}
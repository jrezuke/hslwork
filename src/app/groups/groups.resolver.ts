import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GroupsService, Group } from './groups.service';

@Injectable()
export class GroupsResolver implements Resolve<Group>{

    constructor(private _groupsService: GroupsService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this._groupsService.currentGroup;
    }
}
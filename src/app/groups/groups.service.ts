import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { AccountService, ProfileInfo, GenericUser } from '../security/account.service'
import { OAuthService } from '../security/o-auth.service';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export enum UserGroupType
{
    Custom,
    Application,
    System
}

export class UsernameListRequest{
    userNames: string[] = new Array();
}

export class MemberDisplay{
    name: string;
    email: string;
    username: string;
}

export class Group{
    name: string;
    description: string;
    //distinguishedName: string;
    groupType: UserGroupType;
    managedBy: GenericUser;
    members: GenericUser[];
    objectClass: string;
    properties: any;
    constructor() {
        console.log("Group ctor:");
        this.members = new Array();
    }
}

export class GroupReturnObj{
    name: string;
    description: string;
    managedBy: string;
}

@Injectable()
export class GroupsService {
    currentGroup: Group;
    currentGroups: Group[];
    results$: Observable<any>;

    constructor(private _appConfig: AppConfig, private _accountService:AccountService,
        private _oAuth: OAuthService, private _http: Http) {
        console.log("GroupsService.constructor");
    }



    getGroup(name: string): Observable<Group> {
        console.log("getGroup");
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-type', 'application/json');

        let url = this._appConfig.apiBaseUrl + "Groups/"
            + name;
        console.log("url", url);

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        return this.results$ = this._http.get(url, requestOpts)
            .map((res) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    addGroup(group: GroupReturnObj) {
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-type', 'application/json');

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        let url = this._appConfig.apiBaseUrl + "Groups"
            + "?name=" + group.name
            + "&description=" + group.description
            + "&managedBy=" + group.managedBy;

        return this._http.post(url, JSON.stringify(group), requestOpts)
            .map(res => { res.json(), console.log("resp:", res) })
            .catch(this.handleError);
    }

    updateGroupAndRemoveMembers(group: GroupReturnObj, removeMembers: string[]) {
        console.log("updateGroupAndRemoveMembers group:", group);
        console.log("updateGroupAndRemoveMembers addMembers:", removeMembers);
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-type', 'application/json');

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        let urlGroupUpdate = this._appConfig.apiBaseUrl + "Groups/"
            + group.name
            + "?description=" + group.description
            + "&managedBy=" + group.managedBy;

        let grpArgs = {
            name: group.name,
            description: group.description,
            managedBy: group.managedBy
        };

        let dataGroupUpdate = JSON.stringify(grpArgs);

        let urlRemoveMembers = this._appConfig.apiBaseUrl + "Groups/"
            + this.currentGroup.name + "/removed-members"

        let usernameListRequestRemove = new UsernameListRequest();
        usernameListRequestRemove.userNames = removeMembers;

        let dataRemoveMembers = JSON.stringify(usernameListRequestRemove);

        return Observable.forkJoin(
            this._http.put(urlGroupUpdate, dataGroupUpdate, requestOpts)
                .map(res => res.json()),
            this._http.put(urlRemoveMembers, dataRemoveMembers, requestOpts)
                .map(res => res.json())
        )

    }

    updateGroupAndAddMembers(group: GroupReturnObj, addMembers: string[]) {
        console.log("updateGroupAndAddMembers group:", group);
        console.log("updateGroupAndAddMembers addMembers:", addMembers);
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-type', 'application/json');

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;


        let urlGroupUpdate = this._appConfig.apiBaseUrl + "Groups/"
            + group.name
            + "?description=" + group.description
            + "&managedBy=" + group.managedBy;

        let grpArgs = {
            name: group.name,
            description: group.description,
            managedBy: group.managedBy
        };

        let dataGroupUpdate = JSON.stringify(grpArgs);

        let urlAddMembers = this._appConfig.apiBaseUrl + "Groups/"
            + this.currentGroup.name + "/new-members";

        let usernameListRequestAdd = new UsernameListRequest();
        usernameListRequestAdd.userNames = addMembers;

        let dataAddMembers = JSON.stringify(usernameListRequestAdd);

        return Observable.forkJoin(
            this._http.put(urlGroupUpdate, dataGroupUpdate, requestOpts)
                .map(res => res.json()),
            this._http.put(urlAddMembers, dataAddMembers, requestOpts)
                .map(res => res.json())
        )
    }

    updateGroupAll(group: GroupReturnObj,
        addMembers: string[],
        removeMembers: string[]) {
            console.log("updateGroupAll group:", group);

            let headers = new Headers();
            let token = this._oAuth.GetToken();
            headers.append('Authorization', 'Bearer ' + token);
            headers.append('Content-type', 'application/json');

            let requestOpts = new RequestOptions();
            requestOpts.headers = headers;

            let urlGroupUpdate = this._appConfig.apiBaseUrl + "Groups/"
                + group.name
                + "?description=" + group.description
                + "&managedBy=" + group.managedBy;

            let grpArgs = {
                name: group.name,
                description: group.description,
                managedBy: group.managedBy
            };

            let dataGroupUpdate = JSON.stringify(grpArgs);

            let urlAddMembers = this._appConfig.apiBaseUrl + "Groups/"
                + group.name + "/new-members";

            let usernameListRequestAdd = new UsernameListRequest();
            usernameListRequestAdd.userNames = addMembers;

            let dataAddMembers = JSON.stringify(usernameListRequestAdd);

            let urlRemoveMembers = this._appConfig.apiBaseUrl + "Groups/"
                + group.name + "/removed-members"

            let usernameListRequestRemove = new UsernameListRequest();
            usernameListRequestRemove.userNames = removeMembers;

            let dataRemoveMembers = JSON.stringify(usernameListRequestRemove);

            return Observable.forkJoin(
                this._http.put(urlGroupUpdate, dataGroupUpdate, requestOpts)
                    .map(res => res.json()),
                this._http.put(urlAddMembers, dataAddMembers, requestOpts)
                    .map(res => res.json()),
                this._http.put(urlRemoveMembers, dataRemoveMembers, requestOpts)
                    .map(res => res.json())
            )

        }

    updateGroup(group: GroupReturnObj) {
            console.log("updateGroup group:", group);
            let headers = new Headers();
            let token = this._oAuth.GetToken();
            headers.append('Authorization', 'Bearer ' + token);
            headers.append('Content-type', 'application/json');

            let url = this._appConfig.apiBaseUrl + "Groups/"
                + group.name
                + "?description=" + group.description
                + "&managedBy=" + group.managedBy;

            let requestOpts = new RequestOptions();
            requestOpts.headers = headers;

            console.log("url", url);
            let grpArgs = {
                name: group.name,
                description: group.description,
                managedBy: group.managedBy
            };

            let data = JSON.stringify(grpArgs);
            console.log("data:", data);

            return this.results$ = this._http.put(url, data, requestOpts)
                .map(res => res.json())
                .catch(this.handleError);

    }

    addNewGroupMembers(members: string[]) {
        console.log("addNewGroupMembers members:", members);
        let usernameListRequest = new UsernameListRequest();
        usernameListRequest.userNames = members;

        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-type', 'application/json');

        let url = this._appConfig.apiBaseUrl + "Groups/"
            + this.currentGroup.name + "/new-members";

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        console.log("url", url);

        let data = JSON.stringify(usernameListRequest);
        console.log("data:", data);

        return this.results$ = this._http.put(url, data, requestOpts)
            .map(res => res.json())
            .catch(this.handleError);
    }

    removeGroupMembers(members: string[]) {
        console.log("removeGroupMembers members:", members);

        let usernameListRequest = new UsernameListRequest();
        usernameListRequest.userNames = members;
        let headers = new Headers();
        let token = this._oAuth.GetToken();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-type', 'application/json');

        let url = this._appConfig.apiBaseUrl + "Groups/"
            + this.currentGroup.name + "/removed-members"

        let requestOpts = new RequestOptions();
        requestOpts.headers = headers;

        console.log("url", url);

        let data = JSON.stringify(usernameListRequest);
        console.log("data:", data);

        return this.results$ = this._http.put(url, data, requestOpts)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getCurrentGroup() {
        return this.currentGroup;
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
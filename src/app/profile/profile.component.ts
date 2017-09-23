import {
    Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { ProfileService} from './profile.service';
import { AccountService, ProfileInfo, AccountInfo, GenericUser  } from '../security/account.service'
import { GroupsService, Group, UserGroupType } from '../groups/groups.service';
import { FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
    moduleId: module.id,
    selector: 'ifar-profile',
    styleUrls: ['profile.component.css'],
    templateUrl:'profile.component.html',
    animations: [
        trigger('visibility', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})

export class ProfileComponent implements OnInit {
    state = "in";
    profileInfo: ProfileInfo = new ProfileInfo();
    accountProfile: any;
    accountInfo: AccountInfo = new AccountInfo();
    userInfo: any;
    groups: Group[] = new Array();
    groupsCustom: Group[] = new Array();
    groupsApplication: Group[] = new Array();
    groupsSystem: Group[] = new Array();

    selectedGroup: Group;
    password: string;
    confirmPassword: string;
    @ViewChild('resultModal') resultModal: ModalDirective;
    dialog = { title: "", message: "" };

    constructor(private _router: Router,
        private activatedRoute: ActivatedRoute,
        private _profileService: ProfileService,
        private _groupsService: GroupsService,
        private _accountService: AccountService) { }

    ngOnInit() {
        //the authGuard will not let the user come here unless
        //the user is authenticated

        //get the data from preloaded - route
        this.activatedRoute.data.subscribe(val => {
            console.log("val:", val);
            this.accountProfile = val['accountProfile'];
        });
        console.log("ProfileComponent.ngOnInit this.accountProfile", this.accountProfile);

        if (!this.profileInfo) {
            this.profileInfo = new ProfileInfo();
        }
        if (!this.accountInfo) {
            this.accountInfo = new AccountInfo();
        }

        this.accountInfo.userName = this.accountProfile.username;
        this.accountInfo.userType = this.accountProfile.userType;
        this.accountInfo.dateCreated = this.accountProfile.account.dateCreated;
        this.accountInfo.dateLoggedIn = this.accountProfile.account.dateLoggedIn;
        this.profileInfo.displayName = this.accountProfile.profile.displayName;
        this.profileInfo.emailAddress = this.accountProfile.profile.emailAddress;
        this.profileInfo.firstName = this.accountProfile.profile.firstName;
        this.profileInfo.lastName = this.accountProfile.profile.lastName;
        this.profileInfo.profileType = this.accountInfo.userType;
        let groups = this.accountProfile.groups;

        groups = groups.sort(function (a, b) {
            return a.name.toLowerCase() == b.name.toLocaleLowerCase() ? 0 : +(a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) || -1;
        });
        let that = this;
        groups.forEach( function (group: Group) {
            if (group.name === "Employees") {
                //that.groupsSystem.push(group);
            }
            else {
                if (group.groupType === 0) {
                    that.groupsCustom.push(group);
                }
                if (group.groupType === 1) {
                    that.groupsApplication.push(group);
                }
                if (group.groupType === 2) {
                    that.groupsSystem.push(group);
                }
                that.groups.push(group);
            }

        })

        console.log("this.groups:", JSON.stringify(this.groups));
        console.log("this.accountInfo:", JSON.stringify(this.accountInfo));
    }

    canDeactivate(): Promise<boolean> | boolean {
        return true;
    }

    onSubmit(form: any) {
        this._accountService.setShowSpinner(true, "ProfileComponent.onSubmit");
        console.log('submitted', JSON.stringify(this.profileInfo));
        this._profileService.updateProfile(this.profileInfo)
            .subscribe((res) => {
                console.log("response:", res);
                this._accountService.tokenInfo.displayName = this.profileInfo.displayName;  //update user in top right corner
                this._accountService.setShowSpinner(false, "ProfileComponent.onSubmit");
                this.dialog.title = "Update Profile";
                this.dialog.message = res.message;
                this.resultModal.show();
        },
            (e: any) => {
                console.log("error:", e);
                this.dialog.title = "Update Profile";
                this.dialog.message = e.message;
                this._accountService.setShowSpinner(false, "ProfileComponent.onSubmit");
                this.resultModal.show();
            });
    }

    onCancel() {
        console.log('onCancel');
        this._router.navigate(['/home']);
    }

    onResetPassword() {
        this._accountService.setShowSpinner(true, "ProfileComponent.onResetPassword");
        console.log("onResetPassword:", this.password, this.accountInfo.userName);
        this._profileService.changePassword(this.password, this.accountInfo.userName)
            .subscribe((resp) => {
                console.log("response:", resp);
                this.dialog.title = "Change Password";
                this.dialog.message = resp.message;
                this._accountService.setShowSpinner(false, "ProfileComponent.onResetPassword");
                this.resultModal.show();
            },
            (e: any) => {
                console.log("error:", e);
                this.dialog.title = "Change Password";
                this.dialog.message = e.message;
                this._accountService.setShowSpinner(false, "ProfileComponent.onResetPassword");
                this.resultModal.show();
            });
    }

    onGroupClick(group: Group) {
        console.log("onGroupClick", group);
        this.selectedGroup = group;
    }

    onEditGroup() {
        console.log("onEditGroup");
        this._router.navigate(['/groups', this.selectedGroup.name]);
    }

    onNameChange(value: string) {
        console.log("name change:", value);
        this.profileInfo.displayName = this.profileInfo.firstName
        + " " + this.profileInfo.lastName
    }
}

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
var profile_service_1 = require('./profile.service');
var account_service_1 = require('../security/account.service');
var groups_service_1 = require('../groups/groups.service');
var router_1 = require('@angular/router');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var ProfileComponent = (function () {
    function ProfileComponent(_router, activatedRoute, _profileService, _groupsService) {
        this._router = _router;
        this.activatedRoute = activatedRoute;
        this._profileService = _profileService;
        this._groupsService = _groupsService;
        this.profileInfo = new account_service_1.ProfileInfo();
        this.accountInfo = new account_service_1.AccountInfo();
        this.groups = new Array();
        this.groupsCustom = new Array();
        this.groupsApplication = new Array();
        this.groupsSystem = new Array();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        //the authGuard will not let the user come here unless
        //the user is authenticated
        var _this = this;
        //this.accountProfile = this.activatedRoute.data.value.accountProfile;
        this.activatedRoute.data.subscribe(function (val) {
            console.log("val:", val);
            _this.accountProfile = val['accountProfile'];
        });
        console.log("ProfileComponent.ngOnInit this.accountProfile", this.accountProfile);
        if (!this.profileInfo) {
            this.profileInfo = new account_service_1.ProfileInfo();
        }
        if (!this.accountInfo) {
            this.accountInfo = new account_service_1.AccountInfo();
        }
        this.accountInfo.userName = this.accountProfile.username;
        this.accountInfo.userType = this.accountProfile.userType;
        this.accountInfo.dateCreated = this.accountProfile.account.dateCreated;
        this.accountInfo.dateLoggedIn = this.accountProfile.account.dateLoggedIn;
        this.profileInfo.displayName = this.accountProfile.profile.displayName;
        this.profileInfo.emailAddress = this.accountProfile.profile.emailAddress;
        this.profileInfo.firstName = this.accountProfile.profile.firstName;
        this.profileInfo.lastName = this.accountProfile.profile.lastName;
        var groups = this.accountProfile.groups;
        var that = this;
        _.each(groups, function (group) {
            if (group.groupType === 0) {
                that.groupsSystem.push(group);
            }
            if (group.groupType === 1) {
                that.groupsSystem.push(group);
            }
            if (group.groupType === 2) {
                that.groupsSystem.push(group);
            }
            that.groups.push(group);
        });
        // this._profileService.getAccountInfo().subscribe((resp) => {
        //     console.log("response:", resp);
        //     that.accountInfo.userName = resp.username;
        //     that.accountInfo.userType = resp.userType;
        //     that.accountInfo.dateCreated = resp.account.dateCreated;
        //     that.accountInfo.dateLoggedIn = resp.account.dateLoggedIn;
        //     that.profileInfo.displayName = resp.profile.displayName;
        //     that.profileInfo.emailAddress = resp.profile.emailAddress;
        //     that.profileInfo.firstName = resp.profile.firstName;
        //     that.profileInfo.lastName = resp.profile.lastName;
        //     let groups = resp.groups;
        //     _.each(groups, function (group: Group) {
        //         if (group.groupType === 0) {
        //             that.groupsSystem.push(group);
        //         }
        //         if (group.groupType === 1) {
        //             that.groupsSystem.push(group);
        //         }
        //         if (group.groupType === 2) {
        //             that.groupsSystem.push(group);
        //         }
        //         that.groups.push(group);
        //     })
        console.log("this.groups:", JSON.stringify(this.groups));
        console.log("this.accountInfo:", JSON.stringify(this.accountInfo));
        // }, err => console.log("getAccountInfo error:", err));
    };
    ProfileComponent.prototype.canDeactivate = function () {
        return true;
    };
    ProfileComponent.prototype.onSubmit = function (form) {
        console.log('submitted'); //, JSON.stringify(this.userInfo));
    };
    ProfileComponent.prototype.onCancel = function () {
        console.log('onCancel');
        this._router.navigate(['/home']);
    };
    ProfileComponent.prototype.onResetPassword = function () {
        console.log("onResetPassword");
    };
    ProfileComponent.prototype.onGroupClick = function (group) {
        console.log("onGroupClick", group);
        this.selectedGroup = group;
    };
    ProfileComponent.prototype.onEditGroup = function () {
        console.log("onEditGroup");
        this._router.navigate(['/groups', this.selectedGroup.name]);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ifar-profile',
            styleUrls: ['profile.component.css'],
            templateUrl: 'profile.component.html',
            animations: [
                core_1.trigger('visibility', [
                    core_1.state('in', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }),
                        core_1.animate('0.5s ease-in')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, profile_service_1.ProfileService, groups_service_1.GroupsService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map
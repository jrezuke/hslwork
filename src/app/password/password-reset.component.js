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
var account_service_1 = require('../security/account.service');
var router_1 = require('@angular/router');
var PasswordResetComponent = (function () {
    function PasswordResetComponent(_accountService, _router) {
        this._accountService = _accountService;
        this._router = _router;
    }
    PasswordResetComponent.prototype.ngOnInit = function () {
        //if the user is not authenticated then authenticate
        //for now
        // this.userInfo = this._accountService.getCurrentUser();
        // if (this.userInfo === undefined) {
        //     this.userInfo = new UserInfo();
        // }
        //console.log("PasswordResetComponent.ngOnInit.userInfo:", JSON.stringify(this.userInfo))
    };
    PasswordResetComponent.prototype.onSubmit = function (form) {
        //console.log('submitted', JSON.stringify(this.userInfo));
    };
    PasswordResetComponent.prototype.onCancel = function () {
        this._router.navigate(['/home']);
    };
    PasswordResetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'password-reset',
            templateUrl: 'password-reset.component.html',
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
        __metadata('design:paramtypes', [account_service_1.AccountService, router_1.Router])
    ], PasswordResetComponent);
    return PasswordResetComponent;
}());
exports.PasswordResetComponent = PasswordResetComponent;
//# sourceMappingURL=password-reset.component.js.map
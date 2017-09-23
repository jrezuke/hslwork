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
var RegisterComponent = (function () {
    function RegisterComponent(_accountService, _router) {
        this._accountService = _accountService;
        this._router = _router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        //this.userInfo = new UserInfo();
        //console.log("RegisterComponent.ngOnInit accountService.currentUser:", JSON.stringify(this._accountService.getCurrentUser()));
    };
    RegisterComponent.prototype.onSubmit = function (form) {
        console.log('submitted', this.emailAddress);
        var userType = this._accountService.getUserType(this.emailAddress);
        //todo this is being mocked
        if (userType === "employee") {
            //this.userInfo.userType === UserType.Employee;
            //this._accountService.setCurrentUser(this.userInfo);
            this._router.navigate(['/register/employee/confirmed']);
        }
        else {
            //this.userInfo.userType === UserType.Affiliate;
            //this._accountService.setCurrentUser(this.userInfo);
            this._router.navigate(['/register/affiliate']);
        }
    };
    RegisterComponent.prototype.onCancel = function () {
        this._router.navigate(['/home']);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ifar-register',
            styleUrls: ['register.component.css'],
            templateUrl: 'register.component.html',
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
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map
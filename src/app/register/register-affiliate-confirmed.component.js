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
var o_auth_service_1 = require('../security/o-auth.service');
var RegisterAffiliateConfirmedComponent = (function () {
    function RegisterAffiliateConfirmedComponent(_oauthService) {
        this._oauthService = _oauthService;
    }
    RegisterAffiliateConfirmedComponent.prototype.ngOnInit = function () { };
    RegisterAffiliateConfirmedComponent.prototype.onLogin = function () {
        //security servcie login
        console.log("Logging in");
        localStorage.setItem("ifar-redirecturl", "");
        this._oauthService.Authorize();
    };
    RegisterAffiliateConfirmedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'affiliate-confirmed',
            templateUrl: 'register-affiliate-confirmed.component.html',
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
        __metadata('design:paramtypes', [o_auth_service_1.OAuthService])
    ], RegisterAffiliateConfirmedComponent);
    return RegisterAffiliateConfirmedComponent;
}());
exports.RegisterAffiliateConfirmedComponent = RegisterAffiliateConfirmedComponent;
//# sourceMappingURL=register-affiliate-confirmed.component.js.map
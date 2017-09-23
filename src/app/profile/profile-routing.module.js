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
var router_1 = require("@angular/router");
var profile_component_1 = require("./profile.component");
var auth_guard_service_1 = require('../security/auth-guard.service');
var can_deactivate_guard_service_1 = require('../security/can-deactivate-guard.service');
var profile_resolver_1 = require('./profile.resolver');
var routes = [
    {
        path: '', component: profile_component_1.ProfileComponent,
        resolve: {
            accountProfile: profile_resolver_1.ProfileResolver
        },
        canActivate: [auth_guard_service_1.AuthGuardService],
        canDeactivate: [can_deactivate_guard_service_1.CanDeactivateGuardService]
    }
];
var ProfileRoutingModule = (function () {
    function ProfileRoutingModule() {
    }
    ProfileRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileRoutingModule);
    return ProfileRoutingModule;
}());
exports.ProfileRoutingModule = ProfileRoutingModule;
//# sourceMappingURL=profile-routing.module.js.map